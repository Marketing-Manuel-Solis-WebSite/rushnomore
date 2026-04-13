'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Bot, User, Phone, ExternalLink } from 'lucide-react';
import { SITE } from '@/data/site';
import DOMPurify from 'dompurify';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'What kind of RV sites do you have?',
  'What are the cabin prices?',
  'How far is Mount Rushmore?',
  'Do you allow pets?',
  'Sturgis Rally rates?',
];

function formatMessage(text: string): string {
  // Convert **bold** to <strong>
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Convert *italic* to <em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // Convert bullet lines (- item) to styled list items
  formatted = formatted.replace(/^[-•]\s+(.+)$/gm, '<div class="flex items-start gap-2 my-1"><span class="text-brand-gold mt-0.5 flex-shrink-0">•</span><span>$1</span></div>');
  // Convert numbered lines (1. item) to styled items
  formatted = formatted.replace(/^(\d+)\.\s+(.+)$/gm, '<div class="flex items-start gap-2 my-1"><span class="text-brand-gold font-bold mt-0 flex-shrink-0">$1.</span><span>$2</span></div>');
  // Convert URLs to clickable links
  formatted = formatted.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-brand-gold underline hover:text-brand-gold-dark break-all">$1</a>'
  );
  // Convert line breaks to <br>
  formatted = formatted.replace(/\n/g, '<br/>');

  // Sanitize HTML to prevent XSS from API responses
  if (typeof window !== 'undefined') {
    formatted = DOMPurify.sanitize(formatted, {
      ALLOWED_TAGS: ['strong', 'em', 'a', 'br', 'div', 'span', 'p'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    });
  }

  return formatted;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Hide pulse after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async (text?: string) => {
    const messageText = (text || input).trim();
    if (!messageText || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-6),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Sorry, I had trouble responding. Please call us at 605-423-2545 for immediate help!',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Connection error. Please try again or call us at 605-423-2545.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ─── FAB Button ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => {
              setIsOpen(true);
              setShowPulse(false);
            }}
            className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[60] w-14 h-14 bg-brand-gold text-white rounded-full shadow-gold-lg flex items-center justify-center hover:brightness-110 hover:scale-105 transition-all duration-300 group"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            aria-label="Open chat assistant"
          >
            <MessageSquare className="w-6 h-6" />
            {showPulse && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[60] w-full sm:w-[400px] h-[100dvh] sm:h-[560px] sm:max-h-[80vh] flex flex-col bg-white sm:rounded-2xl shadow-lodge-xl overflow-hidden border border-surface-muted/50"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Header ── */}
            <div className="bg-brand-navy text-white px-4 py-3 flex items-center justify-between flex-shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer opacity-30" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-9 h-9 bg-brand-gold rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight font-display">Rush No More</h4>
                  <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">AI Assistant • Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  title="Call us"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-surface-primary">
              {/* Welcome message */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 bg-brand-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-surface-muted/50 max-w-[85%]">
                      <p className="text-sm text-brand-navy leading-relaxed">
                        👋 <strong>Welcome to Rush No More!</strong>
                        <br /><br />
                        I can help you with reservations, pricing, amenities, directions, the Sturgis Rally, and anything about the Black Hills.
                        <br /><br />
                        How can I help you today?
                      </p>
                    </div>
                  </div>

                  {/* Quick questions */}
                  <div className="pl-9">
                    <p className="text-[10px] text-brand-stone uppercase tracking-wider font-bold mb-2">Quick Questions</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_QUESTIONS.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(q)}
                          disabled={isLoading}
                          className="text-xs px-3 py-1.5 bg-white border border-brand-gold/20 text-brand-navy rounded-full hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Chat messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {msg.role === 'assistant' ? (
                    <div className="w-7 h-7 bg-brand-gold/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-brand-gold" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 bg-brand-navy rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                      msg.role === 'user'
                        ? 'bg-brand-navy text-white rounded-tr-md'
                        : 'bg-white border border-surface-muted/50 shadow-sm rounded-tl-md'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div
                        className="text-sm text-brand-navy leading-relaxed [&_strong]:font-bold [&_strong]:text-brand-navy [&_em]:italic [&_a]:text-brand-gold [&_a]:underline"
                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                      />
                    ) : (
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 bg-brand-gold/15 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-surface-muted/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-brand-gold/40 rounded-full animate-bounce [animation-delay:0ms]" />
                      <div className="w-2 h-2 bg-brand-gold/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      <div className="w-2 h-2 bg-brand-gold/40 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input Area ── */}
            <div className="flex-shrink-0 bg-white border-t border-surface-muted px-3 py-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about Rush No More..."
                  className="flex-1 px-4 py-2.5 bg-surface-secondary rounded-xl border border-surface-muted text-sm text-brand-navy placeholder:text-brand-stone/60 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all"
                  disabled={isLoading}
                  aria-label="Chat message"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-brand-gold text-white rounded-xl flex items-center justify-center hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all flex-shrink-0"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="flex items-center justify-between mt-2 px-1">
                <p className="text-[9px] text-brand-stone/60">
                  Powered by Nora AI • For reservations{' '}
                  <a href={SITE.booking} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
                    book online
                  </a>
                </p>
                <a href={`tel:${SITE.phoneTel}`} className="text-[9px] text-brand-gold font-bold hover:underline">
                  📞 {SITE.phone}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}