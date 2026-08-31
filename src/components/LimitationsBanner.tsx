import React from 'react';
import { AlertTriangle, ArrowRight, Lightbulb, Compass, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

export const LimitationsBanner: React.FC = () => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const limitations = [
    {
      title: t.limitFpFnTitle,
      desc: t.limitFpFnDesc,
    },
    {
      title: t.limitHttpsTitle,
      desc: t.limitHttpsDesc,
    },
    {
      title: t.limitIndTitle,
      desc: t.limitIndDesc,
    },
    {
      title: t.limitBrandTitle,
      desc: t.limitBrandDesc,
    },
    {
      title: t.limitScopeTitle,
      desc: t.limitScopeDesc,
    }
  ];

  const roadmapItems = [
    language === 'ar' ? 'تغذية استخبارات التهديدات اللحظية (Google Safe Browsing, VirusTotal)' : 'Real-time Threat Intelligence API feeds (Google Safe Browsing, VirusTotal)',
    language === 'ar' ? 'تحليل عمر النطاق عبر WHOIS والتحقق من هوية المسجل' : 'Live WHOIS domain age & registrar anonymity analysis',
    language === 'ar' ? 'فحص خوادم DNS التفاعلي وكشف البنية التحتية سريعة التغير (Fast-Flux)' : 'Passive DNS resolution & fast-flux infrastructure detection',
    language === 'ar' ? 'تحليل متقدم لترويسات البريد الإلكتروني (محاذاة SPF, DKIM, DMARC)' : 'Deep email header parsing (SPF, DKIM, DMARC alignment)',
    language === 'ar' ? 'محلل بصري لرموز الاستجابة السريعة الخبيثة (Quishing)' : 'QR Code (Quishing) decoder and visual image analyzer',
    language === 'ar' ? 'إضافة متصفح للفحص المباشر في الوقت الفعلي بمبدأ Zero-Trust' : 'Browser extension for inline real-time zero-trust page evaluation'
  ];

  return (
    <div id="methodology-limitations-view" className="space-y-6">
      {/* Header */}
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-base sm:text-lg font-bold font-mono tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.limitHeaderTitle}
            </h2>
            <p className={`text-xs sm:text-sm mt-0.5 font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
              {t.limitHeaderSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Architecture Flow Diagram */}
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <h3 className={`text-xs sm:text-sm font-bold font-mono uppercase tracking-wider mb-4 flex items-center space-x-2 rtl:space-x-reverse ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Compass className="w-4 h-4 text-orange-500" />
          <span>{t.limitFlowTitle}</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
          <div className={`p-3 rounded-xl border transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase block mb-1">STEP 1</span>
            <strong className={`font-mono text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>INPUT_CAPTURE</strong>
            <p className={`text-[10px] mt-1 font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>String normalization</p>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase block mb-1">STEP 2</span>
            <strong className={`font-mono text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>STATIC_PARSER</strong>
            <p className={`text-[10px] mt-1 font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>RFC &amp; URL structures</p>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase block mb-1">STEP 3</span>
            <strong className={`font-mono text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>INDICATOR_RULES</strong>
            <p className={`text-[10px] mt-1 font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Deterministic heuristics</p>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase block mb-1">STEP 4</span>
            <strong className={`font-mono text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>RISK_NORMALIZER</strong>
            <p className={`text-[10px] mt-1 font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>0-100 bounded score</p>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'}`}>
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase block mb-1">STEP 5</span>
            <strong className={`font-mono text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>EXPLAINABILITY</strong>
            <p className={`text-[10px] mt-1 font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>Evidence &amp; Why breakdown</p>
          </div>

          <div className={`p-3 rounded-xl border transition-colors ${isDark ? 'bg-orange-950/30 border-orange-500/40 text-orange-300' : 'bg-orange-50 border-orange-300 text-orange-800'}`}>
            <span className="text-[10px] font-mono font-bold text-orange-500 uppercase block mb-1">OPTIONAL</span>
            <strong className={`font-mono text-xs ${isDark ? 'text-orange-200' : 'text-orange-900'}`}>AI_SYNTHESIS</strong>
            <p className={`text-[10px] mt-1 font-mono ${isDark ? 'text-orange-400/80' : 'text-orange-700'}`}>Natural-language briefing</p>
          </div>
        </div>
      </div>

      {/* Limitations Grid */}
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <h3 className={`text-xs sm:text-sm font-bold font-mono uppercase tracking-wider mb-4 flex items-center space-x-2 rtl:space-x-reverse ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <span>{t.limitSectionTitle}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {limitations.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-colors ${
                isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h4 className="text-xs font-bold font-mono text-orange-500 flex items-center space-x-1.5 rtl:space-x-reverse mb-1">
                <span>• {item.title}</span>
              </h4>
              <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Roadmap */}
      <div
        className={`p-6 rounded-2xl border shadow-md transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <h3 className={`text-xs sm:text-sm font-bold font-mono uppercase tracking-wider mb-4 flex items-center space-x-2 rtl:space-x-reverse ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <Lightbulb className="w-4 h-4 text-orange-500" />
          <span>{t.limitRoadmapTitle}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {roadmapItems.map((roadmap, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono transition-colors ${
                isDark ? 'bg-black border-[#222] text-gray-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5 text-orange-500 shrink-0 rtl:rotate-180" />
              <span>{roadmap}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
