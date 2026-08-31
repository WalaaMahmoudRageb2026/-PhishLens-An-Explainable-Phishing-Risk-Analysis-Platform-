import React, { useState } from 'react';
import { Sparkles, Bot, RefreshCw, Info } from 'lucide-react';
import { AnalysisResult } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';

interface AiExplanationCardProps {
  result: AnalysisResult;
}

export const AiExplanationCard: React.FC<AiExplanationCardProps> = ({ result }) => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const [aiText, setAiText] = useState<string | null>(result.aiExplanation || null);
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAiSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/explain/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisResult: result, language })
      });
      const data = await res.json();
      setAiText(data.explanation);
      setSource(data.source || 'gemini-2.5-flash');
    } catch (err) {
      console.error('AI summary error:', err);
      setAiText(language === 'ar' ? 'تعذر الاتصال بمحرك التلخيص الذكي. يرجى مراجعة بطاقات المؤشرات المحددة أدناه.' : 'Failed to query explanation engine. Please refer to the deterministic indicator cards below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="ai-explanation-card"
      className={`p-5 rounded-2xl border shadow-md relative overflow-hidden transition-colors ${
        isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b gap-2 ${isDark ? 'border-[#222]' : 'border-slate-200'}`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-xs sm:text-sm font-bold font-mono uppercase tracking-wider flex items-center space-x-1.5 rtl:space-x-reverse ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span>{t.aiBriefingTitle}</span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${isDark ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                {t.aiOptionalBadge}
              </span>
            </h4>
            <p className={`text-[11px] font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {t.aiBriefingSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchAiSummary}
          disabled={loading}
          className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-orange-600 hover:bg-orange-500 text-black transition-colors cursor-pointer disabled:opacity-50 self-start sm:self-auto uppercase tracking-wider"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
              <span>{t.aiGenerating}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>{aiText ? t.aiRegenerate : t.aiGenerate}</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-3">
        {aiText ? (
          <div className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-colors ${
            isDark ? 'bg-black border-[#222] text-gray-200' : 'bg-slate-50 border-slate-200 text-slate-800'
          }`}>
            <p className="font-sans whitespace-pre-line">{aiText}</p>
            {source && (
              <div className={`mt-2 pt-2 border-t flex items-center justify-between text-[10px] font-mono ${isDark ? 'border-[#222] text-gray-500' : 'border-slate-200 text-slate-400'}`}>
                <span>{t.aiEngineSource}: <strong className="font-mono text-orange-500">{source}</strong></span>
                <span>{t.aiDeterministicScore}: {result.riskScore}/100</span>
              </div>
            )}
          </div>
        ) : (
          <div className={`p-4 rounded-xl border border-dashed text-center transition-colors ${
            isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-300'
          }`}>
            <p className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {t.aiPlaceholder}
            </p>
          </div>
        )}
      </div>

      <div className={`mt-2.5 flex items-center space-x-1.5 rtl:space-x-reverse text-[10px] font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
        <Info className="w-3.5 h-3.5 shrink-0 text-orange-500" />
        <span>{t.aiDisclaimer}</span>
      </div>
    </div>
  );
};
