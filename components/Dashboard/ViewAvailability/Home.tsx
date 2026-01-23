"use client";

import React, { useState } from "react";
import DashboardLayout from '@/components/Layout/layout';
import { Header } from '@/components/Dashboard/Header';
import { Calendar } from './Calendar';
import { Members } from './Members';
import { AvailableSlots } from './AvailableSlots';
import { ScheduleMeetingModal } from '@/components/Meetings/ScheduleMeetingModal';
import { ScheduleMeetingSuccessModal } from '@/components/Meetings/ScheduleMeetingSuccessModal';

interface Member {
    id: string;
    name: string;
    avatar?: string;
}

const ViewAvailabilityHome = () => {
    // Sample data
    const datesWithEvents = [1, 2, 10, 17, 18, 19, 23];
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState<string>("");
    
    // State for success modal data
    const [scheduledMeetingData, setScheduledMeetingData] = useState({
        title: "",
        dateTime: "",
        description: "",
        attendeeCount: 0,
        memberAvatars: [] as string[],
        extraMembers: undefined as number | undefined,
    });
    
    const members = [
        {
            id: "1",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
        {
            id: "2",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            id: "3",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            id: "4",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
        {
            id: "5",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
        {
            id: "6",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            id: "7",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            id: "8",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
        {
            id: "9",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        },
        {
            id: "10",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        },
        {
            id: "11",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            id: "12",
            name: "Shayan@123gmail.com",
            email: "Shayan@123gmail.com",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        },
    ];

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        console.log("Selected date:", date);
    };

    const handleMemberSelect = (memberId: string) => {
        console.log("Selected member:", memberId);
    };

    const handleSlotSelect = (slot: string) => {
        setSelectedTime(slot);
        setIsModalOpen(true);
        console.log("Selected slot:", slot);
    };

    // Format date as "24 jun"
    const formatDateForDisplay = (date: Date): string => {
        const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    };

    // Calculate end time (assuming 1 hour duration)
    const calculateEndTime = (startTime: string): string => {
        const [timePart, period] = startTime.split(' ');
        let [hours, minutes] = timePart.split(':').map(Number);

        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }

        // Add 1 hour
        hours = (hours + 1) % 24;
        const endPeriod = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours === 0 ? 12 : hours;

        return `${hours}:${minutes.toString().padStart(2, '0')} ${endPeriod}`;
    };

    const handleScheduleMeeting = (data: {
        date: Date;
        time: string;
        title: string;
        members: Member[];
    }) => {
        // Format date and time
        const dateStr = formatDateForDisplay(data.date);
        const endTime = calculateEndTime(data.time);
        const dateTimeStr = `${dateStr} ${data.time.toLowerCase()} - ${endTime}`;

        // Get member avatars (limit to 3 for display, calculate extra)
        const avatars = data.members
            .map(member => member.avatar || "")
            .filter(avatar => avatar !== "");
        
        const displayAvatars = avatars.slice(0, 3);
        const extraMembers = avatars.length > 3 ? avatars.length - 3 : undefined;

        // Set success modal data
        setScheduledMeetingData({
            title: data.title || "Meeting",
            dateTime: dateTimeStr,
            description: data.title || "Meeting",
            attendeeCount: data.members.length,
            memberAvatars: displayAvatars,
            extraMembers: extraMembers,
        });

        // Close schedule modal and open success modal
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        console.log("Meeting scheduled:", data);
    };

    return (
        <DashboardLayout>
            <Header 
              title="View Availability" 
              breadcrumb="Groups / View Availability" 
              showBackArrow={true}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Column */}
                <div className="lg:col-span-1">
                    <Calendar
                        selectedDate={selectedDate}
                        onDateSelect={handleDateSelect}
                        datesWithEvents={datesWithEvents}
                    />
                </div>

                {/* Members Column */}
                <div className="lg:col-span-1">
                    <Members
                        members={members}
                        onMemberSelect={handleMemberSelect}
                    />
                </div>

                {/* Available Slots Column */}
                <div className="lg:col-span-1">
                    <AvailableSlots
                        onSlotSelect={handleSlotSelect}
                    />
                </div>
            </div>

            {/* Schedule Meeting Modal */}
            <ScheduleMeetingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onScheduleMeeting={handleScheduleMeeting}
            />

            {/* Schedule Meeting Success Modal */}
            <ScheduleMeetingSuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                meetingTitle={scheduledMeetingData.title}
                meetingDateTime={scheduledMeetingData.dateTime}
                meetingDescription={scheduledMeetingData.description}
                attendeeCount={scheduledMeetingData.attendeeCount}
                memberAvatars={scheduledMeetingData.memberAvatars}
                extraMembers={scheduledMeetingData.extraMembers}
            />
        </DashboardLayout>
    );
};

export default ViewAvailabilityHome;