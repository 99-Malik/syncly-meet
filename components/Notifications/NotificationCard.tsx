"use client";

import React from "react";
import { LogoIcon } from "../Svgs/Sign-In/Icons";

interface NotificationCardProps {
  icon: React.ReactNode;
  title: string;
  type: "meeting" | "group";
  // Meeting props
  meetingTitle?: string;
  meetingDateTime?: string;
  meetingDescription?: string;
  attendeeCount?: number;
  // Group props
  groupName?: string;
  groupDescription?: string;
  groupInitials?: string;
  groupBgColor?: string;
  memberCount?: number;
  // Common props
  memberAvatars?: string[];
  extraMembers?: number;
  showViewAvailability?: boolean;
  onViewAvailability?: () => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  icon,
  title,
  type,
  meetingTitle,
  meetingDateTime,
  meetingDescription,
  attendeeCount,
  groupName,
  groupDescription,
  groupInitials,
  groupBgColor = "#FEF9E7",
  memberCount,
  memberAvatars = [],
  extraMembers,
  showViewAvailability = false,
  onViewAvailability,
}) => {
  // Helper function to render avatars and count
  const renderAvatarsAndCount = (
    count?: number,
    countLabel: string = "Members"
  ) => {
    const hasAvatars = memberAvatars && memberAvatars.length > 0;
    const hasCount = count !== undefined;

    if (!hasAvatars && !hasCount) return null;

    return (
      <div className="border border-[#E5E7EB] bg-[#f8f8fc] rounded-xl px-3 py-2">
        <div className="flex items-center gap-3">
          {hasAvatars && (
            <div className="flex -space-x-2">
              {memberAvatars.slice(0, 4).map((avatar, index) => (
                <div
                  key={index}
                  className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-[#3eace2]"
                >
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={`Member ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#3eace2]" />
                  )}
                </div>
              ))}
              {extraMembers && extraMembers > 0 && (
                <div className="w-9 h-9 rounded-full bg-[#f4ecfa] border-2 border-white flex items-center justify-center">
                  <span
                    className="text-[#6E0AB8] font-base"
                    style={{
                      fontWeight: 400,
                      fontSize: "14px",
                      lineHeight: "18px",
                    }}
                  >
                    +{extraMembers}
                  </span>
                </div>
              )}
            </div>
          )}
          {hasCount && (
            <div className="flex items-center gap-1.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath={`url(#clip0_${type})`}>
                  <path
                    d="M10 19.748V16.4C10 15.117 10.995 14.108 12.467 13.532C11.5177 13.1789 10.5128 12.9988 9.5 13C7.61 13 5.864 13.617 4.453 14.66C4.89051 15.8973 5.62509 17.0083 6.59225 17.8955C7.55941 18.7826 8.72957 19.4187 10 19.748ZM18.88 16.086C18.485 15.553 17.17 15 15.5 15C13.494 15 12 15.797 12 16.4V20C13.3878 20.0008 14.752 19.6403 15.9583 18.954C17.1646 18.2678 18.1715 17.2794 18.88 16.086ZM9.55 11.5C10.1467 11.5 10.719 11.2629 11.141 10.841C11.5629 10.419 11.8 9.84674 11.8 9.25C11.8 8.65326 11.5629 8.08097 11.141 7.65901C10.719 7.23705 10.1467 7 9.55 7C8.95326 7 8.38097 7.23705 7.95901 7.65901C7.53705 8.08097 7.3 8.65326 7.3 9.25C7.3 9.84674 7.53705 10.419 7.95901 10.841C8.38097 11.2629 8.95326 11.5 9.55 11.5ZM15.5 12.5C16.0304 12.5 16.5391 12.2893 16.9142 11.9142C17.2893 11.5391 17.5 11.0304 17.5 10.5C17.5 9.96957 17.2893 9.46086 16.9142 9.08579C16.5391 8.71071 16.0304 8.5 15.5 8.5C14.9696 8.5 14.4609 8.71071 14.0858 9.08579C13.7107 9.46086 13.5 9.96957 13.5 10.5C13.5 11.0304 13.7107 11.5391 14.0858 11.9142C14.4609 12.2893 14.9696 12.5 15.5 12.5ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z"
                    fill="#F05D3D"
                  />
                </g>
                <defs>
                  <clipPath id={`clip0_${type}`}>
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span
                className="text-[#727A90] font-degular"
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "18px",
                }}
              >
                {count} {countLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6">
      <div className="flex items-start gap-4">
        {/* Icon Container - Left side */}
        <div className="shrink-0">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>

        {/* Right side - Title and Content containers stacked vertically */}
        <div className="flex-1 min-w-0 space-y-2 bg-white border border-[#E5E7EB] rounded-xl px-4 pt-4 pb-8 overflow-hidden">
          {/* Title in white container - Parallel to icon */}
          <div className={showViewAvailability ? 'mb-4' : ''}>
            <h3
              className="text-[#171717] font-degular"
              style={{
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              {title}
            </h3>
          </div>

          {/* Content Container - Below title container, aligned with title */}
          <div className={`bg-white rounded-xl overflow-hidden ${showViewAvailability ? 'border border-[#E5E7EB] px-4 pb-8 pt-4' : ''}`}>
            {type === "meeting" && (
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 min-w-0">
                {/* Left side - Syncmeet Badge + Meeting Details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Syncmeet Badge */}
                  <div className="shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f8f8fc] border-2 border-[#E5E7EB]">
                      <LogoIcon width={20} height={20} />
                      <span
                        className="font-degular text-[#171717]"
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "18px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        Syncmeet
                      </span>
                    </div>
                  </div>

                  {/* Meeting Details */}
                  <div className="min-w-0">
                    <p
                      className="text-[#171717] font-degular mb-1"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      {meetingTitle} ({meetingDateTime})
                    </p>
                    <p
                      className="text-[#727A90] font-degular"
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "18px",
                      }}
                    >
                      {meetingDescription}
                    </p>
                  </div>
                </div>

                {/* Right side - Attendees and optional button */}
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-wrap">
                  {renderAvatarsAndCount(attendeeCount, "Attendees")}

                  {/* View Availability Button - Conditionally shown */}
                  {showViewAvailability && (
                    <button
                      onClick={onViewAvailability}
                      className="px-2 sm:px-4 lg:px-5 py-2.5 bg-[#0F1113] text-white rounded-lg font-degular hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                      style={{
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      <span className="hidden sm:inline">View Availability</span>
                      <span className="sm:hidden">View</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {type === "group" && (
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 min-w-0">
                {/* Left side - Group Initials Badge + Details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Group Initials Badge */}
                  <div className="shrink-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: groupBgColor }}
                    >
                      <span
                        className="text-[#171717] font-hyperspace"
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          lineHeight: "24px",
                        }}
                      >
                        {groupInitials || "AI"}
                      </span>
                    </div>
                  </div>

                  {/* Group Details */}
                  <div className="min-w-0">
                    <p
                      className="text-[#171717] font-degular mb-0.5"
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      {groupName}
                    </p>
                    <p
                      className="text-[#727A90] font-degular"
                      style={{
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "18px",
                      }}
                    >
                      {groupDescription}
                    </p>
                  </div>
                </div>

                {/* Right side - Avatars, Members count, and optional button */}
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-wrap">
                  {renderAvatarsAndCount(memberCount, "Members")}

                  {/* View Availability Button - Conditionally shown */}
                  {showViewAvailability && (
                    <button
                      onClick={onViewAvailability}
                      className="px-2 sm:px-4 lg:px-5 py-2.5 bg-[#0F1113] text-white rounded-lg font-degular hover:bg-gray-800 transition-colors text-xs sm:text-sm"
                      style={{
                        fontWeight: 500,
                        lineHeight: "20px",
                      }}
                    >
                      <span className="hidden sm:inline">View Availability</span>
                      <span className="sm:hidden">View</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
