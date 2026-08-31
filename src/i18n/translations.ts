export type Language = 'en' | 'ar';
export type Theme = 'dark' | 'light';

export interface Translations {
  // Header
  appTitle: string;
  appTitleSuffix: string;
  appMvpBadge: string;
  appEngineBadge: string;
  appTagline: string;
  tabAnalyzer: string;
  tabTests: string;
  tabRules: string;
  tabDocs: string;
  langEn: string;
  langAr: string;
  themeDark: string;
  themeLight: string;

  // Analysis Modes
  modeUrl: string;
  modeMessage: string;

  // URL Analyzer
  urlInputLabel: string;
  urlInputSublabel: string;
  urlInputPlaceholder: string;
  urlAnalyzeBtn: string;
  urlAnalyzingBtn: string;
  urlResetBtn: string;
  urlPresetsTitle: string;
  urlPresetsSub: string;
  urlTargetLabel: string;
  urlErrorEmpty: string;

  // Message Analyzer
  msgInputLabel: string;
  msgInputSublabel: string;
  msgInputPlaceholder: string;
  msgAnalyzeBtn: string;
  msgAnalyzingBtn: string;
  msgPresetsTitle: string;
  msgPresetsSub: string;
  msgTargetLabel: string;
  msgRawSnippetLabel: string;
  msgCharCount: (chars: number, words: number) => string;
  msgStats: (chars: number, words: number) => string;
  msgVectorsTitle: (count: number) => string;
  msgNoVectors: string;
  msgErrorEmpty: string;

  // Demo Presets
  demoPresetTitle: string;
  demoPresetSubtitle: string;

  // Gauge & Risk
  riskScoreLabel: string;
  heuristicAssessment: string;
  gaugeAssessmentBadge: string;
  gaugeRiskScoreLabel: string;
  riskLow: string;
  riskMed: string;
  riskHigh: string;
  riskCrit: string;
  gaugeLow: string;
  gaugeMed: string;
  gaugeHigh: string;
  gaugeCrit: string;
  riskSummaryLow: string;
  riskSummaryMed: string;
  riskSummaryHigh: string;
  riskSummaryCrit: string;
  gaugeLowText: string;
  gaugeMedText: string;
  gaugeHighText: string;
  gaugeCritText: string;
  scaleLow: string;
  scaleMed: string;
  scaleHigh: string;
  scaleCrit: string;

  // Why Breakdown
  whyTitle: string;
  whySubtitle: string;
  whySectionTitle: string;
  whySectionSubtitle: string;
  whyDisclaimerBadge: string;
  whyIndicatorCaveat: string;
  whyCleanTitle: string;
  whyCleanDesc: string;
  whyEvidence: string;
  whyExtractedEvidence: string;
  whyMatters: string;
  whyItMatters: string;
  whyRecommendation: string;
  whyAction: string;
  whyWeightNote: (pts: number) => string;

  // Technical Details Card
  techHeader: string;
  techCardTitle: string;
  techProtocol: string;
  techPort: string;
  techHostname: string;
  techRegDomain: string;
  techPath: string;
  techQuery: string;
  techHostType: string;
  techHostTypeDomain: string;
  techSubdomains: string;
  techLength: string;
  charsUnit: string;
  techTokensDetected: string;
  techSensitiveTokens: string;
  techBrandHeuristics: string;
  techBrandToken: string;
  techSimilarity: string;
  techMatchType: string;
  techExactToken: string;
  techCombosquat: string;
  techTyposquat: string;
  techHomoglyph: string;
  techIpAddress: string;
  techRegisteredDomainType: string;
  techTotalChars: string;
  techWordCount: string;
  techExtractedLinks: string;
  techUrgencyMarkers: string;
  techExtractedLinksList: string;
  techChars: string;
  techWords: string;
  techUrgentKeywords: string;
  techCredKeywords: string;
  techFinancialKeywords: string;
  techExtractedUrls: string;

  // Recommendations Card
  recHeader: string;
  recTitle: string;
  recSopLabel: string;
  recZeroTrust: string;
  recSopDesc: string;

  // AI Briefing Card
  aiTitle: string;
  aiBriefingTitle: string;
  aiBadge: string;
  aiOptionalBadge: string;
  aiSubtitle: string;
  aiBriefingSubtitle: string;
  aiGenerate: string;
  aiRegenerate: string;
  aiGenerateBtn: string;
  aiRegenerateBtn: string;
  aiGenerating: string;
  aiGeneratingBtn: string;
  aiPlaceholder: string;
  aiEngineSource: string;
  aiDetermScore: string;
  aiDeterministicScore: string;
  aiPrinciple: string;
  aiDisclaimer: string;

  // Test Runner
  testTitle: string;
  testSuiteTitle: string;
  testSubtitle: string;
  testSuiteDesc: string;
  testPassed: string;
  testFailed: string;
  testRunBtn: string;
  testRunButton: string;
  testRunningBtn: string;
  testExecuting: string;
  testTableTitle: string;
  testScenarioTitle: string;
  testSuiteFile: string;
  testExpected: string;
  testActual: string;
  testTriggered: string;
  testTriggeredInds: string;

