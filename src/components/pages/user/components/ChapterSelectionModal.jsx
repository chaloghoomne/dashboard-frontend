import React, { useState, useEffect } from 'react';
import { fetchDataFromAPI } from '../../../../Api/fetchData';
import { BASE_URL, NetworkConfig } from '../../../../Api/urls';


const ChapterSelectionModal = ({ isOpen, onClose, onConfirm,userId, userinfo }) => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  

  useEffect(() => {
    if (isOpen) {
      const fetchChapters = async () => {
        try {
          const response = await fetchDataFromAPI("GET", `${BASE_URL}${NetworkConfig.GET_CHAPTERS}`);
          setChapters(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchChapters();
    }
  }, [isOpen]);

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
  };

  const handleConfirm = () => {
    if (selectedChapter) {
      onConfirm(userId, selectedChapter);
    }
  };

  const handleAddChapter = () => {
   onConfirm(userId);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-1/3">
     
      <p className=''> State: <span>{userinfo?.state}</span></p>
      <p className=''>City:<span>{userinfo?.city}</span></p>
        <h2 className="text-lg font-bold mb-4">Select Chapter</h2>
        <select
          value={selectedChapter}
          onChange={handleChapterChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="" disabled>Select a chapter</option>
          {chapters?.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>{chapter.name}</option>
          ))}
        </select>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleConfirm}
            disabled={!selectedChapter}
            className={`px-4 py-2 bg-blue-500 text-white rounded ${!selectedChapter ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            Push User into Chapter
          </button>
          <button
            onClick={handleAddChapter}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
           Deny
          </button>
        </div>
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChapterSelectionModal;
