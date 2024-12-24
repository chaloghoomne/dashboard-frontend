import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from './components/Table';
import Pagination from './components/Pagination';
import ConfirmationModal from './components/ConfirmationModal';
import { fetchDataFromAPI } from '../../../Api/fetchData';
import { BASE_URL, NetworkConfig } from '../../../Api/urls';
import { exportToExcel } from "../../../utils/utils";
import { toast } from 'react-toastify';
import { RiFileExcel2Fill } from 'react-icons/ri';

const BlockedUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users data from API
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          'GET',
          `${BASE_URL}${NetworkConfig.BLOCKEDUSERS}?page=${currentPage}`
        );
        // toast.success(response.message);
        setUsers(response.data);
           setTotalPages(response.totalPages)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage]);

  

  const handleDelete = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        'POST',
        `${BASE_URL}${NetworkConfig.DELETEUSER}`,
        { id }
      );
      if (response) {
        toast.success('User deleted successfully');
        const refreshedData = await fetchDataFromAPI(
          'GET',
          `${BASE_URL}${NetworkConfig.BLOCKEDUSERS}?page=${currentPage}`
        );
        setUsers(refreshedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openDeleteModal = (id) => {
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  const confirmDelete = () => {
    handleDelete(selectedUserId);
    closeDeleteModal();
  };

  const handleBlock = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        'POST',
        `${BASE_URL}${NetworkConfig.BLOCKUSER}`,
        { id }
      );
      if (response) {
        toast.success('User UnBlocked successfully');
        const refreshedData = await fetchDataFromAPI(
          'GET',
          `${BASE_URL}${NetworkConfig.BLOCKEDUSERS}?page=${currentPage}`
        );
        setUsers(refreshedData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleExport = () => {
    const newData = users.map(({ password, device_token, ...rest }) => rest);
    exportToExcel(newData, 'BlockedUsers.xlsx');
  };

  return (
    <div className="max-w-full min-h-[90%] max-h-[95%] overflow-y-auto flex bg-[#F7F8FA] flex-col py-2">
      <h1 className="text-2xl text-black pl-5 font-bold">User</h1>
      <div className='flex justify-between items-center px-10 pb-2'>
      <p className="text-[#FC6011] pl-5 text-md pb-2">Blocked User</p>
        <button
            className="ml-2 px-4 py-1 flex gap-2 items-center bg-[#fb923c] text-white rounded"
            onClick={handleExport}
          >
            Export <RiFileExcel2Fill size={20} color="white"/>
          </button>
        </div>
      <div className="relative w-[95%] min-h-[78%] max-h-[95%] overflow-y-auto border border-gray-300 self-center rounded-3xl bg-white">
        <Table
          users={users}
          handleBlock={handleBlock}
          action3="Unblock"
          onDelete={openDeleteModal}
        />
       
      </div>
       <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default BlockedUser;
