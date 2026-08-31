import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext.tsx';

interface DemoPresetSelectorProps {
  mode: 'url' | 'message';
  onSelect: (value: string) => void;
}

export const DemoPresetSelector: React.FC<DemoPresetSelectorProps> = ({ mode, onSelect }) => {
  const { theme, t, language } = useApp();
  const isDark = theme === 'dark';

  const urlPresets = [
    {
      label: language === 'ar' ? 'رابط آمن طبيعي (منخفض)' : 'Standard Clean URL (Low)',
      value: 'https://example.com/about',
      badge: language === 'ar' ? '0/100 منخفض' : '0/100 LOW',
      badgeColor: isDark ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    },
    {
      label: language === 'ar' ? 'انتحال علامة تجارية (مرتفع)' : 'Brand Typosquat (High)',
      value: 'https://paypa1-login-example.com/verify/account',
      badge: language === 'ar' ? 'خطر مرتفع' : 'HIGH RISK',
      badgeColor: isDark ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-200'
    },
    {
      label: language === 'ar' ? 'عنوان IP مباشر + HTTP (متوسط)' : 'IP Address + HTTP (Med/High)',
      value: 'http://192.168.1.20/login/auth',
      badge: language === 'ar' ? 'خطر متوسط' : 'MED RISK',
      badgeColor: isDark ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-amber-100 text-amber-800 border border-amber-200'
    },
    {
      label: language === 'ar' ? 'خدعة علامة @ في الرابط (مرتفع)' : 'User-Info @ Trick (High)',
      value: 'https://paypal.com@evil-destination.example/login',
      badge: language === 'ar' ? 'خطر مرتفع' : 'HIGH RISK',
      badgeColor: isDark ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30' : 'bg-orange-100 text-orange-700 border border-orange-200'
    },
    {
      label: language === 'ar' ? 'نطاقات فرعية خادعة (حرج)' : 'Subdomain Combosquatting',
      value: 'https://microsoft.com.account-verify.service.xyz/reset',
      badge: language === 'ar' ? 'خطر حرج' : 'CRITICAL',
      badgeColor: isDark ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-red-100 text-red-700 border border-red-200'
    }
  ];

  const messagePresets = [
    {
      label: language === 'ar' ? 'تنبيه عاجل بإيقاف الحساب' : 'Urgent Account Suspension',
      value: language === 'ar'
        ? 'تنبيه أمني عاجل: تم تعليق حسابك مؤقتاً بسبب محاولات تسجيل دخول مشبوهة. يرجى تأكيد هويتك خلال 24 ساعة لتجنب إغلاق الحساب نهائياً: https://example.com/verify-identity'
        : 'URGENT SECURITY ALERT: Your account has been suspended due to suspicious login attempts. Verify your account immediately within 24 hours to prevent permanent deactivation. Click here to confirm: https://example.com/verify-identity',
      badge: language === 'ar' ? 'خطر حرج' : 'CRITICAL',
      badgeColor: isDark ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-red-100 text-red-700 border border-red-200'
    },
    {
      label: language === 'ar' ? 'بريد عمل اعتيادي' : 'Standard Work Email',
      value: language === 'ar'
        ? 'مرحباً بالفريق، مرفق مسودة جدول أعمال الاجتماع الفني الفصلي يوم الخميس القادم. يرجى إخباري بأي نقاط إضافية ترغبون بمناقشتها. تحياتي، سارة'
        : 'Hi team, please find attached the draft agenda for our quarterly engineering review on Thursday. Let me know if there are any additional topics you would like to add. Best regards, Sarah',
      badge: language === 'ar' ? 'سليم / منخفض' : 'CLEAN / LOW',
      badgeColor: isDark ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
    },
    {
      label: language === 'ar' ? 'احتيال فواتير وتحويل مالي' : 'Financial Invoice BEC Scam',
      value: language === 'ar'
        ? 'يرجى سداد الفاتورة المتأخرة رقم #4928 فوراً عبر التحويل البنكي المباشر لتجنب الرسوم القانونية. قم بتحديث بيانات الدفع عبر الرابط: https://portal-billing-update.top/auth'
        : 'Please process the overdue invoice #4928 immediately via direct wire transfer to avoid legal penalty fees. Update your billing credentials at https://portal-billing-update.top/auth',
      badge: language === 'ar' ? 'خطر مرتفع' : 'HIGH RISK',
      badgeColor: isDark ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-red-100 text-red-700 border border-red-200'
    }
  ];

  const presets = mode === 'url' ? urlPresets : messagePresets;

  return (
    <div
      className={`p-4 rounded-xl border mb-6 transition-colors ${
        isDark ? 'bg-[#141414] border-[#222]' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs font-mono font-bold text-orange-500 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.demoPresetTitle}</span>
        </div>
        <span className={`text-[10px] font-mono ${isDark ? 'text-gray-500' : 'text-slate-400'}`}>{t.demoPresetSubtitle}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {presets.map((preset, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(preset.value)}
            className={`flex items-center justify-between p-2.5 rounded-lg border transition-all text-start group cursor-pointer ${
              isDark
                ? 'bg-black border-[#222] hover:border-orange-500/50 hover:bg-[#181818]'
                : 'bg-slate-50 border-slate-200 hover:border-orange-400 hover:bg-orange-50/40'
            }`}
          >
            <div className="truncate pe-2">
              <span className={`block text-xs font-semibold group-hover:text-orange-500 transition-colors truncate ${
                isDark ? 'text-gray-300' : 'text-slate-700'
              }`}>
                {preset.label}
              </span>
              <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${preset.badgeColor} mt-1`}>
                {preset.badge}
              </span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 shrink-0 transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:rotate-180 transition-all" />
          </button>
        ))}
      </div>
    </div>
  );
};