  // Rule Catalog
  ruleTitle: string;
  rulesCatalogTitle: string;
  ruleSubtitle: string;
  rulesCatalogDesc: string;
  ruleActiveCount: (count: number) => string;
  rulesActiveCount: string;
  ruleSearchPlaceholder: string;
  rulesSearchPlaceholder: string;
  ruleCatAll: string;
  rulesFilterAll: string;
  ruleDefensiveAction: string;
  rulesDefensiveRec: string;

  // Limitations & Docs
  docsTitle: string;
  docsSubtitle: string;
  docsPipelineTitle: string;
  docsStep1Title: string;
  docsStep1Desc: string;
  docsStep2Title: string;
  docsStep2Desc: string;
  docsStep3Title: string;
  docsStep3Desc: string;
  docsStep4Title: string;
  docsStep4Desc: string;
  docsStep5Title: string;
  docsStep5Desc: string;
  docsStep6Title: string;
  docsStep6Desc: string;
  docsConstraintsTitle: string;
  docsRoadmapTitle: string;

  limitHeaderTitle: string;
  limitHeaderSubtitle: string;
  limitFlowTitle: string;
  limitSectionTitle: string;
  limitRoadmapTitle: string;
  limitFpFnTitle: string;
  limitFpFnDesc: string;
  limitHttpsTitle: string;
  limitHttpsDesc: string;
  limitIndTitle: string;
  limitIndDesc: string;
  limitBrandTitle: string;
  limitBrandDesc: string;
  limitScopeTitle: string;
  limitScopeDesc: string;

  // Footer
  footerProject: string;
  footerCredit: string;
  footerApiConnected: string;
  footerRuleset: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appTitle: 'PHISH',
    appTitleSuffix: 'LENS',
    appMvpBadge: 'MVP v1.0',
    appEngineBadge: 'EXPLAINABLE HEURISTIC ENGINE',
    appTagline: 'Explainable Phishing Detection & Risk Analysis Tool',
    tabAnalyzer: 'ANALYSIS_STUDIO',
    tabTests: 'TEST_SUITE',
    tabRules: 'RULE_CATALOG',
    tabDocs: 'DOCS & LIMITS',
    langEn: 'English',
    langAr: 'العربية',
    themeDark: 'Dark',
    themeLight: 'Light',

    // Analysis Modes
    modeUrl: 'URL Static Analysis',
    modeMessage: 'Message / Email Analysis',

    // URL Analyzer
    urlInputLabel: 'TARGET URL FOR STATIC ANALYSIS',
    urlInputSublabel: 'Evaluates RFC URL components, subdomains, token similarity, typosquatting & brand impersonation.',
    urlInputPlaceholder: 'Enter URL (e.g., https://paypal-login-example.com/verify/account)',
    urlAnalyzeBtn: 'RUN_HEURISTIC_ANALYSIS',
    urlAnalyzingBtn: 'ANALYZING_URL...',
    urlResetBtn: 'RESET',
    urlPresetsTitle: 'DEMO_PRESET_VECTORS',
    urlPresetsSub: 'CLICK TO LOAD PAYLOAD',
    urlTargetLabel: 'TARGET_INSPECTION_URL',
    urlErrorEmpty: 'Please enter a valid URL to analyze.',

    // Message Analyzer
    msgInputLabel: 'Message & Social Engineering Analyzer',
    msgInputSublabel: 'Detects social engineering: artificial urgency, threat framing, credential solicitation, and embedded URLs.',
    msgInputPlaceholder: 'Paste suspicious communication, email payload, or SMS message...',
    msgAnalyzeBtn: 'ANALYZE_MESSAGE',
    msgAnalyzingBtn: 'ANALYZING_PAYLOAD...',
    msgPresetsTitle: 'DEMO_PRESET_VECTORS',
    msgPresetsSub: 'CLICK TO LOAD PAYLOAD',
    msgTargetLabel: 'RAW_COMMUNICATION_SNIPPET',
    msgRawSnippetLabel: 'RAW_COMMUNICATION_SNIPPET',
    msgCharCount: (chars, words) => `${chars} CHARACTERS • ${words} WORDS`,
    msgStats: (chars, words) => `${chars} CHARACTERS • ${words} WORDS`,
    msgVectorsTitle: (count) => `ACTIVE SOCIAL ENGINEERING VECTORS (${count})`,
    msgNoVectors: 'No aggressive social engineering patterns detected.',
    msgErrorEmpty: 'Please provide a message or email body to analyze.',

    // Demo Presets
    demoPresetTitle: 'DEMO_PRESET_VECTORS',
    demoPresetSubtitle: 'CLICK TO LOAD PAYLOAD',

