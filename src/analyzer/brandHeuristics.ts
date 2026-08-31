export interface BrandDefinition {
  name: string;
  officialDomains: string[];
  canonicalTokens: string[];
}

export const MONITORED_BRANDS: BrandDefinition[] = [
  {
    name: 'PayPal',
    canonicalTokens: ['paypal'],
    officialDomains: ['paypal.com', 'paypal.me', 'paypal-community.com']
  },
  {
    name: 'Microsoft',
    canonicalTokens: ['microsoft', 'office365', 'outlook', 'live', 'msn', 'azure', 'sharepoint', 'onedrive'],
    officialDomains: ['microsoft.com', 'office.com', 'live.com', 'outlook.com', 'azure.com', 'sharepoint.com', 'onedrive.com', 'msn.com', 'microsoftonline.com']
  },
  {
    name: 'Google',
    canonicalTokens: ['google', 'gmail', 'youtube', 'workspace'],
    officialDomains: ['google.com', 'google.co.uk', 'google.ca', 'gmail.com', 'youtube.com', 'googleapis.com', 'googleusercontent.com', 'goo.gl']
  },
  {
    name: 'Apple',
    canonicalTokens: ['apple', 'icloud', 'itunes'],
    officialDomains: ['apple.com', 'icloud.com', 'itunes.com', 'me.com']
  },
  {
    name: 'Amazon',
    canonicalTokens: ['amazon', 'primevideo', 'aws'],
    officialDomains: ['amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.ca', 'aws.amazon.com', 'primevideo.com']
  },
  {
    name: 'Meta / Facebook',
    canonicalTokens: ['facebook', 'instagram', 'whatsapp', 'meta'],
    officialDomains: ['facebook.com', 'fb.com', 'instagram.com', 'whatsapp.com', 'meta.com']
  },
  {
    name: 'Netflix',
    canonicalTokens: ['netflix'],
    officialDomains: ['netflix.com']
  },
  {
    name: 'Chase Bank',
    canonicalTokens: ['chase', 'jpmorgan'],
    officialDomains: ['chase.com', 'jpmorgan.com', 'jpmorganchase.com']
  },
  {
    name: 'Bank of America',
    canonicalTokens: ['bankofamerica', 'bofa'],
    officialDomains: ['bankofamerica.com', 'bofa.com']
  },
  {
    name: 'Coinbase',
    canonicalTokens: ['coinbase'],
    officialDomains: ['coinbase.com']
  },
  {
    name: 'DHL Express',
    canonicalTokens: ['dhl'],
    officialDomains: ['dhl.com', 'dhl.de']
  },
  {
    name: 'USPS / FedEx',
    canonicalTokens: ['usps', 'fedex', 'ups'],
    officialDomains: ['usps.com', 'fedex.com', 'ups.com']
  }
];

// Levenshtein distance calculation
export function calculateLevenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  const lenA = a.length;
  const lenB = b.length;

  for (let i = 0; i <= lenA; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= lenB; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[lenA][lenB];
}

// Homoglyph & visual character replacement normalization
export function normalizeVisualLookalikes(input: string): string {
  return input
    .toLowerCase()
    .replace(/[0oöóòôõ]/g, 'o')
    .replace(/[1l|!íìîï]/g, 'l')
    .replace(/[3eéèêë]/g, 'e')
    .replace(/[4aáàâäã@]/g, 'a')
    .replace(/[5s$]/g, 's')
    .replace(/[vv]/g, 'w')
    .replace(/[-_]/g, '');
}

export type BrandMatchType = 'exact_token' | 'combosquatting' | 'typosquatting' | 'homoglyph_lookalike';

export interface BrandMatchResult {
  brand: string;
  matchedToken: string;
  similarity: number; // 0.0 to 1.0 (1.0 = 100%)
  matchType: BrandMatchType;
  isCombosquatting?: boolean;
  isTyposquatting?: boolean;
  isHomoglyph?: boolean;
  description: string;
  explanation: string;
}

