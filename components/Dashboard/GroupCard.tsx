"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { GroupMenu } from "./GroupMenu";
import { EditGroupModal } from "../Groups/EditGroupModal";

interface GroupCardProps {
  id: string;
  initials: string;
  name: string;
  description: string;
  memberCount: number;
  memberAvatars: string[];
  bgColor?: string;
  extraMemberCount?: number;
  source?: "groups" | "dashboard";
}

export const GroupCard: React.FC<GroupCardProps> = ({
  id,
  initials,
  name,
  description,
  memberCount,
  memberAvatars,
  bgColor = "#FEF9E7",
  extraMemberCount,
  source = "dashboard",
}) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Calculate extra members - either from prop or from array length
  const extraMembers = extraMemberCount ?? (memberAvatars.length > 4 ? memberAvatars.length - 4 : 0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="bg-white rounded-2xl px-4 py-6 border border-gray-100 relative z-0">
      {/* Header - Icon and Menu */}
      <div className="flex items-start justify-between mb-6">
        {/* Group Icon - Rounded Rectangle */}
        <div
          className="w-[48px] h-[48px] rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <span className="text-[#171717] font-base font-hyperspace" style={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '120%',
            letterSpacing: '-0.02em'
          }}>
            {initials}
          </span>
        </div>

        {/* Menu Button */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-[#171717] hover:text-[#686F83] transition-colors p-1"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2_9906)">
                <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" fill="#09121F" />
              </g>
              <defs>
                <clipPath id="clip0_2_9906">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-full mt-2 z-50">
              <GroupMenu
                onEdit={() => {
                  setShowMenu(false);
                  setShowEditModal(true);
                }}
                onDelete={() => {
                  setShowMenu(false);
                  // Handle delete action
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Group Name */}
      <h3 className="text-xl font-bold text-[#171717] mb-2 font-degular" style={{
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '120%',
        letterSpacing: '-0.02em'
      }}>
        {name}
      </h3>

      {/* Description */}
      <p className="text-[#727A90] mb-5 font-degular" style={{
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '22px',
        letterSpacing: '0.005em'
      }}>
        {description}
      </p>

      {/* Members Section - Inside bordered container */}
      <div className="border border-[#E5E7EB] bg-[#f8f8fc] rounded-xl px-4 py-3 mb-4">
        <div className="flex items-center justify-between">
          {/* Avatars and +count */}
          <div className="flex items-center">
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
              {/* +count badge - shows when there are extra members */}
              {extraMembers > 0 && (
                <div className="w-9 h-9 rounded-full  bg-[#f4ecfa] flex items-center justify-center">
                  <span className="text-[#6E0AB8] font-base" style={{
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '18px',
                    letterSpacing: '0.5%'
                  }}>
                    +{extraMembers}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Member Count */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2_9934)">
                <path d="M10 19.748V16.4C10 15.117 10.995 14.108 12.467 13.532C11.5177 13.1789 10.5128 12.9988 9.5 13C7.61 13 5.864 13.617 4.453 14.66C4.89051 15.8973 5.62509 17.0083 6.59225 17.8955C7.55941 18.7826 8.72957 19.4187 10 19.748ZM18.88 16.086C18.485 15.553 17.17 15 15.5 15C13.494 15 12 15.797 12 16.4V20C13.3878 20.0008 14.752 19.6403 15.9583 18.954C17.1646 18.2678 18.1715 17.2794 18.88 16.086ZM9.55 11.5C10.1467 11.5 10.719 11.2629 11.141 10.841C11.5629 10.419 11.8 9.84674 11.8 9.25C11.8 8.65326 11.5629 8.08097 11.141 7.65901C10.719 7.23705 10.1467 7 9.55 7C8.95326 7 8.38097 7.23705 7.95901 7.65901C7.53705 8.08097 7.3 8.65326 7.3 9.25C7.3 9.84674 7.53705 10.419 7.95901 10.841C8.38097 11.2629 8.95326 11.5 9.55 11.5ZM15.5 12.5C16.0304 12.5 16.5391 12.2893 16.9142 11.9142C17.2893 11.5391 17.5 11.0304 17.5 10.5C17.5 9.96957 17.2893 9.46086 16.9142 9.08579C16.5391 8.71071 16.0304 8.5 15.5 8.5C14.9696 8.5 14.4609 8.71071 14.0858 9.08579C13.7107 9.46086 13.5 9.96957 13.5 10.5C13.5 11.0304 13.7107 11.5391 14.0858 11.9142C14.4609 12.2893 14.9696 12.5 15.5 12.5ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z" fill="#F05D3D" />
              </g>
              <defs>
                <clipPath id="clip0_2_9934">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-[#686F83] font-degular" style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.5%'
            }}>
              {memberCount} Members
            </span>
          </div>
        </div>
      </div>

      {/* View Availability Button */}
      <button 
        onClick={() => router.push(`/dashboard/view-availability?id=${id}&source=${source}`)}
        className="w-full bg-[#3eace2] text-white py-3.5 rounded-2xl hover:bg-[#35a0d4] transition-colors font-hyperspace" 
        style={{
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.5%',
          textAlign: 'center'
        }}
      >
        View Availability
      </button>

      {/* Edit Group Modal */}
      <EditGroupModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSaveChanges={(data) => {
          console.log("Group updated:", data);
          setShowEditModal(false);
          // Handle group update logic here
        }}
        initialData={{
          title: name,
          description: description,
          members: memberAvatars.map((avatar, index) => ({
            id: `member-${index}`,
            name: `Member ${index + 1}`,
            avatar: avatar
          }))
        }}
      />
    </div>
  );
};