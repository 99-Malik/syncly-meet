"use client";

import React from "react";
import { LoginButton } from "./LoginButton";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    buttonText: string;
    onButtonClick: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    buttonText,
    onButtonClick,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl p-8 max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#171717] hover:text-[#3eace2] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-[#3eace2] rounded-full flex items-center justify-center">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="5" width="90" height="90" rx="45" fill="#3EACE2" />
                            <rect x="5" y="5" width="90" height="90" rx="45" stroke="#C3E5F6" stroke-width="10" />
                            <g clip-path="url(#clip0_1_12751)">
                                <path d="M46.5003 55.551L62.5863 39.4633L65.0625 41.9378L46.5003 60.5L35.3633 49.363L37.8378 46.8885L46.5003 55.551Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_12751">
                                    <rect width="42" height="42" fill="white" transform="translate(29 29)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-[#171717] text-center mb-3 font-hyperspace">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="text-[#6F6F6F] text-center mb-6 font-degular" style={{
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0.005em'
                }}>
                    {subtitle}
                </p>

                {/* Button */}
                <LoginButton text={buttonText} onClick={onButtonClick} />
            </div>
        </div>
    );
};
