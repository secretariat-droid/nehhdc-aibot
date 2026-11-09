import { useState, useRef } from 'react';
import { PortalBackdrop } from './components/PortalBackdrop';
import { ChatWidget } from './components/ChatWidget';
import { EmbedGuideModal } from './components/EmbedGuideModal';

export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const chatWidgetRef = useRef<any>(null);

  const handleAskQuestionFromBackdrop = (question: string) => {
    // Dispatch custom event to trigger input submission in ChatWidget
    const inputElement = document.querySelector('input[placeholder*="Ask about NEHHDC"]') as HTMLInputElement;
    if (inputElement) {
      // Set input value
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputElement, question);
      } else {
        inputElement.value = question;
      }
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));

      // Simulate enter or click send
      setTimeout(() => {
        const sendBtn = document.querySelector('button[aria-label="Send message"]') as HTMLButtonElement;
        if (sendBtn) {
          sendBtn.click();
        }
      }, 50);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-100">
      {/* 1. Official NEHHDC Website Backdrop */}
      <PortalBackdrop 
        onOpenEmbedGuide={() => setIsGuideOpen(true)}
        onAskQuestion={handleAskQuestionFromBackdrop}
      />

      {/* 2. Official Floating 'Ask NEHHDC' Chatbot Widget */}
      <ChatWidget 
        onOpenEmbedGuide={() => setIsGuideOpen(true)}
      />

      {/* 3. Website Integration Guide Modal */}
      <EmbedGuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </div>
  );
}
