"use client";

import React, { useState } from "react";
import { CustomDropdown } from '../Meetings/CustomDropdown';

interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    isEditing: boolean;
}

interface AvailabilityCardProps {
    day: string;
}

export const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ day }) => {
    const [slots, setSlots] = useState<TimeSlot[]>([
        { id: "1", startTime: "10:00 AM", endTime: "11:00 AM", isEditing: false }
    ]);
    const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);

    const timeOptions = [
        "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM",
        "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM",
        "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
        "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
    ];

    const handleEdit = (slot: TimeSlot) => {
        setEditingSlot({ ...slot });
    };

    const handleSave = () => {
        if (editingSlot) {
            setSlots(slots.map(slot =>
                slot.id === editingSlot.id
                    ? { ...editingSlot, isEditing: false }
                    : slot
            ));
            setEditingSlot(null);
        }
    };

    const handleDelete = () => {
        if (editingSlot) {
            setSlots(slots.filter(slot => slot.id !== editingSlot.id));
            setEditingSlot(null);
        }
    };

    const handleAddSlot = () => {
        const newSlot: TimeSlot = {
            id: Date.now().toString(),
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            isEditing: true
        };
        setSlots([...slots, newSlot]);
        setEditingSlot(newSlot);
    };

    return (
        <div className="bg-[#F8F8FC] rounded-2xl border border-gray-200 p-6">
            <div className="flex gap-6">
                {/* Day Label - Left Side */}
                <div className="w-[100px] flex-shrink-0">
                    <span className="text-[#0F1113] font-degular" style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px'
                    }}>
                        {day}
                    </span>
                </div>

                {/* Content - Right Side */}
                <div className="flex-1 space-y-3">
                    {/* Display Rows - Saved Time Slots */}
                    {slots.map((slot) => (
                        <div
                            key={slot.id}
                            className="flex items-center justify-between h-[44px] pl-4 pr-2 bg-[#F1F2F4] border border-[#E5E7EB] rounded-2xl"
                        >
                            <span className="text-[#686F83] font-degular" style={{
                                fontSize: '16px',
                                fontWeight: 400,
                                lineHeight: '24px'
                            }}>
                                {slot.startTime}  -  {slot.endTime}
                            </span>

                            {/* Edit Icon */}
                            <button
                                onClick={() => handleEdit(slot)}
                                className=" cursor-pointer transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.728 9.68608L14.314 8.27208L5 17.5861V19.0001H6.414L15.728 9.68608ZM17.142 8.27208L18.556 6.85808L17.142 5.44408L15.728 6.85808L17.142 8.27208ZM7.242 21.0001H3V16.7571L16.435 3.32208C16.6225 3.13461 16.8768 3.0293 17.142 3.0293C17.4072 3.0293 17.6615 3.13461 17.849 3.32208L20.678 6.15108C20.8655 6.33861 20.9708 6.59292 20.9708 6.85808C20.9708 7.12325 20.8655 7.37756 20.678 7.56508L7.243 21.0001H7.242Z" fill="#0F1113" />
                                </svg>

                            </button>
                        </div>
                    ))}

                    {/* Edit Row - Dropdowns with actions */}
                    {editingSlot && (
                        <div className="flex items-center gap-2">
                            {/* Start Time Dropdown */}
                            <div className="flex-1">
                                <CustomDropdown
                                    value={editingSlot.startTime}
                                    onChange={(value) => setEditingSlot({ ...editingSlot, startTime: value })}
                                    options={timeOptions}
                                    placeholder="Start Time"
                                    inlineChevron={true}
                                />
                            </div>

                            {/* Separator */}
                            <span className="text-[#171717] font-degular flex-shrink-0 px-2" style={{
                                fontSize: '16px',
                                fontWeight: 400
                            }}>
                                -
                            </span>

                            {/* End Time Dropdown */}
                            <div className="flex-1">
                                <CustomDropdown
                                    value={editingSlot.endTime}
                                    onChange={(value) => setEditingSlot({ ...editingSlot, endTime: value })}
                                    options={timeOptions}
                                    placeholder="End Time"
                                    inlineChevron={true}
                                />
                            </div>

                            {/* Checkmark Button */}
                            <button
                                onClick={handleSave}
                                className="flex-shrink-0 w-[52px] h-[52px] bg-[#F1F2F4] border border-[#E5E7EB] rounded-2xl flex items-center justify-center cursor-pointer transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3ZM5 5V19H19V5H5ZM11.003 16L6.76 11.757L8.174 10.343L11.003 13.172L16.659 7.515L18.074 8.929L11.003 16Z" fill="#328AB5" />
                                </svg>

                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={handleDelete}
                                className="flex-shrink-0 w-[52px] h-[52px] bg-[#F1F2F4] border border-[#E5E7EB] rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 7V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V7H2V5H22V7H20ZM11 9V11H13V9H11ZM11 12V14H13V12H11ZM11 15V17H13V15H11ZM7 2H17V4H7V2Z" fill="#EA4949" />
                                </svg>

                            </button>
                        </div>
                    )}

                    {/* Add Slot Button */}
                    <button
                        onClick={handleAddSlot}
                        className="flex items-center gap-2 px-5 py-3 bg-[#0F1113] text-white rounded-2xl font-hyperspace cursor-pointer transition-colors"
                        style={{
                            fontSize: '16px',
                            fontWeight: 400,
                            lineHeight: '24px',
                            letterSpacing: '0.005em'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Add Slot</span>
                    </button>
                </div>
            </div>
        </div>
    );
};