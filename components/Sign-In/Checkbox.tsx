import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div
        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
          checked
            ? 'bg-[#3eace2] border-2 border-[#3eace2]'
            : 'bg-[#f1f2f4] border-2 border-[#E5E7EB]'
        }`}
      >
        {checked && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm text-[#686F83]">{label}</span>
    </label>
  );
};
