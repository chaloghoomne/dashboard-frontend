// src/components/UserList.js
import React, { useState } from "react";
import Modal from "react-modal";
import { FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import Pagination from "../../Packages/components/Pagination";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { CgUnblock } from "react-icons/cg";

Modal.setAppElement("#root");

const UserList = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  handleAction,
  type,
}) => {
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [bookingsModalIsOpen, setBookingsModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalIsOpen(true);
  };

  const openBookingsModal = async (id) => {
    setBookingsModalIsOpen(true);
    try {
      const response = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}order-details-by-category/${id}`
      );
      console.log(response);
      if (response) {
        setSelectedBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setImageModalIsOpen(false);
    setBookingsModalIsOpen(false);
  };

  return (
    <div className="relative p-5 bg-slate-300 w-full h-full">
      <div className="w-full max-h-[85%] overflow-auto min-h-[85%]">
        <table className="min-w-full divide-y overflow-auto divide-gray-200">
          <thead className="bg-[#11aaf6] text-center">
            <tr className="text-center">
              {[
                "S No",
                "Email",
                "From",
                "To",
                "Travelers Count",
                "Details",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {users?.map((user, index) => (
              <tr key={user?.id}>
                <td className="px-6 py-1 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {user?.user?.email}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {user?.from?.slice(0, 10)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {user?.to?.slice(0, 10)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {user?.travellersCount}
                </td>
                <td className="px-6 py-1 items-center pl-14 justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openBookingsModal(user?._id)}
                  />
                </td>
                <td className="px-6 py-1 items-center flex justify-center whitespace-nowrap">
                  {handleAction ? (
                    <>
                      <FaCheck
                        className="cursor-pointer text-green-500 mr-2"
                        onClick={() => handleAction(user?._id, "approved")}
                      />
                      <FaTimes
                        className="cursor-pointer text-red-500 mr-2"
                        onClick={() => handleAction(user?._id, "rejected")}
                      />

                      <MdBlock
                        className="cursor-pointer text-red-500"
                        size={20}
                        onClick={() => handleAction(user?._id, "blacklist")}
                      />
                    </>
                  ) : (
                    <>
                      {type === "blackList" ? (
                        <CgUnblock
                          className="cursor-pointer text-red-500"
                          onClick={() => handleAction(user.id, "approved")}
                        />
                      ) : (
                        <FaTrash
                          className="cursor-pointer text-red-500"
                          onClick={() => handleAction(user.id, "delete")}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={imageModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image  Modal"
        className="modal-image "
        overlayClassName="modal-overlay-image "
      >
        {/* <button onClick={closeModal} className="close-modal-btn">
          ❌
        </button> */}
        <img
          src={selectedImage}
          alt="User"
          className="w-full h-full object-cover"
        />
      </Modal>

      {/* Bookings Modal */}
      <Modal
        isOpen={bookingsModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Bookings Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {/* <button onClick={closeModal} className="close-modal-btn">
          ❌
        </button> */}
        <table className="min-w-full divide-y overflow-auto divide-gray-200">
          <thead className="bg-[#11aaf6] text-center">
            <tr className="text-center">
              {[
                "Name",
                "DOB",
                "Passport Valid Till",
                "Passport Issue Date",
                "Passport Number",
                "Gender",
                "Mother's Name",
                "Father's Name",
                "Additional",
                "Passport Back",
                "Passport Front",
                "Selfie",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {selectedBookings?.map((booking, index) => (
              <tr key={index}>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.firstName}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">{booking?.dob}</td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.passportValidTill?.slice(0, 10)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.passportIssueDate?.slice(0, 10)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.passportNumber}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.gender}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.motherName}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.fatherName}
                </td>
                <td className="px-6 py-1 items-center  justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openImageModal(booking?.additional)}
                  />
                </td>
                <td className="px-6 py-1 items-center  justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openImageModal(booking?.passportBack)}
                  />
                </td>
                <td className="px-6 py-1 items-center  justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openImageModal(booking?.passportFront)}
                  />
                </td>
                <td className="px-6 py-1 items-center flex justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openImageModal(booking?.selfie)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserList;
