"use client";

import React, { useMemo } from "react";

interface AttendeePillProps {
    id: string;
    email: string;
    avatar: string;
    onRemove: (id: string) => void;
}

export const AttendeePill: React.FC<AttendeePillProps> = ({ id, email, avatar, onRemove }) => {
    const clipPathId = useMemo(() => `clip_attendee_${id}`, [id]);

    return (
        <div className="flex items-center gap-2 px-3 py-2 bg-[#f8f8fc] border border-[#E5E7EB] rounded-xl ">
            <div 
                className="w-8 h-8 rounded-full overflow-hidden bg-[#3eace2]"
                style={{ borderWidth: '4px', borderColor: '#FFFFFF', borderStyle: 'solid' }}
            >
                {avatar ? (
                    <img
                        src={avatar}
                        alt={email}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-[#3eace2]" />
                )}
            </div>
            <span className="text-sm text-gray-900">
                {email}
            </span>
            <button
                onClick={() => onRemove(id)}
                className="p-0.5 transition-colors"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath={`url(#${clipPathId})`}>
                        <path d="M12 10.5862L16.95 5.63623L18.364 7.05023L13.414 12.0002L18.364 16.9502L16.95 18.3642L12 13.4142L7.04999 18.3642L5.63599 16.9502L10.586 12.0002L5.63599 7.05023L7.04999 5.63623L12 10.5862Z" fill="#0F1113" />
                    </g>
                    <defs>
                        <clipPath id={clipPathId}>
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    );
};
