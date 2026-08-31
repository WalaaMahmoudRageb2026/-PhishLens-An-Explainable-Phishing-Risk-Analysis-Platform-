import React from 'react';
import { TechnicalDetails } from '../types.ts';
import { Lock, Terminal } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface TechnicalDetailsCardProps {
  type: 'url' | 'message';
  details: TechnicalDetails;
}

export const TechnicalDetailsCard: React.FC<TechnicalDetailsCardProps> = ({ type, details }) => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const formatBrandDescription = (desc: string) => {
    if (language === 'en') return desc;
    if (desc.includes('exact brand token') || desc.includes('exact token')) {
      return desc.replace(/The hostname contains the exact brand token "([^"]+)" on an unofficial domain\./, 'يحتوي اسم المضيف على رمز العلامة التجارية المطابق "$1" على نطاق غير رسمي.');
    }
    if (desc.includes('lookalike') || desc.includes('typosquat')) {
      return desc.replace(/The token "([^"]+)" is a visual lookalike \/ typosquat of "([^"]+)"/, 'الرمز "$1" يمثل انتحالاً مطبعياً وتشابهاً بصرياً مع العلامة "$2"');
    }
    return desc;
  };

  return (
    <div
      id="technical-details-card"
      className={`p-6 rounded-2xl border shadow-md transition-colors ${
        isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
      }`}
    >
      <div className={`flex items-center space-x-2 rtl:space-x-reverse pb-3 border-b mb-4 ${isDark ? 'border-[#222]' : 'border-slate-200'}`}>
        <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/30">
          <Terminal className="w-4 h-4" />
        </div>
        <h3 className={`text-xs sm:text-sm font-bold font-mono uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {t.techHeader}
        </h3>
      </div>

      {type === 'url' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techProtocol}</span>
            <span className={`font-mono font-bold flex items-center space-x-1 rtl:space-x-reverse ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Lock className={`w-3.5 h-3.5 ${details.isHttps ? 'text-emerald-500' : 'text-amber-500'}`} />
              <span>{details.scheme?.toUpperCase()}</span>
            </span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techHostname}</span>
            <span className="font-mono font-bold text-orange-500 truncate max-w-[160px]" title={details.hostname}>
              {details.hostname}
            </span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techHostType}</span>
            <span className={`font-mono font-semibold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
              {details.isIpAddress 
                ? (language === 'ar' ? `عنوان ${details.ipVersion}` : `${details.ipVersion} Address`)
                : t.techHostTypeDomain}
            </span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techPort}</span>
            <span className={`font-mono font-semibold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
              {details.port 
                ? `:${details.port}` 
                : (details.isHttps 
                    ? (language === 'ar' ? '443 (الافتراضي لـ HTTPS)' : '443 (Default HTTPS)') 
                    : (language === 'ar' ? '80 (الافتراضي لـ HTTP)' : '80 (Default HTTP)'))}
            </span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techLength}</span>
            <span className={`font-mono font-semibold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>{details.urlLength} {t.charsUnit}</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techSubdomains}</span>
            <span className={`font-mono font-semibold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>{details.subdomainCount}</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techPath}</span>
            <span className={`font-mono truncate max-w-[160px] ${isDark ? 'text-gray-200' : 'text-slate-800'}`} title={details.path || '/'}>
              {details.path || '/'}
            </span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techQuery}</span>
            <span className={`font-mono font-semibold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>{details.queryParamsCount || 0}</span>
          </div>

          {details.matchedKeywords && details.matchedKeywords.length > 0 && (
            <div className={`sm:col-span-2 p-2.5 rounded-lg border ${isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
              <span className={`font-mono font-semibold block mb-1 text-[11px] ${isDark ? 'text-amber-400' : 'text-amber-800'}`}>{t.techTokensDetected}:</span>
              <div className="flex flex-wrap gap-1">
                {details.matchedKeywords.map((kw, i) => (
                  <span key={i} className={`px-2 py-0.5 rounded font-mono text-[11px] border ${isDark ? 'bg-black border-amber-500/40 text-amber-300' : 'bg-white border-amber-300 text-amber-900'}`}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {details.matchedBrands && details.matchedBrands.length > 0 && (
            <div className={`sm:col-span-2 p-2.5 rounded-lg border ${isDark ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50 border-red-200'}`}>
              <span className={`font-mono font-semibold block mb-1 text-[11px] ${isDark ? 'text-red-400' : 'text-red-800'}`}>{t.techBrandHeuristics}:</span>
              <ul className={`list-disc list-inside space-y-0.5 text-[11px] font-mono ${isDark ? 'text-red-300' : 'text-red-700'}`}>
                {details.matchedBrands.map((b, i) => (
                  <li key={i}>
                    <strong>{b.brand}</strong>: {formatBrandDescription(b.description)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techTotalChars}</span>
            <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{details.charCount}</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techWordCount}</span>
            <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{details.wordCount}</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techExtractedLinks}</span>
            <span className={`font-mono font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{details.detectedUrlsCount || 0}</span>
          </div>

          <div className={`p-2.5 rounded-lg border flex items-center justify-between transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className={`font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{t.techUrgencyMarkers}</span>
            <span className="font-mono font-semibold text-orange-500">{details.urgencySignals?.length || 0}</span>
          </div>

          {details.extractedUrls && details.extractedUrls.length > 0 && (
            <div className={`sm:col-span-2 p-2.5 rounded-lg border ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
              <span className={`font-mono font-semibold block mb-1 text-[11px] ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>{t.techExtractedLinksList}:</span>
              <div className="space-y-1">
                {details.extractedUrls.map((url, i) => (
                  <code key={i} className={`block p-1.5 border rounded font-mono text-[11px] text-orange-500 break-all ${isDark ? 'bg-[#0A0A0A] border-[#222]' : 'bg-white border-slate-200'}`}>
                    {url}
                  </code>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
