import { useState, useEffect } from 'react';
import { PortalBackdrop } from './components/PortalBackdrop';
import { ChatWidget } from './components/ChatWidget';
import { EmbedGuideModal } from './components/EmbedGuideModal';

export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isEmbedMode, setIsEmbedMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.replace(/\/+$/, '');
    const searchParams = new URLSearchParams(window.location.search);
    return path === '/embed' || searchParams.has('embed') || window.location.hash === '#/embed';
  });

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.replace(/\/+$/, '');
      const searchParams = new URLSearchParams(window.location.search);
      setIsEmbedMode(path === '/embed' || searchParams.has('embed') || window.location.hash === '#/embed');
    };

    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const handleAskQuestionFromBackdrop = (question: string) => {
    // Dispatch custom event to trigger input submission in ChatWidget
    const inputElement = document.querySelector('input[placeholder*="Ask about NEHHDC"]') as HTMLInputElement;
    if (inputElement) {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputElement, question);
      } else {
        inputElement.value = question;
      }
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));

      setTimeout(() => {
        const sendBtn = document.querySelector('button[aria-label="Send message"]') as HTMLButtonElement;
        if (sendBtn) {
          sendBtn.click();
        }
      }, 50);
    }
  };

  // 1. Dedicated Embed Route (/embed)
  // Renders strictly the Ask NEHHDC chat interface filling 100% width and height without any demonstration backdrop, test dashboard, or floating launcher.
  if (isEmbedMode) {
    return (
      <main className="w-full h-screen h-dvh overflow-hidden bg-white m-0 p-0">
        <ChatWidget isEmbedded={true} />
      </main>
    );
  }

  // 2. Demonstration & Evaluation Mode (Root /)
  // Preserves the full official portal demonstration, 8-question test suite, floating launcher, and embed guide modal.
  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* Official NEHHDC Website Backdrop */}
      <PortalBackdrop 
        onOpenEmbedGuide={() => setIsGuideOpen(true)}
        onAskQuestion={handleAskQuestionFromBackdrop}
      />

      {/* Official Floating 'Ask NEHHDC' Chatbot Widget */}
      <ChatWidget 
        onOpenEmbedGuide={() => setIsGuideOpen(true)}
      />

      {/* Website Integration Guide Modal */}
      <EmbedGuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </div>
  );
}
