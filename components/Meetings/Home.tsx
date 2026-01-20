"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../Layout/layout";
import { Header } from "../Dashboard/Header";
import {LogoIcon} from "../Svgs/Sign-In/Icons"
import {GoogleIcon} from "../Svgs/Sign-In/Icons"
import MeetingDetails from "./Schedule-Meeting/MeetingDetails";

interface Meeting {
    id: string;
    title: string;
    source: "syncmeet" | "google-meet";
    dateTime: string;
    link: string;
}

interface MeetingDetail {
    id: string;
    title: string;
    dateTime: string;
    description: string;
    attendeeCount: number;
    memberAvatars: string[];
    extraMembers?: number;
    date: Date;
}

export default function MeetingsHome() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 8, 4)); // September 4, 2025

    // Sample meetings data matching the image
    const meetings: Meeting[] = [
        {
            id: "1",
            title: "Project Alpha",
            source: "syncmeet",
            dateTime: "12/26/2025, 4:00 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "2",
            title: "Vimeo Rebranding",
            source: "google-meet",
            dateTime: "12/29/2025, 11:45 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "3",
            title: "Project Alpha",
            source: "syncmeet",
            dateTime: "12/26/2025, 4:00 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "4",
            title: "Vimeo Rebranding",
            source: "google-meet",
            dateTime: "12/29/2025, 11:45 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "5",
            title: "Project Alpha",
            source: "syncmeet",
            dateTime: "12/26/2025, 4:00 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "6",
            title: "Vimeo Rebranding",
            source: "google-meet",
            dateTime: "12/29/2025, 11:45 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "7",
            title: "Vimeo Rebranding",
            source: "google-meet",
            dateTime: "12/29/2025, 11:45 Am",
            link: "https://www.synclymeet.link12367/join",
        },
        {
            id: "8",
            title: "Vimeo Rebranding",
            source: "google-meet",
            dateTime: "12/29/2025, 11:45 Am",
            link: "https://www.synclymeet.link12367/join",
        },
    ];

    const filteredMeetings = meetings.filter((meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Convert table meetings to MeetingDetail format for MeetingDetails view
    const meetingDetails: MeetingDetail[] = meetings.map((meeting) => {
        // Parse date from dateTime string (format: "12/26/2025, 4:00 Am")
        const dateParts = meeting.dateTime.split(',')[0].split('/');
        const date = new Date(
            parseInt(dateParts[2]), // year
            parseInt(dateParts[0]) - 1, // month (0-indexed)
            parseInt(dateParts[1]) // day
        );

        return {
            id: meeting.id,
            title: meeting.title,
            dateTime: meeting.dateTime,
            description: `${meeting.title} meeting scheduled via ${meeting.source === 'syncmeet' ? 'Syncmeet' : 'Google Meet'}`,
            attendeeCount: 20, // Default value
            memberAvatars: [
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
            ],
            extraMembers: 16,
            date: date,
        };
    });

    // Filter meeting details based on search query
    const filteredMeetingDetails = meetingDetails.filter((meeting) =>
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Extract dates with events for the calendar (current month)
    const datesWithEvents = useMemo(() => {
        const currentMonth = selectedDate.getMonth();
        const currentYear = selectedDate.getFullYear();
        const dates: number[] = [];

        meetingDetails.forEach((meeting) => {
            if (
                meeting.date.getMonth() === currentMonth &&
                meeting.date.getFullYear() === currentYear
            ) {
                dates.push(meeting.date.getDate());
            }
        });

        // Remove duplicates
        return Array.from(new Set(dates));
    }, [selectedDate]);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const handleRowClick = (meetingId: string) => {
        setSelectedMeetingId(meetingId);
    };

    const handleBackToTable = () => {
        setSelectedMeetingId(null);
    };

    const SourceIcon = ({ source }: { source: "syncmeet" | "google-meet" }) => {
        if (source === "syncmeet") {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f8f8fc] border border-[#E5E7EB]">
                   <LogoIcon width={24} height={24}/>
                    <span className="font-degular" style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        letterSpacing: '0.005em',
                        color: '#171717'
                    }}>
                        Syncmeet
                    </span>
                </div>
            );
        } else {
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f8f8fc] border border-[#E5E7EB]">
                    <GoogleIcon width={24} height={24}/>
                    <span className="font-degular" style={{
                        fontSize: '14px',
                        fontWeight: 400,
                        lineHeight: '20px',
                        letterSpacing: '0.005em',
                        color: '#171717'
                    }}>
                        Google meet
                    </span>
                </div>
            );
        }
    };

    return (
        <DashboardLayout>
            <div className="h-full flex flex-col ">
                {/* Header with Schedule Meeting Button */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                        <Header title="My Meetings" breadcrumb="My Meetings / Home" />
                    </div>
                    <button 
                        onClick={() => router.push('/meetings/schedule-meeting')}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#3eace2] text-white rounded-xl hover:bg-[#35a0d4] transition-colors font-degular flex-shrink-0"
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            letterSpacing: '0.005em'
                        }}>
                            Schedule Meeting
                        </span>
                    </button>
                </div>

                {/* Show MeetingDetails view when a meeting is selected, otherwise show table */}
                {selectedMeetingId ? (
                    <MeetingDetails />
                ) : (
                    /* Table Container */
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    {/* Header with Title and Toolbar */}
                    <div className="flex items-center justify-between p-4 pb-4">
                        {/* Section Title - Left */}
                        <h2 className="text-2xl font-bold text-[#171717] font-hyperspace" style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            lineHeight: '120%',
                            letterSpacing: '-0.02em'
                        }}>
                            My Meetings
                        </h2>

                        {/* Toolbar - Right Side */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_2_9314)">
                                            <path d="M12.0207 11.078L14.876 13.9327L13.9327 14.876L11.078 12.0207C10.0159 12.8722 8.69471 13.3353 7.33337 13.3334C4.02137 13.3334 1.33337 10.6454 1.33337 7.33337C1.33337 4.02137 4.02137 1.33337 7.33337 1.33337C10.6454 1.33337 13.3334 4.02137 13.3334 7.33337C13.3353 8.69471 12.8722 10.0159 12.0207 11.078ZM10.6834 10.5834C11.5294 9.7133 12.002 8.54699 12 7.33337C12 4.75471 9.91137 2.66671 7.33337 2.66671C4.75471 2.66671 2.66671 4.75471 2.66671 7.33337C2.66671 9.91137 4.75471 12 7.33337 12C8.54699 12.002 9.7133 11.5294 10.5834 10.6834L10.6834 10.5834Z" fill="#09121F" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_2_9314">
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
                                        fontSize: '16px',
                                        lineHeight: '24px',
                                        letterSpacing: '0.005em'
                                    }}
                                />
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[#171717] hover:bg-gray-50 transition-colors font-degular" style={{
                                fontSize: '16px',
                                lineHeight: '24px',
                                letterSpacing: '0.005em'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2_8531)">
                                        <path d="M11.3334 1.99996H14C14.1769 1.99996 14.3464 2.0702 14.4714 2.19522C14.5965 2.32025 14.6667 2.48981 14.6667 2.66663V13.3333C14.6667 13.5101 14.5965 13.6797 14.4714 13.8047C14.3464 13.9297 14.1769 14 14 14H2.00004C1.82323 14 1.65366 13.9297 1.52864 13.8047C1.40361 13.6797 1.33337 13.5101 1.33337 13.3333V2.66663C1.33337 2.48981 1.40361 2.32025 1.52864 2.19522C1.65366 2.0702 1.82323 1.99996 2.00004 1.99996H4.66671V0.666626H6.00004V1.99996H10V0.666626H11.3334V1.99996ZM13.3334 7.33329H2.66671V12.6666H13.3334V7.33329ZM10 3.33329H6.00004V4.66663H4.66671V3.33329H2.66671V5.99996H13.3334V3.33329H11.3334V4.66663H10V3.33329ZM4.00004 8.66663H5.33337V9.99996H4.00004V8.66663ZM7.33337 8.66663H8.66671V9.99996H7.33337V8.66663ZM10.6667 8.66663H12V9.99996H10.6667V8.66663Z" fill="#8E95A6" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2_8531">
                                            <rect width="16" height="16" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Select Date
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[#171717] hover:bg-gray-50 transition-colors font-degular" style={{
                                fontSize: '16px',
                                lineHeight: '24px',
                                letterSpacing: '0.005em'
                            }}>
                                <span>All Source</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                </svg>
                            </button>
                            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-xl text-[#171717] hover:bg-gray-50 transition-colors font-degular" style={{
                                fontSize: '16px',
                                lineHeight: '24px',
                                letterSpacing: '0.005em'
                            }}>
                                <span>List View</span>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-t border-b border-gray-200 bg-[#f8f8fc]">
                                    <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular" style={{
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        letterSpacing: '0.5%'
                                    }}>
                                        Title
                                    </th>
                                    <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular cursor-pointer" style={{
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        letterSpacing: '0.5%'
                                    }}>
                                        <div className="flex items-center gap-2">
                                            Source
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular cursor-pointer" style={{
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        letterSpacing: '0.5%'
                                    }}>
                                        <div className="flex items-center gap-2">
                                            Date & Time
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.81051 6.75H13.1895C13.3378 6.75003 13.4828 6.79404 13.6061 6.87645C13.7294 6.95886 13.8255 7.07598 13.8823 7.21301C13.939 7.35003 13.9539 7.50081 13.9249 7.64627C13.896 7.79174 13.8246 7.92536 13.7198 8.03025L9.53026 12.2197C9.38961 12.3603 9.19888 12.4393 9.00001 12.4393C8.80114 12.4393 8.6104 12.3603 8.46976 12.2197L4.28026 8.03025C4.1754 7.92536 4.104 7.79174 4.07507 7.64627C4.04615 7.50081 4.061 7.35003 4.11775 7.21301C4.1745 7.07598 4.27061 6.95886 4.39392 6.87645C4.51722 6.79404 4.6622 6.75003 4.81051 6.75Z" fill="#8E95A6" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular" style={{
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        letterSpacing: '0.5%'
                                    }}>
                                        Link
                                    </th>
                                    <th className="text-right py-4 pl-4 pr-6 text-[#0F1113] font-medium font-degular" style={{
                                        fontSize: '14px',
                                        lineHeight: '20px',
                                        letterSpacing: '0.5%'
                                    }}>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMeetings.map((meeting) => (
                                    <tr 
                                        key={meeting.id} 
                                        onClick={() => handleRowClick(meeting.id)}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <td className="py-5 px-4 text-left text-[#171717] font-medium font-degular" style={{
                                            fontSize: '15px',
                                            lineHeight: '24px',
                                            letterSpacing: '0.005em'
                                        }}>
                                            {meeting.title}
                                        </td>
                                        <td className="py-5 px-4 text-left">
                                            <SourceIcon source={meeting.source} />
                                        </td>
                                        <td className="py-5 px-4 text-left text-[#686F83] font-medium font-degular" style={{
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            letterSpacing: '0.5%'
                                        }}>
                                            {meeting.dateTime}
                                        </td>
                                        <td className="py-5 px-4 text-left">
                                            <a
                                                href={meeting.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[#686F83] underline underline-offset-2  font-degular"
                                                style={{
                                                    fontSize: '14px',
                                                    lineHeight: '20px',
                                                    letterSpacing: '0.005em'
                                                }}
                                            >
                                                {meeting.link}
                                            </a>
                                        </td>
                                        <td className="py-5 pl-4 pr-6 text-right">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // Handle delete action here
                                                }}
                                                className="inline-flex items-center justify-end cursor-pointer transition-colors"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g clipPath="url(#clip0_2_13368)">
                                                        <path d="M20 7V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V7H2V5H22V7H20ZM6 7V20H18V7H6ZM11 9H13V11H11V9ZM11 12H13V14H11V12ZM11 15H13V17H11V15ZM7 2H17V4H7V2Z" fill="#E51B1B" />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_2_13368">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>

                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                )}
            </div>
        </DashboardLayout>
    );
}
