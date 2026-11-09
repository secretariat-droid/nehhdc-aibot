import { NEHHDC_KNOWLEDGE_BASE, KnowledgeEntry } from '../data/knowledgeBase.ts';

export interface RetrievalResult {
  entries: KnowledgeEntry[];
  sources: Array<{ title: string; url: string }>;
  isCautionary: boolean;
  cautionaryReason?: string;
  hasDirectFallback: boolean;
}

const STOP_WORDS = new Set([
  'a', 'about', 'an', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'how', 
  'i', 'in', 'is', 'it', 'of', 'on', 'or', 'that', 'the', 'this', 'to', 
  'was', 'what', 'when', 'where', 'which', 'who', 'will', 'with', 'does', 
  'can', 'do', 'and', 'my', 'me', 'please', 'tell'
]);

/**
 * Tokenize a text string into normalized, lowercase search tokens
 */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1 && !STOP_WORDS.has(token));
}

/**
 * Checks if the user's query triggers a cautionary boundary
 * (e.g. job guarantees, guessing tender deadlines, or sensitive data requests)
 */
export function checkCautionaryQuery(query: string): {
  isCautionary: boolean;
  reason?: string;
  mandatoryInstruction?: string;
} {
  const lower = query.toLowerCase();

  // 1. Job guarantee / Employment promise
  if (
    lower.includes('guarantee') && (lower.includes('job') || lower.includes('employment') || lower.includes('work') || lower.includes('recruitment')) ||
    lower.includes('give me a job') ||
    lower.includes('promise me a job') ||
    lower.includes('job assurance') ||
    lower.includes('hire me directly')
  ) {
    return {
      isCautionary: true,
      reason: 'Job Guarantee Inquiry',
      mandatoryInstruction: 'CRITICAL: NEHHDC does NOT guarantee jobs or employment. Clearly state that employment is strictly based on advertised vacancies, minimum qualifications, and official competitive selection processes. Direct the user to check official vacancy announcements on https://www.nehhdc.com/ or contact hradmin@nehhdc.com.'
    };
  }

  // 2. Specific tender deadline / live bid opening dates
  if (
    (lower.includes('latest tender deadline') || 
     lower.includes('tender deadline') || 
     lower.includes('tender submission date') || 
     lower.includes('bid opening date') ||
     lower.includes('when does the tender close') ||
     (lower.includes('tender') && lower.includes('deadline')) ||
     (lower.includes('tender') && lower.includes('last date')))
  ) {
    return {
      isCautionary: true,
      reason: 'Tender Deadline Inquiry',
      mandatoryInstruction: 'CRITICAL: Do NOT guess or state any specific tender deadline or bid opening date. Tender schedules are subject to dynamic corrigendums and addendums. Instruct the user to verify exact current dates by downloading the latest official Tender Document and Corrigendum from https://www.nehhdc.com/tenders/ or etenders.gov.in.'
    };
  }

  // 3. Sensitive information phishing check
  if (
    lower.includes('password') || 
    lower.includes('otp') || 
    lower.includes('aadhaar') || 
    lower.includes('bank account') || 
    lower.includes('credit card') || 
    lower.includes('cvv')
  ) {
    return {
      isCautionary: true,
      reason: 'Sensitive Data Security Warning',
      mandatoryInstruction: 'CRITICAL: Remind the user that NEHHDC will never ask for passwords, OTPs, Aadhaar numbers, or bank credentials. Do not solicit or accept sensitive information.'
    };
  }

  return { isCautionary: false };
}

/**
 * Performs lightweight relevance-scoring to extract the top matching entries
 * from the knowledge base without needing heavy vector databases or external services.
 */
