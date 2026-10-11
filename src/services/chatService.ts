import chatFaqData from '../data/chatFaq.json';
import { capabilities } from '../data/portfolio';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTION = `You are "pedit", a friendly and professional AI assistant for the pedit-lab portfolio website.
Your goal is to answer visitor questions about our services, projects, skills, and contact details.

Here is the verified portfolio context you must use to answer:
${JSON.stringify(capabilities, null, 2)}

Rules:
1. Introduce yourself briefly as "pedit" when greeted.
2. Only provide information related to our services, innovations, and portfolio. If asked about something unrelated, politely steer the conversation back.
3. For simple greetings or small talk (e.g., "hi", "hello", "how are you"), respond VERY briefly (1-2 sentences). Do NOT provide a long summary of services unless explicitly asked. Just say hello and ask how you can help.
4. Keep answers concise, helpful, and encourage users to visit the Contact section or request a quote if they need a project done.`;

export interface ChatAction {
  label: string;
  type: 'navigate' | 'scroll' | 'quote';
  target: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  actions?: ChatAction[];
}

export interface QuickChip {
  id: string;
  label: string;
  query: string;
}

export interface PredefinedQA {
  id?: string;
  keywords: string[];
  reply: string;
  actions?: ChatAction[];
}

export const QUICK_CHIPS: QuickChip[] = chatFaqData.quickChips as QuickChip[];
export const COMMON_QA: PredefinedQA[] = chatFaqData.faqList as PredefinedQA[];
export const FALLBACK_MESSAGE = chatFaqData.fallback as { reply: string; actions?: ChatAction[] };

// Levenshtein edit distance
function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array(b.length + 1);

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = Math.min(prev[j - 1] + 1, curr[j - 1] + 1, prev[j] + 1);
      }
    }
    const temp = prev;
    prev = curr;
    curr = temp;
  }
  return prev[b.length];
}

// Pre-compiled keyword regex cache
const keywordRegexCache = new Map<string, RegExp>();

function getKeywordRegex(kw: string): RegExp {
  let pattern = keywordRegexCache.get(kw);
  if (!pattern) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    pattern = new RegExp(`(?:^|\\s)${escaped}(?=\\s|$)`);
    keywordRegexCache.set(kw, pattern);
  }
  return pattern;
}

for (const item of COMMON_QA) {
  for (const kw of item.keywords) {
    getKeywordRegex(kw);
  }
}

// Word-boundary match
function kwMatches(text: string, kw: string): boolean {
  if (text === kw) return true;
  const pattern = getKeywordRegex(kw);
  return pattern.test(text);
}

// Fuzzy match (edit distance <= 2)
function fuzzyKwMatches(text: string, kw: string): boolean {
  if (kwMatches(text, kw)) return true;

  const textWords = text.split(' ');
  const kwWords = kw.split(' ');

  // Single-word match
  if (kwWords.length === 1) {
    const target = kwWords[0];
    if (target.length <= 3) return false;
    const maxDist = target.length <= 5 ? 1 : 2;

    for (const w of textWords) {
      if (Math.abs(w.length - target.length) <= maxDist) {
        if (levenshteinDistance(w, target) <= maxDist) {
          return true;
        }
      }
    }
    return false;
  }

  // Multi-word sliding window match
  const windowLen = kwWords.length;
  if (textWords.length < windowLen) {
    if (Math.abs(text.length - kw.length) <= 2 && levenshteinDistance(text, kw) <= 2) {
      return true;
    }
    return false;
  }

  for (let i = 0; i <= textWords.length - windowLen; i++) {
    const windowStr = textWords.slice(i, i + windowLen).join(' ');
    if (Math.abs(windowStr.length - kw.length) <= 2 && levenshteinDistance(windowStr, kw) <= 2) {
      return true;
    }
  }

  return false;
}

function findAnswer(userText: string): { reply: string; actions?: ChatAction[] } | null {
  const clean = userText.trim().toLowerCase().replace(/[^\w\s]/g, ' ');
  const normalized = clean.replace(/\s+/g, ' ').trim();

  if (!normalized) {
    return {
      reply: "Please type a question or select one of the suggested topics below!",
      actions: [
        { label: 'Explore Services', type: 'scroll', target: 'services' },
        { label: 'Contact Us', type: 'scroll', target: 'contact' }
      ]
    };
  }

  // Score FAQ items by matched keyword length
  let bestMatch: PredefinedQA | null = null;
  let bestScore = 0;

  for (const item of COMMON_QA) {
    let score = 0;
    for (const kw of item.keywords) {
      if (kwMatches(normalized, kw)) {
        score += kw.length;
      } else if (fuzzyKwMatches(normalized, kw)) {
        score += Math.max(1, kw.length - 1);
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && bestScore > 0) {
    return { reply: bestMatch.reply, actions: bestMatch.actions };
  }

  return null;
}

async function callGeminiFallback(messages: ChatMessage[]): Promise<{ reply: string; actions?: ChatAction[] }> {
  if (!GEMINI_API_KEY) {
    return FALLBACK_MESSAGE;
  }

  try {
    // Format conversation history for Gemini
    const formattedHistory = messages
      .filter(msg => msg.role === 'user' || messages.indexOf(msg) > 0)
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

    const firstUserIdx = formattedHistory.findIndex(m => m.role === 'user');
    const validHistory = firstUserIdx >= 0 ? formattedHistory.slice(firstUserIdx) : [];

    if (validHistory.length === 0) {
      return FALLBACK_MESSAGE;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: validHistory
      })
    });

    if (!response.ok) {
      console.warn(`Gemini API returned status ${response.status}`);
      return FALLBACK_MESSAGE;
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (reply && reply.trim()) {
      return {
        reply: reply.trim(),
        actions: [
          { label: 'Explore Services', type: 'scroll', target: 'services' },
          { label: 'Contact Us', type: 'scroll', target: 'contact' }
        ]
      };
    }

    return FALLBACK_MESSAGE;
  } catch (err) {
    console.warn('Gemini fallback failed:', err);
    return FALLBACK_MESSAGE;
  }
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<{ reply: string; actions?: ChatAction[] }> {
  try {
    const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
    if (!lastUserMsg) {
      return { reply: "Please type a message to get started!" };
    }

    // Check predefined FAQ
    try {
      const predefinedAnswer = findAnswer(lastUserMsg.text);
      if (predefinedAnswer) {
        await new Promise(resolve => setTimeout(resolve, 250));
        return predefinedAnswer;
      }
    } catch (err) {
      console.error('Error matching FAQ answer in findAnswer():', err);
    }

    // Fallback to Gemini
    return await callGeminiFallback(messages);
  } catch (error) {
    console.error('Chat error:', error);
    return {
      reply: "I'm having trouble connecting right now. Please feel free to reach out via our contact form!",
      actions: [
        { label: 'Go to Contact Form', type: 'scroll', target: 'contact' },
        { label: 'Request a Quote', type: 'quote', target: 'contact' }
      ]
    };
  }
}