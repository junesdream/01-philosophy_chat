# DIALECTIC.OS v1.0 🤖🏛️

A specialized AI chat interface for philosophical synthesis with history's greatest minds. Built as a technical demonstration of a React/Node.js stack integrated with Large Language Models.

## 🌟 Overview

DIALECTIC.OS is not just a chatbot — it's a **Dialectic Engine**. It forces the AI to adopt specific philosophical frameworks (Hegelian Dialectics, Kantian Pure Reason, Nietzschean Aphorisms) to process user concepts through a rigorous intellectual lens.

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Backend:** Node.js, Express
- **AI Integration:** Google Gemini API (REST)
- **Styling:** Custom CSS (Matrix/Cyberpunk aesthetic)
- **State Management:** React Hooks

## 🚀 Features

- **Persona Selection** — Dynamic system prompting for different philosophical modes
- **Secure API Proxy** — Dedicated Express backend keeps credentials server-side
- **Real-time Dialectics** — Streaming-ready interface for concept synthesis
- **Cybernetic UI** — High-contrast, terminal-inspired design optimized for focus

## ⚙️ Installation

1. **Clone the repository**
```bash
   git clone https://github.com/junesdream/philosophy-chat.git
   cd philosophy-chat
```

2. **Install dependencies**

   Frontend:
```bash
   npm install
```

Backend:
```bash
   cd server
   npm install
```

3. **Configure environment variables**

   Create a `.env` file in the `server/` directory:
```env
   GEMINI_API_KEY=your_api_key_here
   PORT=8080
```

4. **Run the application**

   Backend (from `server/`):
```bash
   node index.js
```

Frontend (from root):
```bash
   npm run dev
```


## 🧠 Philosophy Behind the Code

As a developer with a background in Musicology, I'm fascinated by the structures of logic and harmony. This project explores the intersection of human thought and machine intelligence — treating the prompt as a musical score that the LLM must perform within strict parameters.

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! If you'd like to improve DIALECTIC.OS, feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-idea`)
3. Commit your changes (`git commit -m 'feat: add your idea'`)
4. Push to the branch (`git push origin feature/your-idea`)
5. Open a Pull Request