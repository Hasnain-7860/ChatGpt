import { Menu, Share, MoreHorizontal } from "lucide-react";

type ChatHeaderProps = {
  title?: string;
  onToggleSidebar?: () => void;
};

const ChatHeader = ({
  title = "New chat",
  onToggleSidebar,
}: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 h-14 bg-[#212121]/90 backdrop-blur border-b border-[#2f2f2f] flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-[#2f2f2f] transition"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-white text-sm font-medium truncate">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-[#2f2f2f] transition">
          <Share size={18} className="text-gray-300" />
        </button>

        <button className="p-2 rounded-lg hover:bg-[#2f2f2f] transition">
          <MoreHorizontal size={18} className="text-gray-300" />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;