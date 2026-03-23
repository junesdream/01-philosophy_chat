import React, { useState } from 'react';
import { sendMessage as callPhilosophyAPI } from './api';
import { PHILOSOPHY_MOCKS } from './mockData';
import './index.css';

interface Message {
    role: 'user' | 'bot';
    content: string;
    philosopherKey: string; // stores which philosopher was active at message time
}

const PHILOSOPHER_NAMES: Record<string, string> = {
    sokrates: 'Sokrates', platon: 'Platon', aristoteles: 'Aristoteles',
    epiktet: 'Epiktet', marc_aurel: 'Marc Aurel', descartes: 'René Descartes',
    spinoza: 'Baruch Spinoza', locke: 'John Locke', hume: 'David Hume',
    rousseau: 'Jean-Jacques Rousseau', voltaire: 'Voltaire', kant: 'Immanuel Kant',
    fichte: 'Johann Gottlieb Fichte', hegel: 'G.W.F. Hegel',
    schopenhauer: 'Arthur Schopenhauer', leibniz: 'Gottfried Wilhelm Leibniz',
    kierkegaard: 'Søren Kierkegaard', nietzsche: 'Friedrich Nietzsche',
    heidegger: 'Martin Heidegger', sartre: 'Jean-Paul Sartre', camus: 'Albert Camus',
    wittgenstein: 'Ludwig Wittgenstein', popper: 'Karl Popper',
    arendt: 'Hannah Arendt', foucault: 'Michel Foucault', habermas: 'Jürgen Habermas',
    confucius: 'Konfuzius', laozi: 'Laozi', zhuangzi: 'Zhuangzi',
    buddha: 'Siddhartha Gautama', nagarjuna: 'Nāgārjuna',
    shankaracharya: 'Adi Shankaracharya', ibn_rushd: 'Ibn Rushd',
    ibn_sina: 'Ibn Sina', al_ghazali: 'Al-Ghazālī',
};

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [philosopher, setPhilosopher] = useState('hegel');
    const [loading, setLoading] = useState(false);

    const handleClear = () => setMessages([]);

    const handleSend = async () => {
        if (!input.trim()) return;

        // snapshot: which philosopher is active RIGHT NOW
        const currentPhilosopher = philosopher;
        const currentInput = input;

        const userMsg: Message = {
            role: 'user',
            content: currentInput,
            philosopherKey: currentPhilosopher
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await callPhilosophyAPI(currentInput, currentPhilosopher);
            setMessages(prev => [...prev, {
                role: 'bot',
                content: response.text,
                philosopherKey: currentPhilosopher // locked to snapshot
            }]);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.warn("API Error - Switching to Mock Mode", errorMessage);

            const mockReply = PHILOSOPHY_MOCKS[currentPhilosopher] ?? PHILOSOPHY_MOCKS["Default"];

            setTimeout(() => {
                setMessages(prev => [...prev, {
                    role: 'bot',
                    content: `(OFFLINE_MODE) ${mockReply}`,
                    philosopherKey: currentPhilosopher // locked to snapshot
                }]);
                setLoading(false);
            }, 800);
            return;
        }
        setLoading(false);
    };

    return (
        <div className="app-container">
            <header className="header">
                <div className="header-top">
                    <h1 className="matrix-text">DIALECTIC.OS v1.0</h1>
                    {messages.length > 0 && (
                        <button className="clear-btn" onClick={handleClear}>
                            ⌫ CLEAR
                        </button>
                    )}
                </div>
                <div className="controls">
                    <label>Select Persona: </label>
                    <select value={philosopher} onChange={(e) => setPhilosopher(e.target.value)}>
                        <optgroup label="🏛️ Antike">
                            <option value="sokrates">Sokrates</option>
                            <option value="platon">Platon</option>
                            <option value="aristoteles">Aristoteles</option>
                            <option value="epiktet">Epiktet</option>
                            <option value="marc_aurel">Marc Aurel</option>
                        </optgroup>
                        <optgroup label="💡 Aufklärung & Moderne">
                            <option value="descartes">René Descartes</option>
                            <option value="spinoza">Baruch Spinoza</option>
                            <option value="locke">John Locke</option>
                            <option value="hume">David Hume</option>
                            <option value="rousseau">Jean-Jacques Rousseau</option>
                            <option value="voltaire">Voltaire</option>
                        </optgroup>
                        <optgroup label="🇩🇪 Deutsche Idealisten">
                            <option value="kant">Immanuel Kant</option>
                            <option value="fichte">Johann Gottlieb Fichte</option>
                            <option value="hegel">G.W.F. Hegel</option>
                            <option value="schopenhauer">Arthur Schopenhauer</option>
                            <option value="leibniz">Gottfried Wilhelm Leibniz</option>
                        </optgroup>
                        <optgroup label="😰 Existenzialisten">
                            <option value="kierkegaard">Søren Kierkegaard</option>
                            <option value="nietzsche">Friedrich Nietzsche</option>
                            <option value="heidegger">Martin Heidegger</option>
                            <option value="sartre">Jean-Paul Sartre</option>
                            <option value="camus">Albert Camus</option>
                        </optgroup>
                        <optgroup label="🔬 Zeitgenössisch">
                            <option value="wittgenstein">Ludwig Wittgenstein</option>
                            <option value="popper">Karl Popper</option>
                            <option value="arendt">Hannah Arendt</option>
                            <option value="foucault">Michel Foucault</option>
                            <option value="habermas">Jürgen Habermas</option>
                        </optgroup>
                        <optgroup label="🌏 Östlich & Asiatisch">
                            <option value="confucius">Konfuzius</option>
                            <option value="laozi">Laozi</option>
                            <option value="zhuangzi">Zhuangzi</option>
                            <option value="buddha">Siddhartha Gautama (Buddha)</option>
                            <option value="nagarjuna">Nāgārjuna</option>
                            <option value="shankaracharya">Adi Shankaracharya</option>
                            <option value="ibn_rushd">Ibn Rushd (Averroes)</option>
                            <option value="ibn_sina">Ibn Sina (Avicenna)</option>
                            <option value="al_ghazali">Al-Ghazālī</option>
                        </optgroup>
                    </select>
                </div>
            </header>

            <main className="chat-window">
                {messages.map((m, i) => (
                    <div key={i} className={`message ${m.role === 'user' ? 'user-msg' : 'bot-msg'}`}>
                        {/* each message uses its own saved philosopherKey, not current state */}
                        <strong>
                            {m.role === 'user'
                                ? 'Architect'
                                : PHILOSOPHER_NAMES[m.philosopherKey] ?? m.philosopherKey}:
                        </strong>
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