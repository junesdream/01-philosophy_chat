// src/api.ts
// Use explicit IP to avoid DNS/localhost resolution issues
const API_URL = 'http://127.0.0.1:8080/api/chat';

export interface ChatResponse {
    text: string;
}

export const sendMessage = async (message: string, philosopher: string): Promise<ChatResponse> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, philosopher }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};