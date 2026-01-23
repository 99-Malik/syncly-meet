"use client";

import React from "react";

interface IntegrationCardProps {
    icon: React.ReactNode;
    title: string;
    email: string;
    onDisconnect?: () => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
    icon,
    title,
    email,
    onDisconnect
}) => {
    return (
        <div className="bg-[#f8f8fc] border border-[#E5E7EB] rounded-xl px-6 py-4 flex items-center justify-between">
            {/* Left Section - Icon and Account Info */}
            <div className="flex items-center gap-4">
                {/* Icon Container */}
                <div className="bg-white p-2 rounded-full  flex items-center justify-center flex-shrink-0">
                    {icon}
                </div>

                {/* Account Info */}
                <div>
                    <h3 className="text-[#171717] font-degular mb-1" style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px'
                    }}>
                        {title}
                    </h3>
                    <p className="text-[#727A90] font-degular" style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px'
                    }}>
                        {email}
                    </p>
                </div>
            </div>

            {/* Right Section - Disconnect Button */}
            <button
                onClick={onDisconnect}
                className="px-4 py-2 bg-[#EA4949] text-white rounded-lg font-degular hover:bg-[#d43d3d] transition-colors cursor-pointer flex-shrink-0"
                style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '20px'
                }}
            >
                Disconnect
            </button>
        </div>
    );
};
