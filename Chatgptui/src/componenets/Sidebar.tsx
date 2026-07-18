import { useEffect, useMemo, useRef, useState } from "react";
import {
  Menu,
  PenSquare,
  MessageSquare,
  Search,
  Settings,
  ChevronRight,
  Sparkles,
  User,
  CircleHelp,
  LogOut,
} from "lucide-react";

import { RiOpenaiFill } from "react-icons/ri";
import { BsLayoutSidebar } from "react-icons/bs";


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
  onNewChat: () => void;
};

const Sidebar = ({
  open,
  onToggle,
  chats,
  activeChat,
  onSelectChat,
  onNewChat,
}: SidebarProps) => {
  const [search, setSearch] = useState("");
  const filteredChats = useMemo(() => {
  return chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );
}, [search, chats]);

  const menuRef = useRef<HTMLDivElement>(null);
const [profileOpen, setProfileOpen] = useState(false);
useEffect(() => {
  const handler = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handler);

  return () =>
    document.removeEventListener("mousedown", handler);
}, []);
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
  className={`
    fixed lg:relative
    top-0 left-0
    h-screen
    bg-[#171717]
    text-white
    border-r border-[#2d2d2d]
    flex flex-col
    z-40
    transition-all duration-300
    ${
      open
        ? "w-[260px] translate-x-0"
        : "w-[72px] -translate-x-full lg:translate-x-0"
    }
  `}
>
        
       <div className="flex items-center justify-between p-3 border-b border-[#2d2d2d]">
  <button
    onClick={onToggle}
    className="group relative h-10 w-10 rounded-lg hover:bg-[#2a2a2a] flex items-center justify-center"
  >
    
    <RiOpenaiFill
      size={24}
      className="absolute transition-all duration-200 opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75"
    />

    
    <BsLayoutSidebar 

      size={20}
      className="absolute transition-all duration-200 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
    />
  </button>
</div>
      
        <div className="p-3">
         <button
  onClick={onNewChat}
  className="w-full flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-[#2a2a2a] transition"
>
            <PenSquare size={18} />
           {open && <span className="text-sm">New chat</span>}
          </button>
        </div>

      
        <div className="px-3 pb-3">
         <div
  className={`rounded-xl bg-[#2a2a2a] ${
    open
      ? "flex items-center gap-3 px-3 py-3"
      : "flex justify-center p-3"
  }`}
>
  <Search size={18} />

  {open && (
  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search chats..."
    className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
  />
)}
</div>
        </div>

        
        <div className="flex-1 overflow-y-auto px-2">
          {open && (
  <p className="px-3 pb-2 text-xs uppercase text-gray-400">
    Recent
  </p>
)}

         {filteredChats.map((chat) => (
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
              {open && (
  <span className="truncate text-sm">
    {chat.title}
  </span>
)}
            </button>
          ))}
          {filteredChats.length === 0 && (
  <p className="px-3 py-2 text-sm text-gray-500">
    No chats found
  </p>
)}
        </div>

        {/* Footer */}
    <div ref={menuRef} className="relative border-t border-[#2d2d2d] p-3">

  {profileOpen && (
    <div className="absolute bottom-20 left-3 right-3 rounded-2xl border border-[#2f2f2f] bg-[#202020] shadow-2xl overflow-hidden">

      <div className="flex items-center justify-between p-4 border-b border-[#2f2f2f]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
            MH
          </div>

          <div>
            <p className="text-sm font-medium">Mohd Hasnain</p>
            <p className="text-xs text-gray-400">Free</p>
          </div>
        </div>

        <ChevronRight size={18} />
      </div>

      <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#2a2a2a]">
        <Sparkles size={18} />
        Try Plus
      </button>

      <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#2a2a2a]">
        <User size={18} />
        Profile
      </button>

      <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#2a2a2a]">
        <Settings size={18} />
        Settings
      </button>

      <button className="flex w-full items-center gap-3 px-4 py-3 hover:bg-[#2a2a2a]">
        <CircleHelp size={18} />
        Help
      </button>

      <button className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10">
        <LogOut size={18} />
        Log out
      </button>
    </div>
  )}

 <div
  onClick={() => setProfileOpen((prev) => !prev)}
  className={`cursor-pointer rounded-xl hover:bg-[#2a2a2a] ${
    open
      ? "flex items-center gap-3 p-2"
      : "flex justify-center p-2"
  }`}
>
    <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
      MH
    </div>

   {open && (
  <div className="overflow-hidden">
    <p className="truncate text-sm">Mohd Hasnain</p>
    <p className="text-xs text-gray-400">Free Plan</p>
  </div>
)}
  </div>
</div>
      </aside>
    </>
  );
};

export default Sidebar;