import React, { useState } from 'react';
import { sendMessage } from './api';
import './index.css';

interface Message {
    role: 'user' | 'bot';
    content: string;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [philosopher, setPhilosopher] = useState('hegel');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await sendMessage(input, philosopher);
            const botMsg: Message = { role: 'bot', content: response.text };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1 className="matrix-text">DIALECTIC.OS v1.0</h1>
                <div className="controls">
                    <label>Select Persona: </label>
                    <select value={philosopher} onChange={(e) => setPhilosopher(e.target.value)}>
                        <option value="hegel">G.W.F. Hegel</option>
                        <option value="kant">Immanuel Kant</option>
                        <option value="nietzsche">Friedrich Nietzsche</option>
                    </select>
                </div>
            </header>

            <main className="chat-window">
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.role === 'user' ? 'user-msg' : 'bot-msg'}`}>
                        <strong>{m.role === 'user' ? 'Architect' : philosopher.toUpperCase()}:</strong>
                        <p>{m.content}</p>
                    </div>
                ))}
                {loading && <p className="matrix-text">Processing dialectics...</p>}
            </main>

            <footer className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Enter concept for synthesis..."
                />
                <button onClick={handleSend} disabled={loading}>EXECUTE</button>
            </footer>
        </div>
    );
};

export default App;