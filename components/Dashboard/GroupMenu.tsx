"use client";

import React, { useState } from "react";
import { DeleteModal } from "./DeleteModal";

interface GroupMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const GroupMenu: React.FC<GroupMenuProps> = ({ onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete?.();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    onEdit?.();
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] py-2 z-100 min-w-[200px]">
        {/* Edit Group */}
        <button
          onClick={handleEditClick}
          className="w-full flex items-center gap-2 px-5 py-2 text-[#222222] cursor-pointer font-degular"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.005em'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1067 8.07174L11.9283 6.8934L4.16667 14.6551V15.8334H5.345L13.1067 8.07174ZM14.285 6.8934L15.4633 5.71507L14.285 4.53674L13.1067 5.71507L14.285 6.8934ZM6.035 17.5001H2.5V13.9642L13.6958 2.7684C13.8521 2.61218 14.064 2.52441 14.285 2.52441C14.506 2.52441 14.7179 2.61218 14.8742 2.7684L17.2317 5.1259C17.3879 5.28218 17.4757 5.4941 17.4757 5.71507C17.4757 5.93604 17.3879 6.14796 17.2317 6.30424L6.03583 17.5001H6.035Z" fill="#09121F" />
          </svg>

          <span className="font-medium">Edit Group</span>
        </button>


        {/* Delete Group */}
        <button
          onClick={handleDeleteClick}
          className="w-full flex items-center gap-2 px-5 pt-1 pb-1  text-[#ff3838] cursor-pointer font-degular"
          style={{
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.005em'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.875 3.75H13.75V3.125C13.75 2.62772 13.5525 2.15081 13.2008 1.79917C12.8492 1.44754 12.3723 1.25 11.875 1.25H8.125C7.62772 1.25 7.15081 1.44754 6.79917 1.79917C6.44754 2.15081 6.25 2.62772 6.25 3.125V3.75H3.125C2.95924 3.75 2.80027 3.81585 2.68306 3.93306C2.56585 4.05027 2.5 4.20924 2.5 4.375C2.5 4.54076 2.56585 4.69973 2.68306 4.81694C2.80027 4.93415 2.95924 5 3.125 5H3.75V16.25C3.75 16.5815 3.8817 16.8995 4.11612 17.1339C4.35054 17.3683 4.66848 17.5 5 17.5H15C15.3315 17.5 15.6495 17.3683 15.8839 17.1339C16.1183 16.8995 16.25 16.5815 16.25 16.25V5H16.875C17.0408 5 17.1997 4.93415 17.3169 4.81694C17.4342 4.69973 17.5 4.54076 17.5 4.375C17.5 4.20924 17.4342 4.05027 17.3169 3.93306C17.1997 3.81585 17.0408 3.75 16.875 3.75ZM7.5 3.125C7.5 2.95924 7.56585 2.80027 7.68306 2.68306C7.80027 2.56585 7.95924 2.5 8.125 2.5H11.875C12.0408 2.5 12.1997 2.56585 12.3169 2.68306C12.4342 2.80027 12.5 2.95924 12.5 3.125V3.75H7.5V3.125ZM15 16.25H5V5H15V16.25ZM8.75 8.125V13.125C8.75 13.2908 8.68415 13.4497 8.56694 13.5669C8.44973 13.6842 8.29076 13.75 8.125 13.75C7.95924 13.75 7.80027 13.6842 7.68306 13.5669C7.56585 13.4497 7.5 13.2908 7.5 13.125V8.125C7.5 7.95924 7.56585 7.80027 7.68306 7.68306C7.80027 7.56585 7.95924 7.5 8.125 7.5C8.29076 7.5 8.44973 7.56585 8.56694 7.68306C8.68415 7.80027 8.75 7.95924 8.75 8.125ZM12.5 8.125V13.125C12.5 13.2908 12.4342 13.4497 12.3169 13.5669C12.1997 13.6842 12.0408 13.75 11.875 13.75C11.7092 13.75 11.5503 13.6842 11.4331 13.5669C11.3158 13.4497 11.25 13.2908 11.25 13.125V8.125C11.25 7.95924 11.3158 7.80027 11.4331 7.68306C11.5503 7.56585 11.7092 7.5 11.875 7.5C12.0408 7.5 12.1997 7.56585 12.3169 7.68306C12.4342 7.80027 12.5 7.95924 12.5 8.125Z" fill="#EA4949" />
          </svg>

          <span className="font-medium">Delete Group</span>
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        title="Do you want to Delete Group?"
        subtitle="It will delete all group data, members, and conversations. All group members will be removed and this action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};