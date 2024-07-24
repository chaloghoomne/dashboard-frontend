import React, { useState } from 'react';
import Modal from 'react-modal';

const TransferModal = ({ isOpen, onClose, chapters, onTransfer }) => {
  const [selectedChapter, setSelectedChapter] = useState('');

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  const handleTransfer = () => {
    onTransfer(selectedChapter);
  };

  return (
            
    <Modal isOpen={isOpen} onRequestClose={onClose}>
        <div className='w-96 h-auto gap-5 flex flex-col relative border py-10 border-gray-300 rounded-xl bg-slate-300 top-40 left-96 items-center justify-around px-5'>
      <h2>Transfer Users</h2>
     
      <select
        value={selectedChapter}
        onChange={handleChapterChange}
        className="mb-4 p-2 border rounded"
      >
        <option value="" disabled>Select Chapter</option>
        {chapters?.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            {chapter.name}
          </option>
        ))}
      </select>
      <div className='flex w-[70%] self-center justify-around'>
      <button
        onClick={handleTransfer}
        disabled={!selectedChapter}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
      <button onClick={onClose} className="ml-2 px-4 py-2 bg-red-500 text-white rounded">
        Cancel
      </button>
      </div>
       </div>
    </Modal>
  );
};

export default TransferModal;
