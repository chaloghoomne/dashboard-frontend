import React from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
const Actions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={onEdit} className="">
      <FaEdit size={20} color='black' />
      </button>
      <button onClick={onDelete} className="">
        <MdOutlineDeleteOutline size={22} color='red' />
      </button>
    </div>
  );
};

export default Actions;
