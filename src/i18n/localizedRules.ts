import { DetectedIndicator, RuleDefinition, TestCase } from '../types.ts';
import { Language } from './translations.ts';

export interface LocalizedRuleInfo {
  name: string;
  category: string;
  description: string;
  recommendation: string;
  whyItMatters: string;
}

export const RULE_TRANSLATIONS: Record<string, Record<Language, LocalizedRuleInfo>> = {
  rule_ip_address_host: {
    en: {
      name: 'IP Address as Hostname',
      category: 'Domain & Host',
      description: 'The URL uses a raw IP address (IPv4 or IPv6) instead of a standard registered domain name.',
      recommendation: 'Verify if this is an authorized corporate intranet address. Do not enter credentials on public IP-based links.',
      whyItMatters: 'The URL uses an IP address instead of a recognizable domain name. While used in internal testing, attackers frequently use raw IP addresses to bypass domain reputation blocks and avoid domain registration oversight.'
    },
    ar: {
      name: 'عنوان IP مباشر بدلاً من اسم النطاق',
      category: 'النطاق والمضيف',
      description: 'يستخدم الرابط عنوان IP رقمي مباشر (IPv4 أو IPv6) بدلاً من اسم نطاق رسمي مسجل.',
      recommendation: 'تأكد مما إذا كان هذا عنواناً داخلياً معتمداً. لا تقم بإدخال بيانات اعتمادك أو كلمات المرور في روابط تعتمد على عناوين IP عامة.',
      whyItMatters: 'استخدام عنوان IP المباشر يتيح للمهاجمين تجاوز أنظمة تصفية النطاقات وحظر السمعة، وتفادي تسجيل النطاقات الرسمية الخاضعة للرقابة.'
    }
  },
  rule_at_symbol_trick: {
    en: {
      name: 'Embedded User-Info (@ Symbol)',
      category: 'URL Syntax & Structure',
      description: 'The URL contains an "@" symbol, which standard URL specifications interpret as user-info authentication syntax before the real host.',
      recommendation: 'Look past the "@" symbol to locate the actual target domain before clicking.',
      whyItMatters: 'In the URI standard (RFC 3986), characters prior to "@" represent user authentication info, while the characters following "@" indicate the true server. Phishers use this trick to display trusted brand text before "@" while sending victims to an adversarial server.'
    },
    ar: {
      name: 'حيلة رمز @ الخادع في بنية الرابط',
      category: 'بنية وهيكل الرابط',
      description: 'يحتوي الرابط على علامة "@" والتي يتم تفسير ما قبلها كمعلومات مستخدم بينما الوجهة الحقيقية هي ما بعدها.',
      recommendation: 'انتبه إلى اسم المضيف الفعلي الذي يظهر بعد علامة "@" مباشرة قبل التفاعل مع الرابط.',
      whyItMatters: 'وفقاً لمعايير RFC 3986، فإن النصوص التي تسبق علامة "@" تمثل بيانات تسجيل وهمية لخداع الضحية باسم علامة تجارية معروفة، بينما الخادم الحقيقي المستهدف هو المكتوب بعد الرمز.'
    }
  },
  rule_http_protocol: {
    en: {
      name: 'Unencrypted Connection (HTTP)',
      category: 'Protocol & Security',
      description: 'The connection uses unencrypted HTTP instead of HTTPS. Traffic and credentials can be intercepted in transit.',
      recommendation: 'Never submit passwords, personal data, or payment information over plain HTTP connections.',
      whyItMatters: 'Connection is not protected by HTTPS encryption. Any traffic, session cookies, or credentials entered can be intercepted by intermediaries. Note: Plain HTTP is a security weakness and risk indicator, not conclusive proof of a phishing attack.'
    },
    ar: {
      name: 'اتصال غير مشفر (HTTP غير آمن)',
      category: 'البروتوكول والأمان',
      description: 'يستخدم الرابط بروتوكول HTTP غير المشفر بدلاً من HTTPS الآمن، مما يتيح التنصت واعتراض البيانات أثناء النقل.',
      recommendation: 'لا تقم مطلقاً بإدخال كلمات مرور أو بيانات شخصية أو معلومات بطاقات مصرفية عبر صفحات HTTP غير مشفرة.',
      whyItMatters: 'عدم وجود تشفير HTTPS يهدد سرية البيانات عبر هجمات رجل في المنتصف (Man-in-the-Middle)، وهو مؤشر ضعف أمني جسيم.'
    }
  },
  rule_brand_impersonation: {
    en: {
      name: 'Suspected Brand Impersonation / Typosquatting',
      category: 'Brand Impersonation',
      description: 'The hostname closely resembles a well-known brand or institution via character substitution, hyphenation, or domain prepending.',
      recommendation: 'Verify the domain against official trusted bookmarks or search engine results rather than clicking links directly.',
      whyItMatters: 'The hostname contains a token that closely resembles a known brand on an unofficial domain. Threat actors construct deceptive lookalike domains (typosquatting or combosquatting) to mislead users into believing they are on an official service.'
    },
    ar: {
      name: 'انتحال علامة تجارية وهجوم مطبعي (Typosquatting)',
      category: 'انتحال العلامات التجارية',
      description: 'يشبه اسم المضيف علامة تجارية أو جهة موثوقة معروفة من خلال استبدال الأحرف أو دمج الكلمات أو التلاعب البصري.',
      recommendation: 'تحقق من اسم النطاق الرسمي عبر محركات البحث المعتمدة أو المفضلة بدلاً من النقر المباشر على الروابط المشبوهة.',
      whyItMatters: 'يقوم المحتالون بتسجيل نطاقات مشابهة بصرياً لعلامات كبرى (مثل paypa1 أو micr0soft) لاستدراج الضحايا إلى صفحات تسجيل دخول مزيفة مطابقة للأصل.'
    }
  },
  rule_auth_keywords_url: {
    en: {
      name: 'Authentication & Account Keywords in URL',
      category: 'Keywords & Intent',
      description: 'The URL contains sensitive credential or verification keywords (such as login, verify, password, account, reset).',
      recommendation: 'Cross-reference the root domain before entering any login credentials.',
      whyItMatters: 'The URL contains authentication or verification keywords such as login, verify, or password. While legitimate services utilize these endpoints, phishing lures commonly pair these terms with unofficial domains to harvest user accounts.'
    },
    ar: {
      name: 'كلمات ورموز تسجيل دخول وحسابات حساسة بالرابط',
      category: 'الكلمات المفتاحية والغرض',
      description: 'يحتوي مسار الرابط على كلمات حساسة خاصة بالمصادقة (مثل login, verify, password, account, reset).',
      recommendation: 'تأكد جيداً من أن النطاق الأساسي يتبع الجهة الرسمية بالفعل قبل إدخال أي بيانات اعتماد.',
      whyItMatters: 'غالباً ما يدمج المهاجمون كلمات مثل "verify" أو "login" ضمن مسارات الروابط في نطاقات غير رسمية لإيهام المستخدم بضرورة إدخال كلمة المرور.'
    }
  },
  rule_excessive_subdomains: {
    en: {
      name: 'Excessive Subdomain Depth',
      category: 'Domain & Host',
      description: 'The hostname contains an unusually high number of subdomains (3+), a technique often used to disguise secondary phishing hosts.',
      recommendation: 'Inspect the right-most root domain part to confirm the true registrant.',
      whyItMatters: 'The domain structure has deep nesting. Phishing campaigns often construct elaborate subdomains (e.g. "paypal.verify.secure.example.com") to push the actual root domain off mobile screen views.'
    },
    ar: {
      name: 'تعدد النطاقات الفرعية بشكل مفرط ومشبوه',
      category: 'النطاق والمضيف',
      description: 'يحتوي اسم المضيف على عدد كبير من النطاقات الفرعية (3 أو أكثر) لإخفاء النطاق الحقيقي للجهة.',
      recommendation: 'اقرأ اسم النطاق من اليمين إلى اليسار لمعرفة النطاق الجذري الحقيقي المسجل للخدمة.',
      whyItMatters: 'يستخدم المهاجمون تسلسلاً طويلاً من النطاقات الفرعية (مثل paypal.account.verify.malicious-site.com) لإخفاء اسم الموقع الحقيقي خاصة على شاشات الهواتف.'
    }
  },
  rule_excessive_url_length: {
    en: {
      name: 'Excessive URL Length',
      category: 'URL Syntax & Structure',
      description: 'The overall URL exceeds 100 characters in length, which is frequently used to obscure malicious parameters or push hosts off-screen.',
      recommendation: 'Examine the destination components carefully when encountering abnormally long links.',
      whyItMatters: 'Abnormally long URLs are often engineered to hide tracking payloads, base64 redirects, or conceal the true host destination from user address bars.'
    },
    ar: {
      name: 'طول الرابط مفرط وغير معتاد',
      category: 'بنية وهيكل الرابط',
      description: 'يتجاوز طول الرابط 90-100 حرف، وهو أسلوب يُستخدم كثيراً لإخفاء المعلمات الخبيثة وتمرير حمولات ملغمة.',
      recommendation: 'افحص معلمات الرابط بحذر شديد عند مواجهة روابط شديدة الطول وغير مبررة.',
      whyItMatters: 'تُبنى الروابط المفرطة الطول لإخفاء روابط إعادة توجيه مشفرة أو حجب النطاق الحقيقي عن شريط عنوان المتصفح.'
    }
  },
  rule_suspicious_encoding: {
    en: {
      name: 'Abnormal URL Encoding / Obfuscation',
      category: 'URL Syntax & Structure',
      description: 'The URL utilizes excessive percent-encoding, double-encoding, or non-standard characters to obfuscate the real target.',
      recommendation: 'Do not follow URLs with deeply obfuscated hex representations or disguised redirects.',
      whyItMatters: 'The URL incorporates non-ASCII homoglyphs (IDN homograph attack) or heavy percent-encoding designed to obscure the plain-text destination from standard visual inspection.'
    },
    ar: {
      name: 'تشفير وتمويه غير طبيعي لمحتوى الرابط (Punycode / Obfuscation)',
      category: 'بنية وهيكل الرابط',
      description: 'يستخدم الرابط تشفيراً مفرطاً لرموز النسبة المئوية (%) أو حروف أجنبية متشابهة بصرياً (Punycode) للتمويه.',
      recommendation: 'احذر من الروابط التي تحتوي على حروف مشوهة أو تشفيرات hex مكثفة.',
      whyItMatters: 'تُستغل هجمات التجانس البصري (Homograph Attack) لإيهام المستخدم بأحرف لاتينية بينما هي رموز لغات أخرى تشير لخادم مختلف كلياً.'
    }
  },
  rule_suspicious_tld: {
    en: {
      name: 'High-Abuse Top-Level Domain (TLD)',
      category: 'Domain & Host',
      description: 'The domain utilizes a TLD statistically associated with high rates of malicious campaign registration (e.g. .tk, .ml, .top, .work, .buzz).',
      recommendation: 'Treat domains on free or high-abuse registrars with heightened skepticism.',
      whyItMatters: 'Top-Level Domains such as .top, .xyz, or .buzz feature low-cost or free registrations that are disproportionately represented in disposable phishing attacks.'
    },
    ar: {
      name: 'امتداد نطاق عالي الخطورة والاستغلال (Suspicious TLD)',
      category: 'النطاق والمضيف',
      description: 'ينتهي النطاق بامتدادات ترتبط إحصائياً بمعدلات مرتفعة من الحملات الاحتيالية المجانية والمؤقتة (مثل .top, .xyz, .tk).',
      recommendation: 'تعامل بحذر مضاعف مع النطاقات المسجلة عبر امتدادات رخيصة أو مجانية غير مألوفة.',
      whyItMatters: 'تتيح هذه الامتدادات للمهاجمين تسجيل مئات النطاقات بتكلفة زهيدة لشن هجمات تصيد احتيالي سريعة الاستهلاك.'
    }
  },
  rule_non_standard_port: {
    en: {
      name: 'Non-Standard Web Port',
      category: 'Protocol & Security',
      description: 'The URL targets an unusual port instead of standard web ports (80 for HTTP or 443 for HTTPS).',
      recommendation: 'Verify whether the non-standard port is legitimate infrastructure before connecting.',
      whyItMatters: 'Web applications typically serve public traffic over port 80 (HTTP) or 443 (HTTPS). Non-standard ports can signify rogue proxy tunnels, staging servers, or evasion techniques.'
    },
    ar: {
      name: 'منفذ اتصال ويب غير قياسي (Non-Standard Port)',
      category: 'البروتوكول والأمان',
      description: 'يتصل الرابط عبر منفذ مخصص غير معتاد بدلاً من المنافذ القياسية لتصفح الويب (80 أو 443).',
      recommendation: 'تأكد من أن المنفذ المخصص يتبع بيئة عمل معتمدة وليس خادم وسيط غير مصرح به.',
      whyItMatters: 'قد تشير المنافذ غير القياسية إلى أنظمة بروكسي هجومية أو خوادم وسيطة لتجاوز جدران الحماية المؤسسية.'
    }
  },
  rule_urgency_pressure: {
    en: {
      name: 'High Urgency & Artificial Time Constraint',
      category: 'Social Engineering',
      description: 'The message exerts psychological pressure by giving urgent deadlines (e.g., "within 24 hours", "immediate action required").',
      recommendation: 'Pause and independently assess the communication. Genuine security matters allow for deliberate verification via official support.',
      whyItMatters: 'Phishing and social engineering attacks frequently employ artificial urgency to induce fear or panic, prompting recipients to bypass standard security verification procedures.'
    },
    ar: {
      name: 'استعجال مصطنع وضغط زمني نفسي',
      category: 'الهندسة الاجتماعية',
      description: 'تمارس الرسالة ضغطاً نفسياً عبر فرض مهل زمنية ضيقة (مثل "خلال 24 ساعة" أو "اتخاذ إجراء فوري").',
      recommendation: 'تمهل ولا تستجب بدافع الذعر. الإجراءات الرسمية الحقيقية تتيح لك دائماً وقتاً للتحقق عبر الدعم الفني المعتمد.',
      whyItMatters: 'الاستعجال المصطنع هو التكتيك الأول في الهندسة الاجتماعية لإفقاد الضحية التفكير العقلاني ودفعه لتجاوز خطوات التحقق الأمني.'
    }
  },
  rule_threat_suspension: {
    en: {
      name: 'Account Suspension & Penalty Threat',
      category: 'Social Engineering',
      description: 'The message threatens negative consequences such as account termination, legal action, or service revocation.',
      recommendation: 'Do not click links inside the email. Open a new browser tab, navigate to the official website, and check your real account notification center.',
      whyItMatters: 'Scammers claim an account is suspended or compromised to compel the user into entering credentials on an attacker-controlled portal under duress.'
    },
    ar: {
      name: 'تهديد بإيقاف الحساب أو اتخاذ إجراءات عقابية',
      category: 'الهندسة الاجتماعية',
      description: 'تتضمن الرسالة تهديدات بتعطيل الحساب نهائياً، غرامات مالية، أو ملاحقة قانونية لإجبار المستخدم على التجاوب.',
      recommendation: 'لا تنقر على الروابط داخل الرسالة. افتح تبويباً جديداً وادخل إلى حسابك من الموقع الرسمي للتأكد من حالة حسابك.',
      whyItMatters: 'الادعاء الكاذب بتعليق الحساب يستغل الخوف من فقدان الخدمة أو البيانات لإجبار المستخدم على كشف كلمة مروره فوراً.'
    }
  },
  rule_credential_solicitation: {
    en: {
      name: 'Credential or Password Solicitation',
      category: 'Social Engineering',
      description: 'The message requests your password, PIN, two-factor code, or directs you to input credentials immediately.',
      recommendation: 'Never provide passwords, one-time SMS passcodes, or banking credentials through email or unsolicited forms.',
      whyItMatters: 'The communication directly requests credential verification, password updates, or personal security details. Legitimate organizations almost never email asking you to disclose credentials directly.'
    },
    ar: {
      name: 'طلب صريح لكلمات المرور وبيانات الاعتماد (Credential Solicitation)',
      category: 'الهندسة الاجتماعية',
      description: 'تطلب الرسالة إدخال كلمة المرور، رمز PIN، أو رموز التحقق بخطوتين (OTP) لتأكيد الهوية.',
      recommendation: 'لا تقم أبداً بمشاركة كلمات المرور أو رموز التحقق المرسلة إلى هاتفك عبر البريد الإلكتروني أو روابط واردة.',
      whyItMatters: 'المؤسسات الموثوقة لا تطلب أبداً كشف كلمات المرور أو الرموز السرية عبر رسائل بريد عشوائية أو نماذج غير مصادق عليها.'
    }
  },
  rule_financial_wire_request: {
    en: {
      name: 'Financial Urgency / Payment Demands',
      category: 'Social Engineering',
      description: 'The text references unexpected invoices, gift cards, crypto transfers, or overdue penalties.',
      recommendation: 'Verify any payment or invoice request with the sender via a known trusted phone number or in-person confirmation.',
      whyItMatters: 'Unsolicited requests for emergency payments, gift cards, overdue invoices, or crypto transfers are hallmark indicators of financial phishing (Business Email Compromise).'
    },
    ar: {
      name: 'مطالبات مالية وتحويلات بنكية مشبوهة (BEC)',
      category: 'الهندسة الاجتماعية',
      description: 'تطالب الرسالة بسداد فواتير غير متوقعة، تحويلات بنكية سريعة، بطاقات هدايا، أو عملات رقمية.',
      recommendation: 'تحقق من أي طلب دفع أو تعديل حساب بنكي مع الجهة المعنية عبر اتصال هاتفي موثوق أو تأكيد مباشر.',
      whyItMatters: 'هذه الحيل تعد السمة الأبرز لهجمات اختراق البريد الإلكتروني للشركات (BEC) والاحتيال المالي المباشر.'
    }
  },
  rule_embedded_suspicious_link: {
    en: {
      name: 'Embedded Action Link in Message',
      category: 'Social Engineering',
      description: 'The message contains clickable external hyperlinks embedded directly alongside urgent action demands.',
      recommendation: 'Hover over links without clicking to check the destination domain, or navigate to the service independently.',
      whyItMatters: 'Attackers embed clickable links in messages paired with psychological pressure to funnel victims toward credential harvesting portals.'
    },
    ar: {
      name: 'تضمين روابط خارجية مصحوبة بضغط زمني',
      category: 'الهندسة الاجتماعية',
      description: 'تحتوي الرسالة على روابط خارجية قابلة للنقر مدمجة مباشرة مع طلبات تنفيذ إجراءات عاجلة.',
      recommendation: 'مرر مؤشر الفأرة فوق الرابط لمعاينة الوجهة الحقيقية دون النقر، أو توجه للخدمة يدوياً عبر المتصفح.',
      whyItMatters: 'توجيه الضحية للنقر السريع على روابط خارجية ضمن رسالة ذات طابع طارئ يهدف لتحويله إلى صفحات تصيد منسوخة.'
    }
  }
};

