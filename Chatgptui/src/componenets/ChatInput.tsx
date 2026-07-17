import { useState, type KeyboardEvent } from "react";
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

    if (!text || loading) return;

    onSend(text);
    setMessage("");
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-[#2f2f2f] bg-[#212121] p-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3 rounded-3xl border border-[#3a3a3a] bg-[#303030] px-4 py-3 justify-center text-center items-center">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          disabled={loading}
          className="max-h-40 flex-1 resize-none bg-transparent text-white placeholder:text-gray-400 outline-none disabled:opacity-50"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;