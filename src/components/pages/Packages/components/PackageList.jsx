import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Actions from "./Actions"; // Import modified Actions component
import PlanModal from "../Plans/components.jsx/PlanModal"; // Modal component
import { useNavigate } from "react-router-dom";
import axios from "axios"; // To make API calls
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
import { fetchDataFromAPI } from "../../../../Api/fetchData";

const PackageList = ({ data, deleted, edit, fetchPackages }) => {
  const [packages, setPackages] = useState(data);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [description, setDescription] = useState("");
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const navigate = useNavigate();
  const handleImageClick = (imageUrl) => {
    setModalContent({ type: "image", content: imageUrl });
    setImageModalOpen(true);
  };

  const handleFAQClick = (faq) => {
    setSelectedFAQ(faq);
  };

  const handleDescriptionClick = (fullDescription) => {
    setDescription(fullDescription);
    setDescriptionModalOpen(true);
  };

  const handleDocumentsClick = (documents) => {
    setSelectedDocuments(documents);
  };

  const handleAll = (id, tourTypes) => {
    navigate(`/home/visa/showfull/${id}`, { state: { tourTypes } });
  };

  useEffect(() => {
    setPackages(data);
  }, [data]);

  const handleRankChange = async (id, rank) => {
    try {
      const result = await axios.put(`${BASE_URL}rank-package/${id}`, { rank });
      if (result) {
        toast.success("Rank Updated Successfully");
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}places?page=1`
        );
        if (response) {
          setPackages(response.data);
        }
      }
    } catch (error) {
      console.error("Error updating rank", error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full max-h-[90%] overflow-auto min-h-[90%]">
        <table className="min-w-full divide-y overflow-auto divide-gray-200">
          <thead className="bg-[#11aaf6] text-center">
            <tr className="text-center">
              {/* Table Headers */}
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                S No
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Visa Categories
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                FAQs
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Full Details
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {packages?.map((pkg, index) => (
              <tr key={pkg._id}>
                <td className="px-6 py-1 whitespace-nowrap">{pkg?.s_no}</td>
                <td className="px-6 py-1 whitespace-nowrap">{pkg?.country}</td>
                <td className="px-6 py-1 whitespace-nowrap flex justify-center items-center">
                  <FaEye
                    size={20}
                    color="blue"
                    onClick={() => handleImageClick(pkg?.image)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.description.length > 20 ? (
                    <>
                      {pkg?.description.slice(0, 20)}...
                      <button
                        onClick={() => handleDescriptionClick(pkg?.description)}
                        className="text-blue-500 ml-1 underline"
                      >
                        Read more
                      </button>
                    </>
                  ) : (
                    pkg?.description
                  )}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">{pkg?.price}</td>
                <td className="px-6 py-1 whitespace-nowrap">
                  <span
                    className="text-xs text-blue-400 underline cursor-pointer"
                    onClick={() => handleDocumentsClick(pkg?.tourTypes)}
                  >
                    Visa categories
                  </span>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  <span
                    className="text-xs text-blue-400 underline cursor-pointer"
                    onClick={() => handleFAQClick(pkg?.faq)}
                  >
                    View FAQs
                  </span>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  <span
                    className="text-xs text-blue-400 underline cursor-pointer"
                    onClick={() => handleAll(pkg._id, pkg?.tourTypes)}
                  >
                    view
                  </span>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  <select
                    value={pkg.rank || ""}
                    onChange={(e) => handleRankChange(pkg._id, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="">Select Rank</option>
                    {[...Array(30).keys()].map((rank) => (
                      <option key={rank + 1} value={rank + 1}>
                        {rank + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.createdAt?.slice(0, 10)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap flex justify-center items-center">
                  <Actions
                    onEdit={() => edit(pkg?._id)}
                    onDelete={() => deleted(pkg?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modals for Documents, FAQs, Images, and Description */}
        {selectedDocuments && (
          <PlanModal
            isOpen={!!selectedDocuments}
            onClose={() => setSelectedDocuments(null)}
          >
            <div className="max-h-96 w-[80%] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Visa Categories</h2>
              {selectedDocuments.map((doc, index) => (
                <div key={index} className="mb-6">
                  <img
                    src={doc?.image}
                    alt={doc?.name}
                    className="w-32 h-32 mb-2"
                  />
                  <h3 className="font-semibold">{doc?.name}</h3>
                </div>
              ))}
            </div>
          </PlanModal>
        )}

        {selectedFAQ && (
          <PlanModal
            isOpen={!!selectedFAQ}
            onClose={() => setSelectedFAQ(null)}
          >
            <div className="max-h-96 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">FAQs</h2>
              {selectedFAQ.map((faq, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{faq?.question}</p>
                  <p className="text-gray-600">{faq?.answer}</p>
                </div>
              ))}
            </div>
          </PlanModal>
        )}

        {isImageModalOpen && (
          <PlanModal
            isOpen={isImageModalOpen}
            onClose={() => setImageModalOpen(false)}
          >
            <div className="flex justify-center items-center">
              <img
                src={modalContent?.content}
                alt="Package Image"
                className="max-w-full max-h-[80vh]"
              />
            </div>
          </PlanModal>
        )}

        {isDescriptionModalOpen && (
          <PlanModal
            isOpen={isDescriptionModalOpen}
            onClose={() => setDescriptionModalOpen(false)}
          >
            <div className="max-h-96 w-[80%] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p>{description}</p>
            </div>
          </PlanModal>
        )}
      </div>
    </div>
  );
};

export default PackageList;
