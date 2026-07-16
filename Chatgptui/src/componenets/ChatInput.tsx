import { useState, type KeyboardEvent,  } from "react";
import { ArrowUp } from "lucide-react";

type ChatInputProps = {
  onSend: (message: string) => void;
  loading?: boolean;
};

const ChatInput = ({
  onSend,
  loading = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim();
    console.log(text,"text")

    // if (!text || loading) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-[#212121] border-t border-[#2f2f2f] p-4">
      <div className="max-w-3xl mx-auto flex items-end gap-3 rounded-3xl border border-[#3a3a3a] bg-[#303030] px-4 py-3">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-400 outline-none max-h-40"
        />

        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center disabled:bg-gray-600 disabled:text-gray-400 transition"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;