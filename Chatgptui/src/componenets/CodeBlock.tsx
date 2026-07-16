import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock = ({
  code,
  language = "tsx",
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-[#3a3a3a] bg-[#1e1e1e]">
      <div className="flex items-center justify-between bg-[#2b2b2b] px-4 py-2">
        <span className="text-xs text-gray-300 uppercase">
          {language}
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-gray-300 hover:text-white"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span className="text-xs">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: "#1e1e1e",
          padding: "16px",
          fontSize: "14px",
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;