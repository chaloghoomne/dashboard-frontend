// src/components/PlanListing.js
import React, { useState } from "react";
import PlanActions from "./PlanActions";
import PlanModal from "./PlanModal";
import { FaEye } from "react-icons/fa";
import ShowModalCountry from "../../components/ShowModalCountry";

const PlanListing = ({ data, deleted, edit, view }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [fullDescription, setFullDescription] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDescriptionClick = (description) => {
    setFullDescription(description);
  };


  const handleDocumentsClick = (documents) => {
    const filtered = documents?.filter((item)=>item.show === true  || item.show === "true" )
    setSelectedDocuments(filtered);
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full max-h-[90%] overflow-auto min-h-[90%]">
        <table className="min-w-full divide-y overflow-auto divide-gray-200">
          <thead className="bg-[#11aaf6] text-center">
            <tr className="text-center">
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                S No
              </th>
              {!view && (
                <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                  Country
                </th>
              )}
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Image
              </th>

              {!view && (
                <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                  Visa Category
                </th>
              )}
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Visa Type Heading
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Stay Period
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Visa Validity
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Processing Time
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Long Description
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Documents
              </th>
              
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Created At
              </th>
              {!view && (
                <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {data?.map((pkg, index) => (
              <tr key={pkg?.id}>
                <td className="px-6 py-1 whitespace-nowrap">{index + 1}</td>
                {!view && (
                  <td className="px-6 py-1 whitespace-nowrap">
                    {pkg?.package?.country}
                  </td>
                )}
                <td className="px-6 py-1 whitespace-nowrap pl-14">
                  <FaEye
                    size={20}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleImageClick(pkg?.image)}
                  />
                </td>

                {!view && (
                  <td className="px-6 py-1 whitespace-nowrap">
                    {pkg?.tourType}
                  </td>
                )}
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.visaTypeHeading}
                </td>
                <td className="px-6 py-1 whitespace-nowrap">₹ {pkg?.price}</td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.period} <span className="text-xs">Days</span>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.validity} <span className="text-xs">Days</span>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.processingTime} <span className="text-xs">Days</span>
                </td>
                <td
                  onClick={() => handleDescriptionClick(pkg?.longDescription)}
                  className="px-6 cursor-pointer py-1 whitespace-nowrap"
                >
                  {pkg?.longDescription?.slice(0, 20)}...{" "}
                  <span className="text-xs"></span>
                </td>
                <td className="px-6 py-1 whitespace-nowrap">
                  <span
                    className="text-xs text-blue-400 underline cursor-pointer"
                    onClick={() => handleDocumentsClick(pkg?.documents)}
                  >
                    View Documents
                  </span>
                </td>
                
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.createdAt?.slice(0, 10)}
                </td>
                {!view && (
                  <td className="px-6 py-1 whitespace-nowrap flex justify-center items-center">
                    <PlanActions
                      onEdit={() => edit(pkg?._id)}
                      onDelete={() => deleted(pkg?._id)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Images */}
        <ShowModalCountry
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Modal Content"
            className="w-full h-auto"
          />
        </ShowModalCountry>

        {/* Modal for Description */}
        <ShowModalCountry
          isOpen={!!fullDescription}
          onClose={() => setFullDescription(null)}
        >
          <p>{fullDescription}</p>
        </ShowModalCountry>

        {/* Modal for FAQs */}
       

        {/* Modal for Documents */}
        {selectedDocuments && (
          <PlanModal
            isOpen={!!selectedDocuments}
            onClose={() => setSelectedDocuments(null)}
          >
            <div className="max-h-96 w-[80%] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Documents</h2>
              {selectedDocuments.map((doc, index) => (
                <div key={index} className="mb-6">
                  <img
                    src={doc?.icon}
                    alt={doc?.name}
                    className="w-32 h-32 mb-2"
                  />
                  <h3 className="font-semibold">{doc?.name}</h3>
                  <p onClick={() => handleDescriptionClick(doc?.description)}>
                    {doc?.description?.slice(0, 20)}...
                    <span className="text-blue-400 cursor-pointer underline">
                      Read More
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </PlanModal>
        )}
      </div>
    </div>
  );
};

export default PlanListing;
