// src/components/Modal.js
import React from "react";
import { RxCross1 } from "react-icons/rx";

const ShowModalCountry = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white  max-w-screen-sm mx-4 md:mx-8 p-4 rounded-lg shadow-lg overflow-y-auto"
        style={{ maxHeight: "500px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-white text-2xl font-bold  "
        >
          <RxCross1 size={25} color="white" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default ShowModalCountry;
