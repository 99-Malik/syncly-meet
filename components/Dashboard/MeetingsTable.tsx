"use client";

import React, { useState } from "react";
import { Checkbox } from "../Sign-In/Checkbox";

interface Meeting {
  id: string;
  title: string;
  agenda: string;
  group: string;
  groupColor: string;
  dateTime: string;
  status: string;
}

interface MeetingsTableProps {
  meetings: Meeting[];
}

export const MeetingsTable: React.FC<MeetingsTableProps> = ({ meetings }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAll = () => {
    if (selectedRows.size === meetings.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(meetings.map(m => m.id)));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header with Title and Toolbar */}
      <div className="flex items-center justify-between p-6 pb-4">
        {/* Section Title - Left */}
        <h2 className="text-2xl font-bold text-[#171717] font-hyperspace" style={{
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: '120%',
          letterSpacing: '-0.02em'
        }}>
          Upcoming Meetings
        </h2>

        {/* Toolbar - Right Side */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_2_9314)">
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
              <g clip-path="url(#clip0_2_8531)">
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2_8544)">
                <path d="M6.66667 12H9.33333V10.6667H6.66667V12ZM2 4V5.33333H14V4H2ZM4 8.66667H12V7.33333H4V8.66667Z" fill="#8E95A6" />
              </g>
              <defs>
                <clipPath id="clip0_2_8544">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-gray-200 bg-[#f8f8fc]">
              <th className="text-left py-4 px-6 w-[50px]">
                <Checkbox
                  label=""
                  checked={selectedRows.size === meetings.length && meetings.length > 0}
                  onChange={toggleAll}
                  bgColor="#FFFFFF"
                  borderColor="#D1D5DB"
                  checkedBgColor="#3eace2"
                  checkedBorderColor="#3eace2"
                />
              </th>
              <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular" style={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.5%'
              }}>
                Title
              </th>
              <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular" style={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.5%'
              }}>
                Agenda
              </th>
              <th className="text-left py-4 px-4 text-[#0F1113] font-medium font-degular" style={{
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.5%'
              }}>
                Group
              </th>
              <th className="text-left py-4 px-4 text-[#0F1113] font-medium cursor-pointer font-degular" style={{
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
                Status
              </th>
              <th className="w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6">
                  <Checkbox
                    label=""
                    checked={selectedRows.has(meeting.id)}
                    onChange={() => toggleRow(meeting.id)}
                    bgColor="#FFFFFF"
                    borderColor="#D1D5DB"
                    checkedBgColor="#3eace2"
                    checkedBorderColor="#3eace2"
                  />
                </td>
                <td className="py-5 px-4 text-[#171717] font-medium font-degular" style={{
                  fontSize: '15px',
                  lineHeight: '24px',
                  letterSpacing: '0.005em'
                }}>
                  {meeting.title}
                </td>
                <td className="py-5 px-4 text-[#686F83] font-medium font-degular max-w-[300px]" style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.5%'
                }}>
                  <span className="block truncate">{meeting.agenda}</span>
                </td>
                <td className="py-5 px-4">
                  <span
                    className="inline-block px-4 py-2 rounded-lg font-medium font-degular"
                    style={{
                      backgroundColor: meeting.groupColor,
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.005em',
                      color: '#171717'
                    }}
                  >
                    {meeting.group}
                  </span>
                </td>
                <td className="py-5 px-4 text-[#686F83] font-medium font-degular" style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.5%'
                }}>
                  {meeting.dateTime}
                </td>
                <td className="py-5 px-4">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E5E7EB] font-medium font-degular"
                    style={{
                      backgroundColor: '#e6f4f5',
                      fontSize: '14px',
                      lineHeight: '20px',
                      letterSpacing: '0.005em'
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#009499]"></span>
                    <span className="text-[#009499]">{meeting.status}</span>
                  </span>
                </td>
                <td className="py-5 px-4">
                  <button className="text-[#9CA3AF] hover:text-[#171717] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_2_8823)">
                        <path d="M12 6C12.8284 6 13.5 5.32843 13.5 4.5C13.5 3.67157 12.8284 3 12 3C11.1716 3 10.5 3.67157 10.5 4.5C10.5 5.32843 11.1716 6 12 6Z" fill="#727A90" />
                        <path d="M12 13.5002C12.8284 13.5002 13.5 12.8287 13.5 12.0002C13.5 11.1718 12.8284 10.5002 12 10.5002C11.1716 10.5002 10.5 11.1718 10.5 12.0002C10.5 12.8287 11.1716 13.5002 12 13.5002Z" fill="#727A90" />
                        <path d="M12 20.9998C12.8284 20.9998 13.5 20.3282 13.5 19.4998C13.5 18.6713 12.8284 17.9998 12 17.9998C11.1716 17.9998 10.5 18.6713 10.5 19.4998C10.5 20.3282 11.1716 20.9998 12 20.9998Z" fill="#727A90" />
                      </g>
                      <defs>
                        <clipPath id="clip0_2_8823">
                          <rect width="18" height="18" fill="white" transform="translate(3 3)" />
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
  );
};