import { AnalysisResult, DetectedIndicator, RiskLevel, TechnicalDetails } from '../types.ts';

export function calculateRisk(
  type: 'url' | 'message',
  input: string,
  indicators: DetectedIndicator[],
  technicalDetails: TechnicalDetails
): AnalysisResult {
  // Aggregate deterministic rule scores
  const rawSum = indicators.reduce((acc, ind) => acc + ind.score, 0);

  // Normalize score between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, rawSum));

  // Determine categorical severity level
  let riskLevel: RiskLevel = 'LOW';
  if (normalizedScore >= 81) {
    riskLevel = 'CRITICAL';
  } else if (normalizedScore >= 61) {
    riskLevel = 'HIGH';
  } else if (normalizedScore >= 31) {
    riskLevel = 'MEDIUM';
  } else {
    riskLevel = 'LOW';
  }

  // Synthesize tailored recommendations
  const recommendationSet = new Set<string>();

  if (indicators.length === 0) {
    recommendationSet.add('No typical phishing patterns or high-risk syntax anomalies were statically identified.');
    recommendationSet.add('Always ensure standard cyber hygiene: verify the domain name in the address bar before entering sensitive details.');
  } else {
    // Add specific indicator recommendations
    indicators.forEach(ind => {
      if (ind.recommendation) {
        recommendationSet.add(ind.recommendation);
      }
    });

    // Add baseline security reminders
    if (riskLevel === 'HIGH' || riskLevel === 'CRITICAL') {
      recommendationSet.add('Strict Warning: Do NOT enter credentials, personal data, or one-time passcodes on this resource.');
      recommendationSet.add('If you have already submitted credentials, change your password immediately on the official website and enable multi-factor authentication (MFA).');
    }
  }

  const resultId = 'scan_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);

  return {
    id: resultId,
    type,
    input,
    timestamp: new Date().toISOString(),
    riskScore: normalizedScore,
    riskLevel,
    indicators,
    technicalDetails,
    recommendations: Array.from(recommendationSet)
  };
}
