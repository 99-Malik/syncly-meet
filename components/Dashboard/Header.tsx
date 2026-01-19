"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  breadcrumb?: string;
  showBackArrow?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, breadcrumb, showBackArrow = false, onBack }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-5 mb-1">
        {showBackArrow && (
          <button
            onClick={handleBack}
            className="text-[#171717] hover:text-[#686F83] transition-colors mb-3 cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="#171717" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-[#171717] font-hyperspace" style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '120%',
            letterSpacing: '-0.02em'
          }}>
            {title}
          </h1>
          {breadcrumb && (
            <p className="font-degular mt-2" style={{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '0.005em'
            }}>
              {breadcrumb.split(' / ').map((part, index, array) => (
                <span key={index}>
                  {index > 0 && <span className="text-[#686F83] mx-1">/</span>}
                  <span className={index === array.length - 1 ? "text-[#686F83]" : "text-[#171717]"}>
                    {part}
                  </span>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};