import React, { useState } from 'react';
import { X, Copy, Check, Code2, Globe, ShieldCheck, Cpu } from 'lucide-react';

interface EmbedGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmbedGuideModal: React.FC<EmbedGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedIframe, setCopiedIframe] = useState(false);

  if (!isOpen) return null;

  const scriptSnippet = `<!-- Add Ask NEHHDC Floating Widget to www.nehhdc.com -->
<script>
  (function () {
    var iframe = document.createElement('iframe');
    // Dedicated chat-only embed URL
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
</script>`;

  const iframeSnippet = `<iframe 
  src="https://nehhdc-aibot.onrender.com/embed" 
  title="Ask NEHHDC Virtual Assistant"
  style="width: 100%; height: 640px; border: none; border-radius: 12px;"
  allow="clipboard-write">
</iframe>`;

  const copyToClipboard = (text: string, type: 'script' | 'iframe') => {
    navigator.clipboard.writeText(text);
    if (type === 'script') {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    } else {
      setCopiedIframe(true);
      setTimeout(() => setCopiedIframe(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="sticky top-0 bg-slate-900 text-white p-4 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-white">Website Integration Guide</h2>
              <p className="text-xs text-slate-300">Embedding 'Ask NEHHDC' into www.nehhdc.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close integration guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-900 space-y-1">
              <p className="font-semibold">Zero Client-Side API Key Exposure</p>
              <p>
                The Gemini AI API key resides strictly in the secure Node.js backend. Embedding this widget onto the official NEHHDC website will never leak API keys, credentials, or internal servers to visitors' browsers.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-navy-700" />
              Method 1: Direct Embed Script (Recommended)
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Add the following snippet just before the closing <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">&lt;/body&gt;</code> tag on any page of <span className="font-medium text-slate-900">nehhdc.com</span>:
            </p>
            <div className="relative">
              <pre className="bg-slate-950 text-slate-200 text-xs p-4 rounded-lg overflow-x-auto font-mono">
                {scriptSnippet}
              </pre>
              <button
                onClick={() => copyToClipboard(scriptSnippet, 'script')}
                className="absolute top-3 right-3 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs flex items-center gap-1.5 transition"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-navy-700" />
              Method 2: Standard Iframe Embed
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              If using a CMS like WordPress, Drupal, or static HTML templates:
            </p>
            <div className="relative">
              <pre className="bg-slate-950 text-slate-200 text-xs p-4 rounded-lg overflow-x-auto font-mono">
                {iframeSnippet}
              </pre>
              <button
                onClick={() => copyToClipboard(iframeSnippet, 'iframe')}
                className="absolute top-3 right-3 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs flex items-center gap-1.5 transition"
              >
                {copiedIframe ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIframe ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Technical Verification Checklist for NEHHDC Webmasters
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-600 list-disc list-inside">
              <li>Works on any modern browser (Chrome, Edge, Safari, Firefox, Android Chrome, iOS Safari).</li>
              <li>Fully responsive on mobile screens (adapts to viewport width with touch scrolling).</li>
              <li>Contains built-in rate-limiting (25 requests/min per client) to prevent server overload.</li>
              <li>Free-tier compatible with Google Gemini Flash model (<code className="text-slate-800 font-mono">gemini-3.8-flash</code>).</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
