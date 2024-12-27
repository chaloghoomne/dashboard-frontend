import React, { useState } from "react";
import Modal from "react-modal";
import { FaEye, FaTrash, FaCheck, FaTimes, FaDownload } from "react-icons/fa";
import { MdAttachEmail, MdBlock } from "react-icons/md";
import Pagination from "../../Packages/components/Pagination";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { CgUnblock } from "react-icons/cg";
import { FaForward, FaBackward } from "react-icons/fa";
import { saveAs } from "file-saver";
import { MdDelete } from "react-icons/md";
import { space } from "postcss/lib/list";

Modal.setAppElement("#root");

const UserList = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
  handleAction,
  type,
  handleBlockAction,
}) => {
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [bookingsModalIsOpen, setBookingsModalIsOpen] = useState(false);
  const [actionModalIsOpen, setActionModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [visaId, setVisaId] = useState(null);
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
      if (response) {
        setSelectedBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openActionModal = (type, id) => {
    setVisaId(id);
    setModalType(type);
    setActionModalIsOpen(true);
  };

  const closeModal = () => {
    setBookingsModalIsOpen(false);
    setImageModalIsOpen(false);
    setActionModalIsOpen(false);
    setDescription("");
    setPdfFile(null);
  };

  const closeImageModal = () => {
    setImageModalIsOpen(false);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePdfUpload = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const downloadImageWithFileSaver = (url, filename) => {
    saveAs(url, filename);
  };

  const handleSubmit = () => {
    const data = modalType === "approved" ? pdfFile : description;
    handleAction(visaId, modalType, data);
    closeModal();
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
                "Status",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider"
                >
                  {heading === "Actions" && type === "blackList"
                    ? "Unblock"
                    : heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {users?.map((user, index) => (
              <tr key={user?.id}>
                <td className="px-6 py-1 whitespace-nowrap">{user?.s_no}</td>
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
                <td className="px-6 py-1 whitespace-nowrap">
                  {(user?.status === "rejected" ||
                    user?.status === "sent-back") && (
                    <span className="text-red-500">{user?.status}</span>
                  )}
                  {user?.status === "approved" && (
                    <span className="text-green-500">{user?.status}</span>
                  )}
                  {user?.status === "sent-to-immigration" && (
                    <span className="text-orange-500">{user?.status}</span>
                  )}
                  {user?.status === "blacklist" && (
                    <span className="text-black">{user?.status}</span>
                  )}
                  {user?.status === "pending" && (
                    <span className="text-yellow-500">{user?.status}</span>
                  )}
                </td>
                <td className="px-6 py-1 items-center flex justify-center whitespace-nowrap">
                  {type === "pending" && (
                    <>
                      <FaBackward
                        className="cursor-pointer text-red-500 mr-4"
                        onClick={() => openActionModal("sent-back", user?._id)}
                        title="Send Back"
                      />
                      <FaForward
                        className="cursor-pointer text-green-500 mr-2"
                        onClick={() =>
                          handleAction(user?._id, "sent-to-immigration")
                        }
                        title="Send to Immigration"
                      />
                    </>
                  )}
                  {type === "sent" && (
                    <>
                      <FaCheck
                        className="cursor-pointer text-green-500 mr-2"
                        onClick={() => openActionModal("approved", user?._id)}
                        title="Approved"
                      />
                      <FaTimes
                        className="cursor-pointer text-red-500 mr-2"
                        onClick={() => openActionModal("rejected", user?._id)}
                        title="Rejected"
                      />
                      <MdBlock
                        className="cursor-pointer text-red-500"
                        size={20}
                        title="BlackList"
                        onClick={() => openActionModal("blacklist", user?._id)}
                      />
                    </>
                  )}
                  {type === "blackList" && (
                    <CgUnblock
                      className="cursor-pointer text-red-500"
                      onClick={() =>
                        handleBlockAction(user?.user?._id, "sent-to-immigration")
                      }
                      title="Sent to Immigration again"
                    />
                  )}
                  {type === "draft" && (
                    <a
                      href={`mailto:${user?.user?.email}?subject=Your%20Visa%20Booking%20Status`}
                      title="Send Email"
                    >
                      <MdAttachEmail size={22} color="blue" />
                    </a>
                  )}
                  {type === "approve" && (
                    <MdDelete
                      className="cursor-pointer text-red-500"
                      onClick={() => handleBlockAction(user?.user?._id, "approved")}
                    />
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
        onRequestClose={closeImageModal}
        contentLabel="Image  Modal"
        className="modal-image "
        overlayClassName="modal-overlay-image "
      >
        <button onClick={closeImageModal} className="close-modal-btn">
          ❌
        </button>
        <img
          src={selectedImage}
          alt="User"
          className="w-96 h-96 object-contain"
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
                "Age Group",
                "Mother's Name",
                "Father's Name",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
              {selectedBookings?.length >= 1 && (
                <>
                  {selectedBookings[0]?.documents?.map((item) => {
                    return (
                      <th
                        key={item?.name}
                        className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {item?.name}
                      </th>
                    );
                  })}
                </>
              )}
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
                  {booking?.ageGroup}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.motherName}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {booking?.fatherName}
                </td>
                {booking?.documents?.map((item) => {
                  return (
                    <td
                      className="px-6 py-1 whitespace-nowrap"
                      key={item?.name}
                    >
                      <div className="flex items-center justify-center">
                        <FaEye
                          className="cursor-pointer"
                          onClick={() => openImageModal(item?.image)}
                        />
                        <FaDownload
                          onClick={() =>
                            downloadImageWithFileSaver(item?.image, item?.name)
                          }
                          className="cursor-pointer ml-2"
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      {/* Action Modal */}
      <Modal
        isOpen={actionModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Action Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2 className="text-xl font-bold mb-4">
          {modalType === "approved"
            ? "Upload PDF to approved"
            : "Enter Description "}
        </h2>
        {modalType === "approved" ? (
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
            className="mb-4"
          />
        ) : (
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter description"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={() => handleSubmit()}
            disabled={modalType === "approved" ? !pdfFile : !description}
            className={`mr-2 px-4 py-2 bg-blue-500 text-white rounded ${
              (modalType === "approved" && !pdfFile) ||
              (modalType !== "approved" && !description)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {modalType === "approved" ? "Upload" : "Submit"}
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
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
