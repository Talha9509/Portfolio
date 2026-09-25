import React, { useState, useRef, useEffect } from "react";
import { portfolioData } from "../data/portfolioData";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const AskAI: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: `Hello! 👋 I'm ${portfolioData.personal.name}'s AI assistant. You can ask me anything about his technical stack, past experience, project architecture, or availability. What would you like to explore?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    "Tell me about his featured projects and architecture",
    "What are his strongest tech skills?",
    "What is his experience with AI and Full Stack?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
    // scrollToBottom();
  // }, [messages, isLoading]);

  const handleSend = async (questionToSend?: string) => {
    const text = (questionToSend ?? inputQuestion).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion("");
    setErrorNotice(null);
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      // Connect to the backend API endpoint
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log(apiUrl)
      const response = await fetch(`${apiUrl}/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.answer || "I received your question but couldn't generate an answer.";

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error communicating with backend:", err);
      setErrorNotice(
        "Could not reach backend server. Please make sure the FastAPI backend is running."
      );

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I couldn't reach the backend LLM service right now. Please verify that the backend server is running.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputQuestion(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <section id="contact" className="py-12 px-6 max-w-4xl mx-auto border-t border-white/5">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Interactive AI
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Ask Me Anything (AI Recruiter)
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Have questions about my background, resume, or engineering approach? Ask the AI model in real time.
        </p>
      </div>

      {/* ChatGPT-style Chat Container */}
      <div className="bg-[#101010] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[560px]">
        {/* Header bar */}
        <div className="px-5 py-3.5 border-b border-white/5 bg-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Portfolio Intelligence Agent</p>
              <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Connected to Groq LLM Backend
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  id: "reset",
                  role: "assistant",
                  content: "Chat cleared! What else would you like to know about Talha?",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ])
            }
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10"
          >
            Clear Chat
          </button>
        </div>

        {/* Message feed */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 font-medium ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-800 text-purple-300 border border-white/10"
                }`}
              >
                {msg.role === "user" ? "You" : "AI"}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-tr-sm"
                    : "bg-[#181818] text-zinc-200 border border-white/5 rounded-tl-sm whitespace-pre-wrap"
                }`}
              >
                <p>{msg.content}</p>
                <span className="block text-[10px] text-zinc-400/70 text-right mt-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-zinc-800 text-purple-300 border border-white/10 flex items-center justify-center text-xs shrink-0">
                AI
              </div>
              <div className="bg-[#181818] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-zinc-400 text-xs">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                <span>Consulting resume data & generating response...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 border-t border-white/5 bg-[#121212]/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 whitespace-nowrap">
              Suggestions:
            </span>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:border-purple-400/50 whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Error notification banner if any */}
        {errorNotice && (
          <div className="px-4 py-2 bg-rose-500/10 border-t border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
            <span>{errorNotice}</span>
            <button onClick={() => setErrorNotice(null)} className="text-rose-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Text Input area */}
        <div className="p-4 border-t border-white/10 bg-[#141414]">
          <div className="flex items-end gap-2 bg-[#0c0c0c] border border-white/10 rounded-xl p-2 focus-within:border-purple-500/60 transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputQuestion}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about Talha's skills, experience, or projects... (Press Enter)"
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 resize-none outline-none px-2 py-1 max-h-28"
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputQuestion.trim() || isLoading}
              className="p-2 rounded-lg bg-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-500 transition-all shrink-0"
              title="Send message"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <p className="text-[11px] text-zinc-500 mt-2 text-center">
            Connected to FastAPI backend with Groq LLM. Answers are based directly on candidate profile.
          </p>
        </div>
      </div>
    </section>
  );
};
