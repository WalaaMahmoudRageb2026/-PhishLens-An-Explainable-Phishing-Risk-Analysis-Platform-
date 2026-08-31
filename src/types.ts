import React from 'react';

export type IndicatorSeverity = 'low' | 'medium' | 'high' | 'critical';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface DetectedIndicator {
  id: string;
  name: string;
  category: string;
  severity: IndicatorSeverity;
  score: number;
  evidence: string;
  explanation: string;
  recommendation: string;
}

export interface TechnicalDetails {
  scheme?: string;
  isHttps?: boolean;
  hostname?: string;
  port?: string | null;
  path?: string;
  query?: string;
  queryParamsCount?: number;
  urlLength?: number;
  hostnameLength?: number;
  subdomainCount?: number;
  subdomains?: string[];
  isIpAddress?: boolean;
  ipVersion?: 'IPv4' | 'IPv6' | null;
  hasAtSymbol?: boolean;
  hasPunycode?: boolean;
  pathDepth?: number;
  matchedKeywords?: string[];
  matchedBrands?: Array<{
    brand: string;
    matchedToken: string;
    similarity: number;
    description: string;
  }>;
  // Message specific
  charCount?: number;
  wordCount?: number;
  detectedUrlsCount?: number;
  extractedUrls?: string[];
  urgencySignals?: string[];
  threatSignals?: string[];
  credentialSignals?: string[];
  financialSignals?: string[];
}

export interface AnalysisResult {
  id: string;
  type: 'url' | 'message';
  input: string;
  timestamp: string;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  indicators: DetectedIndicator[];
  technicalDetails: TechnicalDetails;
  recommendations: string[];
  aiExplanation?: string;
}

export interface RuleDefinition {
  id: string;
  name: string;
  category: string;
  defaultSeverity: IndicatorSeverity;
  defaultScore: number;
  description: string;
  generalRecommendation: string;
}

export interface TestCase {
  id: string;
  name: string;
  type: 'url' | 'message';
  input: string;
  expectedRiskLevel: RiskLevel;
  expectedIndicators: string[];
  description: string;
}

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  actualRiskLevel: RiskLevel;
  actualScore: number;
  actualIndicators: string[];
  diffs?: string[];
}
