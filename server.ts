import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { 
  findRelevantKnowledge, 
  checkCautionaryQuery, 
  buildContextFromEntries 
} from './src/utils/retrieval.ts';
import { NEHHDC_KNOWLEDGE_BASE, SUGGESTED_QUESTIONS } from './src/data/knowledgeBase.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Determine port: Render assigns PORT (e.g. 10000); AI Studio container uses 3000 (reverse-proxied from 8080)
const PORT = process.env.RENDER || (process.env.PORT && process.env.PORT !== '8080')
  ? Number(process.env.PORT)
  : 3000;

// Content Security Policy: Permit iframe embedding on official NEHHDC domain
app.use((_req: Request, res: Response, next: () => void) => {
  res.setHeader(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://www.nehhdc.com https://nehhdc.com http://localhost:* https://*.onrender.com;"
  );
  res.removeHeader('X-Frame-Options');
  next();
});

// Security & Body parsing
app.use(express.json({ limit: '100kb' }));

// Request throttling: In-memory sliding window rate limiter (no external Redis needed)
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 25; // max 25 queries per minute per client

function rateLimiter(req: Request, res: Response, next: () => void): void {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'client';
  const now = Date.now();

  let record = rateLimitMap.get(clientIp);
  if (!record) {
    record = { timestamps: [] };
    rateLimitMap.set(clientIp, record);
  }

  // Remove timestamps older than window
  record.timestamps = record.timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (record.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'You have submitted too many requests in a short period. Please wait a moment before asking another question.'
    });
    return;
  }

  record.timestamps.push(now);
  next();
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    record.timestamps = record.timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    if (record.timestamps.length === 0) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Initialize Gemini Client
const rawApiKey = process.env.GEMINI_API_KEY;
const isRealApiKey = Boolean(rawApiKey && rawApiKey !== 'MY_GEMINI_API_KEY' && !rawApiKey.startsWith('MY_') && rawApiKey.length > 20);
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.8-flash';

console.log(`[Ask NEHHDC] API Key status: ${isRealApiKey ? 'Configured (' + rawApiKey!.slice(0, 4) + '...)' : 'Not configured or placeholder'}`);

let aiClient: GoogleGenAI | null = null;
if (isRealApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: rawApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// System Instruction per NEHHDC specification
const SYSTEM_INSTRUCTION = `You are Ask NEHHDC, the virtual information assistant of North Eastern Handicrafts and Handlooms Development Corporation Ltd. (NEHHDC), a Government of India enterprise under the Ministry of Development of North Eastern Region (MDoNER).

Your purpose is to help visitors understand NEHHDC and navigate its publicly available services and information.

Answer questions using the supplied NEHHDC knowledge base only.

You must:
- Give clear, simple, polite and concise answers.
- Use professional language appropriate for a Government of India enterprise.
- Understand variations in the way users ask questions.
- Answer in English by default. Where possible, respond in Hindi or Assamese when the user asks in those languages.
- Provide the relevant official webpage link whenever one is available and verified.
- Explain services in simple language.
- Distinguish between citizen/artisan services and business/institutional services.

You must NOT:
- Invent information or make unsupported claims.
- Provide unofficial commitments on behalf of NEHHDC.
- Promise financial assistance, registration, employment, selection, approval or procurement.
- Guess tender deadlines, recruitment dates, eligibility criteria or application requirements.
- Provide confidential internal information.
- Claim that you have processed an application or taken an official action.
- Ask visitors to share passwords, OTPs, bank details, Aadhaar numbers or other sensitive personal information.

For information that is unavailable or uncertain, politely say:
"I do not have verified information on this matter at present. Please refer to the official NEHHDC website (https://www.nehhdc.com/) or contact the Corporation directly for assistance."

For complaints, formal requests, grievances, job applications or matters requiring official intervention, direct the visitor to the official contact page (https://www.nehhdc.com/contact-us).

Always distinguish between verified facts and information that needs confirmation.`;

// API Endpoints
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Ask NEHHDC Virtual Information Assistant',
    model: MODEL_NAME,
    hasApiKey: isRealApiKey,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/suggested-questions', (_req: Request, res: Response) => {
  res.json({
    suggestedQuestions: SUGGESTED_QUESTIONS
  });
});

app.get('/api/knowledge-summary', (_req: Request, res: Response) => {
  res.json({
    totalEntries: NEHHDC_KNOWLEDGE_BASE.length,
    categories: [
      { id: 'about', label: 'About NEHHDC' },
      { id: 'artisan_services', label: 'Citizen & Artisan Services' },
      { id: 'business_services', label: 'Business & Institutional Services' },
      { id: 'marketing_retail', label: 'Marketing & Retail (Purbashree)' },
      { id: 'public_information', label: 'Public Information (Tenders, Jobs, Contact)' },
      { id: 'digital_platforms', label: 'Digital Platforms & Mobile App' }
    ]
  });
});

