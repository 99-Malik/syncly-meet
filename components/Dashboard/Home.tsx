"use client";

import React from "react";
import { Header } from "./Header";
import { StatCard } from "./StatCard";
import { MeetingsTable } from "./MeetingsTable";
import { GroupCard } from "./GroupCard";

export const DashboardHome: React.FC = () => {
    // Sample data for meetings
    const meetings = [
        {
            id: "1",
            title: "Project Alpha",
            agenda: "Discuss About Project Alpha Design",
            group: "Dev Group",
            groupColor: "#FDF7E7",
            dateTime: "12/26/2025, 4:00 Am",
            status: "Scheduled",
        },
        {
            id: "2",
            title: "Vimeo Rebranding",
            agenda: "Review User Feedback for Project Alpha",
            group: "Design Group",
            groupColor: "#FCEDF8",
            dateTime: "12/26/2025, 4:00 Am",
            status: "Scheduled",
        },
        {
            id: "3",
            title: "Project Alpha",
            agenda: "Discuss About Project Alpha Design",
            group: "CTO Group",
            groupColor: "#E6F5FE",
            dateTime: "12/26/2025, 4:00 Am",
            status: "Scheduled",
        },
        {
            id: "4",
            title: "Vimeo Rebranding",
            agenda: "Review User Feedback for Project Alpha",
            group: "Bug Busters",
            groupColor: "#E6F5FE",
            dateTime: "12/26/2025, 4:00 Am",
            status: "Scheduled",
        },
        {
            id: "5",
            title: "Project Alpha",
            agenda: "Discuss About Project Alpha Design",
            group: "Algorithm Aces",
            groupColor: "#FCEDF8",
            dateTime: "12/26/2025, 4:00 Am",
            status: "Scheduled",
        },
    ];

    // Sample data for groups
    const groups = [
        {
            id: "1",
            initials: "AI",
            name: "AI Testing Group",
            description: "Developer Group, includes all the front end developers in this group",
            memberCount: 40,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            ],
        },
        {
            id: "2",
            initials: "AI",
            name: "AI Testing Group",
            description: "Developer Group, includes all the front end developers in this group",
            memberCount: 40,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            ],
        },
        {
            id: "3",
            initials: "AI",
            name: "AI Testing Group",
            description: "Developer Group, includes all the front end developers in this group",
            memberCount: 40,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            ],
        },
        {
            id: "4",
            initials: "AI",
            name: "AI Testing Group",
            description: "Developer Group, includes all the front end developers in this group",
            memberCount: 40,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            ],
        },
        {
            id: "5",
            initials: "AI",
            name: "AI Testing Group",
            description: "Developer Group, includes all the front end developers in this group",
            memberCount: 40,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            ],
        },
        {
            id: "6",
            initials: "AI",
            name: "AI Testing Group",
            description: "Developer Group, includes all the front end developers in this group",
            memberCount: 40,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            ],
        },
    ];

    return (
        <div >
            {/* Header */}
            <Header title="Dashboard" breadcrumb="Dashboard / Home" />

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_15_7287)">
                                <path d="M10 19.748V16.4C10 15.117 10.995 14.108 12.467 13.532C11.5177 13.1789 10.5128 12.9988 9.5 13C7.61 13 5.864 13.617 4.453 14.66C4.89051 15.8973 5.62509 17.0083 6.59225 17.8955C7.55941 18.7826 8.72957 19.4187 10 19.748ZM18.88 16.086C18.485 15.553 17.17 15 15.5 15C13.494 15 12 15.797 12 16.4V20C13.3878 20.0008 14.752 19.6403 15.9583 18.954C17.1646 18.2678 18.1715 17.2794 18.88 16.086ZM9.55 11.5C10.1467 11.5 10.719 11.2629 11.141 10.841C11.5629 10.419 11.8 9.84674 11.8 9.25C11.8 8.65326 11.5629 8.08097 11.141 7.65901C10.719 7.23705 10.1467 7 9.55 7C8.95326 7 8.38097 7.23705 7.95901 7.65901C7.53705 8.08097 7.3 8.65326 7.3 9.25C7.3 9.84674 7.53705 10.419 7.95901 10.841C8.38097 11.2629 8.95326 11.5 9.55 11.5ZM15.5 12.5C16.0304 12.5 16.5391 12.2893 16.9142 11.9142C17.2893 11.5391 17.5 11.0304 17.5 10.5C17.5 9.96957 17.2893 9.46086 16.9142 9.08579C16.5391 8.71071 16.0304 8.5 15.5 8.5C14.9696 8.5 14.4609 8.71071 14.0858 9.08579C13.7107 9.46086 13.5 9.96957 13.5 10.5C13.5 11.0304 13.7107 11.5391 14.0858 11.9142C14.4609 12.2893 14.9696 12.5 15.5 12.5ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22Z" fill="#F05D3D" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15_7287">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    }
                    title="Total Groups"
                    value="05"
                />
                <StatCard
                    icon={
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 8.25H16.5V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V8.25ZM12.75 2.25H15.75C15.9489 2.25 16.1397 2.32902 16.2803 2.46967C16.421 2.61032 16.5 2.80109 16.5 3V6.75H1.5V3C1.5 2.80109 1.57902 2.61032 1.71967 2.46967C1.86032 2.32902 2.05109 2.25 2.25 2.25H5.25V0.75H6.75V2.25H11.25V0.75H12.75V2.25Z" fill="#3EACE2" />
                        </svg>

                    }
                    title="Upcoming Meetings"
                    value="10"
                />
                <StatCard
                    icon={
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_15_7425)">
                                <path d="M9.75 7.5H15L8.25 17.25V10.5H3L9.75 0.75V7.5Z" fill="#009499" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15_7425">
                                    <rect width="18" height="18" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                    }
                    title="Active Members"
                    value="15"
                />
            </div>

            {/* Upcoming Meetings Table */}
            <div className="mb-8">
                <MeetingsTable meetings={meetings} />
            </div>

            {/* Recent Groups */}
            <div className="bg-[#f5f6f6] rounded-2xl px-4 py-6 border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#171717] font-hyperspace" style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        lineHeight: '120%',
                        letterSpacing: '-0.02em'
                    }}>
                        Recent Groups
                    </h2>
                    <div className="flex-1 max-w-full ml-4 flex items-center justify-end">
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2_9314)">
                                        <path d="M12.0207 11.078L14.876 13.9327L13.9327 14.876L11.078 12.0207C10.0159 12.8722 8.69471 13.3353 7.33337 13.3334C4.02137 13.3334 1.33337 10.6454 1.33337 7.33337C1.33337 4.02137 4.02137 1.33337 7.33337 1.33337C10.6454 1.33337 13.3334 4.02137 13.3334 7.33337C13.3353 8.69471 12.8722 10.0159 12.0207 11.078ZM10.6834 10.5834C11.5294 9.7133 12.002 8.54699 12 7.33337C12 4.75471 9.91137 2.66671 7.33337 2.66671C4.75471 2.66671 2.66671 4.75471 2.66671 7.33337C2.66671 9.91137 4.75471 12 7.33337 12C8.54699 12.002 9.7133 11.5294 10.5834 10.6834L10.6834 10.5834Z" fill="#09121F" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2_9314_home">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-[330px] pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[#171717] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3eace2] font-degular"
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    letterSpacing: '0.005em'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Group Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group) => (
                        <GroupCard
                            key={group.id}
                            id={group.id}
                            initials={group.initials}
                            name={group.name}
                            description={group.description}
                            memberCount={group.memberCount}
                            memberAvatars={group.memberAvatars}
                            extraMemberCount={1}

                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
