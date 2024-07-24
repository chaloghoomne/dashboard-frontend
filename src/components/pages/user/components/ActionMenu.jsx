// ActionMenu.js
import React, { useState, useEffect, useRef } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

const ActionMenu = ({ onView, onSuspend, id, onBlock, action, action2, ondeleted, action3 }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex" ref={menuRef}>
      <p  onClick={() => ondeleted(id)} className="mx-1 cursor-pointer">
        <RiDeleteBinLine size={20} color="red" />
      </p>
      <button onClick={() => setShowMenu(!showMenu)}>
        <IoEllipsisVertical />
      </button>
      {showMenu && (
        <div className="absolute h-auto right-10 z-50 top-0 w-32 bg-white border rounded shadow-lg">
         {action2 && <button
            onClick={() => {
              onView(id);
              setShowMenu(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            {action2}
          </button>}
         {action && <button
            onClick={() => {
              onSuspend(id);
              setShowMenu(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            {action}
          </button>}
         { action3 && <button
            onClick={() => {
              onBlock(id);
              setShowMenu(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            {action3}
          </button>}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
