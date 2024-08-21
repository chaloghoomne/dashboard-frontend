// src/components/PlanListing.js
import React, { useState } from "react";
import PlanActions from "./PlanActions";
import PlanModal from "./PlanModal";
import { FaEye } from "react-icons/fa";
import ShowModalCountry from "../../components/ShowModalCountry";

const PlanListing = ({ data, deleted, edit }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [fullDescription, setFullDescription] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleDescriptionClick = (description) => {
    setFullDescription(description);
  };

  const handleFAQClick = (faq) => {
    setSelectedFAQ(faq);
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
                Icon
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Visa Category
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
                Created At
              </th>
              <th className="px-6 py-3 min-w-32 bg-[#11aaf6] text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y text-center divide-gray-200">
            {data?.map((pkg, index) => (
              <tr key={pkg?.id}>
                <td className="px-6 py-1 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.package?.country}
                </td>
                <td className="px-6 py-1 whitespace-nowrap pl-14">
                  <FaEye
                    size={20}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleImageClick(pkg?.image)}
                  />
                </td>
                <td className="px-6 py-1 flex justify-center items-center whitespace-nowrap">
                  <FaEye
                    size={20}
                    color="blue"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleImageClick(pkg?.icon)}
                  />
                </td>
                <td className="px-6 py-1 whitespace-nowrap">{pkg?.tourType}</td>
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
                <td className="px-6 py-1 whitespace-nowrap">
                  {pkg?.createdAt?.slice(0, 10)}
                </td>
                <td className="px-6 py-1 whitespace-nowrap flex justify-center items-center">
                  <PlanActions
                    onEdit={() => edit(pkg?._id)}
                    onDelete={() => deleted(pkg?._id)}
                  />
                </td>
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
        {/* <PlanModal isOpen={!!selectedFAQ} onClose={() => setSelectedFAQ(null)}>
          <div>
            <h2 className="text-xl font-bold mb-4">FAQs</h2>
            {selectedFAQ?.map((faq, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{faq?.question}</p>
                <p>{faq?.answer}</p>
              </div>
            ))}
          </div>
        </PlanModal> */}
      </div>
    </div>
  );
};

export default PlanListing;