    // Gauge & Risk
    riskScoreLabel: 'RISK SCORE',
    heuristicAssessment: 'HEURISTIC ASSESSMENT',
    gaugeAssessmentBadge: 'HEURISTIC RISK ASSESSMENT',
    gaugeRiskScoreLabel: 'RISK SCORE',
    riskLow: 'LOW RISK',
    riskMed: 'MEDIUM RISK',
    riskHigh: 'HIGH RISK',
    riskCrit: 'CRITICAL RISK',
    gaugeLow: 'LOW RISK',
    gaugeMed: 'MEDIUM RISK',
    gaugeHigh: 'HIGH RISK',
    gaugeCrit: 'CRITICAL RISK',
    riskSummaryLow: 'No typical phishing indicators flagged. Maintain standard cybersecurity hygiene.',
    riskSummaryMed: 'Suspicious anomalies or insecure transport detected. Verify root destination.',
    riskSummaryHigh: 'Multiple high-risk indicators present. Strict caution and zero-trust verification advised.',
    riskSummaryCrit: 'Critical threat indicators identified. Extreme probability of deception or spoofing.',
    gaugeLowText: 'No typical phishing indicators flagged. Maintain standard cybersecurity hygiene.',
    gaugeMedText: 'Suspicious anomalies or insecure transport detected. Verify root destination.',
    gaugeHighText: 'Multiple high-risk indicators present. Strict caution and zero-trust verification advised.',
    gaugeCritText: 'Critical threat indicators identified. Extreme probability of deception or spoofing.',
    scaleLow: '0-30: LOW',
    scaleMed: '31-60: MED',
    scaleHigh: '61-80: HIGH',
    scaleCrit: '81-100: CRIT',

    // Why Breakdown
    whyTitle: 'Explainability Breakdown: "Why?"',
    whySubtitle: 'Transparent, evidence-backed breakdown of each detected security indicator.',
    whySectionTitle: 'Explainability Breakdown: "Why?"',
    whySectionSubtitle: 'Transparent, evidence-backed breakdown of each detected security indicator.',
    whyDisclaimerBadge: 'INDICATOR ≠ MALICIOUS PROOF',
    whyIndicatorCaveat: 'INDICATOR ≠ MALICIOUS PROOF',
    whyCleanTitle: 'Why was this assessed as Clean / Low Risk?',
    whyCleanDesc: 'The static rule engine evaluated the input across 15+ heuristic checks (including raw IP detection, deceptive @ user-info syntax, brand lookalike algorithms, high-urgency social engineering triggers, and credential harvesting patterns). No high-risk structural anomalies or malicious indicators were found.',
    whyEvidence: 'EXTRACTED EVIDENCE:',
    whyExtractedEvidence: 'EXTRACTED EVIDENCE:',
    whyMatters: 'WHY THIS INDICATOR MATTERS:',
    whyItMatters: 'WHY THIS INDICATOR MATTERS:',
    whyRecommendation: 'RECOMMENDED DEFENSIVE ACTION:',
    whyAction: 'RECOMMENDED DEFENSIVE ACTION:',
    whyWeightNote: (pts) => `* Heuristic weight contribution: +${pts} points toward normalized score based on deterministic static rule matrix.`,

    // Technical Details Card
    techHeader: 'EXTRACTED TECHNICAL PARAMETERS',
    techCardTitle: 'EXTRACTED TECHNICAL PARAMETERS',
    techProtocol: 'PROTOCOL',
    techPort: 'PORT',
    techHostname: 'HOSTNAME',
    techRegDomain: 'REGISTERED DOMAIN',
    techPath: 'PATH',
    techQuery: 'QUERY PARAMS',
    techHostType: 'HOST TYPE',
    techHostTypeDomain: 'Standard Registered Domain',
    techSubdomains: 'SUBDOMAIN COUNT',
    techLength: 'URL LENGTH',
    charsUnit: 'chars',
    techTokensDetected: 'SENSITIVE TOKENS DETECTED',
    techSensitiveTokens: 'SENSITIVE TOKENS DETECTED:',
    techBrandHeuristics: 'BRAND IMPERSONATION HEURISTICS:',
    techBrandToken: 'Brand Token:',
    techSimilarity: 'Similarity:',
    techMatchType: 'Matching Type:',
    techExactToken: 'Exact brand token',
    techCombosquat: 'Exact brand token (combosquatting)',
    techTyposquat: 'Typosquatting',
    techHomoglyph: 'Visual homoglyph',
    techIpAddress: 'Address',
    techRegisteredDomainType: 'Registered Domain',
    techTotalChars: 'TOTAL CHARACTERS',
    techWordCount: 'TOTAL WORDS',
    techExtractedLinks: 'EMBEDDED URL COUNT',
    techUrgencyMarkers: 'URGENCY MARKERS',
    techExtractedLinksList: 'EXTRACTED EMBEDDED URLS',
    techChars: 'CHARACTERS',
    techWords: 'TOTAL WORDS',
    techUrgentKeywords: 'URGENCY / THREAT TOKENS:',
    techCredKeywords: 'CREDENTIAL SOLICITATION TOKENS:',
    techFinancialKeywords: 'FINANCIAL & WIRE TOKENS:',
    techExtractedUrls: 'EXTRACTED EMBEDDED URLS:',

    // Recommendations Card
    recHeader: 'MITIGATION & DEFENSIVE PROTOCOL',
    recTitle: 'MITIGATION & DEFENSIVE PROTOCOL',
    recSopLabel: 'STANDARD_DEFENSIVE_PROTOCOL:',
    recZeroTrust: 'ZERO-TRUST',
    recSopDesc: 'Independently verify communications through verified out-of-band channels. Never click unauthenticated links, transfer funds, or submit credentials from unsolicited sources.',

