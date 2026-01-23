"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Calendar } from "@/components/Dashboard/ViewAvailability/Calendar";

interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    label?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label = "Date" }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0, width: 0 });
    const datePickerRef = useRef<HTMLDivElement>(null);
    const dateInputRef = useRef<HTMLDivElement>(null);

    // Format date to "26 October 2025" format
    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const dateDisplay = formatDate(value);

    const handleDateSelect = (date: Date) => {
        onChange(date);
        setShowCalendar(false);
    };

    // Calculate calendar position when opening
    useEffect(() => {
        if (showCalendar && dateInputRef.current) {
            const rect = dateInputRef.current.getBoundingClientRect();
            const calendarHeight = 350; // Approximate calendar height
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;
            
            // Position below if not enough space above, otherwise above
            const positionBelow = spaceAbove < calendarHeight && spaceBelow > calendarHeight;
            
            setCalendarPosition({
                top: positionBelow ? rect.bottom + 8 : rect.top - calendarHeight - 8,
                left: rect.left,
                width: rect.width
            });
        }
    }, [showCalendar]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                // Check if click is outside the calendar portal
                const target = event.target as HTMLElement;
                if (!target.closest('[data-calendar-portal]')) {
                    setShowCalendar(false);
                }
            }
        };

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    return (
        <div className="relative" ref={datePickerRef}>
            <label className="block text-[#171717] font-degular mb-2" style={{
                fontSize: '14px',
                fontWeight: 500,
                lineHeight: '20px'
            }}>
                {label}
            </label>
            <div className="relative" ref={dateInputRef}>
                <input
                    type="text"
                    value={dateDisplay}
                    readOnly
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full h-[48px] px-4 bg-[#F3F4F6] border-0 rounded-xl text-[#171717] pr-12 font-degular focus:outline-none focus:ring-2 focus:ring-[#3EACE2] transition-all cursor-pointer"
                    style={{
                        fontSize: '16px',
                        fontWeight: 400,
                        lineHeight: '24px'
                    }}
                />
                <button 
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H7V1H9V3H15V1H17V3ZM20 11H4V19H20V11ZM15 5H9V7H7V5H4V9H20V5H17V7H15V5ZM6 13H8V15H6V13ZM11 13H13V15H11V13ZM16 13H18V15H16V13Z" fill="#0F1113" />
                    </svg>
                </button>
            </div>
            {showCalendar && typeof window !== 'undefined' && createPortal(
                <div 
                    data-calendar-portal
                    className="fixed z-[9999] bg-white rounded-2xl shadow-lg border border-[#E5E7EB]"
                    style={{
                        top: `${calendarPosition.top}px`,
                        left: `${calendarPosition.left}px`,
                        width: `${calendarPosition.width}px`
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Calendar
                        selectedDate={value}
                        onDateSelect={handleDateSelect}
                        datesWithEvents={[]}
                    />
                </div>,
                document.body
            )}
        </div>
    );
};
