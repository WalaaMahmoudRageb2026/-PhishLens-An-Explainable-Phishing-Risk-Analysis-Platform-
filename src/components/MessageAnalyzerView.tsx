import React, { useState } from 'react';
import { Mail, RefreshCw, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { AnalysisResult } from '../types.ts';
import { RiskScoreGauge } from './RiskScoreGauge.tsx';
import { WhyExplanationSection } from './WhyExplanationSection.tsx';
import { TechnicalDetailsCard } from './TechnicalDetailsCard.tsx';
import { RecommendationsCard } from './RecommendationsCard.tsx';
import { DemoPresetSelector } from './DemoPresetSelector.tsx';
import { AiExplanationCard } from './AiExplanationCard.tsx';
import { useApp } from '../context/AppContext.tsx';
import { getLocalizedIndicator } from '../i18n/localizedRules.ts';

export const MessageAnalyzerView: React.FC = () => {
  const [messageInput, setMessageInput] = useState(
    'URGENT SECURITY NOTICE: Your account has been suspended due to unauthorized login attempts. Verify your account immediately. You have 24 hours to confirm your password or access will be permanently revoked. Click here: https://example.com/verify-identity'
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const handleAnalyze = async (customMessage?: string) => {
    const textToTest = (customMessage || messageInput).trim();
    if (!textToTest) {
      setError(t.msgErrorEmpty);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/analyze/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToTest })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to analyze message.');
      }

      const data: AnalysisResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the message.');
    } finally {
      setLoading(false);
    }
  };

  const handlePresetSelect = (presetMsg: string) => {
    setMessageInput(presetMsg);
    handleAnalyze(presetMsg);
  };

  return (
    <div className="space-y-6">
      {/* Input Form Card */}
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200 shadow-slate-100'
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <Mail className="w-4 h-4" />
          </div>
          <h2 className={`text-sm sm:text-base font-bold font-mono tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.msgInputLabel}
          </h2>
        </div>
        <p className={`text-xs mb-4 font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
          {t.msgInputSublabel}
        </p>

        {/* Preset Selector */}
        <DemoPresetSelector mode="message" onSelect={handlePresetSelect} />

        {/* Textarea Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAnalyze();
          }}
          className="space-y-3"
        >
          <div className="relative">
            <textarea
              id="message-textarea-field"
              rows={5}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t.msgInputPlaceholder}
              className={`w-full p-4 text-xs sm:text-sm rounded-xl border focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono leading-relaxed transition-colors ${
                isDark
                  ? 'bg-black border-[#333] text-orange-100 placeholder:text-gray-600'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className={`text-[11px] font-mono ${isDark ? 'text-gray-500' : 'text-slate-500'}`}>
              {t.msgCharCount(messageInput.length, messageInput.split(/\s+/).filter(Boolean).length)}
            </span>

            <button
              id="message-analyze-btn"
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-orange-600 hover:bg-orange-500 text-black transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse shadow-xs cursor-pointer disabled:opacity-50 uppercase tracking-wider self-end sm:self-auto"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-black" />
                  <span>{t.msgAnalyzingBtn}</span>
                </>
              ) : (
                <>
                  <span>{t.msgAnalyzeBtn}</span>
                  <ArrowRight className="w-4 h-4 text-black rtl:rotate-180" />
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-500 flex items-center space-x-2 rtl:space-x-reverse">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Target Header Banner */}
          <div
            className={`p-5 rounded-2xl shadow-sm border transition-colors ${
              isDark ? 'bg-[#0D0D0D] border-[#222] text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest block mb-1 ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
              {t.msgRawSnippetLabel}
            </span>
            <blockquote className={`text-xs sm:text-sm italic line-clamp-3 font-mono border-l-2 border-orange-500 rtl:border-l-0 rtl:border-r-2 ps-3 ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>
              &quot;{result.input}&quot;
            </blockquote>
          </div>

          {/* Top Row: Gauge + AI Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <RiskScoreGauge score={result.riskScore} level={result.riskLevel} />
            </div>

            <div className="lg:col-span-2 space-y-4">
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
            <TechnicalDetailsCard type="message" details={result.technicalDetails} />
            <RecommendationsCard recommendations={result.recommendations} riskLevel={result.riskLevel} />
          </div>
        </div>
      )}
    </div>
  );
};
