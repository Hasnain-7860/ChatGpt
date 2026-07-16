import Sidebar from "../componenets/Sidebar";
import ChatHeader from "../componenets/ChatHeader";
import Message from "../componenets/Message";
import TypingIndicator from "../componenets/TypingIndicator";
import ChatInput from "../componenets/ChatInput";
import { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat";


import { OpenRouter } from "@openrouter/sdk";
 

const openrouter = new OpenRouter({apiKey:"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"});
 
export async function  streamChat(prompt: string) {
 
  console.log(prompt,"pro")
  const stream = await openrouter.chat.send({
    model : "openai/gpt-5" as any,
    stream: true,
    provider: {
      zdr: true,
      sort: "price",
    },
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
    ],
  });
  console.log(stream ,prompt,"check")

  for await (const chunk of stream) {
    const text = chunk.choices?.[0]?.delta?.content;
    console.log(text,"te")
  }
}

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
 



  const chats = [
    { id: "1", title: "New Chat" },
    { id: "2", title: "React Project" },
    { id: "3", title: "Tailwind CSS" },
  ];

  const bottomRef = useRef<HTMLDivElement>(null);
const {
  messages,
  loading,
  sendMessage,
} = useChat();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);


  return (
    <div className="flex h-screen bg-[#212121] text-white">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        chats={chats}
        activeChat="1"
        onSelectChat={(id) => console.log(id)}
      />

      <div className="flex flex-1 flex-col">
        <ChatHeader
          title="New Chat"
          onToggleSidebar={() =>
            setSidebarOpen((prev) => !prev)
          }
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

        <ChatInput
  loading={loading}
  onSend={streamChat}
/>
      </div>
    </div>
  );
};

export default Chat;