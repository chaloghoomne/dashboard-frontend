import React from 'react';

const DeleteModal = ({ blog, onDelete, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Delete Blog</h2>
        <p>Are you sure you want to delete "{blog.title}"?</p>
        <div className="mt-4">
          <button onClick={() => onDelete(blog?._id)} className="mr-2 px-4 py-2 bg-red-500 text-white">Delete</button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
