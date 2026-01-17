import React from "react";

interface HeadingProps {
  title: string;
  subtitle: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-4">
      <h1
        className="text-[#171717] mb-2 font-hyperspace font-bold"
        style={{
          fontSize: '40px',
          fontWeight: 700,
          lineHeight: '120%',
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </h1>
      <p
        className="text-[#686F83] font-degular"
        style={{
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '0.005em'
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};
