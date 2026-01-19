"use client";

import React from "react";
import {UserIcon} from "./Icons"
interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  avatar?: React.ReactNode;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isUser,
  timestamp,
  avatar,
}) => {
  return (
    <div className={`flex items-start gap-3 mb-6 ${isUser ? "justify-start" : "justify-end"}`}>
      {isUser && avatar && (
        <div className="flex-shrink-0">
          {avatar}
        </div>
      )}
      <div className={`flex flex-col ${isUser ? "items-start" : "items-end"} max-w-[70%]`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-[#F8F8FC] text-[#171717]"
              : "bg-[#C3E5F6] text-[#171717]"
          }`}
        >
          <p className="font-degular text-base leading-6 whitespace-pre-wrap">
            {message}
          </p>
        </div>
        <p className="text-[#686F83] font-degular text-xs mt-1" style={{
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.005em'
        }}>
          {timestamp}
        </p>
      </div>
      {!isUser && avatar && (
        <div className="flex-shrink-0">
          {avatar}
        </div>
      )}
    </div>
  );
};