export function detectBrandImpersonation(hostname: string): BrandMatchResult[] {
  const matches: BrandMatchResult[] = [];
  const lowerHost = hostname.toLowerCase();

  // Split host into tokens by dots and hyphens
  const rawTokens = lowerHost.split(/[.-]/).filter(Boolean);

  const COMBOSQUATTING_KEYWORDS = [
    'login', 'verify', 'verification', 'account', 'secure', 'security',
    'signin', 'sign-in', 'update', 'confirm', 'auth', 'support', 'service',
    'portal', 'billing', 'wallet', 'recover', 'help', 'online', 'example'
  ];

  for (const brand of MONITORED_BRANDS) {
    // 1. Check if the hostname is genuinely an official domain of this brand
    const isOfficialDomain = brand.officialDomains.some(official => 
      lowerHost === official || lowerHost.endsWith('.' + official)
    );

    if (isOfficialDomain) {
      // It's the official domain, do not flag
      continue;
    }

    let brandDetected = false;

    // 2. Check for exact brand tokens first (100% similarity, NOT typosquatting)
    for (const token of brand.canonicalTokens) {
      if (brandDetected) break;

      const hasExactToken = rawTokens.includes(token);
      if (hasExactToken) {
        // Detect if it combines with additional terms (combosquatting)
        const otherTokens = rawTokens.filter(t => t !== token);
        const hasCombosquatKeywords = otherTokens.some(t => COMBOSQUATTING_KEYWORDS.includes(t));
        const isCombosquatting = otherTokens.length > 0 && (hasCombosquatKeywords || otherTokens.length >= 1);

        const matchType: BrandMatchType = isCombosquatting ? 'combosquatting' : 'exact_token';

        let description = `The hostname contains the exact brand token "${token}" on an unofficial domain.`;
        let explanation = `The hostname contains the exact brand token "${token}" on an unofficial domain, indicating possible brand impersonation.`;

        if (isCombosquatting) {
          explanation = `The domain combines the exact brand name "${token}" with additional terms (such as "${otherTokens.slice(0, 3).join(', ')}"), which indicates combosquatting/brand impersonation.`;
          description = `The hostname contains the exact brand token "${token}" combined with additional terms on an unofficial domain.`;
        }

        matches.push({
          brand: brand.name,
          matchedToken: token,
          similarity: 1.0, // 100% exact match
          matchType,
          isCombosquatting,
          isTyposquatting: false,
          isHomoglyph: false,
          description,
          explanation
        });

        brandDetected = true;
        break;
      }
    }

    if (brandDetected) continue;

    // 3. Check for subdomains/paths where token is embedded directly in a subdomain structure
    for (const token of brand.canonicalTokens) {
      if (brandDetected) break;

      if (lowerHost.includes(`${token}.com.`) || lowerHost.includes(`${token}-`)) {
        // Contains exact token
        matches.push({
          brand: brand.name,
          matchedToken: token,
          similarity: 1.0,
          matchType: 'combosquatting',
          isCombosquatting: true,
          isTyposquatting: false,
          isHomoglyph: false,
          description: `The hostname contains the exact brand token "${token}" on an unofficial domain.`,
          explanation: `The hostname contains the exact brand token "${token}" on an unofficial domain, indicating possible brand impersonation.`
        });
        brandDetected = true;
        break;
      }
    }

    if (brandDetected) continue;

    // 4. Only if NO exact brand token was found, check for Typosquatting and Homoglyph/visual alterations
    for (const token of brand.canonicalTokens) {
      if (brandDetected) break;

      for (const hostToken of rawTokens) {
        // Skip exact match (already handled)
        if (hostToken === token) continue;

        // Check if length is close to the brand token
        if (Math.abs(hostToken.length - token.length) <= 2) {
          const dist = calculateLevenshtein(hostToken, token);
          const normalizedHostToken = normalizeVisualLookalikes(hostToken);
          const normalizedTarget = normalizeVisualLookalikes(token);
          const normDist = calculateLevenshtein(normalizedHostToken, normalizedTarget);

          // Check if it's an actual character-level substitution/insertion/deletion
          const isVisualSubstitution = (normDist === 0 && hostToken !== token);
          const isLevenshteinEdit = (dist > 0 && dist <= 2);

          if (isVisualSubstitution || isLevenshteinEdit) {
            const similarity = Math.max(0, 1 - (dist / Math.max(hostToken.length, token.length)));
            const matchType: BrandMatchType = isVisualSubstitution ? 'homoglyph_lookalike' : 'typosquatting';

            const description = isVisualSubstitution
              ? `The token "${hostToken}" is a visual homoglyph / character substitution of "${token}" (${brand.name}).`
              : `The token "${hostToken}" is a typosquat alteration of "${token}" (${brand.name}).`;

            const explanation = isVisualSubstitution
              ? `The token "${hostToken}" visually substitutes glyphs (e.g. replacing letters with numbers or lookalikes) to mimic the brand "${brand.name}".`
              : `The token "${hostToken}" contains an altered spelling of "${token}" (${brand.name}), indicating typosquatting on an unofficial domain.`;

            matches.push({
              brand: brand.name,
              matchedToken: hostToken,
              similarity: Math.round(similarity * 100) / 100,
              matchType,
              isCombosquatting: false,
              isTyposquatting: !isVisualSubstitution,
              isHomoglyph: isVisualSubstitution,
              description,
              explanation
            });

            brandDetected = true;
            break;
          }
        }
      }
    }
  }

  return matches;
}
