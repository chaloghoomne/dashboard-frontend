// Modal.js
import React from 'react';
import ModalTable from './ModalTable';

const UserModal = ({ isOpen, onClose, title, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg  w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button className="text-xl font-bold" onClick={onClose}>&times;</button>
        </div>
        <ModalTable companies={data} />
      </div>
    </div>
  );
};

export default UserModal;
