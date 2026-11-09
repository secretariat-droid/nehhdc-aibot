import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  RotateCcw, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  Bot
} from 'lucide-react';
import { ChatMessage, MessageSource } from '../types';
import { SUGGESTED_QUESTIONS } from '../data/knowledgeBase';

const INITIAL_GREETING = `Namaste! Welcome to NEHHDC.

I am Ask NEHHDC, your virtual information assistant. I can help you find information about our organisation, services, artisan and weaver initiatives, training programmes, tenders, institutional services and more.

How may I assist you today?`;

interface ChatWidgetProps {
  onOpenEmbedGuide?: () => void;
  isEmbedded?: boolean; // When rendered full-width or inside container
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  onOpenEmbedGuide,
  isEmbedded = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial-greeting',
      sender: 'assistant',
      text: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawText = textToSend || inputMessage;
    const text = rawText.trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setErrorMessage('Your question exceeds the 500-character limit. Please shorten your query.');
      return;
    }

    setErrorMessage(null);
    setInputMessage('');

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Server error occurred.');
      }

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Thank you for your inquiry. Please refer to the official website at https://www.nehhdc.com/ for further details.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || [],
        isCautionary: data.isCautionary
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Error fetching chat response:', err);
      const errorChatMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'I am currently unable to fetch an immediate response from the server. Please visit the official NEHHDC website at https://www.nehhdc.com/ or contact our offices at +91 361 2270000 / hradmin@nehhdc.com.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true,
        sources: [
          { title: 'Official NEHHDC Portal', url: 'https://www.nehhdc.com/' },
          { title: 'Contact Us', url: 'https://www.nehhdc.com/contact-us' }
        ]
      };
      setMessages(prev => [...prev, errorChatMsg]);
      setErrorMessage(err.message || 'Connection error. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'assistant',
        text: INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setShowClearConfirm(false);
    setErrorMessage(null);
  };

  // If floating mode and closed, render floating button
  if (!isEmbedded && !isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <div className="mb-2 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-700 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Ask NEHHDC Official Assistant</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-blue-950 via-slate-900 to-teal-900 text-white rounded-full shadow-2xl hover:shadow-teal-900/40 hover:scale-105 transition-all duration-200 border-2 border-teal-500/40 focus:outline-hidden focus:ring-4 focus:ring-teal-500/30"
          aria-label="Open Ask NEHHDC chat assistant"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-teal-600/30 border border-teal-400/50 flex items-center justify-center font-bold text-sm text-teal-300">
              <Bot className="w-5 h-5 text-teal-300" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950"></span>
          </div>
          <div className="text-left">
            <div className="text-xs font-bold tracking-wide uppercase text-teal-300">Ask NEHHDC</div>
            <div className="text-[11px] text-slate-300">Virtual Information Assistant</div>
          </div>
        </button>
      </div>
    );
  }

  const containerClasses = isEmbedded
    ? "w-full h-full flex flex-col bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
    : `fixed bottom-4 right-4 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden transition-all duration-200 ${
        isExpanded
          ? "w-[92vw] sm:w-[680px] h-[88vh] max-w-4xl"
          : "w-[92vw] sm:w-[410px] h-[640px] max-h-[92vh]"
      }`;

  return (
    <div className={containerClasses}>
      {/* 1. Official Header */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-teal-950 text-white px-4 py-3 border-b border-teal-800/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          {/* NEHHDC Official Crest / Emblem Icon */}
          <div className="w-9 h-9 rounded-lg bg-teal-900/60 border border-teal-500/40 flex items-center justify-center text-teal-200 font-bold shrink-0 shadow-inner">
            <span className="text-xs font-serif tracking-wider font-extrabold text-amber-300">NE</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-sm tracking-wide text-white">Ask NEHHDC</h1>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-medium bg-teal-800/60 text-teal-200 border border-teal-600/50">
                Official AI
              </span>
            </div>
            <p className="text-[11px] text-slate-300 truncate max-w-[210px] sm:max-w-xs">
              Virtual Information Assistant • MDoNER
            </p>
          </div>
        </div>

        {/* Header Controls */}
        <div className="flex items-center gap-1 text-slate-300">
          {onOpenEmbedGuide && (
            <button
              onClick={onOpenEmbedGuide}
              className="p-1.5 hover:text-teal-300 hover:bg-white/10 rounded-md transition text-xs flex items-center gap-1"
              title="View Integration & Embed Guide"
              aria-label="Integration guide"
            >
              <Info className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-1.5 hover:text-amber-300 hover:bg-white/10 rounded-md transition"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {!isEmbedded && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 hover:text-teal-300 hover:bg-white/10 rounded-md transition hidden sm:inline-flex"
              title={isExpanded ? "Collapse window" : "Expand window"}
              aria-label="Toggle size"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          )}

          {!isEmbedded && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:text-rose-300 hover:bg-white/10 rounded-md transition"
              title="Close assistant"
              aria-label="Close assistant window"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Clear conversation confirmation banner */}
      {showClearConfirm && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between text-xs text-amber-900 shrink-0">
          <span>Clear the current session conversation?</span>
          <div className="flex gap-2">
            <button
              onClick={handleClearConversation}
              className="px-2 py-0.5 bg-amber-700 text-white rounded font-medium hover:bg-amber-800 transition"
            >
              Yes, Clear
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded hover:bg-slate-300 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 2. Message History Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 text-sm"
        role="log"
        aria-label="Chat messages"
      >
        {/* Verification seal notice banner */}
        <div className="bg-white/90 border border-slate-200/80 rounded-xl p-2.5 text-[11px] text-slate-600 flex items-center gap-2 shadow-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
          <span>
            Connected to <strong>NEHHDC Official Knowledge Engine</strong>. Answers are grounded in public records from <a href="https://www.nehhdc.com/" target="_blank" rel="noopener noreferrer" className="text-teal-700 font-medium underline">nehhdc.com</a>.
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[88%]">
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-950 to-teal-900 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mb-1 border border-teal-500/30 shadow-xs">
                  NE
                </div>
              )}

              <div
                className={`rounded-2xl px-4 py-3 leading-relaxed whitespace-pre-wrap break-words text-sm shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-950 text-white rounded-br-xs'
                    : msg.isError
                    ? 'bg-rose-50 text-rose-950 border border-rose-200 rounded-bl-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                }`}
              >
                {msg.text}

                {/* Cautionary boundary badge if applicable */}
                {msg.isCautionary && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-start gap-1.5 text-xs text-amber-800 bg-amber-50/80 p-2 rounded-lg">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-tight">
                      Official Caution: Deadlines and recruitment procedures require verification from active circulars on <a href="https://www.nehhdc.com/" target="_blank" rel="noopener noreferrer" className="underline font-semibold">nehhdc.com</a>.
                    </span>
                  </div>
                )}

                {/* Clickable Source Links beneath answers */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      Verified Official Sources:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] bg-slate-100 hover:bg-teal-50 hover:text-teal-900 hover:border-teal-300 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 transition"
                        >
                          <span className="truncate max-w-[200px]">{src.title}</span>
                          <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center text-[10px] font-bold shrink-0 mb-1">
              NE
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse [animation-delay:200ms]"></span>
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse [animation-delay:400ms]"></span>
                <span className="text-xs text-slate-500 ml-2">Consulting NEHHDC records...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Clickable Suggested Questions Chips */}
      <div className="bg-white border-t border-slate-200 px-3 py-2 shrink-0">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span>Suggested Questions:</span>
          <span className="text-[10px] text-teal-700 font-normal">Click to ask instantly</span>
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {SUGGESTED_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="text-left text-xs bg-slate-100 hover:bg-teal-50 hover:border-teal-400 hover:text-teal-950 text-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-200 whitespace-nowrap shrink-0 transition disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Input Area */}
      <div className="bg-white border-t border-slate-200 p-3 shrink-0">
        {errorMessage && (
          <div className="mb-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded">
            {errorMessage}
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question about NEHHDC..."
            maxLength={500}
            disabled={isLoading}
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition disabled:bg-slate-100"
            aria-label="Ask a question about NEHHDC"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="w-10 h-10 rounded-xl bg-blue-950 hover:bg-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm transition disabled:opacity-40 disabled:hover:bg-blue-950"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Character count & Official Disclaimer */}
        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
          <span className="truncate pr-2">
            AI-generated for general info. Verify key details via official channels.
          </span>
          <span className="shrink-0 text-slate-400 font-mono">
            {inputMessage.length}/500
          </span>
        </div>
      </div>
    </div>
  );
};
