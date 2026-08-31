import React, { useState, useEffect } from 'react';
import { Search, Link as LinkIcon, RefreshCw, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { AnalysisResult } from '../types.ts';
import { RiskScoreGauge } from './RiskScoreGauge.tsx';
import { WhyExplanationSection } from './WhyExplanationSection.tsx';
import { TechnicalDetailsCard } from './TechnicalDetailsCard.tsx';
import { RecommendationsCard } from './RecommendationsCard.tsx';
import { DemoPresetSelector } from './DemoPresetSelector.tsx';
import { AiExplanationCard } from './AiExplanationCard.tsx';
import { useApp } from '../context/AppContext.tsx';
import { getLocalizedIndicator } from '../i18n/localizedRules.ts';

export const UrlAnalyzerView: React.FC = () => {
  const [urlInput, setUrlInput] = useState('https://paypal-login-example.com/verify/account');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const handleAnalyze = async (targetUrl?: string) => {
    const urlToTest = (targetUrl || urlInput).trim();
    if (!urlToTest) {
      setError(t.urlErrorEmpty);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/analyze/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlToTest })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to analyze URL.');
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the URL.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze('https://paypal-login-example.com/verify/account');
  }, []);

  const handlePresetSelect = (presetUrl: string) => {
    setUrlInput(presetUrl);
    handleAnalyze(presetUrl);
  };

  return (
    <div className="space-y-6">
      {/* Input Box Card */}
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200 shadow-slate-100'
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <LinkIcon className="w-4 h-4" />
          </div>
          <h2 className={`text-sm sm:text-base font-bold font-mono tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.urlInputLabel}
          </h2>
        </div>
        <p className={`text-xs mb-4 font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          {t.urlInputSublabel}
        </p>

        {/* Preset Selector */}
        <DemoPresetSelector mode="url" onSelect={handlePresetSelect} />

        {/* Search Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute start-3.5 top-3.5" />
            <input
              id="url-input-field"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t.urlInputPlaceholder}
              className={`w-full ps-10 pe-4 py-2.5 text-xs sm:text-sm rounded-xl border focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-colors ${
                isDark
                  ? 'bg-black border-[#333] text-orange-100 placeholder:text-gray-600'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <button
            id="url-analyze-btn"
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-orange-600 hover:bg-orange-500 text-black transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-xs cursor-pointer disabled:opacity-50 shrink-0 uppercase tracking-wider"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>{t.urlAnalyzingBtn}</span>
              </>
            ) : (
              <>
                <span>{t.urlAnalyzeBtn}</span>
                <ArrowRight className="w-4 h-4 text-black rtl:rotate-180" />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-500 flex items-center space-x-2 rtl:space-x-reverse">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Display Area */}
      {result && (
        <div className="space-y-6">
          {/* Target Header Banner */}
          <div
            className={`p-5 rounded-2xl shadow-sm border flex flex-col md:flex-row md:items-center md:justify-between gap-3 transition-colors ${
              isDark ? 'bg-[#0D0D0D] border-[#222] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="truncate">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                {t.urlTargetLabel}
              </span>
              <code className="text-xs sm:text-sm font-mono text-orange-500 font-semibold break-all">
                {result.input}
              </code>
            </div>
            <div className="text-start md:text-end shrink-0 font-mono">
              <span className={`text-[10px] block uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                {language === 'ar' ? 'الوقت والتاريخ' : 'TIMESTAMP'}
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {new Date(result.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Top Row: Gauge + Executive Summary / AI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <RiskScoreGauge score={result.riskScore} level={result.riskLevel} />
            </div>

            <div className="lg:col-span-2 space-y-4">
              {/* Optional AI Natural-Language Layer */}
              <AiExplanationCard result={result} />

              {/* Detected Indicators Quick List */}
              <div
                className={`p-5 rounded-2xl border shadow-md transition-colors ${
                  isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
                }`}
              >
                <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  {t.msgVectorsTitle(result.indicators.length)}
                </h3>
                {result.indicators.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.indicators.map((rawInd) => {
                      const ind = getLocalizedIndicator(rawInd, language);
                      return (
                        <div
                          key={ind.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                            isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="truncate pe-2">
                            <span className={`block text-xs font-semibold truncate ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
                              {ind.name}
                            </span>
                            <span className={`text-[10px] font-mono ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
                              {ind.category}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-orange-500/15 text-orange-500 border border-orange-500/30 shrink-0">
                            +{ind.score}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{t.whyCleanTitle}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Core Explainability "Why?" Section */}
          <WhyExplanationSection indicators={result.indicators} />

          {/* Technical Details & Mitigation Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TechnicalDetailsCard type="url" details={result.technicalDetails} />
            <RecommendationsCard recommendations={result.recommendations} riskLevel={result.riskLevel} />
          </div>
        </div>
      )}
    </div>
  );
};
