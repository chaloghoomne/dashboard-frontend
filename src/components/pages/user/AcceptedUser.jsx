import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import ConfirmationModal from "./components/ConfirmationModal";
import { RiFileExcel2Fill } from "react-icons/ri";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import { toast } from "react-toastify";
import TransferModal from "./components/TransferModal";
import { exportToExcel } from "../../../utils/utils";

const AcceptedUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState("");
  const [chapters, setChapters] = useState([]);
  const [premium, setPremium] = useState(false);
  const [inChapter, setInChapter] = useState(false);
  const [withoutChapter, setWithoutChapter] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectValue, setSelectValue] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = buildApiUrl();
        const response = await fetchDataFromAPI("GET", apiUrl);
        setUsers(response.profiles);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage, cityFilter, premium, inChapter, withoutChapter]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_CITIES}`
        );
        setCities(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, []);

  const handleSuspend = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}${NetworkConfig.SUSPENDEDUSER}`,
        { id }
      );
      if (response.message === "User suspended successfully") {
        toast.success(response.message);
      }
      if (response.message === "User unsuspended successfully") {
        toast.success(response.message);
      }
      const refreshedData = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}${NetworkConfig.ACCEPTEDUSERS}?page=${currentPage}&city=${cityFilter}`
      );
      setUsers(refreshedData.profiles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (id) => {
    navigate(`/home/users/${id}`);
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}${NetworkConfig.DELETEUSER}`,
        { id }
      );
      if (response) {
        toast.success("User Deleted successfully");
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.ACCEPTEDUSERS}?page=${currentPage}&city=${cityFilter}`
        );
        setUsers(refreshedData.profiles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlock = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}${NetworkConfig.BLOCKUSER}`,
        { id }
      );
      if (response) {
        toast.success("User Blocked successfully");
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.ACCEPTEDUSERS}?page=${currentPage}&city=${cityFilter}`
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

  const handleCityFilterChange = (e) => {
    setCityFilter(e.target.value);
  };

  const handleCityFilterSubmit = () => {
    setCurrentPage(1); // Reset to the first page when applying a new filter
  };

  const handleSelectValue = (e) => {
    const { value } = e.target;
    setSelectValue(value);

    // Reset all filter states
    setPremium(false);
    setInChapter(false);
    setWithoutChapter(false);

    // Set only the relevant state based on selection
    switch (value) {
      case "Premium User":
        setPremium(true);
        break;
      case "Assigned Chapter":
        setPremium(true);
        setInChapter(true);
        break;
      case "None Assigned ChapterA":
        setWithoutChapter(true);
        break;
    }
  };
  const buildApiUrl = () => {
    let url = `${BASE_URL}${NetworkConfig.ACCEPTEDUSERS}?page=${currentPage}`;

    if (cityFilter) {
      url += `&city=${cityFilter}`;
    }
    if (premium) {
      url += `&premium=true`;
    }
    if (inChapter) {
      url += `&with_chapter=true`;
    }
    if (withoutChapter) {
      url += `&without_chapter=true`;
    }

    return url;
  };

  const SelectedValue = ["Premium User","None Assigned Chapter"];

  const openTransferModal = async () => {
    try {
      const response = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}${NetworkConfig.GET_CHAPTERS}`
      );
      setChapters(response.data);
      setIsTransferModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeTransferModal = () => {
    setIsTransferModalOpen(false);
  };

  const handleTransfer = async (selectedChapter) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}${NetworkConfig.TRANSFERUSER}`,
        { ids: selectedUsers, chapter: parseInt(selectedChapter) }
      );
      if (response) {
        toast.success("Users transferred successfully");
        setSelectedUsers([]);
        const refreshedData = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.ACCEPTEDUSERS}?page=${currentPage}&city=${cityFilter}`
        );
        setUsers(refreshedData.profiles);
      }
    } catch (error) {
      console.log(error);
    }
    closeTransferModal();
  };

  const handleUserSelection = (id) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((userId) => userId !== id)
        : [...prevSelectedUsers, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleExport = () => {
    const newData = users.map(({ password, device_token, ...rest }) => rest);
    exportToExcel(newData, 'AcceptedUsers.xlsx');
  };

  return (
    <div className="max-w-full min-h-[90%] max-h-[95%] overflow-y-auto flex bg-[#F7F8FA] flex-col py-2">
      <h1 className="text-2xl text-black pl-5 font-bold">User</h1>
      <div className="flex justify-between items-center px-10 pb-2">
        <p className="text-[#FC6011] text-md">Accepted User</p>
        {/* {selectedUsers.length > 0 && (
          <button
            className="ml-4 px-4 py-1  bg-[#fb923c]  text-white rounded"
            onClick={openTransferModal}
          >
            Transfer
          </button>
        )} */}
        <div className="flex ">
          <select
            className="ml-4 px-2 py-1 border rounded w-[12vw]"
            value={selectValue}
            onChange={handleSelectValue}
          >
            <option value="">Select</option>
            {SelectedValue.map((city) => (
              <option key={city.id} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            className="ml-4 px-2 py-1 border rounded"
            value={cityFilter}
            onChange={handleCityFilterChange}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
          <button
            className="ml-2 px-4 py-1 bg-[#fb923c] text-white rounded"
            onClick={handleCityFilterSubmit}
          >
            Search
          </button>
           <button
            className="ml-2 px-4 py-1 flex gap-2 items-center bg-[#fb923c] text-white rounded"
            onClick={handleExport}
          >
            Export <RiFileExcel2Fill size={20} color="white"/>
          </button>
        </div>
      </div>
      <div className="relative w-[95%] min-h-[78%] max-h-[95%] overflow-y-auto border border-gray-300 self-center rounded-3xl bg-white">
        <Table
          // users={users}
          action="Suspend"
          handleBlock={handleBlock}
          action2="View"
          action3="Block"
          onSuspend={handleSuspend}
          onView={handleView}
          onDelete={openDeleteModal}
          type="accepted"
          onUserSelection={handleUserSelection}
          onSelectAll={handleSelectAll}
          isAllSelected={selectedUsers?.length === users?.length}
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
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={closeTransferModal}
        chapters={chapters}
        onTransfer={handleTransfer}
      />
    </div>
  );
};

export default AcceptedUser;
