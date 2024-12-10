import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImportantPointsDeleteModal from "./components/ImportantDeleteModal";
import AddImportantPoints from "./components/ImportantPointsAdd";
import ImportantPointsList from "./components/ImportantPointsList";
import Pagination from "../Packages/components/Pagination";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import { toast } from "react-toastify";

const ImportantPoints = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [importantPoints, setImportantPoints] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI("GET", `${BASE_URL}notes`);
        if (response) {
          setImportantPoints(response.data);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleEdit = (id) => {
    navigate(`/home/important-point/${id}`);
  };

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setDeletedId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetchDataFromAPI(
        "DELETE",
        `${BASE_URL}notes/${deletedId}`
      );
      if (response) {
        toast.success(`Deleted SuccessFully`);
        try {
          const response = await fetchDataFromAPI("GET", `${BASE_URL}notes`);
          if (response) {
            setImportantPoints(response.data);
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
    <div className="w-full p-4 min-h-[89%] overflow-auto h-[89%] bg-slate-300 max-h-[89%] ">
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
          <AddImportantPoints handleActive={setActiveTab} />
        </div>
      ) : (
        <div className="min-h-[95%] h-[95%] w-full max-h-[95%]">
          <div className="min-h-[87%] w-full max-h-[87%] overflow-auto">
            <ImportantPointsList
              data={importantPoints}
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
        <ImportantPointsDeleteModal
          id={deletedId}
          setIsModalOpen={setIsModalOpen}
          handleModal={confirmDelete}
        />
      )}
    </div>
  );
};

export default ImportantPoints;
