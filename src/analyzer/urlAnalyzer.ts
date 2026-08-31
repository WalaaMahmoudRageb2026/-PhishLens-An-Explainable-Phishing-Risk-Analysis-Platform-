import { DetectedIndicator, TechnicalDetails } from '../types.ts';
import { detectBrandImpersonation } from './brandHeuristics.ts';

const AUTH_KEYWORDS = [
  'login', 'verify', 'verification', 'account', 'password',
  'reset', 'secure', 'update', 'authenticate', 'confirm',
  'signin', 'sign-in', 'banking', 'wallet', 'unlock', 'recover', 'credential'
];

const SUSPICIOUS_TLDS = [
  '.tk', '.ml', '.ga', '.cf', '.gq', '.top', '.work',
  '.buzz', '.club', '.xyz', '.fit', '.rest', '.surf', '.cam'
];

const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPV6_REGEX = /^\[?[0-9a-fA-F:]+\]?$/;

export interface ParsedUrlAnalysis {
  technicalDetails: TechnicalDetails;
  indicators: DetectedIndicator[];
}

export function analyzeUrl(rawInput: string): ParsedUrlAnalysis {
  const trimmed = rawInput.trim();
  const indicators: DetectedIndicator[] = [];

  // Normalize input string for safe parsing
  let normalizedUrl = trimmed;
  let hasExplicitScheme = true;

  if (!/^https?:\/\//i.test(trimmed)) {
    hasExplicitScheme = false;
    normalizedUrl = 'http://' + trimmed;
  }

  let parsed: URL | null = null;
  try {
    parsed = new URL(normalizedUrl);
  } catch {
    // Malformed fallback parser
  }

  const rawHasAt = trimmed.includes('@');
  const rawScheme = hasExplicitScheme ? (trimmed.match(/^([a-zA-Z0-9+.-]+):\/\//)?.[1]?.toLowerCase() || 'http') : 'unspecified (defaulting to http)';
  const isHttps = rawScheme === 'https';

  let hostname = '';
  let port: string | null = null;
  let pathname = '';
  let search = '';

  if (parsed) {
    hostname = parsed.hostname;
    port = parsed.port || null;
    pathname = parsed.pathname;
    search = parsed.search;
  } else {
    // Fallback extraction
    const withoutScheme = trimmed.replace(/^https?:\/\//i, '');
    const firstSlash = withoutScheme.indexOf('/');
    const hostPart = firstSlash === -1 ? withoutScheme : withoutScheme.slice(0, firstSlash);
    hostname = hostPart.split('@').pop()?.split(':')[0] || 'unknown';
    pathname = firstSlash === -1 ? '/' : withoutScheme.slice(firstSlash);
  }

  // Calculate Subdomains & Registered Domain
  const hostParts = hostname.split('.').filter(Boolean);
  const isIpv4 = IPV4_REGEX.test(hostname);
  const isIpv6 = !isIpv4 && (IPV6_REGEX.test(hostname) || hostname.includes(':'));
  const isIpAddress = isIpv4 || isIpv6;

  let subdomains: string[] = [];
  let subdomainCount = 0;
  let registeredDomain = hostname;

  if (!isIpAddress && hostParts.length >= 2) {
    // Handle multi-part ccTLDs like .co.uk, .com.au
    const secondLevelTlds = ['co.uk', 'gov.uk', 'ac.uk', 'com.au', 'net.au', 'co.jp', 'com.br'];
    const lastTwo = hostParts.slice(-2).join('.');
    const isMultiPartTld = secondLevelTlds.includes(lastTwo) && hostParts.length >= 3;

    if (isMultiPartTld) {
      registeredDomain = hostParts.slice(-3).join('.');
      subdomains = hostParts.slice(0, -3);
    } else {
      registeredDomain = hostParts.slice(-2).join('.');
      subdomains = hostParts.slice(0, -2);
    }
    subdomainCount = subdomains.length;
  }

  // Keywords extraction
  const lowerUrl = trimmed.toLowerCase();
  const matchedKeywords = AUTH_KEYWORDS.filter(kw => lowerUrl.includes(kw));

  // Brand impersonation heuristic
  const brandMatches = isIpAddress ? [] : detectBrandImpersonation(hostname);

  // Punycode check
  const hasPunycode = hostname.includes('xn--') || /[^\x00-\x7F]/.test(trimmed);

  // Path depth
  const pathDepth = pathname.split('/').filter(Boolean).length;
  const queryParamsCount = parsed ? Array.from(parsed.searchParams.keys()).length : (search ? search.split('&').length : 0);

  // Technical Details Record
  const technicalDetails: TechnicalDetails = {
    scheme: rawScheme,
    isHttps,
    hostname,
    registeredDomain,
    port: port || (isHttps ? '443' : '80'),
    path: pathname,
    query: search,
    queryParamsCount,
    urlLength: trimmed.length,
    hostnameLength: hostname.length,
    subdomainCount,
    subdomains,
    isIpAddress,
    ipVersion: isIpv4 ? 'IPv4' : isIpv6 ? 'IPv6' : null,
    hasAtSymbol: rawHasAt,
    hasPunycode,
    pathDepth,
    matchedKeywords,
    matchedBrands: brandMatches
  };

  // --- RULE 1: IP Address Host ---
  if (isIpAddress) {
    indicators.push({
      id: 'rule_ip_address_host',
      name: 'IP Address as Hostname',
      category: 'Domain & Host',
      severity: 'medium',
      score: 25,
      evidence: `Target host "${hostname}" is a numerical ${isIpv4 ? 'IPv4' : 'IPv6'} address rather than a domain name.`,
      explanation: 'The URL uses an IP address instead of a recognizable domain name. While used in internal testing, attackers frequently use raw IP addresses to bypass domain reputation blocks and avoid domain registration oversight.',
      recommendation: 'Verify if this is an authorized corporate intranet address. Do not enter credentials on public IP-based links.'
    });
  }

  // --- RULE 2: Embedded @ Symbol ---
  if (rawHasAt) {
    indicators.push({
      id: 'rule_at_symbol_trick',
      name: 'Embedded User-Info (@ Symbol)',
      category: 'URL Syntax & Structure',
      severity: 'high',
      score: 20,
      evidence: `Found '@' symbol in target URL: "${trimmed}". Host resolved to "${hostname}".`,
      explanation: 'In the URI standard (RFC 3986), characters prior to "@" represent user authentication info, while the characters following "@" indicate the true server. Phishers use this trick to display trusted brand text before "@" while sending victims to an adversarial server.',
      recommendation: 'Look past the "@" symbol to locate the actual target domain before clicking.'
    });
  }

  // --- RULE 3: HTTP Connection ---
  if (!isHttps) {
    indicators.push({
      id: 'rule_http_protocol',
      name: 'Unencrypted Connection (HTTP)',
      category: 'Protocol & Security',
      severity: 'low',
      score: 10,
      evidence: `Protocol scheme is "${rawScheme}://" without SSL/TLS encryption.`,
      explanation: 'Connection is not protected by HTTPS encryption. Any traffic, session cookies, or credentials entered can be intercepted by intermediaries. Note: Plain HTTP is a security weakness and risk indicator, not conclusive proof of a phishing attack.',
      recommendation: 'Do not input confidential passwords or financial details over non-HTTPS links.'
    });
  }

  // --- RULE 4: Brand Impersonation & Typosquatting ---
  if (brandMatches.length > 0) {
    const primaryMatch = brandMatches[0];
    const similarityPercent = Math.round(primaryMatch.similarity * 100);

    let ruleName = 'Suspected Brand Impersonation';
    if (primaryMatch.matchType === 'typosquatting') {
      ruleName = 'Suspected Brand Typosquatting';
    } else if (primaryMatch.matchType === 'homoglyph_lookalike') {
      ruleName = 'Visual Homoglyph Brand Impersonation';
    } else if (primaryMatch.matchType === 'combosquatting') {
      ruleName = 'Suspected Brand Impersonation / Combosquatting';
    }

    const evidence = `${primaryMatch.brand}: ${primaryMatch.description} (Brand Token: "${primaryMatch.matchedToken}", Similarity: ${similarityPercent}%, Matching Type: ${primaryMatch.matchType === 'exact_token' ? 'Exact Brand Token' : primaryMatch.matchType === 'combosquatting' ? 'Exact Brand Token + Combosquatting' : primaryMatch.matchType === 'homoglyph_lookalike' ? 'Visual Homoglyph' : 'Typosquatting'})`;

    indicators.push({
      id: 'rule_brand_impersonation',
      name: ruleName,
      category: 'Brand Impersonation',
      severity: 'high',
      score: 25,
      evidence,
      explanation: primaryMatch.explanation,
      recommendation: `Do not enter credentials or personal information on this page. Navigate directly to the official website of ${primaryMatch.brand} using a trusted search engine or saved bookmark.`
    });
  }

  // --- RULE 5: Authentication / Sensitive Keywords ---
  if (matchedKeywords.length > 0) {
    const scoreAdd = Math.min(20, matchedKeywords.length * 5 + 5);
    indicators.push({
      id: 'rule_auth_keywords_url',
      name: 'Authentication & Account Keywords in URL',
      category: 'Keywords & Intent',
      severity: matchedKeywords.length >= 2 ? 'medium' : 'low',
      score: scoreAdd,
      evidence: `Detected sensitive keywords: [${matchedKeywords.join(', ')}] within the URL string.`,
      explanation: 'The URL contains authentication or verification keywords such as login, verify, or password. While legitimate services utilize these endpoints, phishing lures commonly pair these terms with unofficial domains to harvest user accounts.',
      recommendation: 'Cross-reference the root domain before entering any login credentials.'
    });
  }

  // --- RULE 6: Excessive Subdomain Depth ---
  if (subdomainCount >= 3) {
    indicators.push({
      id: 'rule_excessive_subdomains',
      name: 'Excessive Subdomain Depth',
      category: 'Domain & Host',
      severity: 'medium',
      score: 12,
      evidence: `Hostname contains ${subdomainCount} subdomains: [${subdomains.join(', ')}].`,
      explanation: 'The domain structure has deep nesting. Phishing campaigns often construct elaborate subdomains (e.g. "paypal.verify.secure.example.com") to push the actual root domain off mobile screen views.',
      recommendation: 'Inspect the right-most root domain part to confirm the true registrant.'
    });
  }

  // --- RULE 7: Excessive URL Length ---
  if (trimmed.length > 90) {
    const scoreVal = trimmed.length > 140 ? 10 : 6;
    indicators.push({
      id: 'rule_excessive_url_length',
      name: 'Excessive URL Length',
      category: 'URL Syntax & Structure',
      severity: 'low',
      score: scoreVal,
      evidence: `URL length is ${trimmed.length} characters (typical legitimate threshold < 80).`,
      explanation: 'Abnormally long URLs are often engineered to hide tracking payloads, base64 redirects, or conceal the true host destination from user address bars.',
      recommendation: 'Check the URL structure carefully for embedded redirection parameters.'
    });
  }

  // --- RULE 8: Abnormal Character Obfuscation / Punycode ---
  if (hasPunycode || (trimmed.match(/%[0-9a-fA-F]{2}/g) || []).length > 4) {
    indicators.push({
      id: 'rule_suspicious_encoding',
      name: 'Abnormal URL Encoding / Obfuscation',
      category: 'URL Syntax & Structure',
      severity: 'medium',
      score: 15,
      evidence: hasPunycode ? `Internationalized domain or Punycode notation in "${hostname}".` : 'Multiple percent-encoded hex sequences in URL string.',
      explanation: 'The URL incorporates non-ASCII homoglyphs (IDN homograph attack) or heavy percent-encoding designed to obscure the plain-text destination from standard visual inspection.',
      recommendation: 'Exercise high caution. Homoglyph domains can visually mimic letters while pointing to completely foreign servers.'
    });
  }

  // --- RULE 9: High-Abuse TLD ---
  const matchedTld = SUSPICIOUS_TLDS.find(tld => hostname.endsWith(tld));
  if (matchedTld) {
    indicators.push({
      id: 'rule_suspicious_tld',
      name: 'High-Abuse Top-Level Domain (TLD)',
      category: 'Domain & Host',
      severity: 'low',
      score: 10,
      evidence: `Domain ends with "${matchedTld}", a TLD known for disposable domain registrations.`,
      explanation: `Top-Level Domains such as ${matchedTld} feature low-cost or free registrations that are disproportionately represented in disposable phishing attacks.`,
      recommendation: 'Ensure you recognize the organization operating on this TLD before interacting.'
    });
  }

  // --- RULE 10: Non-Standard Port ---
  if (port && port !== '80' && port !== '443') {
    indicators.push({
      id: 'rule_non_standard_port',
      name: 'Non-Standard Web Port',
      category: 'Protocol & Security',
      severity: 'medium',
      score: 12,
      evidence: `Custom port detected: :${port}`,
      explanation: 'Web applications typically serve public traffic over port 80 (HTTP) or 443 (HTTPS). Non-standard ports can signify rogue proxy tunnels, staging servers, or evasion techniques.',
      recommendation: 'Confirm whether the custom port belongs to an authenticated administrative portal.'
    });
  }

  return {
    technicalDetails,
    indicators
  };
}
