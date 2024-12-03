import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../../Api/urls";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ShowModalCountry from "../../Packages/components/ShowModalCountry";

const ImportantPointsList = ({ data, edit, deleted }) => {
  const [viewImageId, setViewImageId] = useState(null);

  const [description, setDescription] = useState("");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleImageClick = (imageUrl) => {
    setModalContent({ type: "image", content: imageUrl });
    setImageModalOpen(true);
  };

  const handleDescriptionClick = (fullDescription) => {
    setDescription(fullDescription);
    setDescriptionModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-[#11aaf6] text-white text-md font-normal">
          <tr className="bg-gray-200">
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">S No</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Country</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Image</th>
            <th className="px-4 min-w-56 bg-[#11aaf6] py-2">Heading</th>
            <th className="px-4 min-w-56 bg-[#11aaf6] py-2">Description</th>
            <th className="px-4 min-w-48 bg-[#11aaf6] py-2">Type</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.id} className="border-b text-center">
              <td className="px-4 py-2">{point?.s_no}</td>
              <td className="px-4 py-2">{point?.packageName}</td>
              <td className="px-4 py-2">
                <button className="text-blue-500 hover:underline">
                  <FaEye
                    size={20}
                    color="blue"
                    onClick={() => handleImageClick(point?.image)}
                    style={{ cursor: "pointer" }}
                  />
                </button>
              </td>
              <td className="px-4 py-2">
                {point?.heading.length > 20 ? (
                  <>
                    {point?.heading.slice(0, 20)}...
                    <button
                      onClick={() => handleDescriptionClick(point?.heading)}
                      className="text-blue-500 ml-1 underline"
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  point?.heading
                )}
              </td>
              <td className="px-4 py-2">
                {point?.description?.length > 20 ? (
                  <>
                    {point?.description?.slice(0, 20)}...
                    <button
                      onClick={() => handleDescriptionClick(point?.description)}
                      className="text-blue-500 ml-1 underline"
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  point?.description
                )}
              </td>
              <td className="px-4 py-2">{point?.type}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => edit(point?._id)}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  <FaEdit size={20} color="black" />
                </button>
                <button
                  onClick={() => deleted(point._id)}
                  className="text-red-500 hover:underline"
                >
                  <MdDelete size={20} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewImageId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <img
              src={data.find((p) => p.id === viewImageId).image}
              alt="Important Point"
              className="max-w-full max-h-96 mx-auto"
            />
            <button
              onClick={() => setViewImageId(null)}
              className="mt-4 bg-[#11aaf6] text-white px-4 py-2 rounded-lg hover:bg-[#0e8fd3] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

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

export default ImportantPointsList;
