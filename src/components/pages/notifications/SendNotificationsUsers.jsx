import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { toast } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

const NotificationSend = () => {
  const [active, setActive] = useState("allusers");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI("GET", `${BASE_URL}users`);
        setAllUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchChapters = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_CHAPTERS}`
        );
        setChapters(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSectors = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_SECTORS}`
        );
        setSectors(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchChapters();
    fetchSectors();
  }, [selectedSector, selectedChapter]);

  const handleActive = (value) => {
    setActive(value);
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUserIds((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", content);
    formData.append("image", image);

    const userIds =
      active === "allusers"
        ? allUsers.map((user) => user._id)
        : selectedUserIds;

    userIds.forEach((id) => formData.append("userIds[]", id));

    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}admin-send-notification`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        toast.success("Notifications sent successfully");
        setTitle("");
        setContent("");
        setImage(null);
        setSelectedUserIds([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredUsers = allUsers.filter((user) =>
    `${user.phoneNumber}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-full flex min-h-[90%] max-h-[90%] bg-[#F7F8FA] flex-col py-2">
      <h1 className="text-2xl text-black pl-5 py-3 font-bold">NOTIFICATION</h1>
      <div className="w-[95%] max-h-[400px] overflow-y-auto border border-gray-300 self-center rounded-3xl bg-white">
        <div className="w-full flex gap-10 pl-5 pt-3 pb-5">
          <p
            onClick={() => handleActive("allusers")}
            className={`${
              active === "allusers" ? "border-b-2 border-blue-500" : ""
            } text-[#5B5B5B] cursor-pointer`}
          >
            Notification To All Users
          </p>
          <p
            onClick={() => handleActive("selectedusers")}
            className={`${
              active === "selectedusers" ? "border-b-2 border-blue-500" : ""
            } text-[#5B5B5B] cursor-pointer`}
          >
            Notification To Selected Users
          </p>
        </div>
        {active === "allusers" && (
          <div className="w-[70%] flex pl-5 py-4 flex-col">
            <form action="" onSubmit={handleSubmit}>
              <p className="text-xl font-medium text-[#5B5B5B]">Enter Title</p>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded-xl border-[#DFEAF2] w-96"
              />
              <p className="text-xl pb-1 pt-2 font-medium text-[#5B5B5B]">
                Enter Content
              </p>
              <input
                required
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border rounded-xl border-[#DFEAF2] w-96"
              />
              <p className="text-xl pb-1 pt-2 font-medium text-[#5B5B5B]">
                Image
              </p>
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-2 border rounded-xl border-[#DFEAF2] w-96"
              />
              <br />
              <button
                type="submit"
                className="p-2 my-3 w-28 rounded-xl self-center bg-blue-500 text-white"
              >
                Save
              </button>
            </form>
          </div>
        )}
        {active === "selectedusers" && (
          <div className="flex w-[70%] gap-8 pl-5 py-4">
            <div className="w-[70%] flex flex-col">
              <form action="" onSubmit={handleSubmit}>
                <p className="text-xl font-medium text-[#5B5B5B]">
                  Enter Title
                </p>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="p-2 border rounded-xl border-[#DFEAF2] w-96"
                />
                <p className="text-xl pb-1 pt-2 font-medium text-[#5B5B5B]">
                  Enter Content
                </p>
                <input
                  type="text"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="p-2 border rounded-xl border-[#DFEAF2] w-96"
                />
                <p className="text-xl pb-1 pt-2 font-medium text-[#5B5B5B]">
                  Image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setImage(e.target.files[0])}
                  className="p-2 border rounded-xl border-[#DFEAF2] w-96"
                />
                <button
                  type="submit"
                  className="p-2 my-3 w-28 rounded-xl self-center bg-blue-500 text-white"
                >
                  Save
                </button>
              </form>
            </div>
            <div className="w-[30%] flex flex-col px-2 relative">
              <div
                className="cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <p className="bg-gray-200 p-2 flex justify-between items-center rounded-md">
                  Select Users{" "}
                  <span>
                    <MdOutlineArrowDropDown size={20} />
                  </span>{" "}
                </p>
              </div>
              {dropdownOpen && (
                <div className="absolute top-12 min-h-64 left-0 right-0 bg-white z-10 max-h-64 overflow-y-auto">
                  <div className="flex flex-col p-2">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 border-b focus:outline-none border-gray-400 mb-2"
                    />
                  </div>
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex py-1 px-2 w-full items-center"
                    >
                      <input
                        type="checkbox"
                        className="bg-blue-500 text-white"
                        checked={selectedUserIds.includes(user?._id)}
                        onChange={() => handleCheckboxChange(user?._id)}
                      />
                      <label className="ml-2 text-black">
                        {user?.phoneNumber}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSend;
