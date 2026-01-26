"use client";

import React, { useState } from "react";

interface AvailableSlotsProps {
  slots?: string[];
  selectedSlots?: string[];
  onSlotSelect?: (slot: string) => void;
}

const defaultSlots = [
  "8:00 am", "9:00 am", "10:00 am", "11:00 am",
  "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm",
  "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm",
  "8:00 pm", "9:00 pm", "10:00 pm", "11:00 pm",
];

export const AvailableSlots: React.FC<AvailableSlotsProps> = ({
  slots = defaultSlots,
  selectedSlots = [],
  onSlotSelect,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedSlots);

  const handleSlotClick = (slot: string) => {
    const newSelected = selected.includes(slot)
      ? selected.filter(s => s !== slot)
      : [...selected, slot];
    setSelected(newSelected);
    onSlotSelect?.(slot);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-t-2xl bg-[#f8f8fc] border-b border-[#E5E7EB] pb-4">
        <div>
          <h2 className="text-2xl font-bold text-[#171717] font-hyperspace mb-1" style={{
            fontSize: '24px',
            fontWeight: 700,
            lineHeight: '120%',
            letterSpacing: '-0.02em'
          }}>
            Available Slots
          </h2>
          <p className="text-[#686F83] font-degular" style={{
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.005em'
          }}>
            View All Slots
          </p>
        </div>
        <button className="text-[#171717] hover:text-[#686F83] transition-colors p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_slots_menu)">
              <path d="M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z" fill="#09121F" />
            </g>
            <defs>
              <clipPath id="clip0_slots_menu">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4" style={{ gap: '12px' }}>
        {slots.map((slot, index) => (
          <button
            key={index}
            onClick={() => handleSlotClick(slot)}
            className={`w-full font-medium font-degular transition-colors ${
              selected.includes(slot)
                ? 'bg-[#3eace2] text-white border-[#3eace2]'
                : 'bg-[#F8F8FC] text-[#171717] border-[#E5E7EB] hover:border-[#3eace2]'
            }`}
            style={{
              height: '44px',
              paddingTop: '12px',
              paddingRight: '16px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              borderWidth: '1.5px',
              borderStyle: 'solid',
              borderRadius: '16px',
              fontFamily: 'Degular Demo',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '20px',
              letterSpacing: '0.5%'
            }}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};
