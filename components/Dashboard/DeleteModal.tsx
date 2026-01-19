"use client";

import React from "react";
import { createPortal } from "react-dom";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    onConfirm: () => void;
    title: string;
    subtitle: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onCancel,
    onConfirm,
    title,
    subtitle,
}) => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const handleCancel = () => {
        onCancel();
        onClose();
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[24px] p-8 max-w-lg w-full relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-[#171717] hover:text-[#3eace2] transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Delete Icon */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        {/* Outer light red circle */}
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="5" width="90" height="90" rx="45" fill="#EA4949" />
                            <rect x="5" y="5" width="90" height="90" rx="45" stroke="#FCE8E8" stroke-width="10" />
                            <g clip-path="url(#clip0_228_3140)">
                                <path d="M60.6667 43.3333V60.6666C60.6667 61.3739 60.3858 62.0521 59.8857 62.5522C59.3856 63.0523 58.7073 63.3333 58.0001 63.3333H42.0001C41.2928 63.3333 40.6146 63.0523 40.1145 62.5522C39.6144 62.0521 39.3334 61.3739 39.3334 60.6666V43.3333H36.6667V40.6666H63.3334V43.3333H60.6667ZM42.0001 43.3333V60.6666H58.0001V43.3333H42.0001ZM48.6667 46H51.3334V48.6666H48.6667V46ZM48.6667 50H51.3334V52.6666H48.6667V50ZM48.6667 54H51.3334V56.6666H48.6667V54ZM43.3334 36.6666H56.6667V39.3333H43.3334V36.6666Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_228_3140">
                                    <rect width="32" height="32" fill="white" transform="translate(34 34)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-[#171717] text-center mb-6 font-hyperspace leading-[120%] tracking-[-0.02em]">
                    {title}
                </h2>

                {/* Subtitle */}
                <p className="text-[#686F83] text-center mb-6 font-degular text-base leading-6 tracking-[0.005em]">
                    {subtitle}
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-6">
                    {/* Cancel Button */}
                    <button
                        onClick={handleCancel}
                        className="bg-[#171717] text-white font-semibold font-hyperspace  rounded-2xl transition-colors w-[130px] h-[50px] py-3 px-4 text-base leading-6 tracking-[0.005em]"
                    >
                        No , Cancel
                    </button>
                    {/* Delete Button */}
                    <button
                        onClick={handleConfirm}
                        className="bg-[#EA4949] text-white font-semibold font-hyperspace rounded-xl transition-colors w-[130px] h-[50px] py-3 px-4 text-base leading-6 tracking-[0.005em]"
                    >
                        Yes Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};
