"use client";

import React, { useState, useEffect } from "react";

interface CalendarProps {
    selectedDate?: Date;
    onDateSelect?: (date: Date) => void;
    datesWithEvents?: number[];
    subtitle?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
    selectedDate = new Date(),
    onDateSelect,
    datesWithEvents = [],
    subtitle = "See Schedule",
}) => {
    const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
    const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());
    const [selected, setSelected] = useState(selectedDate.getDate());

    // Sync with prop changes
    useEffect(() => {
        setCurrentMonth(selectedDate.getMonth());
        setCurrentYear(selectedDate.getFullYear());
        setSelected(selectedDate.getDate());
    }, [selectedDate]);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateClick = (day: number) => {
        setSelected(day);
        const newDate = new Date(currentYear, currentMonth, day);
        onDateSelect?.(newDate);
    };

    const handlePrevMonth = () => {
        let newMonth = currentMonth - 1;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear = currentYear - 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);

        // Reset selection when month changes
        const daysInNewMonth = getDaysInMonth(newMonth, newYear);
        if (selected > daysInNewMonth) {
            setSelected(daysInNewMonth);
        }
    };

    const handleNextMonth = () => {
        let newMonth = currentMonth + 1;
        let newYear = currentYear;

        if (newMonth > 11) {
            newMonth = 0;
            newYear = currentYear + 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);

        // Reset selection when month changes
        const daysInNewMonth = getDaysInMonth(newMonth, newYear);
        if (selected > daysInNewMonth) {
            setSelected(daysInNewMonth);
        }
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
    }

    // Add empty cells to complete the last week (ensure grid is always 7 columns)
    const totalCells = days.length;
    const remainingCells = totalCells % 7;
    if (remainingCells !== 0) {
        for (let i = 0; i < (7 - remainingCells); i++) {
            days.push(null);
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-[#E5E7EB]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 bg-[#f8f8fc] border-b border-[#E5E7EB] rounded-t-2xl p-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#171717] font-hyperspace mb-1" style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        lineHeight: '120%',
                        letterSpacing: '-0.02em'
                    }}>
                        Calendar
                    </h2>
                    <p className="text-[#686F83] font-degular" style={{
                        fontSize: '14px',
                        lineHeight: '20px',
                        letterSpacing: '0.005em'
                    }}>
                        {subtitle}
                    </p>
                </div>
                <button className="text-[#171717] hover:text-[#686F83] transition-colors p-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_calendar_menu)">
                            <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" fill="#09121F" />
                        </g>
                        <defs>
                            <clipPath id="clip0_calendar_menu">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
            </div>

            {/* Month Navigation */}
            <div className="flex items-center justify-between px-4 mb-6">
                {/* Previous Month Button */}
                <button
                    onClick={handlePrevMonth}
                    className="w-12 h-12 flex items-center justify-center  cursor-pointer"
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="#E9EAEA" />
                        <path d="M20.8602 24.3934L17.1402 20.6667C17.016 20.5418 16.9463 20.3729 16.9463 20.1967C16.9463 20.0206 17.016 19.8516 17.1402 19.7267L20.8602 16.0001C20.9534 15.906 21.0725 15.8419 21.2024 15.8159C21.3322 15.7898 21.4668 15.803 21.5891 15.8538C21.7114 15.9046 21.8158 15.9906 21.889 16.101C21.9622 16.2113 22.0009 16.341 22.0002 16.4734V23.9201C22.0009 24.0525 21.9622 24.1821 21.889 24.2925C21.8158 24.4028 21.7114 24.4889 21.5891 24.5396C21.4668 24.5904 21.3322 24.6036 21.2024 24.5776C21.0725 24.5515 20.9534 24.4874 20.8602 24.3934Z" fill="#727A90" />
                    </svg>

                </button>

                {/* Month Year Display */}
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span className="text-[#171717] font-medium font-degular" style={{
                        fontSize: '18px',
                        lineHeight: '28px',
                        letterSpacing: '0.005em'
                    }}>
                        {monthNames[currentMonth]} {currentYear}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.27349 6H11.7268C11.8587 6.00055 11.9874 6.04019 12.0967 6.1139C12.206 6.18761 12.2911 6.29208 12.341 6.4141C12.391 6.53612 12.4036 6.67021 12.3773 6.79942C12.3511 6.92863 12.2871 7.04715 12.1935 7.14L8.47349 10.86C8.41152 10.9225 8.33778 10.9721 8.25654 11.0059C8.1753 11.0398 8.08817 11.0572 8.00016 11.0572C7.91215 11.0572 7.82501 11.0398 7.74377 11.0059C7.66253 10.9721 7.5888 10.9225 7.52682 10.86L3.80682 7.14C3.71321 7.04715 3.64923 6.92863 3.62297 6.79942C3.59672 6.67021 3.60936 6.53612 3.65931 6.4141C3.70926 6.29208 3.79427 6.18761 3.9036 6.1139C4.01292 6.04019 4.14164 6.00055 4.27349 6Z" fill="#727A90" />
                    </svg>

                </button>

                {/* Next Month Button */}
                <button
                    onClick={handleNextMonth}
                    className="w-12 h-12 flex items-center justify-center cursor-pointer"
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" stroke="#E9EAEA" />
                        <path d="M18 23.9201V16.4734C17.9992 16.341 18.0379 16.2113 18.1111 16.101C18.1843 15.9906 18.2887 15.9046 18.411 15.8538C18.5333 15.803 18.668 15.7898 18.7978 15.8159C18.9276 15.8419 19.0468 15.906 19.14 16.0001L22.86 19.7267C22.9842 19.8516 23.0539 20.0206 23.0539 20.1967C23.0539 20.3729 22.9842 20.5418 22.86 20.6667L19.14 24.3934C19.0468 24.4874 18.9276 24.5515 18.7978 24.5776C18.668 24.6036 18.5333 24.5904 18.411 24.5396C18.2887 24.4889 18.1843 24.4028 18.1111 24.2925C18.0379 24.1821 17.9992 24.0525 18 23.9201Z" fill="#727A90" />
                    </svg>

                </button>
            </div>

            {/* Calendar Grid */}
            <div className="px-4 pb-4">
                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-3">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-center text-[#686F83] font-medium font-degular py-2" style={{
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.005em'
                        }}>
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => (
                        <div key={index} className="flex flex-col items-center justify-center py-1">
                            {day !== null ? (
                                <>
                                    <button
                                        onClick={() => handleDateClick(day)}
                                        className={`w-6 h-6 rounded-md flex items-center justify-center font-degular transition-colors ${selected === day
                                            ? 'bg-[#3eace2] text-black'
                                            : 'text-[#171717] hover:bg-gray-100'
                                            }`}
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '20px',
                                            fontWeight: selected === day ? 600 : 400
                                        }}
                                    >
                                        {day}
                                    </button>
                                    {/* Red dot below the date */}
                                    {datesWithEvents.includes(day) && (
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${selected === day ? 'bg-[#3eace2]' : 'bg-[#E51B1B]'}`} />
                                    )}
                                    {/* Empty space to keep alignment when no dot */}
                                    {!datesWithEvents.includes(day) && (
                                        <div className="w-1 h-1 mt-1" />
                                    )}
                                </>
                            ) : (
                                <div className="w-6 h-6" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};