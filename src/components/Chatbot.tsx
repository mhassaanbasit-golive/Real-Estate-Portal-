import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VoiceCallModal from './VoiceCallModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Greetings. I am the Aurora Elite Advisory Concierge. How may I assist you with your real estate acquisitions, property evaluations, or local neighborhood metrics today?'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessageContent = inputValue.trim();
    const newMessages = [...messages, { role: 'user', content: userMessageContent } as Message];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Our concierge desk is currently occupied. Please try again shortly.');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered a temporary connection issue. Please verify your internet connection or try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = async (text: string) => {
    if (isLoading) return;

    const newMessages = [...messages, { role: 'user', content: text } as Message];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Our concierge desk is currently occupied. Please try again shortly.');
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.message }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I encountered a temporary connection issue. Please verify your internet connection or try again later.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="aurora-elite-chatbot" className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end gap-3">
      <AnimatePresence>
        {!isOpen && (
          <div className="flex flex-col gap-3 items-end">
            <motion.button
              key="call-trigger"
              id="call-trigger-button"
              onClick={() => setIsVoiceCallOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-stone-900 dark:bg-[#080808] border border-amber-500/30 hover:border-amber-500/60 shadow-xl cursor-pointer text-amber-500 hover:text-amber-400 transition-colors"
              title="Secure Advisor Call"
            >
              <Phone className="w-5 h-5 animate-pulse" />
            </motion.button>
            <motion.button
              key="chat-trigger"
              id="chat-trigger-button"
              onClick={() => setIsOpen(true)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-stone-900 dark:bg-stone-950 border border-amber-500/30 hover:border-amber-500/60 shadow-xl cursor-pointer text-amber-500 hover:text-amber-400 transition-colors"
              title="Aurora Elite Concierge"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.button>
          </div>
        )}

        {isOpen && (
          <motion.div
            key="chat-window"
            id="chat-window-container"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-[340px] sm:w-[420px] h-[500px] max-h-[80vh] max-w-[calc(100vw-2rem)] flex flex-col bg-[#050505] border border-stone-800/80 rounded-2xl shadow-2xl overflow-hidden glass-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-900/60 bg-[#080808]/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-widest text-white uppercase">
                    Aurora Advisory
                  </h3>
                  <p className="text-[9px] font-mono tracking-wider text-amber-500/80 uppercase">
                    Elite Concierge
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsVoiceCallOpen(true)}
                  className="p-1.5 rounded-lg text-amber-500 hover:text-amber-400 hover:bg-stone-900/50 transition-all cursor-pointer"
                  title="Direct Advisor Line"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-900/50 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="flex flex-col space-y-2"
                >
                  <div
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-amber-600/90 text-white rounded-br-none font-medium'
                          : 'bg-[#101010] border border-stone-900/80 text-stone-200 rounded-bl-none font-sans font-light'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <p className="font-serif text-[10px] tracking-wider text-amber-500 uppercase mb-1 font-semibold">
                          CONCIERGE
                        </p>
                      )}
                      <p className="whitespace-pre-line">{msg.content}</p>
                    </div>
                  </div>
                  
                  {idx === 0 && messages.length === 1 && (
                    <div className="mt-1.5 flex flex-col gap-2 pl-1 max-w-[90%]">
                      {[
                        "View Premium Malibu Listings",
                        "Calculate My Market Valuation",
                        "Book a Private Showing Advisor"
                      ].map((suggestion) => (
                        <button
                          key={suggestion}
                          type="button"
                          onClick={() => handleSuggestClick(suggestion)}
                          className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0a0a0a] border border-stone-900 hover:border-amber-500/40 hover:bg-stone-900/50 text-stone-300 hover:text-amber-500 text-[11px] font-sans tracking-wide transition-all duration-200 cursor-pointer shadow-md flex items-center gap-2 active:scale-[0.98]"
                        >
                          <span className="text-amber-500/80 text-xs">✦</span>
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-[#101010] border border-stone-900/80 rounded-2xl rounded-bl-none px-4 py-3">
                    <p className="font-serif text-[10px] tracking-wider text-amber-500 uppercase mb-1.5 font-semibold">
                      CONCIERGE
                    </p>
                    <div className="flex items-center gap-1.5 text-stone-400 text-xs font-mono tracking-wider">
                      <Loader2 className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                      <span>Advising...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-stone-900/60 bg-[#080808]/80 backdrop-blur-md flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about properties, schools, advisory desk..."
                className="flex-1 bg-stone-950/60 border border-stone-900/80 rounded-xl px-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 font-sans"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                  inputValue.trim() && !isLoading
                    ? 'bg-amber-600 text-white hover:bg-amber-500 hover:scale-105 cursor-pointer'
                    : 'bg-stone-900 text-stone-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceCallModal isOpen={isVoiceCallOpen} onClose={() => setIsVoiceCallOpen(false)} />
    </div>
  );
}
