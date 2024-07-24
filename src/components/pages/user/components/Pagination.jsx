import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-between items-center px-10  my-2">
      <div className="text-sm text-[#9A9EA5]">
        {/* Total Pages: <span className="text-black">{totalPages}</span> */}
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2 px-3 bg-orange-500 rounded-sm text-white py-1">
          Page <span className="text-white">{currentPage}</span> of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
