import React from "react";

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
  return (
    <button 
      className={`w-full bg-primary py-4 rounded-2xl font-base text-base cursor-pointer transition-colors mt-2 ${className}`}
      style={{ color: textColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
