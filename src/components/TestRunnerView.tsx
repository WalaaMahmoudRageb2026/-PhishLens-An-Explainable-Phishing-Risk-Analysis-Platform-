import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, XCircle, RefreshCw, Terminal } from 'lucide-react';
import { TestResult } from '../types.ts';
import { useApp } from '../context/AppContext.tsx';
import { TEST_CASE_TRANSLATIONS } from '../i18n/localizedRules.ts';

export const TestRunnerView: React.FC = () => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [stats, setStats] = useState<{ total: number; passed: number; failed: number } | null>(null);

  const runTests = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tests/run');
      const data = await res.json();
      setResults(data.results || []);
      setStats({
        total: data.total,
        passed: data.passed,
        failed: data.failed,
      });
    } catch (err) {
      console.error('Failed to run test suite:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  const getLocalizedRiskLevel = (lvl: string) => {
    if (language === 'en') return lvl;
    switch (lvl) {
      case 'LOW':
        return t.riskLow;
      case 'MEDIUM':
        return t.riskMed;
      case 'HIGH':
        return t.riskHigh;
      case 'CRITICAL':
        return t.riskCrit;
      default:
        return lvl;
    }
  };

  return (
    <div id="test-runner-view" className="space-y-6">
      {/* Header Banner */}
      <div
        className={`p-6 rounded-2xl border shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/30">
              <Terminal className="w-5 h-5" />
            </div>
            <h2 className={`text-base sm:text-lg font-bold font-mono tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.testSuiteTitle}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 max-w-2xl font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {t.testSuiteDesc}
          </p>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {stats && (
            <div className={`flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
              isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-emerald-500">{stats.passed} {t.testPassed}</span>
              <span className={isDark ? 'text-gray-600' : 'text-slate-400'}>•</span>
              <span className={stats.failed > 0 ? (isDark ? 'text-red-400 font-bold' : 'text-red-600 font-bold') : (isDark ? 'text-gray-400' : 'text-slate-400')}>
                {stats.failed} {t.testFailed}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={runTests}
            disabled={loading}
            className="inline-flex items-center space-x-1.5 rtl:space-x-reverse px-4 py-2 rounded-xl text-xs font-mono font-bold bg-orange-600 hover:bg-orange-500 text-black transition-colors shadow-xs cursor-pointer disabled:opacity-50 uppercase tracking-wider"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                <span>{t.testExecuting}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-black" />
                <span>{t.testRunButton}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Cases Table */}
      <div
        className={`rounded-2xl border shadow-md overflow-hidden transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <div className={`p-4 border-b flex items-center justify-between transition-colors ${
          isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
        }`}>
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
            {t.testScenarioTitle}
          </span>
          <span className="text-xs text-orange-500 font-mono">testSuite.ts</span>
        </div>

        <div className={`divide-y ${isDark ? 'divide-[#222]' : 'divide-slate-200'}`}>
          {results.map((res) => {
            const isPass = res.passed;
            const localizedTest = TEST_CASE_TRANSLATIONS[res.testCase.id]?.[language];
            const testName = localizedTest?.name || res.testCase.name;
            const testDesc = localizedTest?.description || res.testCase.description;

            return (
              <div
                key={res.testCase.id}
                className={`p-4 sm:p-5 transition-colors ${
                  isDark ? 'hover:bg-[#181818]' : 'hover:bg-slate-50/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="mt-0.5 shrink-0">
                      {isPass ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {testName}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${
                          isDark ? 'bg-white/5 text-gray-400 border-white/10' : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {res.testCase.type === 'url' ? (language === 'ar' ? 'رابط' : 'URL') : (language === 'ar' ? 'رسالة' : 'MESSAGE')}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                            isPass
                              ? isDark ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                              : isDark ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-200'
                          }`}
                        >
                          {isPass ? t.testPassed : t.testFailed}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>{testDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-xs self-start sm:self-auto shrink-0 font-mono">
                    <div className={`px-2.5 py-1 rounded-md border ${
                      isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className={isDark ? 'text-gray-500' : 'text-slate-400'}>{t.testExpected}: </span>
                      <strong className={isDark ? 'text-gray-300' : 'text-slate-700'}>{getLocalizedRiskLevel(res.testCase.expectedRiskLevel)}</strong>
                    </div>
                    <div className={`px-2.5 py-1 rounded-md border ${
                      isDark ? 'bg-orange-950/30 text-orange-400 border-orange-500/30' : 'bg-orange-50 text-orange-800 border-orange-200'
                    }`}>
                      <span className={isDark ? 'text-orange-400/70' : 'text-orange-600'}>{t.testActual}: </span>
                      <strong>{res.actualScore}/100 ({getLocalizedRiskLevel(res.actualRiskLevel)})</strong>
                    </div>
                  </div>
                </div>

                {/* Input snippet */}
                <div className="mt-3 ps-8">
                  <div className={`p-2 rounded-lg border font-mono text-xs text-orange-500 break-all ${
                    isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {res.testCase.input}
                  </div>
                  {res.actualIndicators.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[11px] font-mono">
                      <span className={`font-medium ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{t.testTriggered}:</span>
                      {res.actualIndicators.map((indId, i) => (
                        <span key={i} className={`px-1.5 py-0.5 rounded border font-mono text-[10px] ${
                          isDark ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200'
                        }`}>
                          {indId}
                        </span>
                      ))}
                    </div>
                  )}

                  {res.diffs && (
                    <div className={`mt-2 p-2 rounded border text-xs font-mono ${
                      isDark ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {res.diffs.map((d, i) => (
                        <div key={i}>• {d}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
