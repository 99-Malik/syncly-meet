"use client";

import React, { useMemo } from "react";
import { MemberAvatars } from "./MemberAvatars";
import { LogoIconGreen } from "../Svgs/Sign-In/Icons";

interface MeetingCardProps {
  title: string;
  dateTime: string;
  description: string;
  attendeeCount: number;
  memberAvatars: string[];
  extraMembers?: number;
  mainHeading?: string;
}

export const MeetingCard: React.FC<MeetingCardProps> = ({
  title,
  dateTime,
  description,
  attendeeCount,
  memberAvatars,
  extraMembers,
  mainHeading,
}) => {
  // Generate unique clipPath ID to prevent conflicts
  const clipPathId = useMemo(() => `clip0_attendee_${Math.random().toString(36).substr(2, 9)}`, []);

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
      {/* Top Section - Syncmeet Badge */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8f8fc] border-2 border-[#E5E7EB]">
          <LogoIconGreen width={24} height={24} />
          <span className="font-degular text-[#171717]" style={{
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>
            Syncmeet
          </span>
        </div>
      </div>

      {/* Main Heading - Conditional, only from MeetingDetails */}
      {mainHeading && (
        <div className="mb-4">
          <h2 className="text-[#171717] font-hyperspace" style={{
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '120%',
            letterSpacing: '-0.02em'
          }}>
            {mainHeading}
          </h2>
        </div>
      )}

      {/* Middle Section - Meeting Title and Description */}
      <div className="mb-5">
        <h3 className="text-[#0F1113] font-degular-demo mb-2" style={{
          fontSize: '18px',
          fontWeight: 300,
          lineHeight: '24px',
          letterSpacing: '-0.02em'
        }}>
          {title} ( {dateTime} )
        </h3>
        <p className="text-[#727A90] font-degular" style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '22px',
          letterSpacing: '0.005em'
        }}>
          {description}
        </p>
      </div>

      {/* Bottom Section - Attendees */}
      <div className="border border-[#E5E7EB] bg-[#f8f8fc] rounded-xl px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Side - Member Avatars */}
          <MemberAvatars memberAvatars={memberAvatars} extraMembers={extraMembers}  />

          {/* Right Side - Attendee Count */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath={`url(#${clipPathId})`}>
                <path d="M10 19.748V16.4C10 15.117 10.995 14.108 12.467 13.532C11.5177 13.1789 10.5128 12.9988 9.5 13C7.61 13 5.864 13.617 4.453 14.66C4.89051 15.8973 5.62509 17.0083 6.59225 17.8955C7.55941 18.7826 8.72957 19.4187 10 19.748ZM18.88 16.086C18.485 15.553 17.17 15 15.5 15C13.494 15 12 15.797 12 16.4V20C13.3878 20.0008 14.752 19.6403 15.9583 18.954C17.1646 18.2678 18.1715 17.2794 18.88 16.086ZM9.55 11.5C10.1467 11.5 10.719 11.2629 11.141 10.841C11.5629 10.419 11.8 9.84674 11.8 9.25C11.8 8.65326 11.5629 8.08097 11.141 7.65901C10.719 7.23705 10.1467 7 9.55 7C8.95326 7 8.38097 7.23705 7.95901 7.65901C7.53705 8.08097 7.3 8.65326 7.3 9.25C7.3 9.84674 7.53705 10.419 7.95901 10.841C8.38097 11.2629 8.95326 11.5 9.55 11.5ZM15.5 12.5C16.0304 12.5 16.5391 12.2893 16.9142 11.9142C17.2893 11.5391 17.5 11.0304 17.5 10.5C17.5 9.96957 17.2893 9.46086 16.9142 9.08579C16.5391 8.71071 16.0304 8.5 15.5 8.5C14.9696 8.5 14.4609 8.71071 14.0858 9.08579C13.7107 9.46086 13.5 9.96957 13.5 10.5C13.5 11.0304 13.7107 11.5391 14.0858 11.9142C14.4609 12.2893 14.9696 12.5 15.5 12.5ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z" fill="#F05D3D" />
              </g>
              <defs>
                <clipPath id={clipPathId}>
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="text-[#727A90] font-degular" style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.5%'
            }}>
              {attendeeCount} Attendas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
