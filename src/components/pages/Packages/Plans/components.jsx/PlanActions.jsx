import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const PlanActions = ({ onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button onClick={onEdit} className="text-blue-500 hover:text-blue-700">
        <FaEdit size={20} color="black" />
      </button>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        <MdDelete size={20} color="red" />
      </button>
    </div>
  );
};

export default PlanActions;
