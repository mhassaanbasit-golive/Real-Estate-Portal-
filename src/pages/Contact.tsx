import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Clock, MapPin, Sparkles, CheckCircle, ShieldCheck, X, Compass, Globe } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: 'general', // 'general' | 'showing' | 'list' | 'advisory'
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) err.email = 'Valid corporate or personal email required';
    if (!formData.phone.trim()) err.phone = 'Contact number is required for voice call-back scheduling';
    if (!formData.message.trim()) err.message = 'Please provide brief details of your request';
    return err;
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

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1400);
  };

  return (
    <div id="contact-clover-page" className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* LEFT COLUMN: Contact Details, Google Maps, Operational Hours */}
      <div className="space-y-10">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 font-semibold">THE BROKERAGE HQ</p>
          <h1 className="font-serif text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
            Connect With Our Advisory Suite
          </h1>
          <p className="text-sm text-stone-555 dark:text-stone-400">
            For global asset acquisitions, luxury leases, or confidential listing representations. Complete discretion guaranteed.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-stone-700 dark:text-stone-300">
          <div className="space-y-2 border-l-2 border-amber-500 pl-4">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase text-xs tracking-wider">Direct Voice</h4>
            <p>Office: <a href="tel:+13105550190" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors cursor-pointer font-semibold underline decoration-amber-500/30">+1 (310) 555-0190</a></p>
            <p>Discreet: <a href="tel:+13105550112" className="hover:text-amber-600 dark:hover:text-amber-500 transition-colors cursor-pointer font-semibold underline decoration-amber-500/30">+1 (310) 555-0112</a></p>
          </div>

          <div className="space-y-2 border-l-2 border-amber-500 pl-4">
            <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 uppercase text-xs tracking-wider">Secure Email</h4>
            <p>Registry Desk: advisory@aurora-estates.com</p>
            <p>Partner Inbox: vance.sloane@aurora-estates.com</p>
          </div>
        </div>

        {/* Operational hours */}
        <div className="bg-stone-50 dark:glass-card p-6 rounded-2xl space-y-3">
          <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Clock className="w-4.5 h-4.5 text-amber-500" />
            Operational Representation Hours
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px] text-stone-600 dark:text-stone-400 uppercase">
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200">Monday - Friday</p>
              <p>09:00 AM - 07:00 PM PST</p>
            </div>
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200">Saturday - Sunday</p>
              <p>10:00 AM - 04:00 PM PST</p>
            </div>
            <p className="col-span-1 sm:col-span-2 text-[10px] text-amber-600 font-bold italic pt-1">
              *Private showings and helicopter escrows represent 24/7 priority call capabilities.
            </p>
          </div>
        </div>

        {/* Simulated Map Container */}
        <div className="h-64 rounded-2xl border border-stone-200/50 dark:border-white/10 overflow-hidden relative shadow-inner bg-slate-900">
          <div className="absolute inset-0 bg-stone-100 dark:bg-[#080808] opacity-95">
            {/* Draw beautiful abstract map lines representing Malibu cliffs */}
            <svg className="w-full h-full text-stone-200 dark:text-slate-900 fill-none stroke-current" strokeWidth="2" viewBox="0 0 500 200">
              <path d="M-10 120 C 120 150, 240 180, 520 80" strokeWidth="6" />
              <path d="M-10 140 C 140 160, 260 210, 520 110" strokeWidth="3" className="text-amber-500/35" />
              <line x1="120" y1="0" x2="120" y2="210" />
              <line x1="380" y1="0" x2="380" y2="210" />
              {/* HQ Marker */}
              <circle cx="280" cy="140" r="10" className="fill-amber-500 stroke-white" strokeWidth="2" />
            </svg>
            {/* Overlay Map grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>

          <div className="absolute top-4 left-4 bg-stone-900/95 border border-stone-700/50 text-white font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded shadow-md flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>MALIBU HQ SATELLITE LOCATOR</span>
          </div>

          <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 border border-stone-150 p-2.5 rounded-lg text-[10px] font-mono text-stone-600 dark:text-stone-300 max-w-xs shadow-md">
            <p className="font-bold text-stone-900 dark:text-white uppercase mb-0.5">THE MALIBU CLINIQUE</p>
            <p>2410 Pacific Ocean Suite, CA 90265</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Contact Form */}
      <div id="contact-form-panel" className="bg-stone-50 dark:glass-card p-8 sm:p-10 rounded-3xl space-y-6">
        <div className="border-b border-stone-200/50 dark:border-white/10 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] font-extrabold text-amber-600 dark:text-amber-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> SECURE CONGESTION GATEWAY
          </span>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white mt-1">Acquisition Briefing</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Please specify your transaction and scheduling requirements</p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold font-mono">Your Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Katherine Sterling"
                className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${errors.name ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
              />
              {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Corporate Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="k.sterling@capital.com"
                  className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${errors.email ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Contact Telephone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (310) 555-0199"
                  className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${errors.phone ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Aquisition Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="general" className="dark:text-black">General Advisory Briefing Inquiry</option>
                <option value="showing" className="dark:text-black">Schedule showing for a custom estate</option>
                <option value="list" className="dark:text-black">List my property with Aurora Estates</option>
                <option value="advisory" className="dark:text-black">Request institutional portfolio audit</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">Confidential Brief Details</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly state targeted properties, budgeting ranges, or listing specifications..."
                className={`w-full px-3 py-2 bg-white dark:bg-white/[0.02] border ${errors.message ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
              />
              {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-[#080808] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? 'TRANSMITTING ENCRYPTED MESSAGE...' : 'TRANSMIT REGISTERED MESSAGE'}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-5"
          >
            <div className="inline-flex p-4 bg-amber-50 dark:bg-amber-950/20 rounded-full text-amber-600 shadow-inner">
              <CheckCircle className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-stone-950 dark:text-stone-50">Briefing Transmitted Successfully</h3>
              <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed max-w-sm mx-auto">
                Thank you, <strong className="text-stone-900 dark:text-white">{formData.name}</strong>. Your confidential briefing was successfully routed to our senior acquisitions managing partners.
              </p>
            </div>

            <div className="p-4 bg-white dark:glass-card max-w-xs mx-auto text-left text-[11px] font-mono space-y-2 text-stone-600 dark:text-stone-400 font-sans">
              <p className="font-bold text-stone-900 dark:text-stone-100 text-center pb-1 border-b border-stone-150 dark:border-white/10">REGISTRY LEDGER</p>
              <p><strong>INQUIRY TICKET:</strong> INF-{Math.floor(100000 + Math.random() * 900000)}</p>
              <p><strong>REPRESENTATION:</strong> {formData.purpose.toUpperCase()}</p>
              <p><strong>VOICE CALL-BACK:</strong> SCHEDULED WITHIN 15 MIN</p>
            </div>

            <button
              onClick={() => {
                setIsSuccess(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  purpose: 'general',
                  message: '',
                });
              }}
              className="px-6 py-2 bg-stone-900 dark:bg-white hover:bg-stone-850 dark:hover:bg-stone-200 text-white dark:text-[#080808] font-serif font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer"
            >
              Transmit New Inquiry
            </button>
          </motion.div>
        )}

        <div className="pt-2 border-t border-stone-200/50 dark:border-white/10 flex items-center justify-center gap-1.5 text-[9px] font-mono text-stone-400 uppercase tracking-widest">
          <ShieldCheck className="w-3.5 h-3.5" /> SECURE TRADING SYSTEMS CONNECTED
        </div>
      </div>
    </div>
  );
}
