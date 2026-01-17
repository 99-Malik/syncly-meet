import React from "react";

interface RightColumnProps {
  children: React.ReactNode;
}

export const RightColumn: React.FC<RightColumnProps> = ({ children }) => {
  return (
    <div className="hidden lg:flex flex-1 items-center justify-center p-6 bg-white rounded-2xl">
      <div className="w-full max-w-lg 2xl:max-w-xl flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
