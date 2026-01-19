"use client";

import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value}) => {
  return (
    <div className="bg-white rounded-2xl px-6 py-5   border border-[#E5E7EB]">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-[#0F1113] font-degular" style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '0.005em'
        }}>
          {title}
        </h3>
      </div>
      <p className="text-3xl font-bold text-[#171717] font-hyperspace" style={{
        fontSize: '32px',
        fontWeight: 700,
        lineHeight: '120%',
        letterSpacing: '-0.02em'
      }}>
        {value}
      </p>
    </div>
  );
};
