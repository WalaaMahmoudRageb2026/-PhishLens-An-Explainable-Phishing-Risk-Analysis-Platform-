import { DetectedIndicator, TechnicalDetails } from '../types.ts';
import { analyzeUrl } from './urlAnalyzer.ts';

const URGENCY_PATTERNS = [
  /\b(?:immediately|immediate|urgent|urgently|within\s+\d+\s*(?:hours?|hrs?|mins?|minutes?|days?)|24\s*hours?|48\s*hours?|act\s+now|action\s+required|asap|time[- ]sensitive|final\s+notice|last\s+chance|expires?\s+(?:today|soon|in\s+\d+))\b/i
];

const THREAT_PATTERNS = [
  /\b(?:suspended|suspension|deactivat(?:ed|ion)|terminat(?:ed|ion)|lock(?:ed|ing)|disabled|restricted|legal\s+action|law\s+enforcement|unauthorized\s+access|security\s+alert|compromised|breach|penalty|lawsuit)\b/i
];

const CREDENTIAL_PATTERNS = [
  /\b(?:verify\s+your\s+account|confirm\s+your\s+(?:identity|password|pin|details)|reset\s+your\s+password|update\s+your\s+(?:billing|credentials|login)|enter\s+your\s+(?:password|pin|otp|passcode)|log\s*in\s+to\s+verify|credential|two-factor|2fa\s+code)\b/i
];

const FINANCIAL_PATTERNS = [
  /\b(?:unpaid\s+invoice|overdue\s+balance|wire\s+transfer|gift\s+card|bitcoin|crypto\s+transfer|prize\s+winner|claim\s+your\s+refund|tax\s+refund|direct\s+deposit|western\s+union|payment\s+overdue|fraudulent\s+charge)\b/i
];

