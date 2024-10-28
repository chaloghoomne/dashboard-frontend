import React from 'react';

const ViewModal = ({ blog, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">{blog.type}</h2>
        {blog.type === 'image' ? (
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-auto" />
        ) : (
          <p>{blog.description}</p>
        )}
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white">Close</button>
      </div>
    </div>
  );
};

export default ViewModal;
