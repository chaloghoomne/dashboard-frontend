import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import ModalNotify from "./ModalNotify";

import { IoIosEye } from "react-icons/io";
import Pagination from "../Packages/components/Pagination";

const Notifications = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12);
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}users-notifications?page=${currentPage}`
        );
        setNotifications(response?.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage]);

  const redirectNotification = () => {
    navigate("/home/notification/add");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleContentClick = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setShowModal(true);
  };

  const truncateText = (text, length = 20) => {
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="w-full px-5  flex min-h-[89%] max-h-[89%] flex-col pt-5 bg-[#F7F8FA] h-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl text-black pb-3 font-bold">Notification</h1>
        <button
          onClick={redirectNotification}
          className="p-2 w-40 mr-5 mb-3 rounded-xl bg-blue-500 text-white"
        >
          Send Notification
        </button>
      </div>
      <div className="flex max-h-[95%] self-center overflow-y-auto flex-col w-full bg-white px-4 py-4 gap-3">
        <div className="w-full flex justify-between items-center rounded-xl p-2 px-4 bg-white  min-h-[50px]">
          <div className="w-12 text-lg font-medium text-center">Icon</div>
          <p className="flex-1 text-lg font-medium text-center px-2 relative">
            Title
          </p>
          <p className="flex-1 text-lg font-medium text-center px-2 relative ">
            Content
          </p>
          <p className="flex-1 text-lg font-medium text-center px-2">Status</p>
          <p className="flex-1  text-lg font-medium text-center px-2">
            createdAt
          </p>
          <button className="px-3 text-lg font-medium py-1 ">
            User Details
          </button>
        </div>

        <div className="max-h-full overflow-y-auto flex flex-col  ">
          {notifications?.map((item) => (
            <div
              key={item._id}
              className="w-full flex justify-between items-center rounded-xl p-1 px-4 bg-white border-b border-gray-300  min-h-[50px]"
            >
              <div className="w-12  py-1 text-center">
                <img
                  className="w-10 h-10  rounded-lg"
                  src={item?.image}
                  alt=""
                />
              </div>
              <p
                onClick={() => handleContentClick(item?.title, "Title")}
                className="flex-1 cursor-pointer text-center px-2 relative"
              >
                {/* {truncateText(item.title)} */}
                <span className="text-sm ">{item?.title?.slice(0, 15)}..</span>
              </p>
              <p
                onClick={() => handleContentClick(item?.body, "Content")}
                className="flex-1 cursor-pointer text-center px-2 relative "
              >
                {/* {truncateText(item.body)} */}
                <span className="text-sm ">{item?.body?.slice(0, 20)}..</span>
              </p>
              <p className="flex-1 text-sm  text-center px-2">
                {item.is_read ? "Read" : "Unread"}
              </p>
              <p className="flex-1 text-sm  text-center px-2">
                {item?.createdAt?.slice(0, 10)}
              </p>

              <button
                onClick={() => handleContentClick(item?.users, "User Details")}
                className="px-3 py-1 min-w-32 flex justify-center items-center rounded-3xl "
              >
                <IoIosEye
                  size={25}
                  // style={{ display: "inline" }}
                  color="orange"
                />
                {/* View Details */}
              </button>
            </div>
          ))}
        </div>
      </div>
      <ModalNotify
        show={showModal}
        onClose={() => setShowModal(false)}
        content={modalContent}
        title={modalTitle}
      ></ModalNotify>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Notifications;
