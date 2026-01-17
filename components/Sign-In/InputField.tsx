import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  icon: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightIcon?: React.ReactNode;
  borderColor?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  icon,
  value,
  onChange,
  rightIcon,
  borderColor = "#E5E7EB"
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#171717] mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9fc5d8]">
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input-glow w-full pl-12 ${rightIcon ? 'pr-12' : 'pr-4'} py-3.5 bg-white border-2 rounded-2xl text-[#171717] placeholder:text-[#686F83] transition-all font-degular`}
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.005em',
            borderColor: borderColor
          }}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
};
