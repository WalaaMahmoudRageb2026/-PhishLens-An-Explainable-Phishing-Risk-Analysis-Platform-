import React from 'react';
import { Cpu, Terminal, BookOpen, Layers, Globe, Sun, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface HeaderProps {
  activeTab: 'analyzer' | 'tests' | 'rules' | 'docs';
  setActiveTab: (tab: 'analyzer' | 'tests' | 'rules' | 'docs') => void;
  analysisMode: 'url' | 'message';
  setAnalysisMode: (mode: 'url' | 'message') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const { language, toggleLanguage, theme, toggleTheme, t } = useApp();
  const isDark = theme === 'dark';

  return (
    <header
      id="main-header"
      className={`border-b sticky top-0 z-30 shadow-md transition-colors duration-200 ${
        isDark ? 'border-[#222] bg-[#0D0D0D]' : 'border-slate-200 bg-white/95 backdrop-blur-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-lg ring-1 ring-orange-500/30 shrink-0">
              Φ
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse flex-wrap gap-y-1">
                <h1 className={`text-xl font-light tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.appTitle}<span className="font-bold text-orange-500">{t.appTitleSuffix}</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/10 text-orange-500 border border-orange-500/30">
                  {t.appMvpBadge}
                </span>
                <span className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono ${
                  isDark ? 'text-gray-400 bg-white/5 border border-white/10' : 'text-slate-600 bg-slate-100 border border-slate-200'
                }`}>
                  {t.appEngineBadge}
                </span>
              </div>
              <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Controls: Navigation Tabs + Theme & Language Switchers */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pb-1 md:pb-0 flex-wrap gap-y-2">
            {/* Tabs */}
            <div className="flex items-center space-x-1 sm:space-x-1.5 rtl:space-x-reverse">
              <button
                id="tab-analyzer"
                type="button"
                onClick={() => setActiveTab('analyzer')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center space-x-1.5 rtl:space-x-reverse whitespace-nowrap cursor-pointer ${
                  activeTab === 'analyzer'
                    ? isDark
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/40 shadow-xs'
                      : 'bg-orange-50 text-orange-700 border border-orange-300 font-bold shadow-xs'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>{t.tabAnalyzer}</span>
              </button>

              <button
                id="tab-tests"
                type="button"
                onClick={() => setActiveTab('tests')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center space-x-1.5 rtl:space-x-reverse whitespace-nowrap cursor-pointer ${
                  activeTab === 'tests'
                    ? isDark
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/40 shadow-xs'
                      : 'bg-orange-50 text-orange-700 border border-orange-300 font-bold shadow-xs'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{t.tabTests}</span>
              </button>

              <button
                id="tab-rules"
                type="button"
                onClick={() => setActiveTab('rules')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center space-x-1.5 rtl:space-x-reverse whitespace-nowrap cursor-pointer ${
                  activeTab === 'rules'
                    ? isDark
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/40 shadow-xs'
                      : 'bg-orange-50 text-orange-700 border border-orange-300 font-bold shadow-xs'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{t.tabRules}</span>
              </button>

              <button
                id="tab-docs"
                type="button"
                onClick={() => setActiveTab('docs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center space-x-1.5 rtl:space-x-reverse whitespace-nowrap cursor-pointer ${
                  activeTab === 'docs'
                    ? isDark
                      ? 'bg-orange-500/15 text-orange-400 border border-orange-500/40 shadow-xs'
                      : 'bg-orange-50 text-orange-700 border border-orange-300 font-bold shadow-xs'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.tabDocs}</span>
              </button>
            </div>

            {/* Separator */}
            <div className={`h-5 w-px mx-1 ${isDark ? 'bg-[#333]' : 'bg-slate-200'}`}></div>

            {/* Language & Theme Controls */}
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              {/* Language Switcher Button */}
              <button
                id="lang-toggle-btn"
                type="button"
                onClick={toggleLanguage}
                title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center space-x-1.5 rtl:space-x-reverse transition-colors cursor-pointer border ${
                  isDark
                    ? 'bg-black border-[#333] text-orange-400 hover:border-orange-500/60 hover:text-orange-300'
                    : 'bg-slate-100 border-slate-300 text-orange-700 hover:bg-slate-200 hover:border-orange-400'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                id="theme-toggle-btn"
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Switch to Light Mode' : 'التبديل إلى الوضع الداكن'}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
                  isDark
                    ? 'bg-black border-[#333] text-amber-400 hover:border-amber-400/60 hover:text-amber-300'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-800" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
