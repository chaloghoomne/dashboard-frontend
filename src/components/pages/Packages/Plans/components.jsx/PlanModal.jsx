import React from "react";

const PlanModal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="text-red-500 text-2xl font-bold absolute top-2 right-2"
        >
          ❌
        </button>
        {children}
      </div>
    </div>
  );
};

export default PlanModal;
