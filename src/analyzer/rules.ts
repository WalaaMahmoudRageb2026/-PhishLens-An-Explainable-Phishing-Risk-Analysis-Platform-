import { RuleDefinition } from '../types.ts';

export const SYSTEM_RULES: RuleDefinition[] = [
  // URL Rules
  {
    id: 'rule_ip_address_host',
    name: 'IP Address as Hostname',
    category: 'Domain & Host',
    defaultSeverity: 'medium',
    defaultScore: 25,
    description: 'The URL uses a raw IP address (IPv4 or IPv6) instead of a standard registered domain name.',
    generalRecommendation: 'Avoid entering credentials or downloading files on raw IP addresses unless it is an explicitly trusted internal administrative endpoint.'
  },
  {
    id: 'rule_at_symbol_trick',
    name: 'Embedded User-Info (@ Symbol)',
    category: 'URL Syntax & Structure',
    defaultSeverity: 'high',
    defaultScore: 20,
    description: 'The URL contains an "@" symbol, which standard URL specifications interpret as user-info authentication syntax before the real host.',
    generalRecommendation: 'Inspect the actual destination host that appears AFTER the "@" symbol. Threat actors use this to disguise malicious landing servers.'
  },
  {
    id: 'rule_http_protocol',
    name: 'Unencrypted Connection (HTTP)',
    category: 'Protocol & Security',
    defaultSeverity: 'low',
    defaultScore: 10,
    description: 'The connection uses unencrypted HTTP instead of HTTPS. Traffic and credentials can be intercepted in transit.',
    generalRecommendation: 'Never submit passwords, personal data, or payment information over plain HTTP connections.'
  },
  {
    id: 'rule_brand_impersonation',
    name: 'Suspected Brand Impersonation / Typosquatting',
    category: 'Brand Impersonation',
    defaultSeverity: 'high',
    defaultScore: 25,
    description: 'The hostname closely resembles a well-known brand or institution via character substitution, hyphenation, or domain prepending.',
    generalRecommendation: 'Verify the domain against official trusted bookmarks or search engine results rather than clicking links directly.'
  },
  {
    id: 'rule_auth_keywords_url',
    name: 'Authentication & Account Keywords in URL',
    category: 'Keywords & Intent',
    defaultSeverity: 'medium',
    defaultScore: 15,
    description: 'The URL contains sensitive credential or verification keywords (such as login, verify, password, account, reset).',
    generalRecommendation: 'Check if the root domain is genuinely the legitimate provider before supplying authentication credentials.'
  },
  {
    id: 'rule_excessive_subdomains',
    name: 'Excessive Subdomain Depth',
    category: 'Domain & Host',
    defaultSeverity: 'medium',
    defaultScore: 12,
    description: 'The hostname contains an unusually high number of subdomains (3+), a technique often used to disguise secondary phishing hosts.',
    generalRecommendation: 'Read the hostname from right-to-left to identify the true top-level and root domain being contacted.'
  },
  {
    id: 'rule_excessive_url_length',
    name: 'Excessive URL Length',
    category: 'URL Syntax & Structure',
    defaultSeverity: 'low',
    defaultScore: 8,
    description: 'The overall URL exceeds 100 characters in length, which is frequently used to obscure malicious parameters or push hosts off-screen.',
    generalRecommendation: 'Examine the destination components carefully when encountering abnormally long links.'
  },
  {
    id: 'rule_suspicious_encoding',
    name: 'Abnormal URL Encoding / Obfuscation',
    category: 'URL Syntax & Structure',
    defaultSeverity: 'medium',
    defaultScore: 15,
    description: 'The URL utilizes excessive percent-encoding, double-encoding, or non-standard characters to obfuscate the real target.',
    generalRecommendation: 'Do not follow URLs with deeply obfuscated hex representations or disguised redirects.'
  },
  {
    id: 'rule_suspicious_tld',
    name: 'High-Abuse Top-Level Domain (TLD)',
    category: 'Domain & Host',
    defaultSeverity: 'low',
    defaultScore: 10,
    description: 'The domain utilizes a TLD statistically associated with high rates of malicious campaign registration (e.g. .tk, .ml, .top, .work, .buzz).',
    generalRecommendation: 'Treat domains on free or high-abuse registrars with heightened skepticism.'
  },
  {
    id: 'rule_non_standard_port',
    name: 'Non-Standard Web Port',
    category: 'Protocol & Security',
    defaultSeverity: 'medium',
    defaultScore: 12,
    description: 'The URL targets an unusual port instead of standard web ports (80 for HTTP or 443 for HTTPS).',
    generalRecommendation: 'Verify whether the non-standard port is legitimate infrastructure before connecting.'
  },

  // Message / Email Rules
  {
    id: 'rule_urgency_pressure',
    name: 'High Urgency & Artificial Time Constraint',
    category: 'Social Engineering',
    defaultSeverity: 'high',
    defaultScore: 25,
    description: 'The message exerts psychological pressure by giving urgent deadlines (e.g., "within 24 hours", "immediate action required").',
    generalRecommendation: 'Do not react impulsively to artificial deadlines. Legitimate organizations rarely demand instant action under penalty of immediate loss.'
  },
  {
    id: 'rule_threat_suspension',
    name: 'Account Suspension & Penalty Threats',
    category: 'Social Engineering',
    defaultSeverity: 'high',
    defaultScore: 25,
    description: 'The message threatens negative consequences such as account termination, legal action, or service revocation.',
    generalRecommendation: 'Log into your account independently through the official website/app to check legitimate account status notifications.'
  },
  {
    id: 'rule_credential_solicitation',
    name: 'Credential or Password Solicitation',
    category: 'Social Engineering',
    defaultSeverity: 'critical',
    defaultScore: 30,
    description: 'The message requests your password, PIN, two-factor code, or directs you to input credentials immediately.',
    generalRecommendation: 'Never share passwords, OTP tokens, or secret keys via email or unverified landing forms.'
  },
  {
    id: 'rule_financial_wire_request',
    name: 'Financial Urgency / Payment Demands',
    category: 'Social Engineering',
    defaultSeverity: 'high',
    defaultScore: 25,
    description: 'The text references unexpected invoices, gift cards, crypto transfers, or overdue penalties.',
    generalRecommendation: 'Confirm any unexpected financial transfer request via a verified secondary voice or internal channel.'
  },
  {
    id: 'rule_embedded_suspicious_link',
    name: 'Embedded Links in Urgent Context',
    category: 'Social Engineering',
    defaultSeverity: 'medium',
    defaultScore: 20,
    description: 'The message contains clickable external hyperlinks embedded directly alongside urgent action demands.',
    generalRecommendation: 'Avoid clicking links inside unsolicited messages. Navigate directly to the company web portal.'
  }
];
