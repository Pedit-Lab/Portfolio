import type { Config } from '@netlify/functions';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { contents?: unknown; systemInstruction?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { contents, systemInstruction } = body;
  if (!Array.isArray(contents) || contents.length === 0 || contents.length > 20) {
    return new Response(JSON.stringify({ error: 'Invalid contents request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: { maxOutputTokens: 500, temperature: 0.6 },
        }),
      }
    );

    const data = await geminiRes.text();
    return new Response(data, {
      status: geminiRes.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Netlify function upstream failure:', err);
    return new Response(JSON.stringify({ error: 'Upstream failure' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config: Config = {
  path: '/api/chat',
};
