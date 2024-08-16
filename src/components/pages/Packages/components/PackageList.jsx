// src/components/PackageList.js
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Actions from "./Actions";
import ShowModalCountry from "./ShowModalCountry";

const PackageList = ({ data, deleted, edit }) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [description, setDescription] = useState("");

  const handleImageClick = (imageUrl) => {
    setModalContent({ type: "image", content: imageUrl });
    setImageModalOpen(true);
  };

  const handleDescriptionClick = (fullDescription) => {
    setDescription(fullDescription);
    setDescriptionModalOpen(true);
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
                Created At
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {data?.map((pkg, index) => (
              <tr key={pkg.id}>
                <td className="px-6 py-1 whitespace-nowrap">{index + 1}</td>
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
      </div>

      <ShowModalCountry
        isOpen={isImageModalOpen}
        onClose={() => setImageModalOpen(false)}
      >
        {modalContent.type === "image" && (
          <img
            src={modalContent.content}
            alt="Modal Content"
            className="w-full h-auto"
          />
        )}
      </ShowModalCountry>

      <ShowModalCountry
        isOpen={isDescriptionModalOpen}
        onClose={() => setDescriptionModalOpen(false)}
      >
        <p>{description}</p>
      </ShowModalCountry>
    </div>
  );
};

export default PackageList;
