"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/Layout/layout";
import { Header } from "@/components/Dashboard/Header";
import { DatePicker } from "@/components/Meetings/DatePicker";
import { CustomDropdown } from "@/components/Meetings/CustomDropdown";
import { AttendeePill } from "@/components/Meetings/AttendeePill";
import { ScheduleMeetingSuccessModal } from "@/components/Meetings/ScheduleMeetingSuccessModal";

interface Attendee {
    id: string;
    email: string;
    avatar: string;
}

export default function ScheduleMeetingHome() {
    const [meetingTitle, setMeetingTitle] = useState("");
    const [meetingAgenda, setMeetingAgenda] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 9, 26)); // October 26, 2025
    const [startTime, setStartTime] = useState("5:00 pm");
    const [endTime, setEndTime] = useState("6:00 pm");
    const [attendeeEmail, setAttendeeEmail] = useState("");
    const [attendees, setAttendees] = useState<Attendee[]>([
        { id: "1", email: "user123@gmail.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
        { id: "2", email: "user123@gmail.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
        { id: "3", email: "user123@gmail.com", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
        { id: "4", email: "user4@gmail.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
        { id: "5", email: "user5@gmail.com", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" },
    ]);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const timeOptions = ["5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm"];

    const removeAttendee = (id: string) => {
        setAttendees(attendees.filter((a) => a.id !== id));
    };

    const addAttendee = () => {
        if (attendeeEmail.trim()) {
            setAttendees([
                ...attendees,
                {
                    id: Date.now().toString(),
                    email: attendeeEmail,
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                },
            ]);
            setAttendeeEmail("");
        }
    };

    const formatDateForDisplay = (date: Date): string => {
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    };

    const handleScheduleMeeting = () => {
        setIsSuccessModalOpen(true);
    };

    const formatDateTime = (): string => {
        const dateStr = formatDateForDisplay(selectedDate);
        return `${dateStr} ${startTime} - ${endTime}`;
    };

    const getMemberAvatars = (): string[] => {
        return attendees.map(attendee => attendee.avatar);
    };

    return (
        <DashboardLayout>
            <Header
                title="Schedule Meeting"
                breadcrumb="My Meetings / Schedule Meeting"
                showBackArrow={true}
            />

            {/* Main Content Card */}
            <div className="relative mt-6">
                {/* Decorative curved line in top right */}
                <svg
                    className="absolute top-0 right-0 w-64 h-32 opacity-30"
                    viewBox="0 0 256 128"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M256 0C256 70.6925 199.346 128 130 128C60.6538 128 4 70.6925 4 0"
                        stroke="#E5E7EB"
                        strokeWidth="1"
                        fill="none"
                    />
                </svg>

                <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 ">
                    {/* Meeting Details Section */}
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                        Meeting Details
                    </h2>

                    {/* Meeting Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meeting Title
                        </label>
                        <input
                            type="text"
                            value={meetingTitle}
                            onChange={(e) => setMeetingTitle(e.target.value)}
                            placeholder="e.g. design system update meeting"
                            className="w-full px-4 py-3 bg-[#f1f2f4] border border-[#E5E7EB] rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all"
                        />
                    </div>

                    {/* Meeting Agenda */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meeting Agenda (Optional )
                        </label>
                        <textarea
                            value={meetingAgenda}
                            onChange={(e) => setMeetingAgenda(e.target.value)}
                            placeholder="e.g. lets discuss about the meeting agenda"
                            rows={4}
                            className="w-full px-4 py-3 bg-[#F1F2F4] border border-[#E5E7EB] rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all resize-none"
                        />
                    </div>

                    {/* Date and Time Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Date */}
                        <DatePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                            label="Date"
                        />

                        {/* Start Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Start Time
                            </label>
                            <CustomDropdown
                                value={startTime}
                                onChange={setStartTime}
                                options={timeOptions}
                            />
                        </div>

                        {/* End Time */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                End Time
                            </label>
                            <CustomDropdown
                                value={endTime}
                                onChange={setEndTime}
                                options={timeOptions}
                            />
                        </div>
                    </div>

                    {/* Attendees Section */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Attendees
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="email"
                                value={attendeeEmail}
                                onChange={(e) => setAttendeeEmail(e.target.value)}
                                placeholder="e.g : user123@gmail.com"
                                className="flex-1 px-4 py-3 bg-[#F1F2F4] border border-[#E5E7EB] rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3eace2] transition-all"
                            />
                            <button
                                onClick={addAttendee}
                                className="px-6 py-3 text-sm bg-gray-900 text-white font-medium rounded-2xl font-hyperspace hover:bg-gray-800 cursor-pointer transition-colors"
                            >
                                Add Member
                            </button>
                        </div>

                        {/* Attendee Tags */}
                        <div className="flex flex-wrap gap-3 mt-4">
                            {attendees.map((attendee) => (
                                <AttendeePill
                                    key={attendee.id}
                                    id={attendee.id}
                                    email={attendee.email}
                                    avatar={attendee.avatar}
                                    onRemove={removeAttendee}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Schedule Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleScheduleMeeting}
                            className="px-6 py-3 bg-primary text-white font-medium rounded-xl cursor-pointer transition-colors"
                        >
                            Schedule Meeting
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <ScheduleMeetingSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                meetingTitle={meetingTitle || "Sync meet"}
                meetingDateTime={formatDateTime()}
                meetingDescription={meetingAgenda || "Developer Group, includes all the front end developers in this group"}
                attendeeCount={attendees.length}
                memberAvatars={getMemberAvatars()}
                extraMembers={attendees.length > 4 ? attendees.length - 4 : undefined}
            />
        </DashboardLayout>
    );
}