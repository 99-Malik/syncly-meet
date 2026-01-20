"use client";

import React from "react";
import { createPortal } from "react-dom";
import { MeetingCard } from "./MeetingCard";

interface ScheduleMeetingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingTitle: string;
  meetingDateTime: string;
  meetingDescription: string;
  attendeeCount: number;
  memberAvatars: string[];
  extraMembers?: number;
}

export const ScheduleMeetingSuccessModal: React.FC<ScheduleMeetingSuccessModalProps> = ({
  isOpen,
  onClose,
  meetingTitle,
  meetingDateTime,
  meetingDescription,
  attendeeCount,
  memberAvatars,
  extraMembers,
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-xl w-full relative"
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

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="90" height="90" rx="45" fill="#3EACE2" />
            <rect x="5" y="5" width="90" height="90" rx="45" stroke="#C3E5F6" stroke-width="10" />
            <g clip-path="url(#clip0_122_14526)">
              <path d="M46.5 55.5511L62.586 39.4634L65.0623 41.9379L46.5 60.5001L35.363 49.3631L37.8375 46.8886L46.5 55.5511Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_122_14526">
                <rect width="42" height="42" fill="white" transform="translate(29 29)" />
              </clipPath>
            </defs>
          </svg>

        </div>

        {/* Confirmation Text */}
        <div className="text-center mb-6">
          <h2 className="text-[#171717] font-hyperspace mb-2" style={{
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '32px',
            letterSpacing: '-0.02em'
          }}>
            Meeting Scheduled Successfully
          </h2>
          <p className="text-[#686F83] font-degular mt-4" style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>
            You can view your meeting details in my meetings tabs
          </p>
        </div>

        {/* Meeting Card */}
        <div className="mt-6">
          <MeetingCard
            title={meetingTitle}
            dateTime={meetingDateTime}
            description={meetingDescription}
            attendeeCount={attendeeCount}
            memberAvatars={memberAvatars}
            extraMembers={extraMembers}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
