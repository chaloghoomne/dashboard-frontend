import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaEye, FaTrash } from "react-icons/fa";
import Pagination from "../Packages/components/Pagination";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import ImportantPointsDeleteModal from "../important-points/components/ImportantDeleteModal";
import { toast } from "react-toastify";

Modal.setAppElement("#root"); // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)

const Users = ({ data }) => {
  const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
  const [bookingsModalIsOpen, setBookingsModalIsOpen] = useState(false);
  const [transactionsModalIsOpen, setTransactionsModalIsOpen] = useState(false);
  const [fieldModalIsOpen, setFieldModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}users?page=${currentPage}`
        );
        if (response) {
          setUsers(response.data);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, [currentPage]);

  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalIsOpen(true);
  };

  const openBookingsModal = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}user-visa-orders`,
        { id: id }
      );
      if (response) {
        setSelectedBookings(response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setBookingsModalIsOpen(true);
  };

  const openTransactionsModal = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "GEt",
        `${BASE_URL}admin-users-transactions/${id}`,
       
      );
      if (response) {
        
        setSelectedTransactions(response.data);
      }
    } catch (error) {
      console.log(error);
    }

    setTransactionsModalIsOpen(true);
  };


  const openFieldModal = (field) => {
    setSelectedField(field);
    setFieldModalIsOpen(true);
  };

  const closeModal = () => {
    setImageModalIsOpen(false);
    setBookingsModalIsOpen(false);
    setTransactionsModalIsOpen(false)
    setFieldModalIsOpen(false);
  };

  const truncateText = (text, length = 20) => {
    if (!text) {
      return (
        <span
          className="text-red-500 cursor-pointer"
          onClick={() => openFieldModal("Not Updated")}
        >
          Not Updated
        </span>
      );
    }
    if (text.length <= length) return text;
    return (
      <span className="cursor-pointer" onClick={() => openFieldModal(text)}>
        {text.substring(0, length)}...
      </span>
    );
  };

  const confirmDelete = async () => {
    try {
      const response = await fetchDataFromAPI(
        "DELETE",
        `${BASE_URL}delete-user/${deletedId}`
      );
      if (response) {
        toast.success("Deleted SuccessFully");
        try {
          const response = await fetchDataFromAPI(
            "GET",
            `${BASE_URL}users?page=${currentPage}`
          );
          if (response) {
            setUsers(response.data);
            setTotalPages(response.totalPages);
          }
        } catch (error) {
          console.log(error);
        }
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setDeletedId(id);
  };

  return (
    <div className="relative p-5 bg-slate-300 w-full h-full">
      <div className="w-full max-h-[85%] overflow-auto min-h-[85%] ">
        <table className="min-w-full divide-y overflow-auto divide-gray-200">
          <thead className="bg-[#11aaf6] text-center">
            <tr className="text-center">
              {[
                "S No",
                "Name",
                "Bookings",
                "Transactions",
                "Gender",
                "Phone",
                "Email",
                "Passport Number",
                "Passport Expiry",
                "Occupation",
                "Address",
                "Image",

               
                "Delete",
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
              <tr key={user.id}>
                <td className="px-6 py-1 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {user?.firstName ? (
                    <>
                      {" "}
                      {truncateText(
                        `${user?.firstName || ""} ${user?.lastName || ""}`
                      )}
                    </>
                  ) : (
                    <span className="text-red-500 cursor-pointer">
                      Not Updated
                    </span>
                  )}
                </td>
                
                <td className="px-6 py-1 items-center pl-12 justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openBookingsModal(user?._id)}
                  />
                </td>
                <td className="px-6 py-1 items-center pl-12 justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openTransactionsModal(user?._id)}
                  />
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {truncateText(user?.gender)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {truncateText(user?.phoneNumber)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {truncateText(user?.email)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {truncateText(user?.passportNumber)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {truncateText(user?.passportExpiry?.slice(0, 10))}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {truncateText(user?.occupation)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {user?.addressLineOne ? (
                    <>
                      {truncateText(
                        `${user?.addressLineOne || ""} ${
                          user?.addressLineTwo || ""
                        }`
                      )}
                    </>
                  ) : (
                    <span className="text-red-500 cursor-pointer">
                      Not Updated
                    </span>
                  )}
                </td>
                <td className="px-6 py-1 pl-14 items-center   justify-center whitespace-nowrap">
                  <FaEye
                    className="cursor-pointer"
                    onClick={() => openImageModal(user?.image)}
                  />
                </td>

                <td className="px-6 py-1 items-center  flex justify-center whitespace-nowrap">
                  <FaTrash
                    onClick={() => handleDelete(user?._id)}
                    className="cursor-pointer text-red-500"
                  />
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
        height={300}
        width={300}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="">
          ❌
        </button>
        <img
          src={selectedImage}
          alt="User"
          className=" w-full h-96 object-contain"
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
        <div>
          {/* <button onClick={closeModal} className="close-modal-btn">
            ❌
          </button> */}
        </div>
        <div className="max-h-96 overflow-auto">
          <table className="min-w-full divide-y  overflow-auto divide-gray-200">
            <thead className="bg-[#11aaf6] text-center">
              <tr className="text-center">
                {[
                  "Booking ID",
                  "Booking Date",
                  "Status",
                  "Insurance",
                  "Travellers Count",
                  "Country",
                  "Application Type",
                  "Total Amount",
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
                    {booking?._id}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.createdAt?.slice(0, 10)}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.status}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.insurance ? (
                      <span className="text-green-500"> Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.travellersCount}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.country}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.applicationType}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {Math.floor(booking?.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal
        isOpen={transactionsModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Transactions Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div>
          {/* <button onClick={closeModal} className="close-modal-btn">
            ❌
          </button> */}
        </div>
        <div className="max-h-96 overflow-auto">
          <table className="min-w-full divide-y  overflow-auto divide-gray-200">
            <thead className="bg-[#11aaf6] text-center">
              <tr className="text-center">
                {[
                  "Transaction ID",
                  "Transaction Date",
                  "Amount",
                  "Status",
                  "Receipt Id",
                    "Order Id"
                 
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
              {selectedTransactions?.map((booking, index) => (
                <tr key={index}>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?._id}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.createdAt?.slice(0, 10)}
                  </td>
                  
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.amount}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.status}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.orderId}
                  </td>
                  <td className="px-6 py-1 whitespace-nowrap">
                    {booking?.receiptId}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Field Modal */}
      <Modal
        isOpen={fieldModalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Field Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeModal} className="close-modal-btn">
          ❌
        </button>
        <div className="p-5">
          <p>{selectedField}</p>
        </div>
      </Modal>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <ImportantPointsDeleteModal
          id={deletedId}
          setIsModalOpen={setIsModalOpen}
          handleModal={confirmDelete}
        />
      )}
    </div>
  );
};

export default Users;
