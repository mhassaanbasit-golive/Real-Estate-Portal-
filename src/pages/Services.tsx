import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, CheckCircle, MapPin, Sparkles, HelpCircle, FileText, Download, TrendingUp, Compass, Landmark, Briefcase } from 'lucide-react';

export default function Services() {
  const [currentStep, setCurrentStep] = useState(1);

  // Multistep form states
  const [formData, setFormData] = useState({
    address: '',
    city: 'Malibu',
    sqft: '5000',
    beds: '5',
    baths: '6',
    yearBuilt: '2020',
    finishes: 'calacatta', // 'calacatta' | 'oak' | 'standard'
    condition: 'impeccable', // 'impeccable' | 'excellent' | 'good'
    name: '',
    email: '',
    phone: '',
    urgency: 'curious', // 'curious' | '3months' | 'listNow'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [valuationResult, setValuationResult] = useState<any | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const err: Record<string, string> = {};
    if (step === 1) {
      if (!formData.address.trim()) err.address = 'Street address is required';
      if (!formData.sqft || Number(formData.sqft) <= 0) err.sqft = 'Please enter valid square footage';
    }
    if (step === 3) {
      if (!formData.name.trim()) err.name = 'Full name is required';
      if (!formData.email.trim() || !formData.email.includes('@')) err.email = 'Valid corporate email required';
      if (!formData.phone.trim()) err.phone = 'Direct telephone line required';
    }
    return err;
  };

  const handleNextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validateStep(3);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    // Simulate luxury AI valuation appraisal calculation
    setTimeout(() => {
      let baseSqftMultiplier = 1800; // Malibu baseline
      if (formData.city === 'Beverly Hills') baseSqftMultiplier = 2200;
      if (formData.city === 'New York') baseSqftMultiplier = 3500;
      if (formData.city === 'Miami') baseSqftMultiplier = 1500;
      if (formData.city === 'Aspen') baseSqftMultiplier = 1700;

      let finishMultiplier = 1.0;
      if (formData.finishes === 'calacatta') finishMultiplier = 1.3;
      if (formData.finishes === 'oak') finishMultiplier = 1.15;

      let condMultiplier = 1.0;
      if (formData.condition === 'impeccable') condMultiplier = 1.25;
      if (formData.condition === 'excellent') condMultiplier = 1.1;

      const sqftVal = Number(formData.sqft);
      const computedValue = sqftVal * baseSqftMultiplier * finishMultiplier * condMultiplier;

      setValuationResult({
        estimatedValue: computedValue,
        pricePerSqft: baseSqftMultiplier * finishMultiplier * condMultiplier,
        demandScore: formData.city === 'Malibu' || formData.city === 'Beverly Hills' ? 96 : 88,
        appreciationRate: 8.4,
        propertyClass: 'Elite Architectural Class A',
      });
      setIsLoading(false);
      setCurrentStep(4);
    }, 1800);
  };

  return (
    <div id="services-and-valuation-page" className="space-y-24 pb-20">
      {/* SECTION 1: Services Showcase */}
      <section className="max-w-7xl mx-auto px-6 space-y-16 pt-12">
        <div className="text-center space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-600 dark:text-amber-500 font-semibold">BESPOKE SERVICES</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-tight">
            Our Private Brokerage Suites
          </h1>
          <p className="text-sm text-stone-550 dark:text-stone-400 max-w-xl mx-auto">Providing tailored physical and monetary representations across critical property trade departments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Compass className="w-8 h-8 text-amber-600" />,
              title: 'VIP Buyer Representation',
              desc: 'Access off-market listings, private pocket databases, and early listing disclosures. We arrange full concierge tours, private helicopter transfers, luxury lodging, and represent your trust with complete legal discretion.',
              amenities: ['Private Escrow Desks', 'Off-Market Briefs', 'Asset Class Curations', 'Multi-Language Counsel']
            },
            {
              icon: <Landmark className="w-8 h-8 text-amber-600" />,
              title: 'Elite Seller Marketing',
              desc: 'We present your estate with high-spec cinematic video campaigns, interactive 3D virtual renderings, and full-page editorial placements in major international design digests. Target campaigns leverage global registries of qualified billionaires.',
              amenities: ['Cinema-Grade Media', 'Global Press Coverage', 'Target Broker Briefs', 'Full Styling & Curating']
            },
            {
              icon: <Briefcase className="w-8 h-8 text-amber-600" />,
              title: 'Institutional Portfolio Advisory',
              desc: 'Specialized services for multi-family, coastal land, and ultra-high-end acquisitions. Our quantitative advisory desk models capital gains shield plans, cash-on-cash projections, and conducts structural risk audits.',
              amenities: ['Macro Trend Briefings', 'Asset Optimization Plans', 'Capital Gains Shielding', 'Liquidation Advisory']
            }
          ].map((srv) => (
            <div key={srv.title} className="bg-white dark:glass-card p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl">
                  {srv.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">{srv.title}</h3>
                <p className="text-xs text-stone-550 dark:text-stone-400 leading-relaxed">{srv.desc}</p>
              </div>

              <div className="space-y-2 border-t border-stone-100 dark:border-slate-850 pt-4">
                <p className="font-mono text-[10px] uppercase text-stone-400 font-bold tracking-widest">Included Suite Elements</p>
                <div className="grid grid-cols-1 gap-2 text-xs font-mono text-stone-700 dark:text-stone-300">
                  {srv.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Multistep Instant Home Valuation Form */}
      <section id="multistep-valuation-section" className="max-w-3xl mx-auto px-6">
        <div className="bg-stone-50 dark:glass-card rounded-3xl p-8 sm:p-12 space-y-8">
          {/* Step visual progress tracker */}
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-extrabold text-amber-600 dark:text-amber-500 flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> STATISTICAL APPRAISAL ENGINE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">Predictive Equity Appraisal</h2>
          </div>

          {currentStep <= 3 && (
            <div className="flex justify-between items-center max-w-sm mx-auto mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center space-x-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    currentStep === step
                      ? 'bg-stone-900 dark:bg-white text-white dark:text-[#080808] font-bold scale-110'
                      : currentStep > step
                      ? 'bg-amber-500 text-white'
                      : 'bg-stone-200 dark:bg-white/5 text-stone-500'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && <div className={`h-[2px] w-12 ${currentStep > step ? 'bg-amber-500' : 'bg-stone-200 dark:bg-white/10'}`} />}
                </div>
              ))}
            </div>
          )}

          {/* Form Content */}
          <div className="bg-white dark:glass-card p-6 rounded-2xl shadow-md min-h-[350px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <p className="font-serif font-semibold text-stone-900 dark:text-stone-50 text-base">Step 1: Locate & Size Assets</p>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">STREET ADDRESS</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="e.g. 2410 Ocean Avenue"
                        className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.address ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                      />
                      {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">REGION METRIC</label>
                        <select
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                        >
                          <option value="Malibu" className="dark:text-black">Malibu, CA</option>
                          <option value="Beverly Hills" className="dark:text-black">Beverly Hills, CA</option>
                          <option value="New York" className="dark:text-black">Manhattan, NY</option>
                          <option value="Miami" className="dark:text-black">Miami Waterfront</option>
                          <option value="Aspen" className="dark:text-black">Aspen, CO</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">LIVABLE SQUARE FOOTAGE</label>
                        <input
                          type="number"
                          value={formData.sqft}
                          onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                          placeholder="e.g. 5500"
                          className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.sqft ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                        />
                        {errors.sqft && <p className="text-[10px] text-red-500 mt-1">{errors.sqft}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <p className="font-serif font-semibold text-stone-900 dark:text-stone-50 text-base">Step 2: Specifications & Architectural Finishes</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">BEDROOMS</label>
                      <input
                        type="number"
                        value={formData.beds}
                        onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">BATHROOMS</label>
                      <input
                        type="number"
                        value={formData.baths}
                        onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">YEAR BUILT</label>
                      <input
                        type="number"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">FINISHES TIER</label>
                      <select
                        value={formData.finishes}
                        onChange={(e) => setFormData({ ...formData, finishes: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                      >
                        <option value="calacatta" className="dark:text-black">Calacatta Gold Marble + Gaggenau Suites</option>
                        <option value="oak" className="dark:text-black">Hand-Finished solid Oak + SubZero</option>
                        <option value="standard" className="dark:text-black">Good Organic Premium Materials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">STRUCTURAL CONDITION</label>
                      <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                      >
                        <option value="impeccable" className="dark:text-black">Impeccable Modern / Mint</option>
                        <option value="excellent" className="dark:text-black">Excellent Custom Renovated</option>
                        <option value="good" className="dark:text-black">Good Solid Structural Integrity</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <p className="font-serif font-semibold text-stone-900 dark:text-stone-50 text-base">Step 3: Private Registry Registration</p>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">YOUR FULL NAME</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alexander Vance"
                        className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.name ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                      />
                      {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">CORPORATE EMAIL</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vance@capital.com"
                          className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.email ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">DIRECT TELEPHONE LINE</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (310) 317-0190"
                          className={`w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border ${errors.phone ? 'border-red-400' : 'border-stone-200 dark:border-white/10'} rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500`}
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5 font-bold">URGENCY METRIC</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                        className="w-full px-3 py-2 bg-stone-50 dark:bg-white/[0.02] border border-stone-200/50 dark:border-white/10 rounded-lg text-xs text-stone-900 dark:text-stone-100 focus:outline-none cursor-pointer"
                      >
                        <option value="curious" className="dark:text-black">Just examining asset equity indexes</option>
                        <option value="3months" className="dark:text-black">Planning to trade within 3 months</option>
                        <option value="listNow" className="dark:text-black">Looking to list and liquidate immediately</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && valuationResult && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  {/* APPRAISAL BRIEF SHEET OUTPUT */}
                  <div className="text-center space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold">OFFICIAL APPRAISAL RESULT</span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">Appraisal Valuation Brief</h3>
                    <p className="text-xs text-stone-400 font-mono uppercase">{formData.address.toUpperCase()}, {formData.city.toUpperCase()}</p>
                  </div>

                  <div className="bg-stone-50 dark:glass-card p-6 rounded-2xl space-y-4 text-xs font-mono text-stone-600 dark:text-stone-400">
                    <div className="text-center pb-4 border-b border-stone-200/50 dark:border-white/10">
                      <p className="text-[10px] uppercase text-stone-400">PROJECTED MARKET EQUITY RANGE</p>
                      <p className="font-serif text-3xl font-extrabold text-amber-700 dark:text-white mt-1">
                        ${(valuationResult.estimatedValue * 0.95).toLocaleString(undefined, { maximumFractionDigits: 0 })} - ${(valuationResult.estimatedValue * 1.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-[9px] text-stone-400 mt-1 uppercase">ESTIMATED BASIS RATIO: ${Math.round(valuationResult.pricePerSqft)}/SQFT</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1 border-r border-stone-200/50 dark:border-white/10 pr-4">
                        <p className="text-[9px] text-stone-400">REGIONAL DEMAND</p>
                        <p className="text-sm font-sans font-extrabold text-stone-900 dark:text-white">{valuationResult.demandScore}/100 (HIGH)</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] text-stone-400">YOY AREA APPRECIATION</p>
                        <p className="text-sm font-sans font-extrabold text-stone-900 dark:text-white">+{valuationResult.appreciationRate}% PROJ.</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 border-t border-stone-200/50 dark:border-white/10 pt-4">
                      <p><strong>REGISTRY ID:</strong> EVAL-{Math.floor(100000 + Math.random() * 900000)}</p>
                      <p><strong>PROPERTY CLASS:</strong> {valuationResult.propertyClass.toUpperCase()}</p>
                      <p><strong>REGISTERED REPRESENTATIVE:</strong> VICTORIA VANCE-SLOANE</p>
                    </div>
                  </div>

                  {/* PDF Download simulated CTA */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.print()}
                      className="w-1/2 py-2.5 bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 text-stone-850 dark:text-stone-100 text-xs font-mono font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>SAVE APPRAISAL</span>
                    </button>
                    <button
                      onClick={() => {
                        setValuationResult(null);
                        setCurrentStep(1);
                        setFormData({
                          address: '',
                          city: 'Malibu',
                          sqft: '5000',
                          beds: '5',
                          baths: '6',
                          yearBuilt: '2020',
                          finishes: 'calacatta',
                          condition: 'impeccable',
                          name: '',
                          email: '',
                          phone: '',
                          urgency: 'curious',
                        });
                      }}
                      className="w-1/2 py-2.5 bg-stone-900 hover:bg-stone-850 dark:bg-white dark:hover:bg-stone-200 text-white dark:text-[#080808] text-xs font-mono font-bold uppercase rounded-lg cursor-pointer"
                    >
                      NEW APPRAISAL
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form control navigation buttons */}
            {currentStep <= 3 && (
              <div className="flex justify-between border-t border-stone-100 dark:border-white/10 pt-4 mt-6">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1 || isLoading}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase text-stone-500 hover:text-stone-900 dark:hover:text-white disabled:opacity-0 cursor-pointer"
                >
                  PREVIOUS
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-[#080808] text-xs font-mono font-bold uppercase rounded-lg flex items-center gap-1 cursor-pointer hover:bg-stone-800 dark:hover:bg-stone-200"
                  >
                    <span>NEXT STEP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleValuationSubmit}
                    disabled={isLoading}
                    className="px-5 py-2.5 bg-stone-900 dark:bg-white text-white dark:text-[#080808] text-xs font-mono font-bold uppercase rounded-lg cursor-pointer hover:bg-stone-800 dark:hover:bg-stone-200"
                  >
                    {isLoading ? 'ANALYZING LA TRADE LOGS...' : 'CALCULATE APPRAISAL'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
