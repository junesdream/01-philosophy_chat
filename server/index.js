const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

app.use(express.json());

const PHILOSOPHERS = {
    hegel: "You are G.W.F. Hegel. Answer in your dialectical style.",
    kant: "You are Immanuel Kant. Answer with pure reason.",
    nietzsche: "You are Friedrich Nietzsche. Speak in aphorisms."
};

// EXAKTE ROUTE: /api/chat
app.post('/api/chat', async (req, res) => {
    const { message, philosopher } = req.body;
    const systemInstruction = PHILOSOPHERS[philosopher] || PHILOSOPHERS.hegel;

    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${systemInstruction}\n\nUser: ${message}` }]
                }]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        const botText = data.candidates[0].content.parts[0].text;
        res.json({ text: botText });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend is listening on http://127.0.0.1:${PORT}/api/chat`);
});