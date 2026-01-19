"use client";

import React from "react";

interface DateSeparatorProps {
  date: string;
}

export const DateSeparator: React.FC<DateSeparatorProps> = ({ date }) => {
  return (
    <div className="flex items-center mb-6 justify-center">
      <span className="px-4 text-[#686F83] font-degular text-sm" style={{
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.005em'
      }}>
        {date}
      </span>
    </div>
  );
};
