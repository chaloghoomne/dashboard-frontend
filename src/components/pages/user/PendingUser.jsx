import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from './components/Table';
import Pagination from './components/Pagination';
import ConfirmationModal from './components/ConfirmationModal';
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import { toast } from 'react-toastify';
import ChapterSelectionModal from './components/ChapterSelectionModal';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { exportToExcel } from '../../../utils/utils';


const PendingUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [userData,setUserData] = useState()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.PENDINGUSERS}?page=${currentPage}`
        );
        setUsers(response.profiles);
           setTotalPages(response.totalPages)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleApprove = async(id) => {

    setSelectedUserId(id);
    try {
        const response = await fetchDataFromAPI(
          "POST",
          `${BASE_URL}${NetworkConfig.USERBYID}`,
          { id }
        );
        if (response) {
          setUserData(response?.user);
         
        }
      } catch (error) {
        console.log(error);
      }
    setIsChapterModalOpen(true);
  };

  const confirmChapterSelection = async (userId, chapterId) => {
    if(userId && chapterId){
 try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}${NetworkConfig.USERSTATUS}`,
        {
          id: userId,
          status: "approved",
          chapterId: chapterId,
        }
      );
      if (response.message === "Profile Approved") {
        toast.success(response.message);
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.PENDINGUSERS}?page=${currentPage}`
        );
        setUsers(refreshedData.profiles);
      } else {
        toast.error("Profile is not Completed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsChapterModalOpen(false);
    }
    }else{
      try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}${NetworkConfig.USERSTATUS}`,
        {
          id: userId,
          status: "approved",
        }
      );
      if (response.message === "Profile Approved") {
        toast.success(response.message);
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.PENDINGUSERS}?page=${currentPage}`
        );
        setUsers(refreshedData.profiles);
      } else {
        toast.error("Profile is not Completed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsChapterModalOpen(false);
    }
    }
   
  };

  const handleReject = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}${NetworkConfig.USERSTATUS}`,
        {
          id: id,
          status: "rejected",
        }
      );
      if (response.message === "Profile Rejected") {
        toast.success(response.message);
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.PENDINGUSERS}?page=${currentPage}`
        );
        setUsers(refreshedData.profiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}${NetworkConfig.DELETEUSER}`,
        { id }
      );
      if (response) {
        toast.success('User Deleted successfully');
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.PENDINGUSERS}?page=${currentPage}`
        );
        setUsers(refreshedData.profiles);
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

  const handlePendingView = (id) => {
    navigate(`/home/users/${id}`);
  };

  const handleExport = () => {
    const newData = users.map(({ password, device_token, ...rest }) => rest);
    exportToExcel(newData, 'PendingUsers.xlsx');
  };

  return (
    <div className="max-w-full min-h-[90%] max-h-[95%] overflow-y-auto flex bg-[#F7F8FA] flex-col py-2">
      <h1 className="text-2xl text-black pl-5 font-bold">User</h1>
       <div className='flex justify-between items-center px-10 pb-2'>
      <p className="text-[#FC6011] pl-5 text-md pb-2">Pending User</p>
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
          action="Approve"
          action2="Reject"
          action3="View"
          handleBlock ={handlePendingView}
          onSuspend={handleApprove}
          onView={handleReject}
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
      <ChapterSelectionModal
        isOpen={isChapterModalOpen}
        userinfo = {userData}
        onClose={() => setIsChapterModalOpen(false)}
        onConfirm={confirmChapterSelection}
        userId={selectedUserId}
      />
    </div>
  );
};

export default PendingUser;