    // AI Briefing Card
    aiTitle: 'NATURAL-LANGUAGE BRIEFING LAYER',
    aiBriefingTitle: 'NATURAL-LANGUAGE BRIEFING LAYER',
    aiBadge: 'OPTIONAL_AI',
    aiOptionalBadge: 'OPTIONAL_AI',
    aiSubtitle: 'Summarizes rule-based findings without overriding deterministic scores.',
    aiBriefingSubtitle: 'Summarizes rule-based findings without overriding deterministic scores.',
    aiGenerate: 'GENERATE BRIEFING',
    aiRegenerate: 'REGENERATE BRIEFING',
    aiGenerateBtn: 'GENERATE_EXECUTIVE_SUMMARY',
    aiRegenerateBtn: 'REGENERATE_SUMMARY',
    aiGenerating: 'GENERATING...',
    aiGeneratingBtn: 'GENERATING...',
    aiPlaceholder: 'Click "Generate Briefing" to synthesize an executive natural-language briefing of these findings.',
    aiEngineSource: 'ENGINE SOURCE:',
    aiDetermScore: 'DETERMINISTIC SCORE:',
    aiDeterministicScore: 'DETERMINISTIC SCORE',
    aiPrinciple: 'CORE PRINCIPLE: The AI layer functions solely as a summarizer; the security decision is 100% deterministic.',
    aiDisclaimer: 'The AI layer operates exclusively as a natural language synthesizer; all security weights and risk decisions remain 100% deterministic.',

    // Test Runner
    testTitle: 'AUTOMATED HEURISTIC TEST SUITE',
    testSuiteTitle: 'AUTOMATED HEURISTIC TEST SUITE',
    testSubtitle: 'Verifies 9 core test scenarios: normal domains, raw IP vectors, @ user-info tricks, typosquatting permutations, token thresholds, and social engineering templates.',
    testSuiteDesc: 'Verifies 9 core test scenarios: normal domains, raw IP vectors, @ user-info tricks, typosquatting permutations, token thresholds, and social engineering templates.',
    testPassed: 'PASSED',
    testFailed: 'FAILED',
    testRunBtn: 'RUN_TEST_SUITE',
    testRunButton: 'RUN_TEST_SUITE',
    testRunningBtn: 'EXECUTING...',
    testExecuting: 'EXECUTING...',
    testTableTitle: 'TEST SCENARIOS & VALIDATION RUNTIME',
    testScenarioTitle: 'TEST SCENARIOS & VALIDATION RUNTIME',
    testSuiteFile: 'testSuite.ts',
    testExpected: 'EXPECTED',
    testActual: 'ACTUAL',
    testTriggered: 'TRIGGERED INDICATORS',
    testTriggeredInds: 'TRIGGERED INDICATORS:',

    // Rule Catalog
    ruleTitle: 'HEURISTIC RULE REPOSITORY CATALOG',
    rulesCatalogTitle: 'HEURISTIC RULE REPOSITORY CATALOG',
    ruleSubtitle: 'Deterministic rule definitions with calibrated weights and specific defensive mitigation protocols.',
    rulesCatalogDesc: 'Deterministic rule definitions with calibrated weights and specific defensive mitigation protocols.',
    ruleActiveCount: (count) => `${count} MODULAR_RULES_ACTIVE`,
    rulesActiveCount: 'MODULAR RULES ACTIVE',
    ruleSearchPlaceholder: 'Filter rules by title, ID, token...',
    rulesSearchPlaceholder: 'Filter rules by title, ID, token...',
    ruleCatAll: 'ALL_RULES',
    rulesFilterAll: 'ALL_RULES',
    ruleDefensiveAction: 'DEFENSIVE_RECOMMENDATION:',
    rulesDefensiveRec: 'DEFENSIVE_RECOMMENDATION',

    // Limitations & Docs
    docsTitle: 'ACADEMIC METHODOLOGY & ENGINEERING LIMITATIONS',
    docsSubtitle: 'PhishLens Defensive Cybersecurity Principles & Architectural Specifications',
    docsPipelineTitle: 'SYSTEM DATA FLOW & EVALUATION PIPELINE',
    docsStep1Title: 'INPUT_CAPTURE',
    docsStep1Desc: 'String normalization',
    docsStep2Title: 'STATIC_PARSER',
    docsStep2Desc: 'RFC & URL structures',
    docsStep3Title: 'INDICATOR_RULES',
    docsStep3Desc: 'Deterministic heuristics',
    docsStep4Title: 'RISK_NORMALIZER',
    docsStep4Desc: '0-100 bounded score',
    docsStep5Title: 'EXPLAINABILITY',
    docsStep5Desc: 'Evidence & Why breakdown',
    docsStep6Title: 'AI_SYNTHESIS',
    docsStep6Desc: 'Natural-language briefing',
    docsConstraintsTitle: 'CORE ENGINEERING CONSTRAINTS & LIMITATIONS',
    docsRoadmapTitle: 'FUTURE RESEARCH & INTEGRATION ROADMAP',

