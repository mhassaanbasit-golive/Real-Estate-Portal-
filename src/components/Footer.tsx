import React, { useState } from 'react';
import { Mail, Instagram, Facebook, Linkedin, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

interface FooterProps {
  setPage: (page: any) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid corporate or personal email address.');
      return;
    }
    setError('');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="global-footer" className="bg-[#050505] dark:bg-[#050505] text-stone-300 border-t border-stone-900 dark:border-white/10 pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="flex flex-col items-start">
            <span className="font-serif text-3xl font-bold tracking-[0.25em] text-white">
              AURORA
            </span>
            <span className="text-[10px] uppercase tracking-[0.45em] text-stone-500 font-mono -mt-1 pl-[2px]">
              ESTATES
            </span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
            Setting the global standard for prestigious real estate brokerage and private property advisory. Providing absolute discretion, predictive intelligence, and bespoke acquisition services to ultra-high-net-worth portfolios worldwide.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 border border-stone-800 dark:border-white/10 hover:border-white dark:hover:border-white hover:text-white dark:hover:text-white rounded-full transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 border border-stone-800 dark:border-white/10 hover:border-white dark:hover:border-white hover:text-white dark:hover:text-white rounded-full transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 border border-stone-800 dark:border-white/10 hover:border-white dark:hover:border-white hover:text-white dark:hover:text-white rounded-full transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Explore Links */}
        <div className="space-y-4">
          <h4 className="font-serif font-semibold text-white tracking-widest text-xs uppercase pl-1 border-l-2 border-amber-500">
            EXPLORE
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={() => setPage('listings')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">
                Premium Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => setPage('about')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">
                Our Private Brokerage
              </button>
            </li>
            <li>
              <button onClick={() => setPage('services')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">
                Advisory & Valuation
              </button>
            </li>
            <li>
              <button onClick={() => setPage('blog')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">
                Market Insights
              </button>
            </li>
            <li>
              <button onClick={() => setPage('neighborhoods')} className="hover:text-amber-400 transition-colors cursor-pointer text-stone-400">
                Neighborhood Guides
              </button>
            </li>
          </ul>
        </div>

        {/* Office Details */}
        <div className="space-y-4">
          <h4 className="font-serif font-semibold text-white tracking-widest text-xs uppercase pl-1 border-l-2 border-amber-500">
            REPRESENTATION
          </h4>
          <div className="space-y-3 text-sm text-stone-400">
            <div>
              <p className="font-semibold text-stone-200">The Pacific Coast Suite</p>
              <p>2410 Ocean Avenue, Malibu, CA</p>
            </div>
            <div>
              <p className="font-semibold text-stone-200">The Manhattan Boardroom</p>
              <p>745 Fifth Avenue, New York, NY</p>
            </div>
            <div className="pt-2">
              <p className="text-stone-300">Office: <a href="tel:+13102783311" className="hover:text-amber-400 transition-colors cursor-pointer font-semibold underline decoration-amber-500/30">+1 (310) 278-3311</a></p>
              <p className="text-stone-300">Inquiries: advisory@aurora-estates.com</p>
            </div>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="font-serif font-semibold text-white tracking-widest text-xs uppercase pl-1 border-l-2 border-amber-500">
            THE INNER CIRCLE
          </h4>
          <p className="text-sm text-stone-400 leading-relaxed">
            Subscribe to receive exclusive off-market opportunities, early listing disclosures, and our quarterly global macro reports.
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="relative flex items-center">
                <input
                  type="email"
                  placeholder="Enter corporate email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.02] border border-stone-200 dark:border-white/10 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1 p-2 text-stone-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
            </form>
          ) : (
            <div className="flex items-start space-x-2 bg-stone-900/50 border border-amber-500/20 p-3 rounded-lg">
              <CheckCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-stone-100">Subscription Activated</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Welcome to the private registry. Private briefs will be sent shortly.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 border-t border-stone-900 dark:border-white/10 my-8"></div>

      {/* Legal & Disclaimers */}
      <div className="max-w-7xl mx-auto px-6 text-xs text-stone-500 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 leading-relaxed">
        <div className="space-y-1 text-center md:text-left">
          <p>© 2026 Aurora Estates Real Estate Advisory. All Rights Reserved.</p>
          <p className="max-w-xl">
            Aurora Estates fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Licensed Real Estate Brokerage. All material presented herein is intended for informational purposes only. Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in price, or withdrawal without notice.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-stone-600" />
          <span className="font-semibold text-stone-400">Verisign Encrypted Secure Broker</span>
        </div>
      </div>
    </footer>
  );
}
