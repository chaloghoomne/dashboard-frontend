import React from "react";

const ImportantPointsDeleteModal = ({ handleModal, setIsModalOpen }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete ? </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleModal}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportantPointsDeleteModal;
