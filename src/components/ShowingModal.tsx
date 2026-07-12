import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, CheckCircle, Mail, Phone, User, ShieldCheck } from 'lucide-react';
import { Listing } from '../types';

interface ShowingModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: Listing | null;
}

export default function ShowingModal({ isOpen, onClose, listing }: ShowingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '2026-07-15',
    time: '14:00',
    represented: 'no',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !listing) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid corporate or personal email is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Contact number is required for verification.';
    if (!formData.date) newErrors.date = 'Please select a preferred viewing date.';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    // Simulate luxury API booking delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-stone-200/50 dark:border-slate-800/50 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-slate-800 px-6 py-4.5">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> PRIVATE VIEWING REGISTRY
              </p>
              <h3 className="font-serif text-base font-bold text-stone-900 dark:text-stone-100 mt-1 line-clamp-1">
                {listing.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-stone-100 dark:hover:bg-slate-800 rounded-full transition-colors text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Visual Quick Property Detail summary inside modal */}
                <div className="flex items-center space-x-3 bg-stone-50 dark:bg-slate-950 p-3 rounded-xl border border-stone-100/50 dark:border-slate-850/50">
                  <img
                    referrerPolicy="no-referrer"
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold text-xs text-stone-900 dark:text-stone-100 line-clamp-1">{listing.title}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">{listing.address}, {listing.city}</p>
                    <p className="text-xs font-mono font-bold text-amber-700 dark:text-amber-500 mt-0.5">${listing.price.toLocaleString()}</p>
                  </div>
                </div>

                {/* Grid Inputs */}
                <div className="space-y-3.5">
                  {/* Name */}
                  <div className="relative">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Katherine Sterling"
                        className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-slate-950 border ${errors.name ? 'border-red-400' : 'border-stone-200 dark:border-slate-800'} rounded-lg text-sm text-stone-950 dark:text-stone-50 focus:outline-none focus:border-amber-500`}
                      />
                    </div>
                    {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Corporate Email</label>
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 w-4 h-4 text-stone-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="k.sterling@capital.com"
                          className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-slate-950 border ${errors.email ? 'border-red-400' : 'border-stone-200 dark:border-slate-800'} rounded-lg text-sm text-stone-950 dark:text-stone-50 focus:outline-none focus:border-amber-500`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div className="relative">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Direct Phone</label>
                      <div className="relative flex items-center">
                        <Phone className="absolute left-3 w-4 h-4 text-stone-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (310) 278-3319"
                          className={`w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-slate-950 border ${errors.phone ? 'border-red-400' : 'border-stone-200 dark:border-slate-800'} rounded-lg text-sm text-stone-950 dark:text-stone-50 focus:outline-none focus:border-amber-500`}
                        />
                      </div>
                      {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Preferred Date</label>
                      <div className="relative flex items-center">
                        <Calendar className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-lg text-sm text-stone-950 dark:text-stone-50 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">Preferred Hour</label>
                      <div className="relative flex items-center">
                        <Clock className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
                        <select
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-slate-950 border border-stone-200 dark:border-slate-800 rounded-lg text-sm text-stone-950 dark:text-stone-50 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="10:00">10:00 AM (Morning Portfolio)</option>
                          <option value="12:00">12:00 PM (Midday Briefing)</option>
                          <option value="14:00">02:00 PM (Afternoon Showing)</option>
                          <option value="16:00">04:00 PM (Golden Hour Preview)</option>
                          <option value="18:00">06:00 PM (Twilight Tour)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Representation Check */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">Are you represented by an agent?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2 text-sm text-stone-700 dark:text-stone-300 cursor-pointer">
                        <input
                          type="radio"
                          name="represented"
                          value="yes"
                          checked={formData.represented === 'yes'}
                          onChange={() => setFormData({ ...formData, represented: 'yes' })}
                          className="accent-amber-600"
                        />
                        <span>Yes, I am represented</span>
                      </label>
                      <label className="flex items-center space-x-2 text-sm text-stone-700 dark:text-stone-300 cursor-pointer">
                        <input
                          type="radio"
                          name="represented"
                          value="no"
                          checked={formData.represented === 'no'}
                          onChange={() => setFormData({ ...formData, represented: 'no' })}
                          className="accent-amber-600"
                        />
                        <span>No, unrepresented client</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-850 dark:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-950 text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-slate-950" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        VERIFYING PROTOCOLS...
                      </span>
                    ) : (
                      <span>TRANSMIT VIEWING SCHEDULE REQUEST</span>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-stone-400 dark:text-stone-500 font-mono uppercase tracking-wider mt-2.5 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> SECURE SSL ENCRYPTED TRANSMISSION
                  </p>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-5"
              >
                <div className="inline-flex p-4.5 bg-amber-50 dark:bg-amber-950/20 rounded-full text-amber-600 dark:text-amber-500 shadow-inner">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                    Bespoke Showing Requested
                  </h4>
                  <p className="text-sm text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-stone-900 dark:text-white">{formData.name}</strong>. Your request to tour <strong className="text-stone-900 dark:text-white">{listing.title}</strong> on <strong className="text-stone-900 dark:text-white">{formData.date}</strong> at <strong className="text-stone-900 dark:text-white">{formData.time}</strong> is officially logged in our private registry.
                  </p>
                </div>

                <div className="p-4 bg-stone-50 dark:bg-slate-950 border border-stone-100 dark:border-slate-850 rounded-2xl max-w-sm mx-auto text-left text-[11px] font-mono space-y-2.5 text-stone-600 dark:text-stone-400">
                  <p className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest text-center border-b border-stone-150 dark:border-slate-850 pb-1.5">
                    TRANSACTION SUMMARY
                  </p>
                  <p><strong>REGISTRY ID:</strong> AUR-{Math.floor(100000 + Math.random() * 900000)}</p>
                  <p><strong>REPRESENTED:</strong> {formData.represented === 'yes' ? 'LICENSED COUNSEL' : 'UNREPRESENTED DIRECT'}</p>
                  <p><strong>VERIFICATION LINK:</strong> SENT TO {formData.email.toUpperCase()}</p>
                  <p className="text-[10px] text-amber-600 dark:text-amber-500 italic text-center pt-1">Our managing partner will connect via voice call within 15 minutes.</p>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 hover:bg-stone-850 dark:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-slate-950 font-serif font-semibold text-xs tracking-wider uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
