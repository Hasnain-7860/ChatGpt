import { Menu, PenSquare, MessageSquare, Search, Settings } from "lucide-react";

type Chat = {
  id: string;
  title: string;
};

type SidebarProps = {
  open: boolean;
  onToggle: () => void;
  chats: Chat[];
  activeChat: string;
  onSelectChat: (id: string) => void;
};

const Sidebar = ({
  open,
  onToggle,
  chats,
  activeChat,
  onSelectChat,
}: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0
          h-screen
          w-[260px]
          bg-[#171717]
          text-white
          border-r border-[#2d2d2d]
          flex flex-col
          transition-transform duration-300
          z-40
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        
        <div className="flex items-center justify-between p-3 border-b border-[#2d2d2d]">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-[#2a2a2a]"
          >
            <Menu size={20} />
          </button>

          <button className="p-2 rounded-lg hover:bg-[#2a2a2a]">
            <PenSquare size={18} />
          </button>
        </div>

      
        <div className="p-3">
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-[#2a2a2a] transition">
            <PenSquare size={18} />
            <span className="text-sm">New chat</span>
          </button>
        </div>

      
        <div className="px-3 pb-3">
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-[#2a2a2a] transition">
            <Search size={18} />
            <span className="text-sm">Search chats</span>
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto px-2">
          <p className="px-3 pb-2 text-xs uppercase text-gray-400">
            Recent
          </p>

          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition mb-1 ${
                activeChat === chat.id
                  ? "bg-[#2f2f2f]"
                  : "hover:bg-[#2a2a2a]"
              }`}
            >
              <MessageSquare size={17} />
              <span className="truncate text-sm">{chat.title}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[#2d2d2d] p-3">
          <button className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-[#2a2a2a] transition">
            <Settings size={18} />
            <span className="text-sm">Settings</span>
          </button>

          <div className="mt-3 flex items-center gap-3 rounded-xl p-2 hover:bg-[#2a2a2a] cursor-pointer">
            {/* <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-9 h-9 rounded-full"
            /> */}
            <div >
                <h1 className=" h-10 w-10 bg-gray-600 text-center items-center justify-center rounded-[40px] text-center item-center justify-center flex">MH</h1>
            </div>

            <div className="overflow-hidden">
              <p className="text-sm truncate">Mohd Hasnain</p>
              <p className="text-xs text-gray-400">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;