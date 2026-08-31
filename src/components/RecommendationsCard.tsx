import React from 'react';
import { ShieldCheck, CheckCircle2, AlertOctagon } from 'lucide-react';
import { RiskLevel } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { getLocalizedRecommendations } from '../i18n/localizedRules.ts';

interface RecommendationsCardProps {
  recommendations: string[];
  riskLevel: RiskLevel;
}

export const RecommendationsCard: React.FC<RecommendationsCardProps> = ({
  recommendations,
  riskLevel,
}) => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';
  const isHighRisk = riskLevel === 'HIGH' || riskLevel === 'CRITICAL';
  const localizedRecs = getLocalizedRecommendations(recommendations, language);

  return (
    <div
      id="recommendations-card"
      className={`p-6 rounded-2xl border shadow-md flex flex-col justify-between transition-colors ${
        isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
      }`}
    >
      <div>
        <div className={`flex items-center space-x-2 rtl:space-x-reverse pb-3 border-b mb-4 ${isDark ? 'border-[#222]' : 'border-slate-200'}`}>
          <div
            className={`p-1.5 rounded-lg border ${
              isHighRisk
                ? isDark
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : 'bg-red-50 text-red-600 border-red-200'
                : isDark
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-emerald-50 text-emerald-600 border-emerald-200'
            }`}
          >
            {isHighRisk ? <AlertOctagon className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          </div>
          <h3 className={`text-xs sm:text-sm font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.recHeader}
          </h3>
        </div>

        <ul className="space-y-2.5">
          {localizedRecs.map((rec, index) => (
            <li key={index} className={`flex items-start space-x-2.5 rtl:space-x-reverse text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
              <CheckCircle2
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  isHighRisk
                    ? isDark ? 'text-orange-400' : 'text-orange-600'
                    : isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <span className="leading-snug">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Defensive SOP Guidance */}
      <div
        className={`mt-5 pt-4 border-t -mx-6 -mb-6 p-4 rounded-b-2xl transition-colors ${
          isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between text-xs font-mono">
          <span className={`font-semibold uppercase ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>{t.recSopLabel}</span>
          <span className={`text-[10px] font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>{t.recZeroTrust}</span>
        </div>
        <p className={`text-[11px] mt-1 font-sans ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
          {t.recSopDesc}
        </p>
      </div>
    </div>
  );
};