const URL_EXTRACT_REGEX = /(?:https?:\/\/|www\.)[^\s<>"'{}|\\^`[\]]+/gi;

export interface ParsedMessageAnalysis {
  technicalDetails: TechnicalDetails;
  indicators: DetectedIndicator[];
}

export function analyzeMessage(rawMessage: string): ParsedMessageAnalysis {
  const trimmed = rawMessage.trim();
  const indicators: DetectedIndicator[] = [];

  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = trimmed.length;

  // Extract embedded URLs
  const rawUrls = trimmed.match(URL_EXTRACT_REGEX) || [];
  const extractedUrls = Array.from(new Set(rawUrls));

  const urgencyMatches: string[] = [];
  const threatMatches: string[] = [];
  const credentialMatches: string[] = [];
  const financialMatches: string[] = [];

  // Match heuristics
  for (const pattern of URGENCY_PATTERNS) {
    const matches = trimmed.match(pattern);
    if (matches) urgencyMatches.push(...matches);
  }

  for (const pattern of THREAT_PATTERNS) {
    const matches = trimmed.match(pattern);
    if (matches) threatMatches.push(...matches);
  }

  for (const pattern of CREDENTIAL_PATTERNS) {
    const matches = trimmed.match(pattern);
    if (matches) credentialMatches.push(...matches);
  }

  for (const pattern of FINANCIAL_PATTERNS) {
    const matches = trimmed.match(pattern);
    if (matches) financialMatches.push(...matches);
  }

  const technicalDetails: TechnicalDetails = {
    charCount,
    wordCount,
    detectedUrlsCount: extractedUrls.length,
    extractedUrls,
    urgencySignals: urgencyMatches,
    threatSignals: threatMatches,
    credentialSignals: credentialMatches,
    financialSignals: financialMatches
  };

  // --- RULE 1: Urgency / Time Constraints ---
  if (urgencyMatches.length > 0) {
    indicators.push({
      id: 'rule_urgency_pressure',
      name: 'High Urgency & Artificial Time Constraint',
      category: 'Social Engineering',
      severity: 'high',
      score: 25,
      evidence: `Detected high-urgency triggers: "${urgencyMatches.slice(0, 3).join('", "')}".`,
      explanation: 'Phishing and social engineering attacks frequently employ artificial urgency to induce fear or panic, prompting recipients to bypass standard security verification procedures.',
      recommendation: 'Pause and independently assess the communication. Genuine security matters allow for deliberate verification via official support.'
    });
  }

  // --- RULE 2: Threat / Account Suspension ---
  if (threatMatches.length > 0) {
    indicators.push({
      id: 'rule_threat_suspension',
      name: 'Account Suspension & Penalty Threat',
      category: 'Social Engineering',
      severity: 'high',
      score: 25,
      evidence: `Detected punitive/suspension keywords: "${threatMatches.slice(0, 3).join('", "')}".`,
      explanation: 'Scammers claim an account is suspended or compromised to compel the user into entering credentials on an attacker-controlled portal under duress.',
      recommendation: 'Do not click links inside the email. Open a new browser tab, navigate to the official website, and check your real account notification center.'
    });
  }

  // --- RULE 3: Credential Solicitation ---
  if (credentialMatches.length > 0) {
    indicators.push({
      id: 'rule_credential_solicitation',
      name: 'Credential or Password Solicitation',
      category: 'Social Engineering',
      severity: 'critical',
      score: 30,
      evidence: `Detected explicit credential demand: "${credentialMatches.slice(0, 2).join('", "')}".`,
      explanation: 'The communication directly requests credential verification, password updates, or personal security details. Legitimate organizations almost never email asking you to disclose credentials directly.',
      recommendation: 'Never provide passwords, one-time SMS passcodes, or banking credentials through email or unsolicited forms.'
    });
  }

  // --- RULE 4: Financial / Wire Demands ---
  if (financialMatches.length > 0) {
    indicators.push({
      id: 'rule_financial_wire_request',
      name: 'Financial Urgency / Payment Demands',
      category: 'Social Engineering',
      severity: 'high',
      score: 25,
      evidence: `Detected payment / wire triggers: "${financialMatches.slice(0, 2).join('", "')}".`,
      explanation: 'Unsolicited requests for emergency payments, gift cards, overdue invoices, or crypto transfers are hallmark indicators of financial phishing (Business Email Compromise).',
      recommendation: 'Verify any payment or invoice request with the sender via a known trusted phone number or in-person confirmation.'
    });
  }

  // --- RULE 5: Embedded Links with High Pressure ---
  if (extractedUrls.length > 0) {
    const isHighPressure = urgencyMatches.length > 0 || threatMatches.length > 0 || credentialMatches.length > 0;
    
    // Also analyze the first embedded URL statically to inherit any domain risks
    let embeddedUrlIndicators: string[] = [];
    try {
      const urlAnalysis = analyzeUrl(extractedUrls[0]);
      if (urlAnalysis.indicators.length > 0) {
        embeddedUrlIndicators = urlAnalysis.indicators.map(i => i.name);
      }
    } catch {
      // safe fallback
    }

    const detailText = embeddedUrlIndicators.length > 0
      ? ` Found link "${extractedUrls[0]}" with suspected URL indicators (${embeddedUrlIndicators.join(', ')}).`
      : ` Found link: "${extractedUrls[0]}".`;

    indicators.push({
      id: 'rule_embedded_suspicious_link',
      name: 'Embedded Action Link in Message',
      category: 'Social Engineering',
      severity: isHighPressure ? 'high' : 'medium',
      score: isHighPressure ? 20 : 10,
      evidence: `Message contains ${extractedUrls.length} external URL(s).${detailText}`,
      explanation: 'Attackers embed clickable links in messages paired with psychological pressure to funnel victims toward credential harvesting portals.',
      recommendation: 'Hover over links without clicking to check the destination domain, or navigate to the service independently.'
    });
  }

  return {
    technicalDetails,
    indicators
  };
}
