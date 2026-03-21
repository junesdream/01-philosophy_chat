// src/api.ts
// Direct Gemini API call — no backend server needed
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export interface ChatResponse {
    text: string;
}

export const sendMessage = async (message: string, philosopher: string): Promise<ChatResponse> => {
    const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `Du bist ${philosopher}, der berühmte Philosoph. 
                           Antworte NUR in seinem typischen Stil, seiner Sprache und seinen Kernthesen. Beziehe dich auf seine echten Werke. Frage: ${message}`
                }]
            }]
        }),
    });

    if (!response.ok) {
        throw new Error('Gemini API error');
    }

    const data = await response.json();
    return {
        text: data.candidates[0].content.parts[0].text
    };
};