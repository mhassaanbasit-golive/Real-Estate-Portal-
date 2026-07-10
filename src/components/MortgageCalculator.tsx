import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, Calculator, Sparkles } from 'lucide-react';

interface MortgageCalculatorProps {
  initialPrice: number;
  hoaFee: number;
}

export default function MortgageCalculator({ initialPrice, hoaFee }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(initialPrice * 0.2); // 20% default
  const [interestRate, setInterestRate] = useState(6.25); // 6.25% default
  const [loanTerm, setLoanTerm] = useState(30); // 30 years default

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalAndInterest, setPrincipalAndInterest] = useState(0);
  const [propertyTax, setPropertyTax] = useState(0);
  const [homeInsurance, setHomeInsurance] = useState(180);

  useEffect(() => {
    // Sync price if initialPrice changes
    setHomePrice(initialPrice);
    setDownPayment(initialPrice * 0.2);
  }, [initialPrice]);

  useEffect(() => {
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let pAndI = 0;
    if (monthlyRate === 0) {
      pAndI = loanAmount / numberOfPayments;
    } else {
      pAndI =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const calculatedTax = (homePrice * 0.011) / 12; // 1.1% property tax divided by 12
    setPrincipalAndInterest(pAndI);
    setPropertyTax(calculatedTax);
    setMonthlyPayment(pAndI + calculatedTax + homeInsurance + hoaFee);
  }, [homePrice, downPayment, interestRate, loanTerm, hoaFee, homeInsurance]);

  const downPaymentPercent = homePrice > 0 ? ((downPayment / homePrice) * 100).toFixed(1) : '0.0';

  return (
    <div id="mortgage-calculator-container" className="bg-white dark:bg-slate-900 border border-stone-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 pb-4 border-b border-stone-100 dark:border-slate-850">
        <div className="p-2 bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-500 rounded-lg">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">Interactive Mortgage Engine</h4>
          <p className="text-xs text-stone-500 dark:text-stone-400">Project private financing rates and structures instantly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sliders and Controls */}
        <div className="space-y-4">
          {/* Home Price Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Home Value</label>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">${homePrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={initialPrice * 0.5}
              max={initialPrice * 1.5}
              step={25000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1 bg-stone-100 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Down Payment Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Down Payment ({downPaymentPercent}%)</label>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">${downPayment.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={homePrice}
              step={10000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1 bg-stone-100 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Interest Rate (Fixed)</label>
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">{interestRate.toFixed(2)}%</span>
            </div>
            <input
              type="range"
              min={2.0}
              max={10.0}
              step={0.125}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-1 bg-stone-100 dark:bg-slate-800 rounded-lg appearance-none"
            />
          </div>

          {/* Loan Term Selection */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">Amortization Term</label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map((years) => (
                <button
                  key={years}
                  onClick={() => setLoanTerm(years)}
                  className={`py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                    loanTerm === years
                      ? 'bg-stone-900 dark:bg-amber-600 text-white dark:text-slate-950 border-stone-900'
                      : 'bg-stone-50 dark:bg-slate-950 text-stone-600 dark:text-stone-400 border border-stone-200/50 dark:border-slate-800 hover:bg-stone-100 dark:hover:bg-slate-850'
                  }`}
                >
                  {years} YEARS
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Breakdown Output */}
        <div className="bg-stone-50 dark:bg-slate-950 border border-stone-100 dark:border-slate-850 rounded-2xl p-6 flex flex-col justify-between">
          <div className="text-center space-y-1.5">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-stone-400 dark:text-stone-500">ESTIMATED INVESTMENT</p>
            <p className="font-serif text-3xl font-extrabold text-stone-900 dark:text-white">
              ${Math.round(monthlyPayment).toLocaleString()}<span className="text-base font-normal text-stone-400 font-sans">/mo</span>
            </p>
            <div className="h-2 w-full flex rounded-full overflow-hidden mt-4">
              <div style={{ width: `${(principalAndInterest / monthlyPayment) * 100}%` }} className="bg-stone-900 dark:bg-amber-600" />
              <div style={{ width: `${(propertyTax / monthlyPayment) * 100}%` }} className="bg-amber-500 dark:bg-amber-400" />
              <div style={{ width: `${(homeInsurance / monthlyPayment) * 100}%` }} className="bg-stone-500 dark:bg-slate-700" />
              <div style={{ width: `${(hoaFee / monthlyPayment) * 100}%` }} className="bg-stone-300 dark:bg-slate-500" />
            </div>
          </div>

          <div className="mt-6 space-y-3 font-mono text-[11px] font-medium text-stone-600 dark:text-stone-400">
            <div className="flex justify-between items-center border-b border-stone-150 dark:border-slate-850 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-stone-900 dark:bg-amber-600" />
                <span>Principal & Interest</span>
              </div>
              <span className="font-bold text-stone-900 dark:text-white">${Math.round(principalAndInterest).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center border-b border-stone-150 dark:border-slate-850 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span>Est. Property Taxes</span>
              </div>
              <span className="font-bold text-stone-900 dark:text-white">${Math.round(propertyTax).toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center border-b border-stone-150 dark:border-slate-850 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-stone-500 dark:bg-slate-700" />
                <span>Home Insurance</span>
              </div>
              <span className="font-bold text-stone-900 dark:text-white">${homeInsurance}</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-stone-300 dark:bg-slate-500" />
                <span>Monthly HOA Dues</span>
              </div>
              <span className="font-bold text-stone-900 dark:text-white">${hoaFee}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
