import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPartnerForm from "./components/PartnerAdd";
import Pagination from "../Packages/components/Pagination";
import PartnerDeleteModal from "./components/PartnerDeleteModal";
import PartnersList from "./components/PartnerList";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import { toast } from "react-toastify";

const Partners = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI("GET", `${BASE_URL}partners`);
        if (response) {
          setPartners(response.data);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, [currentPage, activeTab]);

  const handleEdit = (id) => {
    navigate(`/home/partner/${id}`);
  };

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setDeletedId(id);
  };

  const confirmDelete = async () => {
    // Implement delete API call here
    try {
      const response = await fetchDataFromAPI(
        "DELETE",
        `${BASE_URL}delete-partner/${deletedId}`
      );
      if (response) {
        toast.success("Successfully Deleted");
        try {
          const response = await fetchDataFromAPI("GET", `${BASE_URL}partners`);
          if (response) {
            setPartners(response.data);
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

  return (
    <div className="p-4 bg-slate-300 w-full max-h-[89%] overflow-auto  min-h-[89%] h-[89%]">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "add"
              ? "bg-[#11aaf6] text-white"
              : "bg-white border border-[#11aaf6] text-[#11aaf6]"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "list"
              ? "bg-[#11aaf6] text-white"
              : "bg-white border border-[#11aaf6] text-[#11aaf6]"
          }`}
          onClick={() => setActiveTab("list")}
        >
          List
        </button>
      </div>

      {activeTab === "add" ? (
        <div className="min-h-[95%] w-full max-h-[95%] overflow-auto">
          <AddPartnerForm handleActive={setActiveTab} />
        </div>
      ) : (
        <div className="min-h-[95%] h-[95%] w-full max-h-[95%] ">
          <div className="min-h-[84%] w-full max-h-[84%] overflow-auto ">
            <PartnersList
              data={partners}
              edit={handleEdit}
              deleted={handleDelete}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {isModalOpen && (
        <PartnerDeleteModal
          id={deletedId}
          setIsModalOpen={setIsModalOpen}
          handleModal={confirmDelete}
        />
      )}
    </div>
  );
};

export default Partners;
