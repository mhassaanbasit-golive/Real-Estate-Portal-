import React, { useState } from 'react';
import { Phone, CheckCircle, X, Clock, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type PartnerKey = 'victoria' | 'christian' | 'sienna';

interface Partner {
  name: string;
  role: string;
  specialty: string;
}

const PARTNERS: Record<PartnerKey, Partner> = {
  victoria: {
    name: "Victoria Vance-Sloane",
    role: "Senior Managing Partner",
    specialty: "Malibu & Beverly Hills Portfolios"
  },
  christian: {
    name: "Christian Montgomery",
    role: "Director of Global Acquisitions",
    specialty: "Manhattan Penthouse & Valuation"
  },
  sienna: {
    name: "Sienna Sterling",
    role: "Principal Lease Advisor",
    specialty: "High-Profile Luxury Rentals"
  }
};

export default function VoiceCallModal({ isOpen, onClose }: VoiceCallModalProps) {
  const [selectedPartner, setSelectedPartner] = useState<PartnerKey>('victoria');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentPartner = PARTNERS[selectedPartner];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    // Simulate callback dispatch purely via local React state
    setTimeout(() => {
      setIsLoading(false);
      setIsNotified(true);
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    }, 1200);
  };

  const handleReset = () => {
    setPhoneNumber('');
    setIsNotified(false);
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-sans">
        <motion.div
          id="secure-advisory-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-[calc(100%-2rem)] max-w-md mx-auto box-border bg-[#070707] border border-stone-800 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col p-4 sm:p-6 text-stone-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-900/50 transition-colors z-10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSubmitted ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                {/* Accent Header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-semibold">
                    Aurora Secure Desk
                  </span>
                </div>

                {/* Direct advisory prompt */}
                <h2 className="font-serif text-2xl font-bold text-white tracking-wide mb-2">
                  Direct Advisory Line
                </h2>
                <p className="text-xs text-stone-400 font-light leading-relaxed mb-6">
                  Connect with our desks immediately. Aurora's private partners are prepared to assist you through zero-latency communications.
                </p>

                {/* Option 1: Mobile direct click-to-call link */}
                <div className="mb-6">
                  <label className="block text-[10px] font-mono tracking-wider text-stone-500 uppercase mb-2.5 font-semibold">
                    Call Immediately (Mobile & VoIP)
                  </label>
                  <a
                    href="tel:+1800287672"
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 hover:bg-amber-950/20 hover:border-amber-500/40 text-stone-200 hover:text-white transition-all cursor-pointer group shadow-sm gap-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/15 text-amber-500 group-hover:scale-105 transition-transform flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-serif font-bold tracking-wide">1-800-AURORA</h4>
                        <p className="text-[10px] text-stone-500 mt-0.5">Toll-free private advisory desk</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-amber-500 tracking-wider font-semibold uppercase flex-shrink-0 self-start sm:self-center">
                      <span>Click to Dial</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </a>
                </div>

                <div className="relative my-6 flex py-1 items-center">
                  <div className="flex-grow border-t border-stone-900"></div>
                  <span className="flex-shrink mx-4 text-[9px] font-mono uppercase tracking-widest text-stone-600 font-semibold">OR REQUEST CALLBACK</span>
                  <div className="flex-grow border-t border-stone-900"></div>
                </div>

                {/* Advisor selection for callback */}
                <div className="space-y-2.5 mb-6">
                  <label className="block text-[10px] font-mono tracking-wider text-stone-500 uppercase font-semibold">
                    Select Your Advisory Partner
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {(Object.keys(PARTNERS) as PartnerKey[]).map((key) => {
                      const p = PARTNERS[key];
                      const isSelected = selectedPartner === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedPartner(key)}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left transition-all cursor-pointer gap-2 ${
                            isSelected
                              ? 'bg-stone-950 border-amber-500/40 text-white shadow-lg'
                              : 'bg-stone-950/40 border-stone-900 text-stone-400 hover:text-stone-300 hover:border-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                              isSelected ? 'bg-amber-500/10 text-amber-500' : 'bg-stone-900/60 text-stone-500'
                            }`}>
                              <User className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-xs font-serif font-bold text-stone-200 truncate">{p.name}</h4>
                              <p className="text-[9px] text-stone-500 mt-0.5 truncate">{p.role}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono text-stone-500 bg-stone-900/40 px-2 py-0.5 rounded-md border border-stone-900 flex-shrink-0">
                            {p.specialty.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Option 2: Callback number input */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono tracking-wider text-stone-500 uppercase font-semibold">
                      Leave your secure number for an instant callback
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-stone-500 text-xs font-mono">+1</span>
                      <input
                        type="text"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="(555) 019-2834"
                        className="w-full bg-stone-950 border border-stone-900 focus:border-amber-500/40 focus:outline-none rounded-xl pl-9 pr-4 py-3 text-xs text-stone-200 placeholder-stone-700 font-mono tracking-wider"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || isNotified || !phoneNumber.trim()}
                    className={`w-full py-3.5 px-6 rounded-xl font-serif font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-950/10 active:scale-[0.99] transition-all cursor-pointer disabled:cursor-not-allowed ${
                      isNotified
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        : 'bg-amber-600 hover:bg-amber-500 text-white disabled:bg-stone-900 disabled:text-stone-500'
                    }`}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        DISPATCHING SECURE ADVISOR REQUEST...
                      </span>
                    ) : isNotified ? (
                      <span className="flex items-center gap-2 font-mono text-[10px] text-emerald-100">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                        <span>SUCCESS! ADVISOR NOTIFIED</span>
                      </span>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>DISPATCH INSTANT CALLBACK</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Elegant Callback Success Panel */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-6"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/25"
                />
                <div className="relative w-16 h-16 rounded-full bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                  <CheckCircle className="w-8 h-8" />
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
                  Secure Callback Scheduled
                </p>
                <h3 className="font-serif text-xl font-bold text-white tracking-wide">
                  An advisor will ring your line shortly.
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm mx-auto">
                  A secure, private line is being routed to <span className="font-mono text-amber-500 font-semibold">{phoneNumber}</span>. Principal Partner <span className="font-semibold text-white">{currentPartner.name}</span> has received your portal dossier.
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 px-4 py-2 border border-stone-900 bg-stone-950/80 rounded-lg text-[10px] font-mono text-stone-500 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
                <span>Encrypted Call-Bridge Active</span>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg border border-stone-800 hover:border-stone-750 bg-stone-950 hover:bg-stone-900 text-stone-300 text-xs tracking-wider transition-all cursor-pointer font-medium"
              >
                Return to Portals
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