export function findRelevantKnowledge(
  query: string, 
  maxResults = 3,
  knowledgeBase: KnowledgeEntry[] = NEHHDC_KNOWLEDGE_BASE
): RetrievalResult {
  const queryLower = query.toLowerCase();
  const queryTokens = tokenize(query);
  const cautionary = checkCautionaryQuery(query);

  const scoredEntries = knowledgeBase.map(entry => {
    let score = 0;

    // Check phrase inclusion
    const titleLower = entry.title.toLowerCase();
    const summaryLower = entry.summary.toLowerCase();
    const contentLower = entry.content.toLowerCase();

    // 1. Direct phrase or high-priority keyword match
    for (const kw of entry.keywords) {
      const kwLower = kw.toLowerCase();
      if (queryLower.includes(kwLower)) {
        score += 8;
      } else {
        const kwTokens = kwLower.split(/\s+/);
        for (const token of queryTokens) {
          if (kwTokens.includes(token)) {
            score += 4;
          }
        }
      }
    }

    // 2. Query tokens in title
    for (const token of queryTokens) {
      if (titleLower.includes(token)) score += 5;
      if (summaryLower.includes(token)) score += 3;
      if (contentLower.includes(token)) score += 1;
    }

    // Special category boost
    if ((queryLower.includes('tender') || queryLower.includes('procurement') || queryLower.includes('eoi')) && entry.id === 'tenders-procurement') {
      score += 15;
    }
    if ((queryLower.includes('job') || queryLower.includes('recruit') || queryLower.includes('career') || queryLower.includes('vacancy')) && entry.id === 'recruitment-careers') {
      score += 15;
    }
    if ((queryLower.includes('contact') || queryLower.includes('phone') || queryLower.includes('email') || queryLower.includes('address') || queryLower.includes('office')) && entry.id === 'contact-offices') {
      score += 15;
    }
    if ((queryLower.includes('artisan') || queryLower.includes('weaver') || queryLower.includes('connect')) && (entry.id === 'artisan-initiatives' || entry.id === 'training-programmes')) {
      score += 10;
    }
    if ((queryLower.includes('testing') || queryLower.includes('lab') || queryLower.includes('fabric test') || queryLower.includes('gsm')) && entry.id === 'textile-testing-lab') {
      score += 15;
    }
    if ((queryLower.includes('yarn') || queryLower.includes('eri silk') || queryLower.includes('spinning mill')) && entry.id === 'yarn-supplies-mill') {
      score += 12;
    }
    if ((queryLower.includes('buy') || queryLower.includes('purchase') || queryLower.includes('shop') || queryLower.includes('store') || queryLower.includes('purbashree')) && (entry.id === 'purbashree-brand' || entry.id === 'purbashree-ecommerce')) {
      score += 12;
    }
    if ((queryLower.includes('institutional') || queryLower.includes('b2b') || queryLower.includes('corporate gift') || queryLower.includes('bulk')) && entry.id === 'institutional-sales') {
      score += 15;
    }

    return { entry, score };
  });

  // Sort descending by relevance score
  scoredEntries.sort((a, b) => b.score - a.score);

  // Filter those with meaningful score
  const selected = scoredEntries
    .filter(item => item.score > 2)
    .slice(0, maxResults)
    .map(item => item.entry);

  // Always provide at least the "about-organization" or "contact-offices" if general query
  const fallbackEntries = selected.length > 0 
    ? selected 
    : [
        knowledgeBase.find(e => e.id === 'about-organization') || knowledgeBase[0],
        knowledgeBase.find(e => e.id === 'contact-offices') || knowledgeBase[1]
      ];

  // Extract unique sources with title and URL
  const seenUrls = new Set<string>();
  const sources: Array<{ title: string; url: string }> = [];

  for (const entry of (selected.length > 0 ? selected : fallbackEntries)) {
    if (!seenUrls.has(entry.sourceUrl)) {
      seenUrls.add(entry.sourceUrl);
      sources.push({
        title: entry.title,
        url: entry.sourceUrl
      });
    }
  }

  return {
    entries: selected.length > 0 ? selected : fallbackEntries,
    sources,
    isCautionary: cautionary.isCautionary,
    cautionaryReason: cautionary.reason,
    hasDirectFallback: selected.length === 0
  };
}

/**
 * Builds the compact context prompt block for Gemini from retrieved entries
 */
export function buildContextFromEntries(entries: KnowledgeEntry[], cautionaryInstruction?: string): string {
  const sections = entries.map((entry, index) => {
    return `--- DOCUMENT ${index + 1}: ${entry.title} ---
Category: ${entry.category}
Source URL: ${entry.sourceUrl}
Summary: ${entry.summary}
Details:
${entry.content}`;
  }).join('\n\n');

  let context = `VERIFIED NEHHDC KNOWLEDGE BASE INFORMATION:\n\n${sections}`;

  if (cautionaryInstruction) {
    context += `\n\nSPECIAL CAUTIONARY DIRECTIVE FOR THIS QUESTION:\n${cautionaryInstruction}`;
  }

  return context;
}
