"use client";

import React from "react";

interface MemberAvatarsProps {
  memberAvatars: string[];
  extraMembers?: number;
}

export const MemberAvatars: React.FC<MemberAvatarsProps> = ({
  memberAvatars,
  extraMembers,
}) => {
  // Calculate extra members - either from prop or from array length
  // If extraMembers is explicitly provided (including 0), use it
  // Otherwise, calculate from memberAvatars array length
  let extraMembersCount: number;
  if (typeof extraMembers === 'number') {
    extraMembersCount = extraMembers;
  } else {
    // Calculate from array length - show badge if more than 4 avatars
    extraMembersCount = memberAvatars.length > 4 ? memberAvatars.length - 4 : 0;
  }
  
  // Ensure we have valid avatars array
  const displayAvatars = memberAvatars && memberAvatars.length > 0 ? memberAvatars : [];

  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {displayAvatars.slice(0, 4).map((avatar, index) => (
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
        {/* +count badge - shows when there are extra members */}
        {extraMembersCount > 0 && (
          <div className="w-9 h-9 rounded-full  bg-[#f4ecfa] flex items-center justify-center">
            <span className="text-[#6E0AB8] font-base" style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '18px',
              letterSpacing: '0.5%'
            }}>
              +{extraMembersCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
