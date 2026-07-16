import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! 👋 How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: text,
      },
    ]);

    setLoading(true);

    try {
 const response = await ai.models.generateContent({
  model: "gemini-2.5-pro",
  contents: text,
});

setMessages((prev) => [
  ...prev,
  {
    id: Date.now() + 1,
    role: "assistant",
    content: response.text ?? "",
  },
]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Something went wrong.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: "assistant",
        content: "Hello! 👋 How can I help you today?",
      },
    ]);
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
};

export default useChat;