    limitHeaderTitle: 'ACADEMIC METHODOLOGY & ENGINEERING LIMITATIONS',
    limitHeaderSubtitle: 'PhishLens Defensive Cybersecurity Principles & Architectural Specifications',
    limitFlowTitle: 'SYSTEM DATA FLOW & EVALUATION PIPELINE',
    limitSectionTitle: 'CORE ENGINEERING CONSTRAINTS & LIMITATIONS',
    limitRoadmapTitle: 'FUTURE RESEARCH & INTEGRATION ROADMAP',
    limitFpFnTitle: 'Heuristics vs. Real-Time Reputation',
    limitFpFnDesc: 'Static analysis detects syntactic anomalies and patterns. It does not perform active network requests, DNS lookups, or live web page fetching to prevent adversary tracking.',
    limitHttpsTitle: 'HTTPS Encryption vs. Authentication',
    limitHttpsDesc: 'Modern phishing campaigns predominantly use valid SSL certificates (e.g. Let\'s Encrypt). HTTPS guarantees encryption in transit, never the authenticity or benign nature of the server.',
    limitIndTitle: 'Indicator vs. Proof of Attack',
    limitIndDesc: 'Individual heuristic indicators (such as HTTP transport or high subdomain count) signify elevated risk vectors rather than indisputable evidence of an active cyber attack.',
    limitBrandTitle: 'Static Brand Lexicon Scope',
    limitBrandDesc: 'Brand impersonation algorithms rely on a curated lexicon of top targeted enterprise brands and edit-distance math. Obscure brands may not trigger direct typosquat matches.',
    limitScopeTitle: 'Zero-Trust Verification Necessity',
    limitScopeDesc: 'Static risk analysis provides educational and defensive triage. High-stakes actions require verified out-of-band communication with verified administrative personnel.',

