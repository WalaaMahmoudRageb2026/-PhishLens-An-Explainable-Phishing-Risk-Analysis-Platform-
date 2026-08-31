import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { analyzeUrl } from './src/analyzer/urlAnalyzer.ts';
import { analyzeMessage } from './src/analyzer/messageAnalyzer.ts';
import { calculateRisk } from './src/risk/riskEngine.ts';
import { SYSTEM_RULES } from './src/analyzer/rules.ts';
import { runAllTests } from './src/analyzer/testSuite.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

// Initialize Gemini client lazily
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PhishLens Security Analysis Engine',
    version: '1.0.0',
    mode: 'deterministic-rules'
  });
});

// 2. Rules List
app.get('/api/rules', (req, res) => {
  res.json({
    rules: SYSTEM_RULES,
    totalRules: SYSTEM_RULES.length
  });
});

// 3. URL Analyzer Endpoint
app.post('/api/analyze/url', (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'A valid URL string is required.' });
    }

    if (url.length > 2048) {
      return res.status(400).json({ error: 'URL exceeds maximum allowable length (2048 chars).' });
    }

    const { technicalDetails, indicators } = analyzeUrl(url);
    const result = calculateRisk('url', url, indicators, technicalDetails);

    res.json(result);
  } catch (err: any) {
    console.error('Error analyzing URL:', err);
    res.status(500).json({ error: 'Failed to complete URL security analysis.' });
  }
});

// 4. Message Analyzer Endpoint
app.post('/api/analyze/message', (req, res) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'A valid text/email message string is required.' });
    }

    if (message.length > 10000) {
      return res.status(400).json({ error: 'Message exceeds maximum allowable length (10,000 chars).' });
    }

    const { technicalDetails, indicators } = analyzeMessage(message);
    const result = calculateRisk('message', message, indicators, technicalDetails);

    res.json(result);
  } catch (err: any) {
    console.error('Error analyzing message:', err);
    res.status(500).json({ error: 'Failed to complete message security analysis.' });
  }
});

// 5. Test Suite Execution Endpoint
app.get('/api/tests/run', (req, res) => {
  try {
    const results = runAllTests();
    const passedCount = results.filter(r => r.passed).length;
    res.json({
      total: results.length,
      passed: passedCount,
      failed: results.length - passedCount,
      results
    });
  } catch (err: any) {
    console.error('Error running test suite:', err);
    res.status(500).json({ error: 'Failed to execute automated test suite.' });
  }
});

// 6. Optional AI Explanation Layer Endpoint (Does not alter risk score)
app.post('/api/explain/ai', async (req, res) => {
  try {
    const { analysisResult } = req.body;
    if (!analysisResult) {
      return res.status(400).json({ error: 'Analysis result object is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Deterministic fallback natural language summary
      const indNames = (analysisResult.indicators || []).map((i: any) => i.name).join(', ');
      const fallbackSummary = analysisResult.indicators && analysisResult.indicators.length > 0
        ? `The ${analysisResult.type === 'url' ? 'URL' : 'message'} presents a ${analysisResult.riskLevel} risk assessment (${analysisResult.riskScore}/100) based on ${analysisResult.indicators.length} detected security indicator(s): ${indNames}. Exercise caution and verify identity through official channels prior to credential entry.`
        : `The ${analysisResult.type === 'url' ? 'URL' : 'message'} presents a LOW risk assessment (${analysisResult.riskScore}/100) with no classic phishing or social-engineering indicators identified statically.`;
      
      return res.json({
        explanation: fallbackSummary,
        source: 'rule-engine-deterministic'
      });
    }

    const prompt = `You are a cybersecurity expert on the PhishLens Explainable Phishing Analysis platform.
Explain the following phishing risk assessment in 2-3 clear, objective, educational sentences for an end user.

Target Type: ${analysisResult.type}
Input: "${analysisResult.input}"
Risk Score: ${analysisResult.riskScore}/100
Risk Severity Level: ${analysisResult.riskLevel}
Detected Indicators: ${JSON.stringify(analysisResult.indicators.map((i: any) => ({ name: i.name, evidence: i.evidence, why: i.explanation })))}
Primary Recommendations: ${JSON.stringify(analysisResult.recommendations)}

CRITICAL SECURITY CONSTRAINT:
- You must NOT alter, contradict, or override the risk score or severity level.
- Clearly distinguish between an "indicator of risk" and "absolute proof".
- Provide a concise, professional risk summary.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an educational cybersecurity awareness assistant. Be concise, accurate, and non-alarmist.',
      }
    });

    const aiText = response.text?.trim() || 'No AI explanation generated.';
    res.json({
      explanation: aiText,
      source: 'gemini-3.7-flash'
    });
  } catch (err: any) {
    console.error('Error generating AI explanation:', err);
    res.json({
      explanation: 'Analysis completed deterministically via PhishLens Rule Engine. Review the individual indicator cards below for detailed explanations.',
      source: 'fallback'
    });
  }
});

// Vite Middleware for dev / static for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PhishLens server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
