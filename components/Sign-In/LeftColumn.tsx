import React from "react";

interface LeftColumnProps {
  children: React.ReactNode;
}

export const LeftColumn: React.FC<LeftColumnProps> = ({ children }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-12 2xl:p-16">
      <div className="w-full max-w-md 2xl:max-w-lg">
        {children}
      </div>
    </div>
  );
};