export const TEST_CASE_TRANSLATIONS: Record<string, Record<Language, { name: string; description: string }>> = {
  test_normal_url: {
    en: {
      name: '1. Standard Clean URL',
      description: 'Clean HTTPS URL with standard domain and no suspicious keywords or structures.'
    },
    ar: {
      name: '1. رابط آمن ونظيف تماماً',
      description: 'رابط HTTPS قياسي بنطاق سليم دون أي كلمات مفتاحية أو هياكل مشبوهة.'
    }
  },
  test_http_url: {
    en: {
      name: '2. Unencrypted HTTP URL',
      description: 'Standard domain accessed over unencrypted HTTP (transport weakness, not phishing proof).'
    },
    ar: {
      name: '2. رابط ببروتوكول HTTP غير مشفر',
      description: 'نطاق اعتيادي يُطلب عبر HTTP غير الآمن (نقطة ضعف في النقل وليست إدانة بالتصيد).'
    }
  },
  test_ip_address_url: {
    en: {
      name: '3. IP-Based URL with Login',
      description: 'Numerical IP address host accessed via HTTP with an authentication endpoint.'
    },
    ar: {
      name: '3. عنوان IP مباشر مع مسار تسجيل دخول',
      description: 'مضيف برقم IP مباشر عبر HTTP يتضمن مساراً لطلب تسجيل الدخول.'
    }
  },
  test_at_symbol_url: {
    en: {
      name: '4. URL with User-Info @ Symbol',
      description: 'URL using @ syntax where the displayed brand comes before @ and evil host comes after.'
    },
    ar: {
      name: '4. رابط بحيلة علامة @ الخادعة',
      description: 'رابط يضع اسم علامة تجارية قبل علامة @ بينما الخادم الحقيقي الضار بعدها.'
    }
  },
  test_long_url: {
    en: {
      name: '5. Excessive URL Length',
      description: 'Extremely long URL path structured to obscure destination tokens.'
    },
    ar: {
      name: '5. رابط بطول مفرط واستثنائي',
      description: 'مسار رابط طويل جداً تم تصميمه للتمويه وحجب الوجهة الحقيقية.'
    }
  },
  test_login_url: {
    en: {
      name: '6. Sensitive Auth Keywords',
      description: 'Standard HTTPS domain containing authentication path tokens (requires domain cross-reference).'
    },
    ar: {
      name: '6. كلمات تسجيل دخول ومصادقة بالمسار',
      description: 'نطاق HTTPS اعتيادي يحتوي على كلمات تسجيل دخول (يتطلب مطابقة النطاق).'
    }
  },
  test_brand_typosquat_url: {
    en: {
      name: '7. Brand Typosquatting Host',
      description: 'Deceptive hostname with character substitution (paypa1) combined with auth keywords.'
    },
    ar: {
      name: '7. انتحال مطبعي لعلامة تجارية (Typosquatting)',
      description: 'اسم مضيف خادع يستبدل الأحرف (paypa1) مدمجاً بكلمات مصادقة.'
    }
  },
  test_normal_message: {
    en: {
      name: '8. Standard Work Message',
      description: 'Benign interpersonal email with no threats, urgency pressure, or credential demands.'
    },
    ar: {
      name: '8. رسالة بريد عمل طبيعية وغير ضارة',
      description: 'بريد عمل مهني طبيعي يخلو من التهديدات أو ضغوط الاستعجال أو طلب كلمات المرور.'
    }
  },
  test_urgent_phishing_message: {
    en: {
      name: '9. Urgent Account Suspension Email',
      description: 'Classic high-pressure phishing email combining urgency, suspension threats, credential demands, and links.'
    },
    ar: {
      name: '9. بريد تصيد احتيالي عاجل بإيقاف الحساب',
      description: 'نموذج كلاسيكي للتصيد عالي الضغط يجمع بين الاستعجال، التهديد، طلب البيانات، والروابط.'
    }
  }
};

