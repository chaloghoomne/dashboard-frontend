import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-end mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-[#11aaf6] text-white rounded-md disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1 bg-white text-[#11aaf6] rounded-md">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-[#11aaf6] text-white rounded-md disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