app.post('/api/chat', rateLimiter, async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({ error: 'Message cannot be empty.' });
      return;
    }

    if (message.length > 500) {
      res.status(400).json({
        error: 'Message length exceeds the maximum limit of 500 characters.'
      });
      return;
    }

    const trimmedMessage = message.trim();

    // 1. Check for boundary conditions and retrieve relevant knowledge chunks
    const cautionary = checkCautionaryQuery(trimmedMessage);
    const retrieval = findRelevantKnowledge(trimmedMessage, 3);

    // 2. Build lightweight context
    const contextText = buildContextFromEntries(
      retrieval.entries, 
      cautionary.isCautionary ? cautionary.mandatoryInstruction : undefined
    );

    // 3. Generate response using Gemini if real API key is present
    if (aiClient) {
      try {
        const prompt = `${contextText}\n\nVisitor Question: "${trimmedMessage}"\n\nPlease provide a clear, professional, concise response based ONLY on the verified information above. If the inquiry relates to time-sensitive items like tender deadlines or job guarantees, adhere strictly to the cautionary guidelines.`;

        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Gemini API call timed out')), 3500);
        });

        const response = await Promise.race([
          aiClient.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              thinkingConfig: {
                thinkingLevel: ThinkingLevel.LOW
              }
            }
          }),
          timeoutPromise
        ]);

        const answerText = response.text || 'I do not have verified information on this matter at present. Please refer to the official NEHHDC website (https://www.nehhdc.com/) or contact the Corporation directly for assistance.';

        res.json({
          answer: answerText,
          sources: retrieval.sources,
          isCautionary: retrieval.isCautionary,
          model: MODEL_NAME
        });
        return;
      } catch (genAiError: any) {
        console.error('Gemini API call failed, using graceful fallback:', genAiError?.message || genAiError);
        
        // Handle rate limits or quota errors with clear informative status
        const isQuota = String(genAiError?.message || '').includes('RESOURCE_EXHAUSTED') || genAiError?.status === 429;
        
        // Formulate deterministic grounded fallback answer based on retrieved entries
        const primaryDoc = retrieval.entries[0];
        let fallbackMessage = `Namaste. Here is the verified information from NEHHDC records regarding your inquiry:\n\n${primaryDoc.summary}\n\n${primaryDoc.content.slice(0, 350)}...`;

        if (cautionary.isCautionary) {
          if (cautionary.reason === 'Job Guarantee Inquiry') {
            fallbackMessage = `NEHHDC does not offer or guarantee employment through this portal. All recruitment is conducted transparently through official public advertisements and merit-based selection. Please visit https://www.nehhdc.com/ to check official vacancy circulars.`;
          } else if (cautionary.reason === 'Tender Deadline Inquiry') {
            fallbackMessage = `Tender submission deadlines and bid opening dates are subject to periodic addendums and corrigendums. To avoid outdated information, please verify the exact closing schedule directly from the official portal at https://www.nehhdc.com/tenders/ or etenders.gov.in.`;
          }
        }

        res.json({
          answer: fallbackMessage,
          sources: retrieval.sources,
          isCautionary: retrieval.isCautionary,
          note: isQuota ? 'High traffic mode: Serving verified direct knowledge records.' : undefined
        });
        return;
      }
    } else {
      // Deterministic response mode if GEMINI_API_KEY is not configured yet
      const primaryDoc = retrieval.entries[0];
      let fallbackMessage = `Namaste. Here is the verified information from NEHHDC records:\n\n${primaryDoc.summary}\n\n${primaryDoc.content}`;

      if (cautionary.isCautionary) {
        if (cautionary.reason === 'Job Guarantee Inquiry') {
          fallbackMessage = `NEHHDC does not offer or guarantee employment through this assistant. All appointments are made against officially advertised positions following prescribed Government of India guidelines. Please check https://www.nehhdc.com/ or contact hradmin@nehhdc.com.`;
        } else if (cautionary.reason === 'Tender Deadline Inquiry') {
          fallbackMessage = `Tender schedules, closing dates, and opening dates are dynamic and published with periodic corrigendums. Please check the official tenders portal at https://www.nehhdc.com/tenders/ for the verified active tender documents and deadlines.`;
        }
      }

      res.json({
        answer: fallbackMessage,
        sources: retrieval.sources,
        isCautionary: retrieval.isCautionary
      });
      return;
    }
  } catch (error: any) {
    console.error('Server error handling /api/chat:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unable to process your request at this time. Please visit https://www.nehhdc.com/ or try again shortly.'
    });
  }
});

// Serve frontend in dev (Vite middleware) or production (static build)
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Ask NEHHDC] Server is active on http://0.0.0.0:${PORT}`);
    console.log(`[Ask NEHHDC] Gemini Model: ${MODEL_NAME}`);
    console.log(`[Ask NEHHDC] API Key Present: ${isRealApiKey}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