    // Footer
    footerProject: 'PhishLens MVP',
    footerCredit: '// Graduation Project: Cybersecurity Architect',
    footerApiConnected: 'API: Connected',
    footerRuleset: 'Rule Set v2.1.0'
  },

  ar: {
    // Header
    appTitle: 'فيش',
    appTitleSuffix: 'لينس',
    appMvpBadge: 'إصدار MVP v1.0',
    appEngineBadge: 'محرك استدلالي قابل للتفسير',
    appTagline: 'أداة الكشف عن التصيد الاحتيالي وتحليل المخاطر القابلة للتفسير',
    tabAnalyzer: 'استوديو_التحليل',
    tabTests: 'حزمة_الاختبارات',
    tabRules: 'دليل_القواعد',
    tabDocs: 'التوثيق_والقيود',
    langEn: 'English',
    langAr: 'العربية',
    themeDark: 'داكن',
    themeLight: 'فاتح',

    // Analysis Modes
    modeUrl: 'تحليل عناوين URL الثابت',
    modeMessage: 'تحليل الرسائل والبريد الإلكتروني',

    // URL Analyzer
    urlInputLabel: 'عنوان URL المستهدف للتحليل الثابت',
    urlInputSublabel: 'يقوم بتقييم مكونات RFC، النطاقات الفرعية، تشابه الرموز، انتحال العلامات التجارية والهجمات المطبعية.',
    urlInputPlaceholder: 'أدخل عنوان URL (مثال: https://paypal-login-example.com/verify/account)',
    urlAnalyzeBtn: 'تشغيل_التحليل_الاستدلالي',
    urlAnalyzingBtn: 'جاري_تحليل_الرابط...',
    urlResetBtn: 'إعادة تعيين',
    urlPresetsTitle: 'سيناريوهات_أمنية_توضيحية',
    urlPresetsSub: 'انقر لتحميل السيناريو',
    urlTargetLabel: 'عنوان_URL_المفحوص',
    urlErrorEmpty: 'يرجى إدخال عنوان URL صالح للتحليل.',

    // Message Analyzer
    msgInputLabel: 'محلل الرسائل والهندسة الاجتماعية',
    msgInputSublabel: 'يكتشف تكتيكات الهندسة الاجتماعية: الاستعجال المصطنع، التهديد، طلب بيانات الاعتماد، والروابط المضمنة.',
    msgInputPlaceholder: 'الصق نص الرسالة المشبوهة، محتوى البريد الإلكتروني، أو رسالة SMS...',
    msgAnalyzeBtn: 'تحليل_الرسالة',
    msgAnalyzingBtn: 'جاري_تحليل_المحتوى...',
    msgPresetsTitle: 'سيناريوهات_أمنية_توضيحية',
    msgPresetsSub: 'انقر لتحميل السيناريو',
    msgTargetLabel: 'مقتطف_الرسالة_المفحوصة',
    msgRawSnippetLabel: 'مقتطف_الرسالة_المفحوصة',
    msgCharCount: (chars, words) => `${chars} حرف • ${words} كلمة`,
    msgStats: (chars, words) => `${chars} حرف • ${words} كلمة`,
    msgVectorsTitle: (count) => `مؤشرات الهندسة الاجتماعية المكتشفة (${count})`,
    msgNoVectors: 'لم يتم اكتشاف أنماط هندسة اجتماعية عدائية.',
    msgErrorEmpty: 'يرجى تقديم نص رسالة أو بريد إلكتروني لتحليله.',

    // Demo Presets
    demoPresetTitle: 'سيناريوهات_أمنية_توضيحية',
    demoPresetSubtitle: 'انقر لتحميل السيناريو',

    // Gauge & Risk
    riskScoreLabel: 'درجة الخطورة',
    heuristicAssessment: 'التقييم الاستدلالي',
    gaugeAssessmentBadge: 'التقييم الاستدلالي لمستوى الخطورة',
    gaugeRiskScoreLabel: 'درجة الخطورة',
    riskLow: 'خطر منخفض',
    riskMed: 'خطر متوسط',
    riskHigh: 'خطر مرتفع',
    riskCrit: 'خطر حرج',
    gaugeLow: 'خطر منخفض',
    gaugeMed: 'خطر متوسط',
    gaugeHigh: 'خطر مرتفع',
    gaugeCrit: 'خطر حرج',
    riskSummaryLow: 'لم يتم رصد مؤشرات تصيد احتيالي نمطية. حافظ على إرشادات الأمان السيبراني القياسية.',
    riskSummaryMed: 'تم اكتشاف شذوذ مشبوه أو نقل غير آمن. تحقق من الوجهة الأصلية قبل المتابعة.',
    riskSummaryHigh: 'توجد مؤشرات متعددة عالية الخطورة. يُنصح بالحذر الشديد والتحقق بمبدأ انعدام الثقة (Zero-Trust).',
    riskSummaryCrit: 'تم تحديد مؤشرات تهديد حرجة للغاية. احتمالية قاطعة للخداع أو انتحال الهوية.',
    gaugeLowText: 'لم يتم رصد مؤشرات تصيد احتيالي نمطية. حافظ على إرشادات الأمان السيبراني القياسية.',
    gaugeMedText: 'تم اكتشاف شذوذ مشبوه أو نقل غير آمن. تحقق من الوجهة الأصلية قبل المتابعة.',
    gaugeHighText: 'توجد مؤشرات متعددة عالية الخطورة. يُنصح بالحذر الشديد والتحقق بمبدأ انعدام الثقة (Zero-Trust).',
    gaugeCritText: 'تم تحديد مؤشرات تهديد حرجة للغاية. احتمالية قاطعة للخداع أو انتحال الهوية.',
    scaleLow: '0-30: منخفض',
    scaleMed: '31-60: متوسط',
    scaleHigh: '61-80: مرتفع',
    scaleCrit: '81-100: حرج',

    // Why Breakdown
    whyTitle: 'تفسير النتيجة: "لماذا تم تقييمها هكذا؟"',
    whySubtitle: 'شرح شفاف ومبني على الأدلة لكل مؤشر أمان تم اكتشافه.',
    whySectionTitle: 'تفسير النتيجة: "لماذا تم تقييمها هكذا؟"',
    whySectionSubtitle: 'شرح شفاف ومبني على الأدلة لكل مؤشر أمان تم اكتشافه.',
    whyDisclaimerBadge: 'المؤشر ≠ دليل إدانة قطعي',
    whyIndicatorCaveat: 'المؤشر ≠ دليل إدانة قطعي',
    whyCleanTitle: 'لماذا تم تقييم هذا الرابط بأنه آمن / منخفض الخطورة؟',
    whyCleanDesc: 'قام محرك القواعد الثابتة بفحص المدخلات عبر أكثر من 15 فحصاً استدلالياً (بما في ذلك عناوين IP المباشرة، بنية @ الخادعة، خوارزميات تشابه العلامات التجارية، ومؤشرات الاستعجال وطلب كلمات المرور). لم يتم العثور على أي شذوذ بنيوي أو مؤشرات خبيثة.',
    whyEvidence: 'الدليل المستخرج:',
    whyExtractedEvidence: 'الدليل المستخرج:',
    whyMatters: 'أهمية وتأثير هذا المؤشر:',
    whyItMatters: 'أهمية وتأثير هذا المؤشر:',
    whyRecommendation: 'الإجراء الدفاعي الموصى به:',
    whyAction: 'الإجراء الدفاعي الموصى به:',
    whyWeightNote: (pts) => `* مساهمة الوزن الاستدلالي: +${pts} نقطة نحو النتيجة المعيارية استناداً إلى مصفوفة القواعد الثابتة.`,

    // Technical Details Card
    techHeader: 'المعلمات والمعطيات التقنية المستخرجة',
    techCardTitle: 'المعلمات والمعطيات التقنية المستخرجة',
    techProtocol: 'البروتوكول',
    techPort: 'المنفذ (PORT)',
    techHostname: 'اسم المضيف (HOSTNAME)',
    techRegDomain: 'النطاق المسجل (DOMAIN)',
    techPath: 'المسار (PATH)',
    techQuery: 'معلمات الاستعلام (QUERY)',
    techHostType: 'نوع المضيف',
    techHostTypeDomain: 'نطاق مسجل رسمي',
    techSubdomains: 'عدد النطاقات الفرعية',
    techLength: 'طول الرابط',
    charsUnit: 'حرف',
    techTokensDetected: 'الكلمات والرموز الحساسة المكتشفة',
    techSensitiveTokens: 'الكلمات والرموز الحساسة المكتشفة:',
    techBrandHeuristics: 'استدلالات انتحال العلامة التجارية:',
    techBrandToken: 'رمز العلامة:',
    techSimilarity: 'نسبة التشابه:',
    techMatchType: 'نوع المطابقة:',
    techExactToken: 'رمز علامة تجارية مطابق',
    techCombosquat: 'رمز علامة مطابق (دمج كلمات / Combosquatting)',
    techTyposquat: 'هجوم مطبعي (Typosquatting)',
    techHomoglyph: 'تشابه بصري وتغيير أحرف (Homoglyph)',
    techIpAddress: 'عنوان IP',
    techRegisteredDomainType: 'نطاق مسجل رسمي',
    techTotalChars: 'إجمالي الحروف',
    techWordCount: 'إجمالي الكلمات',
    techExtractedLinks: 'عدد الروابط المضمنة',
    techUrgencyMarkers: 'مؤشرات الاستعجال',
    techExtractedLinksList: 'روابط URL المضمنة في النص',
    techChars: 'حرف',
    techWords: 'إجمالي الكلمات',
    techUrgentKeywords: 'رموز التهديد والاستعجال المصطنع:',
    techCredKeywords: 'رموز طلب بيانات الاعتماد وكلمات المرور:',
    techFinancialKeywords: 'رموز المعاملات المالية والفواتير:',
    techExtractedUrls: 'روابط URL المضمنة في النص:',

    // Recommendations Card
    recHeader: 'بروتوكول الإجراءات الدفاعية والوقائية',
    recTitle: 'بروتوكول الإجراءات الدفاعية والوقائية',
    recSopLabel: 'بروتوكول_الدفاع_القياسي:',
    recZeroTrust: 'انعدام الثقة (ZERO-TRUST)',
    recSopDesc: 'تحقق من صحة الرسائل عبر قنوات مستقلة وموثوقة. لا تقم أبداً بالنقر على روابط غير موثوقة أو إرسال أموال أو إدخال بيانات اعتماد بناءً على اتصالات غير مرغوبة.',

    // AI Briefing Card
    aiTitle: 'طبقة التلخيص التنفيذي بالذكاء الاصطناعي',
    aiBriefingTitle: 'طبقة التلخيص التنفيذي بالذكاء الاصطناعي',
    aiBadge: 'ذكاء_اصطناعي_اختياري',
    aiOptionalBadge: 'ذكاء_اصطناعي_اختياري',
    aiSubtitle: 'يلخص النتائج المستندة للقواعد بلغة طبيعية دون التأثير على النتيجة الحتمية.',
    aiBriefingSubtitle: 'يلخص النتائج المستندة للقواعد بلغة طبيعية دون التأثير على النتيجة الحتمية.',
    aiGenerate: 'توليد ملخص تنفيذي',
    aiRegenerate: 'إعادة توليد الملخص',
    aiGenerateBtn: 'توليد_الملخص_التنفيذي',
    aiRegenerateBtn: 'إعادة_توليد_الملخص',
    aiGenerating: 'جاري التوليد...',
    aiGeneratingBtn: 'جاري_التوليد...',
    aiPlaceholder: 'انقر على "توليد ملخص تنفيذي" للحصول على ملخص باللغة الطبيعية لنتائج الفحص.',
    aiEngineSource: 'مصدر المحرك:',
    aiDetermScore: 'النتيجة الاستدلالية الحتمية:',
    aiDeterministicScore: 'النتيجة الاستدلالية الحتمية',
    aiPrinciple: 'مبدأ هندسي أساسي: تعمل طبقة الذكاء الاصطناعي كملخص توضيحي فقط؛ والقرار الأمني حتمي 100%.',
    aiDisclaimer: 'تعمل طبقة الذكاء الاصطناعي كملخص توضيحي بلغة طبيعية فقط؛ وجميع أوزان الأمان وقرارات تقييم المخاطر حتمية 100%.',

    // Test Runner
    testTitle: 'حزمة اختبارات الاستدلال الآلية',
    testSuiteTitle: 'حزمة اختبارات الاستدلال الآلية',
    testSubtitle: 'تتحقق من 9 سيناريوهات رئيسية: النطاقات العادية، عناوين IP الخام، حيل @، تباديل انتحال العلامات التجارية، وعينات الهندسة الاجتماعية.',
    testSuiteDesc: 'تتحقق من 9 سيناريوهات رئيسية: النطاقات العادية، عناوين IP الخام، حيل @، تباديل انتحال العلامات التجارية، وعينات الهندسة الاجتماعية.',
    testPassed: 'اجتاز بنجاح',
    testFailed: 'فشل',
    testRunBtn: 'تشغيل_حزمة_الاختبارات',
    testRunButton: 'تشغيل_حزمة_الاختبارات',
    testRunningBtn: 'جاري_التنفيذ...',
    testExecuting: 'جاري التنفيذ...',
    testTableTitle: 'سيناريوهات الاختبار وبيئة التشغيل',
    testScenarioTitle: 'سيناريوهات الاختبار وبيئة التشغيل',
    testSuiteFile: 'testSuite.ts',
    testExpected: 'المتوقع',
    testActual: 'الفعلي',
    testTriggered: 'المؤشرات المفعلة',
    testTriggeredInds: 'المؤشرات المفعلة:',

    // Rule Catalog
    ruleTitle: 'دليل قواعد الكشف الاستدلالي',
    rulesCatalogTitle: 'دليل قواعد الكشف الاستدلالي',
    ruleSubtitle: 'تعريفات القواعد الحتمية مع أوزانها المحسوبة وبروتوكولات التخفيف الدفاعية المحددة.',
    rulesCatalogDesc: 'تعريفات القواعد الحتمية مع أوزانها المحسوبة وبروتوكولات التخفيف الدفاعية المحددة.',
    ruleActiveCount: (count) => `${count} قاعدة_نمطية_مفعلة`,
    rulesActiveCount: 'قواعد نمطية مفعلة',
    ruleSearchPlaceholder: 'تصفية القواعد بالعنوان، المعرف، أو الرمز...',
    rulesSearchPlaceholder: 'تصفية القواعد بالعنوان، المعرف، أو الرمز...',
    ruleCatAll: 'جميع_القواعد',
    rulesFilterAll: 'جميع_القواعد',
    ruleDefensiveAction: 'التوصية_الدفاعية:',
    rulesDefensiveRec: 'التوصية الدفاعية المعتمدة',

    // Limitations & Docs
    docsTitle: 'المنهجية الأكاديمية والقيود الهندسية',
    docsSubtitle: 'مبادئ الأمن السيبراني الدفاعي والمواصفات المعمارية لمشروع PhishLens',
    docsPipelineTitle: 'مسار تدفق البيانات وتقييم النظام',
    docsStep1Title: 'التقاط_المدخلات',
    docsStep1Desc: 'معايرة وتنقية النصوص',
    docsStep2Title: 'المحلل_الثابت',
    docsStep2Desc: 'هياكل RFC وعناوين URL',
    docsStep3Title: 'قواعد_المؤشرات',
    docsStep3Desc: 'استدلالات حتمية',
    docsStep4Title: 'معاير_الخطورة',
    docsStep4Desc: 'نتيجة مقيدة من 0 إلى 100',
    docsStep5Title: 'قابلية_التفسير',
    docsStep5Desc: 'الأدلة وشرح الأسباب',
    docsStep6Title: 'التوليد_التنفيذي',
    docsStep6Desc: 'ملخص بلغة طبيعية',
    docsConstraintsTitle: 'القيود والمعوقات الهندسية الأساسية',
    docsRoadmapTitle: 'خارطة طريق البحث والتطوير المستقبلي',

    limitHeaderTitle: 'المنهجية الأكاديمية والقيود الهندسية',
    limitHeaderSubtitle: 'مبادئ الأمن السيبراني الدفاعي والمواصفات المعمارية لمشروع PhishLens',
    limitFlowTitle: 'مسار تدفق البيانات وتقييم النظام',
    limitSectionTitle: 'القيود والمعوقات الهندسية الأساسية',
    limitRoadmapTitle: 'خارطة طريق البحث والتطوير المستقبلي',
    limitFpFnTitle: 'التحليل الاستدلالي مقابل فحص السمعة اللحظي',
    limitFpFnDesc: 'يقوم التحليل الثابت باكتشاف الشذوذ البنيوي والأنماط المشبوهة، دون إرسال طلبات نشطة أو جلب محتوى الموقع لتفادي كشف الضحية للمهاجمين.',
    limitHttpsTitle: 'تشفير HTTPS مقابل موثوقية الموقع',
    limitHttpsDesc: 'معظم هجمات التصيد المعاصرة تستخدم شهادات SSL مجانية سارية. تشفير HTTPS يضمن سرية النقل فقط، ولا يعني أبداً أمان أو موثوقية الخادم المستهدف.',
    limitIndTitle: 'مؤشر الخطورة مقابل الدليل القطعي',
    limitIndDesc: 'المؤشرات الفردية (مثل النقل غير المشفر أو كثرة النطاقات الفرعية) تشير إلى رفع مستوى التهديد وتنبيه المستخدم وليست دليلاً قاطعاً على حدوث هجوم.',
    limitBrandTitle: 'نطاق قاموس العلامات التجارية الثابت',
    limitBrandDesc: 'تعتمد خوارزميات انتحال العلامات على معجم للشركات والمؤسسات الأكثر استهدافاً مع حساب مسافات التعديل. قد لا ترصد العلامات النادرة غير المضمنة.',
    limitScopeTitle: 'ضرورة التحقق بمبدأ انعدام الثقة (Zero-Trust)',
    limitScopeDesc: 'يوفر الفحص الاستدلالي توجيهاً وتصنيفاً دفاعياً؛ بينما تتطلب المعاملات المالية والحساسة تواصلاً مؤكداً عبر قنوات مستقلة ومعتمدة خارج النطاق.',

    // Footer
    footerProject: 'مشروع PhishLens MVP',
    footerCredit: '// مشروع التخرج: معمارية الأمن السيبراني',
    footerApiConnected: 'واجهة البرمجيات: متصلة',
    footerRuleset: 'مجموعة القواعد v2.1.0'
  }
};
