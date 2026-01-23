"use client";

import React, { useState, useMemo } from "react";
import DashboardLayout from "../Layout/layout";
import { Header } from "../Dashboard/Header";
import { GroupIcon } from "./Icons";
import { CreateGroupModal } from "./CreateGroupModal";
import { GroupCard } from "../Dashboard/GroupCard";

interface Group {
    id: string;
    initials: string;
    name: string;
    description: string;
    memberCount: number;
    memberAvatars: string[];
    bgColor?: string;
    extraMemberCount?: number;
}

export const GroupsHome = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groups, setGroups] = useState<Group[]>([]);

    // Filter groups based on search query
    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return groups;
        const query = searchQuery.toLowerCase();
        return groups.filter(
            (group) =>
                group.name.toLowerCase().includes(query) ||
                group.description.toLowerCase().includes(query)
        );
    }, [groups, searchQuery]);

    return (
        <DashboardLayout>
            <Header 
                title="Groups" 
                breadcrumb="Groups / Home"
                rightAction={
                    filteredGroups.length > 0 ? (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center font-hyperspace gap-2 px-6 py-3 bg-[#3EACE2] text-white rounded-xl font-degular hover:bg-[#35a0d4] transition-colors cursor-pointer"
                            style={{
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '24px'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Create Group</span>
                        </button>
                    ) : undefined
                }
            />

            <div className="mt-6 px-6 pt-4 pb-12 bg-white  border border-[#E5E7EB] rounded-2xl ">
                {/* Sub Header Section */}
                <div className="flex items-center justify-between mb-5">
                    {/* Title */}
                    <h2 className="text-[#171717] font-hyperspace" style={{
                        fontSize: '20px',
                        fontWeight: 600,
                        lineHeight: '28px'
                    }}>
                        My Groups
                    </h2>
                </div>

                {/* Groups Grid or Empty State */}
                {filteredGroups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredGroups.map((group) => (
                            <GroupCard
                                key={group.id}
                                id={group.id}
                                initials={group.initials}
                                name={group.name}
                                description={group.description}
                                memberCount={group.memberCount}
                                memberAvatars={group.memberAvatars}
                                bgColor={group.bgColor}
                                extraMemberCount={group.extraMemberCount}
                                source="groups"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#F9FAFB] rounded-3xl min-h-[580px] flex flex-col items-center justify-center">
                        {/* Icon Circle */}
                        <div className="w-[72px] h-[72px] bg-[#E5E7EB] rounded-full flex items-center justify-center mb-5">
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="80" height="80" rx="40" fill="#F1F2F4" />
                                <g clip-path="url(#clip0_2_17915)">
                                    <path d="M37.3333 50.331V45.867C37.3333 44.1563 38.66 42.811 40.6226 42.043C39.3569 41.5723 38.0171 41.332 36.6666 41.3337C34.1466 41.3337 31.8186 42.1563 29.9373 43.547C30.5206 45.1968 31.5001 46.6781 32.7896 47.8609C34.0792 49.0438 35.6394 49.892 37.3333 50.331ZM49.1733 45.4483C48.6466 44.7377 46.8933 44.0003 44.6666 44.0003C41.992 44.0003 40 45.063 40 45.867V50.667C41.8504 50.668 43.6693 50.1874 45.2777 49.2724C46.8861 48.3574 48.2286 47.0395 49.1733 45.4483ZM36.7333 39.3337C37.5289 39.3337 38.292 39.0176 38.8546 38.455C39.4172 37.8924 39.7333 37.1293 39.7333 36.3337C39.7333 35.538 39.4172 34.7749 38.8546 34.2123C38.292 33.6497 37.5289 33.3337 36.7333 33.3337C35.9376 33.3337 35.1746 33.6497 34.612 34.2123C34.0494 34.7749 33.7333 35.538 33.7333 36.3337C33.7333 37.1293 34.0494 37.8924 34.612 38.455C35.1746 39.0176 35.9376 39.3337 36.7333 39.3337ZM44.6666 40.667C45.3739 40.667 46.0521 40.386 46.5522 39.8859C47.0523 39.3858 47.3333 38.7076 47.3333 38.0003C47.3333 37.2931 47.0523 36.6148 46.5522 36.1147C46.0521 35.6146 45.3739 35.3337 44.6666 35.3337C43.9594 35.3337 43.2811 35.6146 42.781 36.1147C42.2809 36.6148 42 37.2931 42 38.0003C42 38.7076 42.2809 39.3858 42.781 39.8859C43.2811 40.386 43.9594 40.667 44.6666 40.667ZM40 53.3337C32.636 53.3337 26.6666 47.3643 26.6666 40.0003C26.6666 32.6363 32.636 26.667 40 26.667C47.364 26.667 53.3333 32.6363 53.3333 40.0003C53.3333 47.3643 47.364 53.3337 40 53.3337Z" fill="#0F1113" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_17915">
                                        <rect width="32" height="32" fill="white" transform="translate(24 24)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                        {/* Title with emoji */}
                        <GroupIcon />

                        {/* Description */}
                        <p className="text-[#686F83] mt-2 font-degular mb-4" style={{
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '24px'
                        }}>
                            You can create new group to view here
                        </p>

                        {/* Create Group Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center font-hyperspace gap-2 px-6 py-3 bg-[#3EACE2] text-white rounded-xl font-degular hover:bg-[#35a0d4] transition-colors cursor-pointer"
                            style={{
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '24px'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Create Group</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Create Group Modal */}
            <CreateGroupModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateGroup={(data) => {
                    // Extract initials from title (first 2 characters, uppercase)
                    const initials = data.title
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "GR";

                    // Get member avatars from the members array
                    const memberAvatars = data.members
                        .map((member) => member.avatar || "")
                        .filter((avatar) => avatar !== "");

                    // Create new group
                    const newGroup: Group = {
                        id: Date.now().toString(),
                        initials: initials,
                        name: data.title,
                        description: data.description,
                        memberCount: data.members.length,
                        memberAvatars: memberAvatars,
                        bgColor: "#FEF9E7",
                        extraMemberCount: memberAvatars.length > 4 ? memberAvatars.length - 4 : 0,
                    };

                    // Add the new group to the groups list
                    setGroups([...groups, newGroup]);
                    setIsModalOpen(false);
                }}
            />
        </DashboardLayout>
    );
};