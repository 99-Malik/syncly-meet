"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export interface LoginButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  textColor?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ 
  text, 
  onClick,
  className = "",
  textColor = "white"
}: LoginButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    // If custom onClick is provided, use it and don't do default navigation
    if (onClick) {
      onClick();
      return;
    }

    if (pathname === "/" && text.toLowerCase() === "login") {
      router.push("/dashboard");
    }
  };

  return (
    <button 
      className={`w-full bg-primary py-4 font-hyperspace rounded-2xl font-base text-base cursor-pointer transition-colors mt-2 ${className}`}
      style={{ color: textColor }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
