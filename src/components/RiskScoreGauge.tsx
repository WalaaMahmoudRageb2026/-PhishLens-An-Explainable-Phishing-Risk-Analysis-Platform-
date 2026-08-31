import React from 'react';
import { RiskLevel } from '../types.ts';
import { ShieldCheck, AlertCircle, AlertOctagon, Flame } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface RiskScoreGaugeProps {
  score: number;
  level: RiskLevel;
}

export const RiskScoreGauge: React.FC<RiskScoreGaugeProps> = ({ score, level }) => {
  const { theme, t } = useApp();
  const isDark = theme === 'dark';

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference * 0.75;

  const getLevelConfig = () => {
    switch (level) {
      case 'CRITICAL':
        return {
          textColor: isDark ? 'text-red-400' : 'text-red-600',
          bgColor: isDark ? 'bg-[#141414]' : 'bg-white',
          borderColor: isDark ? 'border-red-500/40' : 'border-red-300',
          strokeColor: '#ef4444',
          badgeBg: isDark ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-red-50 text-red-700 border border-red-200',
          icon: <Flame className="w-5 h-5 text-red-500" />,
          summaryText: t.gaugeCritText,
          levelLabel: t.gaugeCrit,
        };
      case 'HIGH':
        return {
          textColor: isDark ? 'text-orange-400' : 'text-orange-600',
          bgColor: isDark ? 'bg-[#141414]' : 'bg-white',
          borderColor: isDark ? 'border-orange-500/40' : 'border-orange-300',
          strokeColor: '#f97316',
          badgeBg: isDark ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-orange-50 text-orange-700 border border-orange-200',
          icon: <AlertOctagon className="w-5 h-5 text-orange-500" />,
          summaryText: t.gaugeHighText,
          levelLabel: t.gaugeHigh,
        };
      case 'MEDIUM':
        return {
          textColor: isDark ? 'text-amber-400' : 'text-amber-600',
          bgColor: isDark ? 'bg-[#141414]' : 'bg-white',
          borderColor: isDark ? 'border-amber-500/40' : 'border-amber-300',
          strokeColor: '#f59e0b',
          badgeBg: isDark ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-amber-50 text-amber-800 border border-amber-200',
          icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
          summaryText: t.gaugeMedText,
          levelLabel: t.gaugeMed,
        };
      case 'LOW':
      default:
        return {
          textColor: isDark ? 'text-emerald-400' : 'text-emerald-600',
          bgColor: isDark ? 'bg-[#141414]' : 'bg-white',
          borderColor: isDark ? 'border-[#222]' : 'border-emerald-200',
          strokeColor: '#10b981',
          badgeBg: isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-200',
          icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
          summaryText: t.gaugeLowText,
          levelLabel: t.gaugeLow,
        };
    }
  };

  const config = getLevelConfig();

  return (
    <div
      id="risk-score-card"
      className={`p-6 rounded-2xl border ${config.borderColor} ${config.bgColor} shadow-lg flex flex-col items-center text-center relative overflow-hidden transition-colors`}
    >
      {/* Educational notice pill */}
      <div
        className={`mb-4 inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1 rounded-full text-[11px] font-mono font-semibold border ${
          isDark ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}
      >
        <span>{t.gaugeAssessmentBadge}</span>
      </div>

      {/* SVG Arc Gauge */}
      <div className="relative w-44 h-44 flex items-center justify-center my-2">
        <svg className="w-full h-full transform -rotate-135" viewBox="0 0 160 160">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={isDark ? '#222222' : '#e2e8f0'}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.25}
            strokeLinecap="round"
          />
          {/* Active Risk Score Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="transparent"
            stroke={config.strokeColor}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className={`text-4xl font-mono font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {score}
            </span>
            <span className={`text-sm font-mono ms-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>/100</span>
          </div>
          <span className={`text-[10px] font-mono uppercase tracking-widest mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {t.gaugeRiskScoreLabel}
          </span>
        </div>
      </div>

      {/* Severity Badge */}
      <div className="mt-2 flex items-center space-x-2 rtl:space-x-reverse">
        {config.icon}
        <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold tracking-widest uppercase ${config.badgeBg}`}>
          {config.levelLabel}
        </span>
      </div>

      <p className={`mt-3 text-xs max-w-xs leading-relaxed font-sans ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
        {config.summaryText}
      </p>

      {/* Distinction Reminder */}
      <div className={`mt-4 pt-3 border-t w-full text-start font-mono ${isDark ? 'border-[#222]' : 'border-slate-200'}`}>
        <div className={`flex items-center justify-between text-[10px] ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
          <span>{t.scaleLow}</span>
          <span>{t.scaleMed}</span>
          <span>{t.scaleHigh}</span>
          <span>{t.scaleCrit}</span>
        </div>
      </div>
    </div>
  );
};
