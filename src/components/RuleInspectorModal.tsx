import React, { useState } from 'react';
import { SYSTEM_RULES } from '../analyzer/rules.ts';
import { Layers, Search, Filter, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';
import { getLocalizedRule } from '../i18n/localizedRules.ts';

export const RuleInspectorModal: React.FC = () => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.rulesFilterAll },
    { id: 'Domain & Host', label: language === 'ar' ? 'النطاق والمضيف' : 'Domain & Host' },
    { id: 'Protocol & Security', label: language === 'ar' ? 'البروتوكول والأمان' : 'Protocol & Security' },
    { id: 'URL Syntax & Structure', label: language === 'ar' ? 'بنية وهيكل الرابط' : 'URL Syntax & Structure' },
    { id: 'Keywords & Intent', label: language === 'ar' ? 'الكلمات المفتاحية والغرض' : 'Keywords & Intent' },
    { id: 'Brand Impersonation', label: language === 'ar' ? 'انتحال العلامات التجارية' : 'Brand Impersonation' },
    { id: 'Social Engineering', label: language === 'ar' ? 'الهندسة الاجتماعية' : 'Social Engineering' }
  ];

  const filteredRules = SYSTEM_RULES.map(rule => getLocalizedRule(rule, language)).filter(rule => {
    const matchesSearch = rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rule.id.toLowerCase().includes(searchTerm.toLowerCase());
    const originalRule = SYSTEM_RULES.find(r => r.id === rule.id);
    const matchesCat = selectedCategory === 'all' || (originalRule && originalRule.category === selectedCategory);
    return matchesSearch && matchesCat;
  });

  return (
    <div id="rule-catalog-view" className="space-y-6">
      {/* Catalog Header */}
      <div
        className={`p-6 rounded-2xl border shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className={`text-base sm:text-lg font-bold font-mono tracking-wide uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.rulesCatalogTitle}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 max-w-2xl font-mono ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
            {t.rulesCatalogDesc}
          </p>
        </div>

        <div className={`flex items-center space-x-2 rtl:space-x-reverse text-xs font-mono font-semibold px-3 py-1.5 rounded-xl border text-orange-500 transition-colors ${
          isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
        }`}>
          <span>{SYSTEM_RULES.length} {t.rulesActiveCount}</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div
        className={`p-4 rounded-xl border shadow-md flex flex-col sm:flex-row gap-3 transition-colors ${
          isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
        }`}
      >
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 rtl:left-auto rtl:right-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.rulesSearchPlaceholder}
            className={`w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-2 text-xs sm:text-sm rounded-lg border focus:outline-hidden focus:border-orange-500 focus:ring-1 focus:ring-orange-500 font-mono transition-colors ${
              isDark
                ? 'bg-black border-[#333] text-orange-100 placeholder:text-gray-600'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
            }`}
          />
        </div>

        <div className="flex items-center space-x-1.5 rtl:space-x-reverse overflow-x-auto pb-1 sm:pb-0 font-mono">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer uppercase ${
                selectedCategory === cat.id
                  ? 'bg-orange-600 text-black font-bold'
                  : isDark
                    ? 'bg-black border border-[#222] text-gray-400 hover:text-white hover:border-[#333]'
                    : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className={`p-5 rounded-2xl border shadow-md hover:border-orange-500/40 transition-all flex flex-col justify-between ${
              isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                    isDark ? 'bg-black text-orange-400 border-[#333]' : 'bg-slate-100 text-orange-600 border-slate-300'
                  }`}>
                    {rule.id}
                  </span>
                  <h3 className={`text-sm font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{rule.name}</h3>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border shrink-0 ${
                  isDark ? 'bg-orange-500/15 text-orange-400 border-orange-500/30' : 'bg-orange-100 text-orange-700 border-orange-200'
                }`}>
                  +{rule.defaultScore} PTS
                </span>
              </div>

              <div className="mb-3">
                <span className={`inline-flex items-center space-x-1 rtl:space-x-reverse text-[11px] font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>
                  <Tag className="w-3 h-3 text-orange-500/70" />
                  <span>{rule.category}</span>
                </span>
              </div>

              <p className={`text-xs leading-relaxed mb-3 font-sans ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                {rule.description}
              </p>
            </div>

            <div className={`pt-3 border-t -mx-5 -mb-5 p-4 rounded-b-2xl transition-colors ${
              isDark ? 'bg-black border-[#222]' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[11px] font-mono font-bold block mb-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {t.rulesDefensiveRec}:
              </span>
              <p className={`text-[11px] leading-normal font-sans ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {rule.generalRecommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
