import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { Header } from './components/Header.tsx';
import { UrlAnalyzerView } from './components/UrlAnalyzerView.tsx';
import { MessageAnalyzerView } from './components/MessageAnalyzerView.tsx';
import { TestRunnerView } from './components/TestRunnerView.tsx';
import { RuleInspectorModal } from './components/RuleInspectorModal.tsx';
import { LimitationsBanner } from './components/LimitationsBanner.tsx';
import { Link2, Mail } from 'lucide-react';

function MainApp() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'tests' | 'rules' | 'docs'>('analyzer');
  const [analysisMode, setAnalysisMode] = useState<'url' | 'message'>('url');
  const { theme, t } = useApp();
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen font-sans flex flex-col selection:bg-orange-500 selection:text-black transition-colors duration-200 ${
        isDark ? 'bg-[#0A0A0A] text-[#E0E0E0]' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        analysisMode={analysisMode}
        setAnalysisMode={setAnalysisMode}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {activeTab === 'analyzer' && (
          <div className="space-y-6">
            {/* Mode Switcher Buttons */}
            <div className="flex items-center justify-center">
              <div
                className={`p-1 rounded-xl flex items-center space-x-1 rtl:space-x-reverse shadow-inner border transition-colors ${
                  isDark ? 'bg-[#141414] border-[#222]' : 'bg-slate-200/80 border-slate-300'
                }`}
              >
                <button
                  id="mode-url-btn"
                  type="button"
                  onClick={() => setAnalysisMode('url')}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    analysisMode === 'url'
                      ? 'bg-orange-600 text-black font-bold shadow-xs'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Link2 className={`w-4 h-4 ${analysisMode === 'url' ? 'text-black' : 'text-orange-500'}`} />
                  <span>{t.modeUrl}</span>
                </button>

                <button
                  id="mode-message-btn"
                  type="button"
                  onClick={() => setAnalysisMode('message')}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    analysisMode === 'message'
                      ? 'bg-orange-600 text-black font-bold shadow-xs'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Mail className={`w-4 h-4 ${analysisMode === 'message' ? 'text-black' : 'text-orange-500'}`} />
                  <span>{t.modeMessage}</span>
                </button>
              </div>
            </div>

            {/* Active Analysis Mode View */}
            {analysisMode === 'url' ? <UrlAnalyzerView /> : <MessageAnalyzerView />}
          </div>
        )}

        {activeTab === 'tests' && <TestRunnerView />}
        {activeTab === 'rules' && <RuleInspectorModal />}
        {activeTab === 'docs' && <LimitationsBanner />}
      </main>

      {/* Footer */}
      <footer
        className={`border-t py-5 mt-auto transition-colors ${
          isDark ? 'border-[#222] bg-[#0D0D0D]' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center font-bold text-black text-[11px]">
              Φ
            </div>
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-slate-800'}`}>
              {t.footerProject}
            </span>
            <span className={isDark ? 'text-gray-600' : 'text-slate-400'}>
              {t.footerCredit}
            </span>
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse text-[11px] font-mono">
            <span className={`inline-flex items-center space-x-1.5 rtl:space-x-reverse ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t.footerApiConnected}</span>
            </span>
            <span className={isDark ? 'text-gray-600' : 'text-slate-400'}>{t.footerRuleset}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
