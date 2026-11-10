# Ask NEHHDC: Virtual Information Assistant

Official AI-powered virtual information assistant for the **North Eastern Handicrafts and Handlooms Development Corporation Ltd. (NEHHDC)**, a Government of India Enterprise under the **Ministry of Development of North Eastern Region (MDoNER)**.

Website: [https://www.nehhdc.com/](https://www.nehhdc.com/)  
E-Commerce: [https://www.purbashree.com/](https://www.purbashree.com/)  
Tenders: [https://www.nehhdc.com/tenders/](https://www.nehhdc.com/tenders/)  
Contact: [https://www.nehhdc.com/contact-us](https://www.nehhdc.com/contact-us)

---

## 1. Overview & Architecture

Ask NEHHDC is a lightweight, reliable, and secure full-stack web assistant built specifically for visitors, artisans, weavers, institutional buyers, and vendors.

- **Frontend**: React 19 + TypeScript + Tailwind CSS with a responsive floating widget interface.
- **Backend**: Node.js + Express with rate limiting and strict server-side validation.
- **AI Model**: Google Gemini API via official `@google/genai` TypeScript SDK using `gemini-3.8-flash` (configurable via `GEMINI_MODEL`).
- **Knowledge Retrieval**: Lightweight, deterministic semantic keyword ranking that retrieves only the top matching knowledge entries per query to keep latency ultra-low and eliminate token waste.
- **Zero Third-Party Database or Paid Platform**: Runs entirely in the Node.js / Google AI Studio environment without requiring Firebase, Supabase, Redis, or external subscription platforms.

---

## 2. Security & Cost Controls

1. **Server-Side API Key Storage**:
   - The `GEMINI_API_KEY` is loaded strictly via `process.env.GEMINI_API_KEY` on the Node.js server.
   - It is **never** bundled into client-side JavaScript, HTML, network headers, or local storage.
2. **Free-Tier Compatibility**:
   - Uses `gemini-3.8-flash` with low thinking level, which supports the standard Google AI Studio free tier.
   - Operating cost is virtually zero for pilot usage.
3. **Abuse Prevention**:
   - Maximum query limit: 500 characters per request.
   - In-memory sliding window rate limiter: 25 requests per minute per IP.
   - No sensitive information collection: strictly disallows collection of passwords, Aadhaar numbers, OTPs, or financial data.
4. **Safety & Official Boundaries**:
   - Refuses to guarantee jobs, appointments, financial approvals, or tenders.
   - Refuses to guess active tender deadlines or recruitment dates, strictly citing live official portals.

---

## 3. How to Test the Application

You can test the application in Google AI Studio preview or locally.

### Key Verification Questions to Test:
1. **"What is NEHHDC?"**  
   *Expected*: Explains the full name (North Eastern Handicrafts and Handlooms Development Corporation Ltd.), establishment in 1977, CPSE under Ministry of DoNER, and mandate covering the 8 North Eastern states.
2. **"When was NEHHDC established?"**  
   *Expected*: Confirms establishment in 1977 under the Companies Act 1956.
3. **"What services does NEHHDC offer to artisans?"**  
   *Expected*: Mentions capacity building, Pehchan card empanelment, PMKVY / SAMARTH / PM-VIKAS training, raw material depots, and market access via Purbashree emporiums and exhibitions.
4. **"Does NEHHDC provide institutional sales services?"**  
   *Expected*: Outlines custom corporate and VIP gifting (muga/eri silk shawls, mementos, cane-bamboo kits), GeM portal procurement, and office furnishings for government departments.
5. **"Where can I find NEHHDC tenders?"**  
   *Expected*: Directs user to the official portal `https://www.nehhdc.com/tenders/` and `etenders.gov.in`.
6. **"How can I contact NEHHDC?"**  
   *Expected*: Provides Guwahati Corporate Office (+91 361 2270000 / hradmin@nehhdc.com) and Shillong Registered Office (+91 364 2224477 / secretariat@nehhdc.com).
7. **"Can NEHHDC guarantee me a job?"**  
   *Expected*: Cautious response explicitly stating that NEHHDC does not guarantee employment; recruitment is merit-based through official vacancy advertisements on `nehhdc.com`.
8. **"What is the latest tender deadline?"**  
   *Expected*: Cautious response explaining that tender deadlines change dynamically via corrigendums, directing the user to download the latest tender notice from `https://www.nehhdc.com/tenders/`.

---

## 4. How to Update the Knowledge Base

The approved public knowledge base is stored in a single, clean file:
`src/data/knowledgeBase.ts`

To add or update an entry:
1. Open `src/data/knowledgeBase.ts`.
2. Locate the relevant category (`about`, `artisan_services`, `business_services`, `marketing_retail`, `public_information`, or `digital_platforms`).
3. Add or edit an entry following this format:

```typescript
{
  id: 'unique-id',
  category: 'artisan_services',
  title: 'Title of the Service or Notice',
  summary: 'Brief 1-2 sentence summary.',
  content: `Detailed factual content verified from official sources...`,
  keywords: ['keyword1', 'keyword2', 'search phrase'],
  sourceUrl: 'https://www.nehhdc.com/relevant-page',
  verifiedDate: '2026-11'
}
```

4. Run unit tests to verify:
```bash
npx --yes tsx --test src/utils/retrieval.test.ts
```

---

## 5. Website Integration (Dedicated /embed Route for www.nehhdc.com)

NEHHDC's technical team can embed the chatbot into the official website (`https://www.nehhdc.com`) using the dedicated chat-only `/embed` route:

**Dedicated Embed URL**: `https://nehhdc-aibot.onrender.com/embed`

When loaded via `/embed`, the page displays **ONLY** the Ask NEHHDC chat interface (header, conversation bubbles, suggested questions chips, message input bar, and disclaimer) with 100% responsive width and height. All testing dashboards, sample backdrops, and floating launcher buttons are excluded.

### Content Security Policy (CSP) & Iframe Permission:
The server automatically sets:
```http
Content-Security-Policy: frame-ancestors 'self' https://www.nehhdc.com https://nehhdc.com http://localhost:* https://*.onrender.com;
```
This permits seamless iframe embedding on `https://www.nehhdc.com` while maintaining security.

### Method A: Floating Widget on Every Page of nehhdc.com (Recommended)
Paste this snippet before the closing `</body>` tag on `www.nehhdc.com`:

```html
<!-- Ask NEHHDC Floating Widget Embed -->
<script>
  (function () {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://nehhdc-aibot.onrender.com/embed';
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '420px';
    iframe.style.height = '620px';
    iframe.style.maxWidth = 'calc(100vw - 32px)';
    iframe.style.maxHeight = 'calc(100vh - 40px)';
    iframe.style.border = 'none';
    iframe.style.zIndex = '999999';
    iframe.style.borderRadius = '16px';
    iframe.style.boxShadow = '0 12px 36px rgba(0,0,0,0.2)';
    iframe.allow = 'clipboard-write';
    iframe.title = 'Ask NEHHDC Virtual Information Assistant';
    document.body.appendChild(iframe);
  })();
</script>
```

### Method B: Dedicated Assistant Page (e.g., `nehhdc.com/ask-nehhdc`)
```html
<iframe 
  src="https://nehhdc-aibot.onrender.com/embed" 
  title="Ask NEHHDC Virtual Assistant"
  style="width: 100%; height: 680px; border: none; border-radius: 12px;"
  allow="clipboard-write">
</iframe>
```

---

## 6. External Services & Zero-Cost Analysis

- **Google Gemini API**: Uses `gemini-3.8-flash`. Free tier quota allows ample requests per minute for public pilot usage without charges.
- **Hosting**: Deployed directly via Google AI Studio / Cloud Run container environment.
- **No Paid Databases**: No Cloud SQL, PostgreSQL, Firebase, or DynamoDB bills.
- **Safe Publishing**: To prevent unexpected billing, keep the project on Google AI Studio standard tier with free-tier Gemini Flash models.
