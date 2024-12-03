import React from "react";
import { FaTimes } from "react-icons/fa";

const ShowImageDescModal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-2xl relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <FaTimes className="cursor-pointer" onClick={onClose} />
        </div>
        <div className="overflow-auto max-h-[70vh]">{children}</div>
      </div>
    </div>
  );
};

export default ShowImageDescModal;
