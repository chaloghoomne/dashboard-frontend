import React, { useEffect, useState } from "react";
import AddForm from "./AddForm";
import PackageList from "./PackageList";
import Pagination from "./Pagination";
import DeleteModal from "./DeleteModal";
import { BASE_URL } from "../../../../Api/urls";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddPackagePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("add");
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const fetchProfileImage = async () => {
    try {
      const response = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}places?page=${currentPage}`
      );
      if (response) {
        setPackages(response.data);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [currentPage, activeTab]);

  const handleEdit = (id) => {
    // Implement edit functionality
    navigate(`/home/visa/country/${id}`);
  };

  const handleDelete = (id) => {
    setIsModelOpen(true);
    setDeletedId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetchDataFromAPI(
        "DELETE",
        `${BASE_URL}delete-place/${deletedId}`
      );
      if (response) {
        toast.success("Successfully Deleted");
        try {
          const response = await fetchDataFromAPI(
            "GET",
            `${BASE_URL}places?page=${currentPage}`
          );
          if (response) {
            setPackages(response.data);
            setTotalPages(response.totalPages);
          }
        } catch (error) {
          console.log(error);
        }
        setIsModelOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 w-full h-[95%] ">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "add"
              ? "bg-[#11aaf6] text-white"
              : "bg-white border border-[#11aaf6] text-[#11aaf6]"
          } `}
          onClick={() => setActiveTab("add")}
        >
          Add
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "list"
              ? "bg-[#11aaf6] text-white"
              : "bg-white border border-[#11aaf6] text-[#11aaf6]"
          } `}
          onClick={() => setActiveTab("list")}
        >
          List
        </button>
      </div>

      {activeTab === "add" ? (
        <div className="min-h-[95%] w-full max-h-[95%] overflow-auto">
          <h1
            style={{ textShadow: "2px 2px 4px rgba(66, 185, 245, 0.5)" }}
            className="text-2xl text-blue-500 font-semibold"
          >
            Add Visa
          </h1>
          <AddForm handleActive={setActiveTab} />
        </div>
      ) : (
        <div className="min-h-[95%] h-[95%] w-full max-h-[95%]">
          <div className="min-h-[87%] w-full max-h-[87%] overflow-auto ">
            <PackageList
              data={packages}
              edit={handleEdit}
              deleted={handleDelete}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            fetchPackages={fetchProfileImage}
          />
        </div>
      )}
      {isModalOpen && (
        <DeleteModal
          id={deletedId}
          setIsModelOpen={setIsModelOpen}
          handleModal={confirmDelete}
        />
      )}
    </div>
  );
};

export default AddPackagePage;
