import { Copy, Check } from "lucide-react";
import { useState } from "react";

export type MessageProps = {
  role: "user" | "assistant";
  content: string;
};

const Message = ({ role, content }: MessageProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`w-full flex ${
        role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-3xl rounded-3xl px-5 py-4 text-sm leading-7 ${
          role === "user"
            ? "bg-[#303030] text-white"
            : "bg-transparent text-white"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>

        {role === "assistant" && (
          <button
            onClick={handleCopy}
            className="absolute -bottom-5 left-0 flex items-center gap-1 rounded-lg px-2 py-1 text-gray-400 hover:bg-[#303030] hover:text-white transition"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="text-xs">
              {copied ? "Copied" : "Copy"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Message;