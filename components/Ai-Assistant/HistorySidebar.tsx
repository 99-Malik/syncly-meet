"use client";

import React from "react";

interface Chat {
  id: string;
  title: string;
  isActive: boolean;
}

interface HistorySidebarProps {
  recentChats: Chat[];
  isOpen: boolean;
  onClose?: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  recentChats,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const ChatItem = ({ chat }: { chat: Chat }) => (
    <div
      className={`mx-4 px-4 py-2 cursor-pointer transition-colors rounded-xl ${
        chat.isActive ? "bg-white border border-[#DADCE0]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className="flex-1 truncate"
          style={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            color: chat.isActive ? "#010409" : "#010409",
          }}
        >
          {chat.title}
        </span>
        <button className="ml-3 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4" cy="10" r="1.5" fill="#1a1a1a" />
            <circle cx="10" cy="10" r="1.5" fill="#1a1a1a" />
            <circle cx="16" cy="10" r="1.5" fill="#1a1a1a" />
          </svg>
        </button>
      </div>
    </div>
  );

  const SidebarHeader = () => (
    <div className="px-8 pt-6 pb-4">
      <h2
        style={{
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "24px",
          color: "#686F83",
        }}
      >
        Recent Chats
      </h2>
    </div>
  );

  const ChatList = () => (
    <div className="flex-1 overflow-y-auto pb-6">
      <div className="flex flex-col gap-2">
        {recentChats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-[240px] h-full flex-shrink-0 bg-[#f8f8fc] rounded-2xl border border-[#E5E7EB] overflow-hidden -mr-10">
        <SidebarHeader />
        <ChatList />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden fixed right-0 top-0 bottom-0 w-[85%] max-w-[340px] bg-[#f8f8fc] border border-[#E5E7EB] z-50 flex flex-col overflow-hidden transform transition-transform duration-300 ease-out rounded-2xl m-3">
        <SidebarHeader />
        <ChatList />
      </div>
    </>
  );
};

// Demo component to show the sidebar with sample data
export const HistorySidebarDemo: React.FC = () => {
  const sampleChats: Chat[] = [
    { id: "1", title: "Today's stock news...", isActive: true },
    { id: "2", title: "Monthly strategy meeti...", isActive: false },
    { id: "3", title: "Daily stand-up: Progres...", isActive: false },
    { id: "4", title: "Quarterly performance...", isActive: false },
    { id: "5", title: "Brainstorming session:...", isActive: false },
    { id: "6", title: "Client update call: Feed...", isActive: false },
    { id: "7", title: "Cross-department colla...", isActive: false },
    { id: "8", title: "Project kickoff: Goal...", isActive: false },
    { id: "9", title: "Wrap-up meeting: Lesson...", isActive: false },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex justify-end p-4">
      <HistorySidebar recentChats={sampleChats} isOpen={true} />
    </div>
  );
};

export default HistorySidebar;