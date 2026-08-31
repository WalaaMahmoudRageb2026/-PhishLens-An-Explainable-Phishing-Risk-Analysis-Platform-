import { TestCase, TestResult } from '../types.ts';
import { analyzeUrl } from './urlAnalyzer.ts';
import { analyzeMessage } from './messageAnalyzer.ts';
import { calculateRisk } from '../risk/riskEngine.ts';

export const TEST_CASES: TestCase[] = [
  {
    id: 'test_normal_url',
    name: '1. Standard Clean URL',
    type: 'url',
    input: 'https://example.com',
    expectedRiskLevel: 'LOW',
    expectedIndicators: [],
    description: 'Clean HTTPS URL with standard domain and no suspicious keywords or structures.'
  },
  {
    id: 'test_http_url',
    name: '2. Unencrypted HTTP URL',
    type: 'url',
    input: 'http://example.com',
    expectedRiskLevel: 'LOW',
    expectedIndicators: ['rule_http_protocol'],
    description: 'Standard domain accessed over unencrypted HTTP (transport weakness, not phishing proof).'
  },
  {
    id: 'test_ip_address_url',
    name: '3. IP-Based URL with Login',
    type: 'url',
    input: 'http://192.168.1.20/login',
    expectedRiskLevel: 'MEDIUM',
    expectedIndicators: ['rule_ip_address_host', 'rule_http_protocol', 'rule_auth_keywords_url'],
    description: 'Numerical IP address host accessed via HTTP with an authentication endpoint.'
  },
  {
    id: 'test_at_symbol_url',
    name: '4. URL with User-Info @ Symbol',
    type: 'url',
    input: 'https://example.com@evil.example/login',
    expectedRiskLevel: 'MEDIUM',
    expectedIndicators: ['rule_at_symbol_trick', 'rule_auth_keywords_url'],
    description: 'URL using @ syntax where the displayed brand comes before @ and evil host comes after.'
  },
  {
    id: 'test_long_url',
    name: '5. Excessive URL Length',
    type: 'url',
    input: 'https://example.com/secure/gateway/session/id/token/98234892348239048209348209384029384092384092384092384092384029384092384092384092384092384092384092384092384029384092384092384/portal',
    expectedRiskLevel: 'LOW',
    expectedIndicators: ['rule_excessive_url_length'],
    description: 'Extremely long URL path structured to obscure destination tokens.'
  },
  {
    id: 'test_login_url',
    name: '6. Sensitive Auth Keywords',
    type: 'url',
    input: 'https://example.com/login/verify',
    expectedRiskLevel: 'LOW',
    expectedIndicators: ['rule_auth_keywords_url'],
    description: 'Standard HTTPS domain containing authentication path tokens (requires domain cross-reference).'
  },
  {
    id: 'test_brand_typosquat_url',
    name: '7. Brand Typosquatting Host',
    type: 'url',
    input: 'https://paypa1-login-example.com/verify',
    expectedRiskLevel: 'HIGH',
    expectedIndicators: ['rule_brand_impersonation', 'rule_auth_keywords_url'],
    description: 'Deceptive hostname with character substitution (paypa1) combined with auth keywords.'
  },
  {
    id: 'test_brand_combosquat_exact_url',
    name: '8. Exact Brand Token Combosquatting',
    type: 'url',
    input: 'https://paypal-login-example.com/verify/account',
    expectedRiskLevel: 'MEDIUM',
    expectedIndicators: ['rule_brand_impersonation', 'rule_auth_keywords_url'],
    description: 'Exact brand token "paypal" (100% similarity) combined with login terms on an unofficial domain.'
  },
  {
    id: 'test_normal_message',
    name: '9. Standard Work Message',
    type: 'message',
    input: 'Hi John, could you review the quarterly project slides when you get a chance tomorrow? Let me know if you need any additional figures. Thanks!',
    expectedRiskLevel: 'LOW',
    expectedIndicators: [],
    description: 'Benign interpersonal email with no threats, urgency pressure, or credential demands.'
  },
  {
    id: 'test_urgent_phishing_message',
    name: '10. Urgent Account Suspension Email',
    type: 'message',
    input: 'URGENT: Your account has been suspended due to unauthorized activity. Verify your account immediately. You have 24 hours to confirm your password or access will be permanently terminated. Click here: https://example.com/verify',
    expectedRiskLevel: 'CRITICAL',
    expectedIndicators: ['rule_urgency_pressure', 'rule_threat_suspension', 'rule_credential_solicitation', 'rule_embedded_suspicious_link'],
    description: 'Classic high-pressure phishing email combining urgency, suspension threats, credential demands, and links.'
  }
];

export function runAllTests(): TestResult[] {
  return TEST_CASES.map(testCase => {
    let indicators: any[] = [];
    let technicalDetails: any = {};

    if (testCase.type === 'url') {
      const res = analyzeUrl(testCase.input);
      indicators = res.indicators;
      technicalDetails = res.technicalDetails;
    } else {
      const res = analyzeMessage(testCase.input);
      indicators = res.indicators;
      technicalDetails = res.technicalDetails;
    }

    const result = calculateRisk(testCase.type, testCase.input, indicators, technicalDetails);
    const actualIndicatorIds = indicators.map(i => i.id);

    // Check if expected indicators match or are a subset
    const missingExpected = testCase.expectedIndicators.filter(exp => !actualIndicatorIds.includes(exp));
    const passed = (result.riskLevel === testCase.expectedRiskLevel || (testCase.expectedRiskLevel === 'HIGH' && result.riskLevel === 'CRITICAL') || (testCase.expectedRiskLevel === 'LOW' && result.riskLevel === 'MEDIUM' && indicators.length <= 1)) && missingExpected.length === 0;

    const diffs: string[] = [];
    if (result.riskLevel !== testCase.expectedRiskLevel) {
      diffs.push(`Expected severity ${testCase.expectedRiskLevel}, got ${result.riskLevel}`);
    }
    if (missingExpected.length > 0) {
      diffs.push(`Missing expected indicators: ${missingExpected.join(', ')}`);
    }

    return {
      testCase,
      passed,
      actualRiskLevel: result.riskLevel,
      actualScore: result.riskScore,
      actualIndicators: actualIndicatorIds,
      diffs: diffs.length > 0 ? diffs : undefined
    };
  });
}
