"use client";

import React, { useState } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberCount?: number;
}

interface MembersProps {
  members: Member[];
  selectedMemberId?: string;
  onMemberSelect?: (memberId: string) => void;
}

export const Members: React.FC<MembersProps> = ({
  members,
  selectedMemberId,
  onMemberSelect,
}) => {
  const [selected, setSelected] = useState<string | undefined>(selectedMemberId);

  const handleSelect = (id: string) => {
    setSelected(id);
    onMemberSelect?.(id);
  };

  const totalMembers = members.length > 0 && members[0].memberCount ? members[0].memberCount : members.length;
  const displayAvatars = members.slice(0, 2).map(m => m.avatar || "");
  const extraCount = totalMembers - displayAvatars.length;

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] flex flex-col ">
      {/* Header - Fixed outside scroll */}
      <div className="flex items-center justify-between bg-[#f8f8fc] border-b border-[#E5E7EB] rounded-t-2xl p-4">
        <div>
          <h2 className="text-2xl font-bold text-[#171717] font-hyperspace mb-1" style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '120%',
            letterSpacing: '-0.02em'
          }}>
            Members
          </h2>
          <p className="text-[#686F83] font-degular" style={{
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>
            View all members details
          </p>
        </div>
        <button className="text-[#171717] hover:text-[#686F83] transition-colors p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_members_menu)">
              <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" fill="#09121F" />
            </g>
            <defs>
              <clipPath id="clip0_members_menu">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      <div className="rounded-2xl overflow-hidden">
      <div className="custom-scrollbar overflow-y-auto max-h-[400px] p-4">
        <div className="space-y-3">
          {/* Summary Row - Inside scroll */}
          <div className="flex items-center justify-between p-2 border-2 border-[#3eace2] rounded-xl bg-[#ecf7fc]">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {displayAvatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full overflow-hidden bg-[#3eace2]"
                    style={{ borderWidth: '3px', borderColor: '#FFFFFF', borderStyle: 'solid' }}
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
                {extraCount > 0 && (
                  <div 
                    className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center"
                  >
                    <span className="text-[#7C3AED] font-semibold font-degular" style={{
                      fontSize: '14px',
                      lineHeight: '20px',
                    }}>
                      +{extraCount}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 19.748V16.4C10 15.117 10.995 14.108 12.467 13.532C11.5177 13.1789 10.5128 12.9988 9.5 13C7.61 13 5.864 13.617 4.453 14.66C4.89051 15.8973 5.62509 17.0083 6.59225 17.8955C7.55941 18.7826 8.72957 19.4187 10 19.748ZM18.88 16.086C18.485 15.553 17.17 15 15.5 15C13.494 15 12 15.797 12 16.4V20C13.3878 20.0008 14.752 19.6403 15.9583 18.954C17.1646 18.2678 18.1715 17.2794 18.88 16.086ZM9.55 11.5C10.1467 11.5 10.719 11.2629 11.141 10.841C11.5629 10.419 11.8 9.84674 11.8 9.25C11.8 8.65326 11.5629 8.08097 11.141 7.65901C10.719 7.23705 10.1467 7 9.55 7C8.95326 7 8.38097 7.23705 7.95901 7.65901C7.53705 8.08097 7.3 8.65326 7.3 9.25C7.3 9.84674 7.53705 10.419 7.95901 10.841C8.38097 11.2629 8.95326 11.5 9.55 11.5ZM15.5 12.5C16.0304 12.5 16.5391 12.2893 16.9142 11.9142C17.2893 11.5391 17.5 11.0304 17.5 10.5C17.5 9.96957 17.2893 9.46086 16.9142 9.08579C16.5391 8.71071 16.0304 8.5 15.5 8.5C14.9696 8.5 14.4609 8.71071 14.0858 9.08579C13.7107 9.46086 13.5 9.96957 13.5 10.5C13.5 11.0304 13.7107 11.5391 14.0858 11.9142C14.4609 12.2893 14.9696 12.5 15.5 12.5ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z" fill="#F97316" />
              </svg>
              <span className="text-[#686F83] font-degular" style={{
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '0.005em'
              }}>
                {totalMembers} Members
              </span>
            </div>
          </div>

          {/* All Members Option - Inside scroll */}
          <button
            onClick={() => handleSelect('all')}
            className={`w-full flex items-center gap-4 p-2 rounded-2xl transition-colors text-left border ${
              selected === 'all' 
                ? 'bg-[#EBF8FF] border-[#3eace2] border-2' 
                : 'bg-[#F8F8FC] border-[#E5E7EB] hover:bg-gray-50'
            }`}
          >
            <div 
              className="w-10 h-10 rounded-full bg-[#3eace2] flex items-center justify-center flex-shrink-0"
              style={{ borderWidth: '3px', borderColor: '#FFFFFF', borderStyle: 'solid' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10C11.3807 10 12.5 8.88071 12.5 7.5C12.5 6.11929 11.3807 5 10 5C8.61929 5 7.5 6.11929 7.5 7.5C7.5 8.88071 8.61929 10 10 10Z" fill="white"/>
                <path d="M10 11.25C7.92893 11.25 6.25 12.9289 6.25 15V16.25H13.75V15C13.75 12.9289 12.0711 11.25 10 11.25Z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[#171717]" style={{
                fontFamily: 'Degular Demo',
                fontWeight: 600,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0%'
              }}>
                All Members
              </p>
              <p className="text-[#727A90] font-degular" style={{
                fontFamily: 'Degular Demo',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '12px',
                lineHeight: '18px',
                letterSpacing: '0.5%'
              }}>
                {totalMembers} members
              </p>
            </div>
          </button>

          {/* Individual Members - Inside scroll */}
          {members.map((member) => (
            <button
              key={member.id}
              onClick={() => handleSelect(member.id)}
              className={`w-full flex items-center gap-4 p-2 rounded-2xl transition-colors text-left border ${
                selected === member.id 
                  ? 'bg-[#EBF8FF] border-[#3eace2] border-2' 
                  : 'bg-[#F8F8FC] border-[#E5E7EB] hover:bg-gray-50'
              }`}
            >
              <div 
                className="w-10 h-10 rounded-full overflow-hidden bg-[#3eace2] flex-shrink-0"
                style={{ borderWidth: '3px', borderColor: '#FFFFFF', borderStyle: 'solid' }}
              >
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#3eace2]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#171717] truncate" style={{
                  fontWeight: 600,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0%'
                }}>
                  {member.name}
                </p>
                <p className="text-[#727A90] font-degular truncate" style={{
                  fontFamily: 'Degular Demo',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '12px',
                  lineHeight: '18px',
                  letterSpacing: '0.5%'
                }}>
                  {member.email}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};