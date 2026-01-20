"use client";

import React, { useState, useMemo } from "react";
import DashboardLayout from "@/components/Layout/layout";
import { Calendar } from "@/components/Dashboard/ViewAvailability/Calendar";
import { MeetingCard } from "@/components/Meetings/MeetingCard";

interface Meeting {
    id: string;
    title: string;
    dateTime: string;
    description: string;
    attendeeCount: number;
    memberAvatars: string[];
    extraMembers?: number;
    date: Date;
}

export default function MeetingDetails() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 8, 4));

    const meetings: Meeting[] = [
        {
            id: "1",
            title: "Project Alpha",
            dateTime: "24 jun 12:00 am - 01:00 pm",
            description: "Project Alpha meeting to discuss progress and next steps",
            attendeeCount: 20,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            ],
            extraMembers: 16,
            date: new Date(2025, 8, 1),
        },
        {
            id: "2",
            title: "Project Alpha",
            dateTime: "24 jun 12:00 am - 01:00 pm",
            description: "Project Alpha meeting to discuss progress and next steps",
            attendeeCount: 20,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            ],
            extraMembers: 16,
            date: new Date(2025, 8, 2),
        },
        {
            id: "3",
            title: "Project Alpha",
            dateTime: "24 jun 12:00 am - 01:00 pm",
            description: "Project Alpha meeting to discuss progress and next steps",
            attendeeCount: 20,
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            ],
            extraMembers: 16,
            date: new Date(2025, 8, 9),
        },
    ];

    const filteredMeetings = meetings.filter((meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const datesWithEvents = useMemo(() => {
        const currentMonth = selectedDate.getMonth();
        const currentYear = selectedDate.getFullYear();
        const dates: number[] = [];

        meetings.forEach((meeting) => {
            if (
                meeting.date.getMonth() === currentMonth &&
                meeting.date.getFullYear() === currentYear
            ) {
                dates.push(meeting.date.getDate());
            }
        });

        return Array.from(new Set(dates));
    }, [selectedDate]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    return (
            <div className="h-full flex flex-col">
                {/* White Rounded Container */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden flex-1">
                    {/* Header Row: Title + Toolbar */}
                    <div className="flex items-center justify-between p-4">
                        {/* Title */}
                        <h2
                            className="text-[#171717] font-hyperspace"
                            style={{
                                fontSize: "24px",
                                fontWeight: 700,
                                lineHeight: "120%",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            My Meetings
                        </h2>

                        {/* Toolbar */}
                        <div className="flex items-center gap-3">
                            {/* Search Input */}
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_search)">
                                            <path d="M12.0207 11.078L14.876 13.9327L13.9327 14.876L11.078 12.0207C10.0159 12.8722 8.69471 13.3353 7.33337 13.3334C4.02137 13.3334 1.33337 10.6454 1.33337 7.33337C1.33337 4.02137 4.02137 1.33337 7.33337 1.33337C10.6454 1.33337 13.3334 4.02137 13.3334 7.33337C13.3353 8.69471 12.8722 10.0159 12.0207 11.078ZM10.6834 10.5834C11.5294 9.7133 12.002 8.54699 12 7.33337C12 4.75471 9.91137 2.66671 7.33337 2.66671C4.75471 2.66671 2.66671 4.75471 2.66671 7.33337C2.66671 9.91137 4.75471 12 7.33337 12C8.54699 12.002 9.7133 11.5294 10.5834 10.6834L10.6834 10.5834Z" fill="#09121F" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_search">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-[280px] pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-xl text-[#171717] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3eace2] font-degular"
                                    style={{
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        letterSpacing: "0.005em",
                                    }}
                                />
                            </div>

                            {/* Select Date Button */}
                            <button
                                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[#171717] hover:bg-gray-50 transition-colors font-degular"
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    letterSpacing: "0.005em",
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_calendar)">
                                        <path d="M11.3334 1.99996H14C14.1769 1.99996 14.3464 2.0702 14.4714 2.19522C14.5965 2.32025 14.6667 2.48981 14.6667 2.66663V13.3333C14.6667 13.5101 14.5965 13.6797 14.4714 13.8047C14.3464 13.9297 14.1769 14 14 14H2.00004C1.82323 14 1.65366 13.9297 1.52864 13.8047C1.40361 13.6797 1.33337 13.5101 1.33337 13.3333V2.66663C1.33337 2.48981 1.40361 2.32025 1.52864 2.19522C1.65366 2.0702 1.82323 1.99996 2.00004 1.99996H4.66671V0.666626H6.00004V1.99996H10V0.666626H11.3334V1.99996ZM13.3334 7.33329H2.66671V12.6666H13.3334V7.33329ZM10 3.33329H6.00004V4.66663H4.66671V3.33329H2.66671V5.99996H13.3334V3.33329H11.3334V4.66663H10V3.33329ZM4.00004 8.66663H5.33337V9.99996H4.00004V8.66663ZM7.33337 8.66663H8.66671V9.99996H7.33337V8.66663ZM10.6667 8.66663H12V9.99996H10.6667V8.66663Z" fill="#8E95A6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_calendar">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Select Date
                            </button>

                            {/* All Source Button */}
                            <button
                                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[#171717] hover:bg-gray-50 transition-colors font-degular"
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    letterSpacing: "0.005em",
                                }}
                            >
                                <span>All Source</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                </svg>
                            </button>

                            {/* List View Button */}
                            <button
                                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[#171717] hover:bg-gray-50 transition-colors font-degular"
                                style={{
                                    fontSize: "16px",
                                    lineHeight: "24px",
                                    letterSpacing: "0.005em",
                                }}
                            >
                                <span>List View</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content: Calendar + Meeting Cards */}
                    <div className="p-6 pt-2">
                        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-6">
                            {/* Left - Calendar */}
                            <div>
                                <Calendar
                                    selectedDate={selectedDate}
                                    onDateSelect={handleDateSelect}
                                    datesWithEvents={datesWithEvents}
                                    subtitle="View Meetings"
                                />
                            </div>

                            {/* Right - Meeting Cards */}
                            <div>
                                <div className="space-y-4 pr-4">
                                    {filteredMeetings.length > 0 ? (
                                        filteredMeetings.map((meeting) => (
                                            <div key={meeting.id} className="relative">
                                                <button className="absolute top-4 right-4 z-10 text-[#E51B1B] hover:text-[#c41a1a] transition-colors">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_delete)">
                                                            <path d="M20 7V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V7H2V5H22V7H20ZM6 7V20H18V7H6ZM11 9H13V11H11V9ZM11 12H13V14H11V12ZM11 15H13V17H11V15ZM7 2H17V4H7V2Z" fill="currentColor" />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_delete">
                                                                <rect width="24" height="24" fill="white" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </button>
                                                <MeetingCard
                                                    title={meeting.title}
                                                    dateTime={meeting.dateTime}
                                                    description={meeting.description}
                                                    attendeeCount={meeting.attendeeCount}
                                                    memberAvatars={meeting.memberAvatars}
                                                    extraMembers={meeting.extraMembers}
                                                    mainHeading={meeting.title}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12 text-[#686F83] font-degular">
                                            No meetings found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}