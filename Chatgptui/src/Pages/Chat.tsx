import { useRef, useState, useEffect } from "react";
import Sidebar from "../componenets/Sidebar";
import ChatHeader from "../componenets/ChatHeader";
import Message from "../componenets/Message";
import TypingIndicator from "../componenets/TypingIndicator";
import ChatInput from "../componenets/ChatInput";
import { getMessages, saveMessages } from "../utils/chatStorage";

import { OpenRouter } from "@openrouter/sdk";
export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};
const openRouter = new OpenRouter({
  apiKey: "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",
});

async function streamChat(prompt: string) {
  const result = await openRouter.chat.send({
    chatRequest: {
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    },
  });  

  return result.choices[0].message.content ?? "";
}

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [chats, setChats] = useState<Chat[]>(() => {
    const saved = localStorage.getItem("chat_app");

    if (saved) return JSON.parse(saved);

    return [
      {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [],
      },
    ];
  });

  const [activeChatId, setActiveChatId] = useState(() => chats[0].id);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
  localStorage.setItem("chat_app", JSON.stringify(chats));
}, [chats]);

const activeChat = chats.find(
  (chat) => chat.id === activeChatId
);

const messages = activeChat?.messages ?? [];

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

 async function handleSend(prompt: string) {
  if (!prompt.trim()) return;

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content: prompt,
  };

  setChats((prev) =>
    prev.map((chat) =>
      chat.id === activeChatId
        ? {
            ...chat,
            title:
              chat.messages.length === 0
                ? prompt.slice(0, 25)
                : chat.title,
            messages: [...chat.messages, userMessage],
          }
        : chat
    )
  );

  setLoading(true);

  try {
    const response = await streamChat(prompt);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: response,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, assistantMessage],
            }
          : chat
      )
    );
  } catch {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  id: crypto.randomUUID(),
                  role: "assistant",
                  content: "Something went wrong.",
                },
              ],
            }
          : chat
      )
    );
  } finally {
    setLoading(false);
  }
}

 
  return (
    <div className="flex h-screen bg-[#212121] text-white">
     <Sidebar
  open={sidebarOpen}
  onToggle={() => setSidebarOpen((prev) => !prev)}
  chats={chats}
  activeChat={activeChatId}
  onSelectChat={setActiveChatId}
/>  

      <div className="flex flex-1 flex-col">
        <ChatHeader
          title="New Chat"
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <div className="flex-1 overflow-y-auto px-5 py-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-12">
            {messages.map((message) => (
              <Message
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))}

            {loading && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>
        </div>

        <ChatInput loading={loading} onSend={handleSend} />
      </div>
    </div>
  );
};

export default Chat;