import { knowledge, type KnowledgeChunk } from '../data/knowledge';

const STOP = new Set([
  'the','a','an','is','are','was','were','do','does','did','you','your','we','our','i','me','my',
  'to','of','in','on','for','and','or','it','this','that','with','can','could','would','please',
  'what','which','who','how','about','tell','hi','hello','hey','there','have','has','be','at','as',
  'by','thanks','thank','ok','okay','yes','no','so','if','up','us','any','some','many','done',
  'see','give','show','get','make','know'
]);

function stem(w: string): string {
  if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss')) return w.slice(0, -1);
  return w;
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem);
}

interface IndexedDoc {
  chunk: KnowledgeChunk;
  tf: Map<string, number>;
  keywords: string[];
  len: number;
}

// Pre-index knowledge chunks for BM25 retrieval
const docs: IndexedDoc[] = knowledge.map((chunk) => {
  const kw = (chunk.keywords || []).map((k) => k.toLowerCase());
  const kwStr = kw.join(' ');
  const tokens = tokenize(`${chunk.title} ${chunk.title} ${kwStr} ${kwStr} ${chunk.text}`);
  const tf = new Map<string, number>();
  tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
  return { chunk, tf, keywords: kw, len: tokens.length };
});

const avgLen = docs.reduce((s, d) => s + d.len, 0) / Math.max(docs.length, 1);
const df = new Map<string, number>();
docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) || 0) + 1)));

function idf(term: string): number {
  const n = df.get(term) || 0;
  return Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
}

function termFreq(d: IndexedDoc, q: string): number {
  const exact = d.tf.get(q);
  if (exact) return exact;
  if (q.length >= 4) {
    for (const [t, c] of d.tf) {
      if (t.length >= 4 && (t.startsWith(q) || q.startsWith(t))) return c * 0.6;
    }
  }
  return 0;
}

export const alwaysChunks: KnowledgeChunk[] = knowledge.filter((c) => c.always);

// Retrieve relevant chunks matching query with BM25 + keyword boost
export function retrieve(query: string, topK = 3): KnowledgeChunk[] {
  const qTokens = tokenize(query);
  const lowerQuery = query.toLowerCase().trim();
  const k1 = 1.4;
  const b = 0.75;

  const scored = docs.map((d) => {
    let score = 0;
    for (const q of qTokens) {
      const f = termFreq(d, q);
      if (!f) continue;
      score += idf(q) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)));
    }

    // Keyword match boost
    for (const kw of d.keywords) {
      if (lowerQuery.includes(kw)) {
        score += 5.0;
      }
    }

    return { chunk: d.chunk, score };
  });

  const matching = scored.filter((s) => s.score >= 1.5).sort((a, b2) => b2.score - a.score);
  if (matching.length === 0) return [];

  const topScore = matching[0].score;
  return matching
    .filter((s) => s.score >= topScore * 0.45)
    .slice(0, topK)
    .map((s) => s.chunk);
}

// Compact overview fallback for broad queries
export function overview(): KnowledgeChunk[] {
  return knowledge.map((c) => ({
    ...c,
    text: c.text.length > 300 ? c.text.slice(0, 300) + '…' : c.text,
  }));
}