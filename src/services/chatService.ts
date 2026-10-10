// src/services/chatService.ts
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

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  try {
    // Filter out the initial model greeting from the conversation history
    // Gemini requires the conversation to start with a 'user' turn
    const conversationHistory = messages
      .filter(msg => msg.role === 'user' || messages.indexOf(msg) > 0)
      .map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

    // Ensure first message is from user
    const userMessages = conversationHistory.filter(m => m.role === 'user');
    if (userMessages.length === 0) {
      return "Please type a message to get started!";
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }]
        },
        contents: conversationHistory
      })
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error('Gemini API error:', response.status, errorBody);
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "Sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('Chat error:', error);
    return "I'm having trouble connecting right now. Please feel free to reach out via our contact form!";
  }
}