import React from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  bgColor?: string;
  borderColor?: string;
  checkedBgColor?: string;
  checkedBorderColor?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  label, 
  checked, 
  onChange,
  bgColor,
  borderColor,
  checkedBgColor,
  checkedBorderColor
}) => {
  const defaultUncheckedBg = '#f1f2f4';
  const defaultUncheckedBorder = '#E5E7EB';
  const defaultCheckedBg = '#3eace2';
  const defaultCheckedBorder = '#3eace2';

  const uncheckedBg = bgColor || defaultUncheckedBg;
  const uncheckedBorder = borderColor || defaultUncheckedBorder;
  const checkedBg = checkedBgColor || defaultCheckedBg;
  const checkedBorder = checkedBorderColor || defaultCheckedBorder;

  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center transition-colors border-2"
        style={{
          backgroundColor: checked ? checkedBg : uncheckedBg,
          borderColor: checked ? checkedBorder : uncheckedBorder
        }}
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
