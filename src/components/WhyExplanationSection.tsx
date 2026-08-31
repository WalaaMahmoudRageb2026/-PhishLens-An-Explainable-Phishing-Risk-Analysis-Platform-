import React, { useState } from 'react';
import { DetectedIndicator } from '../types.ts';
import { HelpCircle, ChevronDown, ChevronUp, AlertTriangle, Info, CheckCircle, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { getLocalizedIndicator } from '../i18n/localizedRules.ts';

interface WhyExplanationSectionProps {
  indicators: DetectedIndicator[];
}

export const WhyExplanationSection: React.FC<WhyExplanationSectionProps> = ({ indicators }) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    indicators.length > 0 ? indicators[0].id : null
  );
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const getSeverityBadge = (sev: DetectedIndicator['severity']) => {
    switch (sev) {
      case 'critical':
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isDark ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-red-100 text-red-700 border border-red-200'
          }`}>
            {t.riskCrit}
          </span>
        );
      case 'high':
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-orange-100 text-orange-700 border border-orange-200'
          }`}>
            {t.riskHigh}
          </span>
        );
      case 'medium':
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isDark ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {t.riskMed}
          </span>
        );
      case 'low':
      default:
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
            isDark ? 'bg-white/5 text-gray-300 border border-white/10' : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}>
            {t.riskLow}
          </span>
        );
    }
  };

  if (indicators.length === 0) {
    return (
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse text-emerald-500 mb-2">
          <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <h3 className={`text-sm font-mono font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.whyCleanTitle}
          </h3>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed font-sans ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
          {t.whyCleanDesc}
        </p>
      </div>
    );
  }

  return (
    <div
      id="why-explanation-section"
      className={`rounded-2xl border shadow-md p-6 transition-colors ${
        isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b gap-2 ${isDark ? 'border-[#222]' : 'border-slate-200'}`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-sm sm:text-base font-bold font-mono tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.whySectionTitle}
            </h3>
            <p className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {t.whySectionSubtitle}
            </p>
          </div>
        </div>

        {/* Academic Distinction Badge */}
        <div className={`inline-flex items-center space-x-1 rtl:space-x-reverse px-2.5 py-1 rounded-md text-[10px] font-mono border self-start sm:self-auto ${
          isDark ? 'bg-white/5 text-gray-400 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          <Info className="w-3.5 h-3.5" />
          <span>{t.whyIndicatorCaveat}</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {indicators.map((rawInd, index) => {
          const ind = getLocalizedIndicator(rawInd, language);
          const isExpanded = expandedId === ind.id;
          return (
            <div
              key={ind.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? isDark
                    ? 'border-orange-500/40 bg-[#181818] shadow-sm'
                    : 'border-orange-300 bg-orange-50/40 shadow-xs'
                  : isDark
                    ? 'border-[#222] bg-black hover:border-[#333]'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300'
              }`}
            >
              {/* Collapsible Header */}
              <button
                type="button"
                onClick={() => toggleExpand(ind.id)}
                className="w-full px-4 py-3 flex items-center justify-between text-start focus:outline-hidden cursor-pointer"
              >
                <div className="flex items-center space-x-3 rtl:space-x-reverse pe-2">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full font-mono text-xs font-bold shrink-0 border ${
                    isDark ? 'bg-[#222] text-orange-400 border-[#333]' : 'bg-white text-orange-600 border-slate-300'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{ind.name}</span>
                      {getSeverityBadge(ind.severity)}
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-white text-slate-700 border-slate-200'
                      }`}>
                        +{ind.score} PTS
                      </span>
                    </div>
                    <span className={`text-[11px] font-mono ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>{ind.category}</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-orange-500" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Detailed Breakdown Body */}
              {isExpanded && (
                <div className={`px-4 pb-4 pt-2 border-t space-y-3 text-xs sm:text-sm ${isDark ? 'border-[#222]' : 'border-slate-200'}`}>
                  {/* 1. Evidence */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-black border-[#222]' : 'bg-white border-slate-200'}`}>
                    <div className={`flex items-center space-x-1.5 rtl:space-x-reverse font-mono font-semibold mb-1 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      <ShieldAlert className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{t.whyExtractedEvidence}</span>
                    </div>
                    <code className={`block p-2 rounded font-mono text-xs break-all border ${
                      isDark ? 'bg-[#0A0A0A] text-emerald-400 border-[#222]' : 'bg-slate-50 text-emerald-700 border-slate-200'
                    }`}>
                      {ind.evidence}
                    </code>
                  </div>

                  {/* 2. Why It Matters */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-orange-950/20 border-orange-900/40' : 'bg-orange-50 border-orange-200'}`}>
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold font-mono text-orange-500 mb-1">
                      <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{t.whyItMatters}</span>
                    </div>
                    <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {ind.explanation}
                    </p>
                  </div>

                  {/* 3. Defensive Recommendation */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-emerald-950/20 border-emerald-900/40' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div className="flex items-center space-x-1.5 rtl:space-x-reverse font-bold font-mono text-emerald-500 mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{t.whyAction}</span>
                    </div>
                    <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                      {ind.recommendation}
                    </p>
                  </div>

                  {/* Scientific disclaimer */}
                  <p className={`text-[10px] font-mono italic pt-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                    {t.whyWeightNote(ind.score)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
