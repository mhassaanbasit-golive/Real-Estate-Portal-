import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VoiceCallModal from './VoiceCallModal';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function getSimulatedResponse(lastMessage: string): string {
  const query = lastMessage.toLowerCase();
  
  if (query.includes("location") || query.includes("address") || query.includes("where are you") || query.includes("office")) {
    return `Aurora Estates represents the absolute pinnacle of luxury brokerage. We maintain physical representations at:
• **The Pacific Coast Suite**: 2410 Ocean Avenue, Malibu, CA
• **The Manhattan Boardroom**: 745 Fifth Avenue, New York, NY

Additionally, we deal in premier luxury assets and secure transactions all across the USA with absolute class, precision, and ironclad discretion. Please provide your email address or telephone number so we may dispatch a dedicated partner to represent your interest.`;
  } else if (query.includes("malibu") && query.includes("listing")) {
    return `Our premium Malibu inventory currently features "The Solitaire Waterfront Manor"—an architectural masterpiece by Richard Landry listed at $24,500,000. It offers 11,200 square feet of limestone and structural glass, direct beach access, and a zero-edge infinity pool. \n\nAdditionally, we offer the "Amara Modern Pavilion Villa" for lease at $45,000/month, curated by Sienna Sterling. Please let me know if you would like Victoria Vance-Sloane or Sienna Sterling to arrange an inspection of these coastal estates.`;
  } else if (query.includes("valuation") || query.includes("calculate")) {
    return `To estimate your estate's current market valuation, you can utilize our instant Valuation tool on the Home page, which cross-references current historical index averages. \n\nFor a comprehensive, certified luxury appraisal, our Global Acquisitions Director, Christian Montgomery, will conduct a multi-vector portfolio analysis. Please let us know your property details to initiate this review.`;
  } else if (query.includes("book") || query.includes("showing") || query.includes("advisor")) {
    return `I would be pleased to schedule a private showing with one of our principal partners:\n• Victoria Vance-Sloane for coastal Malibu manors or exclusive Beverly Hills estates.\n• Christian Montgomery for Manhattan duplexes and global acquisitions.\n• Sienna Sterling for high-profile luxury leases.\n\nPlease specify your preferred date, hour, and portfolio of interest, or submit a request directly via our integrated Contact page.`;
  } else if (query.includes("solitaire") || query.includes("landry") || (query.includes("malibu") && query.includes("manor"))) {
    return `The Solitaire Waterfront Manor in Malibu stands as a peerless architectural achievement designed by the esteemed Richard Landry. Offered at $24,500,000, this limestone and structural glass estate provides 11,200 square feet of immaculate living space on a 1.4-acre beachfront parcel. \n\nIt accommodates 6 elegant bedrooms, 8 baths, a professional wellness spa, and an exquisite zero-edge infinity pool opening directly onto your private shoreline. Senior Managing Partner Victoria Vance-Sloane is personally supervising this listing and would be delighted to coordinate a private showing.`;
  } else if (query.includes("obsidian") || query.includes("bel air") || query.includes("beverly") || query.includes("obsidian bel air")) {
    return `The Obsidian Bel Air Estate in Beverly Hills, listed at $18,900,000, is an avant-garde masterpiece of volcanic stone and minimalist lines. Positioned to command 270-degree vistas of the Los Angeles Basin and the Pacific Ocean, this 9,800-square-foot sanctuary offers 5 bedrooms, 7 baths, and an auto gallery capable of housing 6 prized motorcars. \n\nLeisure is elevated by its cascading pool and dual professional culinary suites. Victoria Vance-Sloane directs acquisitions for this exceptional estate.`;
  } else if (query.includes("penthouse") || query.includes("crown jewel") || query.includes("central park") || query.includes("downtown")) {
    return `The Crown Jewel Duplex Penthouse, suspended 800 feet above Central Park in Manhattan, is offered at $32,000,000. It is a dual-level modern sanctuary spanning 7,400 square feet with a helical bronze staircase, herringbone white oak floors, and a private sky terrace. \n\nChristian Montgomery, our Director of Global Acquisitions, is the exclusive representative for this unparalleled high-rise estate.`;
  } else if (query.includes("aspen") || query.includes("summit") || query.includes("alpine")) {
    return `The Summit Alpine Sanctuary in Aspen ($14,200,000) is a ski-in/ski-out fortress fashioned from reclaimed white fir and native granite. Spanning 8,900 square feet, it offers 6 bedrooms, 7 baths, an internal basalt hot spring, and a professional wellness sauna. Christian Montgomery governs this mountain masterpiece.`;
  } else if (query.includes("school") || query.includes("education") || query.includes("rating")) {
    return `Educational facilities surrounding our portfolios represent the pinnacle of academic distinction:\n• Beverly Hills Estates enjoy proximity to schools rated at 9.9/10.\n• Malibu portfolios are served by institutions evaluated at 9.7/10.\n• Manhattan/Downtown residential suites reside near academies rated at 9.2/10.\n\nEach region provides exemplary private educational consultancies to assist with enrollment.`;
  } else if (query.includes("mortgage") || query.includes("interest") || query.includes("down payment") || query.includes("calculator")) {
    return `For our distinguished clientele, we advise a standard 20% down payment to establish an optimal financing posture. Our internal advisory desk, led by Christian Montgomery, partners with elite private banks to structure bespoke amortizations and custom lending vehicles tailored to complex multi-jurisdictional asset portfolios.`;
  } else if (query.includes("malibu")) {
    return `Malibu remains a highly coveted coastal enclave. The average entry price sits at $16,400,000, reflecting its pristine private shorelines. The region boasts a perfect 9.5/10 Crime Safety Index and a commendable 9.7/10 School Rating, pairing natural coastal majesty with secure serenity.`;
  } else if (query.includes("beverly") || query.includes("hills")) {
    return `Beverly Hills represents the ultimate echelon of prestige, boasting an average property price of $19,800,000. Under guard of exclusive private patrols, it maintains a 9.8/10 Crime Safety Index and an outstanding 9.9/10 academic evaluation score.`;
  } else {
    return `Greetings from Aurora Estates. I am the Elite AI Concierge. We do not offer generic assistance; instead, we represent peerless residential assets with absolute class, precision, and ironclad discretion. 

Our physical brokerage representation includes:
• **The Pacific Coast Suite**: 2410 Ocean Avenue, Malibu, CA
• **The Manhattan Boardroom**: 745 Fifth Avenue, New York, NY

We deal in premium residential holdings all across the USA. Please provide your email address or direct phone number so a senior managing partner may contact you confidentially. How may I represent your interests today?`;
  }
}

export default function Chatbot() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Greetings. I am the Aurora Estates Elite AI Concierge. We represent ultra-exclusive portfolios across the USA, with suites at 2410 Ocean Avenue in Malibu and 745 Fifth Avenue in Manhattan. Please provide your email address or phone number so a senior partner may reach out directly, or ask me any portfolio query.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (typeof window === 'undefined') return null;
  if (!isMounted) return null;

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
      console.warn('Backend chat not available, falling back to local luxury simulated engine:', error);
      const simulatedText = getSimulatedResponse(userMessageContent);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: simulatedText
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
      console.warn('Backend chat not available, falling back to local luxury simulated engine:', error);
      const simulatedText = getSimulatedResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: simulatedText
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
