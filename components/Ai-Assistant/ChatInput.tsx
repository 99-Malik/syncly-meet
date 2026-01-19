"use client";

import React, { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  placeholder?: string;
  compact?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  placeholder = "Ask to schedule a meeting",
  compact = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex items-center gap-2 rounded-2xl border-2 border-[#E5E7EB] bg-[#f8f8fc] ${compact ? 'p-2' : 'p-2'} focus-within:border-[#3eace2] transition-all`}>
      {/* Plus Icon */}
      <button className="flex items-center justify-center hover:opacity-70 transition-opacity flex-shrink-0" type="button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" fill="#0F1113" />
          <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="#0F1113" />
        </svg>

      </button>

      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none font-degular placeholder:text-[#0F1113]"
        style={{
          fontSize: compact ? '14px' : '16px',
          lineHeight: compact ? '20px' : '24px',
          letterSpacing: '0.005em'
        }}
      />

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        type="button"
        className={`bg-[#3eace2] text-white rounded-2xl flex items-center gap-2 hover:bg-[#35a0d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${compact ? 'px-2 py-2' : 'px-4 py-2.5'}`}
      >
        <span className="font-degular font-medium" style={{
          fontSize: compact ? '14px' : '16px',
          lineHeight: compact ? '20px' : '24px',
          letterSpacing: '0.005em'
        }}>
          Send
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.294095 5.28523C-0.0974046 5.15473 -0.101155 4.94398 0.301595 4.80973L14.6168 0.0382304C15.0136 -0.0937696 15.2408 0.12823 15.1298 0.51673L11.0393 14.8312C10.9268 15.228 10.6981 15.2415 10.5301 14.865L7.8346 8.79898L12.3346 2.79898L6.3346 7.29898L0.294095 5.28523V5.28523Z" fill="white" />
        </svg>

      </button>
    </div>
  );
};