/**
 * Returns the localized indicator representation
 */
export function getLocalizedIndicator(ind: DetectedIndicator, lang: Language): DetectedIndicator {
  const trans = RULE_TRANSLATIONS[ind.id]?.[lang];
  if (!trans) return ind;

  return {
    ...ind,
    name: trans.name,
    category: trans.category,
    explanation: trans.whyItMatters || ind.explanation,
    recommendation: trans.recommendation || ind.recommendation
  };
}

/**
 * Returns localized rule definition
 */
export function getLocalizedRule(rule: RuleDefinition, lang: Language): RuleDefinition {
  const trans = RULE_TRANSLATIONS[rule.id]?.[lang];
  if (!trans) return rule;

  return {
    ...rule,
    name: trans.name,
    category: trans.category,
    description: trans.description,
    generalRecommendation: trans.recommendation
  };
}

/**
 * Localize recommendations list
 */
export function getLocalizedRecommendations(recommendations: string[], lang: Language): string[] {
  if (lang === 'en') return recommendations;

  return recommendations.map(rec => {
    // Check if it matches known recommendations
    for (const key of Object.keys(RULE_TRANSLATIONS)) {
      const item = RULE_TRANSLATIONS[key];
      if (item.en.recommendation === rec) {
        return item.ar.recommendation;
      }
    }

    if (rec.includes('No typical phishing patterns')) {
      return 'لم يتم رصد أي أنماط تصيد احتيالي أو شذوذ بنيوي عبر الفحص الاستدلالي الثابت.';
    }
    if (rec.includes('Always ensure standard cyber hygiene')) {
      return 'احرص دائماً على اتباع إرشادات الأمن السيبراني: تحقق من اسم النطاق في شريط العنوان قبل إدخال أي بيانات حساسة.';
    }
    if (rec.includes('Strict Warning: Do NOT enter credentials')) {
      return 'تحذير أمني صارم: لا تقم مطلقاً بإدخال بيانات اعتمادك أو كلمات المرور أو رموز التحقق في هذا المورد.';
    }
    if (rec.includes('If you have already submitted credentials')) {
      return 'إذا كنت قد أدخلت بياناتك بالفعل، سارع بتغيير كلمة المرور فوراً من الموقع الرسمي المعتمد وقم بتفعيل المصادقة متعددة العوامل (MFA).';
    }

    return rec;
  });
}
