import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, ShieldCheck, Award, Star, CheckCircle, ChevronRight, UserPlus, Sparkles } from 'lucide-react';
import { Agent } from '../types';
import { agentsData } from '../data';

interface AboutProps {
  setPage: (page: any) => void;
}

export default function About({ setPage }: AboutProps) {
  // Career application form state
  const [careerForm, setCareerForm] = useState({
    name: '',
    email: '',
    department: 'acquisitions',
    experience: '5',
    notes: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCareerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!careerForm.name.trim()) newErrors.name = 'Full name is required';
    if (!careerForm.email.trim() || !careerForm.email.includes('@')) newErrors.email = 'Valid corporate email required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    try {
      const existingRaw = localStorage.getItem('brokerage_leads');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const newLead = {
        id: Date.now().toString(),
        type: 'career_application',
        timestamp: new Date().toISOString(),
        ...careerForm
      };
      const updatedLeads = [newLead, ...existing];
      localStorage.setItem('brokerage_leads', JSON.stringify(updatedLeads));
    } catch (err) {
      console.error("Failed to save career lead", err);
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div id="about-and-agents-page" className="space-y-24 pb-20">
      {/* SECTION 1: Narrative-driven biography */}
      <section className="max-w-4xl mx-auto px-6 text-center space-y-8 pt-12">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 font-semibold">OUR CORE PHILOSOPHY</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
            Discretion. Analytical Precision. <br />Bespoke Advisory.
          </h1>
        </div>

        <p className="text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto font-sans">
          Founded in 1998 along the coastal cliffs of Malibu, Aurora Estates was engineered with a single guiding thesis: that high-net-worth real estate transactions require the same intellectual rigor, analytical modeling, and absolute privacy as complex institutional acquisitions. We decoupled ourselves from traditional retail volume brokerage, structuring our team as a highly specialized private wealth advisory desk.
        </p>

        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-2xl mx-auto">
          Today, we represent estate portfolios spanning Malibu, Beverly Hills, Manhattan, and Aspen. We maintain a client list consisting of global investment managers, sovereign wealth representatives, and generational families—securing acquisitions totaling over $6.2 billion with complete privacy.
        </p>

        {/* Brand Values Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
          {[
            { title: 'Absolute Discretion', desc: 'Ironclad non-disclosure agreements and private off-market transaction structures govern every trade.' },
            { title: 'Market Analytics', desc: 'Our advisory desk tracks macro interest rate cycles, luxury market indicators, and structural cost indices.' },
            { title: 'Bespoke Curations', desc: 'We coordinate full-scale private tours, helicopter landing privileges, and certified architectural assessments.' },
          ].map((v) => (
            <div key={v.title} className="p-5 border border-stone-150 dark:border-white/10 rounded-2xl text-left bg-stone-50 dark:bg-white/[0.02] space-y-2">
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">{v.title}</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Interactive Agent Directory */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber-600 dark:text-amber-500 font-semibold">THE BROKERAGE DESK</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">Our Senior Partners</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto">Connect directly with industry authorities committed to securing your commercial and residential interests.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {agentsData.map((agent) => (
            <motion.div
              key={agent.id}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white dark:glass-card rounded-2xl overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="h-96 w-full overflow-hidden bg-stone-100 relative">
                <img
                  referrerPolicy="no-referrer"
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                {/* Info Overlay (Always Visible at bottom of photo) */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <p className="font-mono text-[10px] text-amber-400 font-bold tracking-widest">{agent.licensing}</p>
                  <h3 className="font-serif text-xl font-bold">{agent.name}</h3>
                  <p className="text-xs text-stone-300 font-medium">{agent.title}</p>
                </div>
              </div>

              {/* Body Content - Reveals on Hover / details always useful */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed">
                  {agent.bio}
                </p>

                {/* Accreditations & Licensing details */}
                <div className="space-y-2 border-y border-stone-100 dark:border-slate-850 py-3 text-[11px] font-mono">
                  <p className="text-stone-400 uppercase tracking-widest font-bold">VIP Accreditations</p>
                  <div className="space-y-1 text-stone-700 dark:text-stone-300">
                    {agent.accreditations.map((acc) => (
                      <div key={acc} className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{acc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Contact buttons */}
                <div className="flex gap-2">
                  <a
                    href={`mailto:${agent.email}`}
                    className="w-1/2 py-2 border border-stone-200 dark:border-white/10 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-stone-50 dark:hover:bg-white/5 text-stone-800 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-500 text-xs font-mono font-bold uppercase rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Partner</span>
                  </a>
                  <a
                    href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}
                    className="w-1/2 py-2 bg-stone-900 hover:bg-stone-850 dark:bg-white/10 dark:hover:bg-white/20 text-white dark:text-stone-200 text-xs font-mono font-bold uppercase rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Office</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>      {/* SECTION 3: Join Our Team career portal form */}
      <section id="career-portal-container" className="max-w-4xl mx-auto px-6">
        <div className="bg-stone-50 dark:glass-card rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 rounded-2xl">
              <UserPlus className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-white">Elite Career Registry</h2>
              <p className="text-sm text-stone-550 dark:text-stone-400 leading-relaxed">
                We are actively seeking experienced luxury representation advisors, quantitative analyst professionals, and structural appraisers with proven records of discretion and trade.
              </p>
            </div>
            <div className="space-y-2.5 text-xs font-mono text-stone-500">
              <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-500" /> Complete privacy of all applications</p>
              <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-amber-500" /> Full licensing and background audit</p>
            </div>
          </div>

          <div className="bg-white dark:glass-card p-6 rounded-2xl shadow-lg">
            {!isSuccess ? (
              <form onSubmit={handleCareerSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">YOUR FULL NAME</label>
                  <input
                    type="text"
                    value={careerForm.name}
                    onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                    placeholder="e.g. Christian Sterling"
                    className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.name ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">CORPORATE EMAIL</label>
                  <input
                    type="email"
                    value={careerForm.email}
                    onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                    placeholder="c.sterling@brokerage.com"
                    className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.email ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                  />
                  {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">DESIRED DEPT</label>
                    <select
                      value={careerForm.department}
                      onChange={(e) => setCareerForm({ ...careerForm, department: e.target.value })}
                      className="w-full px-2.5 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-[11px] text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                    >
                      <option value="acquisitions" className="dark:text-black">Acquisitions Desk</option>
                      <option value="leases" className="dark:text-black">Luxury Leases</option>
                      <option value="advisory" className="dark:text-black">Advisory Desk</option>
                      <option value="marketing" className="dark:text-black">Elite Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">EXP LEVEL (YEARS)</label>
                    <select
                      value={careerForm.experience}
                      onChange={(e) => setCareerForm({ ...careerForm, experience: e.target.value })}
                      className="w-full px-2.5 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-[11px] text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                    >
                      <option value="3" className="dark:text-black">3 - 5 Years</option>
                      <option value="5" className="dark:text-black">5 - 10 Years</option>
                      <option value="10" className="dark:text-black">10+ Years Elite</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">BRIEF PORTFOLIO SUMMARY</label>
                  <textarea
                    rows={3}
                    value={careerForm.notes}
                    onChange={(e) => setCareerForm({ ...careerForm, notes: e.target.value })}
                    placeholder="Briefly state historical sales volume and target territories..."
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-[#080808] text-xs font-mono font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  {isLoading ? 'TRANSMITTING CREDENTIALS...' : 'TRANSMIT APPLICATION'}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="inline-flex p-3.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-full">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-stone-950 dark:text-stone-50">Credentials Received</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Thank you, <strong className="text-stone-950 dark:text-white">{careerForm.name}</strong>. Your professional file has been safely cataloged inside our Private Registry. Our acquisitions desk senior partners will connect shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
