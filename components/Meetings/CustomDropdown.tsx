"use client";

import React, { useState, useRef, useEffect } from "react";

interface CustomDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
    inlineChevron?: boolean;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({ value, onChange, options, placeholder, inlineChevron = false }) => {
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
                className={`w-full h-[48px] px-4 bg-[#F3F4F6] border-0 rounded-xl text-[#171717] font-degular focus:outline-none focus:ring-2 focus:ring-[#3EACE2] transition-all cursor-pointer text-left flex items-center ${inlineChevron ? 'justify-start' : 'justify-between'}`}
                style={{
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '24px'
                }}
            >
                <div className="flex items-center gap-2">
                    <span className="text-[#686F83]">{value || placeholder}</span>
                    {inlineChevron && (
                        <svg 
                            width="16" 
                            height="16" 
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
                    )}
                </div>
                {!inlineChevron && (
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
                )}
            </button>
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#E5E7EB] rounded-xl shadow-lg overflow-hidden">
                    <div 
                        className="py-1 max-h-[200px] overflow-y-auto scroll-hidden"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {options.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2.5 text-left text-[#171717] font-degular hover:bg-[#F3F4F6] transition-colors ${
                                    value === option ? "bg-[#F3F4F6] font-medium" : ""
                                }`}
                                style={{
                                    fontSize: '16px',
                                    fontWeight: value === option ? 500 : 400,
                                    lineHeight: '24px'
                                }}
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
