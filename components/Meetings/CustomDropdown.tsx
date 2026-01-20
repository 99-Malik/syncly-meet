"use client";

import React, { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 bg-[#F1F2F4] border border-[#E5E7EB] rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all cursor-pointer text-left flex items-center justify-between"
            >
                <span className="text-[#686F83]">{value || placeholder}</span>
                <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                >
                    <g clipPath="url(#clip0_2_14093)">
                        <path d="M12 13.1722L16.95 8.22217L18.364 9.63617L12 16.0002L5.63599 9.63617L7.04999 8.22217L12 13.1722Z" fill="#0F1113"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_14093">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                    <div className="py-1">
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-gray-900 hover:bg-gray-50 transition-colors ${
                                    value === option ? "bg-gray-50 font-medium" : ""
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
