import React, { useState } from "react";
import ShowModalCountry from "../../Packages/components/ShowModalCountry";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const PartnersList = ({ data, edit, deleted }) => {
  const [viewImageId, setViewImageId] = useState(null);
  const [description, setDescription] = useState("");
  const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);

  const handleDescriptionClick = (fullDescription) => {
    setDescription(fullDescription);
    setDescriptionModalOpen(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white overflow-auto">
        <thead className="bg-[#11aaf6] text-white text-md text-normal">
          <tr>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">S No</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Title</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Image</th>

            <th className="px-4 min-w-56 bg-[#11aaf6] py-2">Heading</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Type</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Link</th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">
              No. of Travelers
            </th>
            <th className="px-4 min-w-32 bg-[#11aaf6] py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((partner) => (
            <tr key={partner._id} className="text-center">
              <td className="px-4 py-2">{partner?.s_no}</td>
              <td className="px-4 py-2">{partner?.title}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setViewImageId(partner?.image)}
                  className="text-blue-500"
                >
                  <FaEye size={20} color="blue" style={{ cursor: "pointer" }} />
                </button>
              </td>

              <td className="px-4 py-2">
                {partner?.heading.length > 20 ? (
                  <>
                    {partner?.heading.slice(0, 20)}...
                    <button
                      onClick={() => handleDescriptionClick(partner?.heading)}
                      className="text-blue-500 ml-1 underline"
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  partner?.heading
                )}
              </td>
              <td className="px-4 py-2">{partner?.type}</td>
              <td className="px-4 py-2">{partner?.link}</td>
              <td className="px-4 py-2">
                {partner?.travellersCount
                  ? partner?.travellersCount
                  : "Not Required"}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => edit(partner._id)}
                  className="mr-2 text-blue-500"
                >
                  <FaEdit size={20} color="black" />
                </button>
                <button
                  onClick={() => deleted(partner._id)}
                  className="text-red-500"
                >
                  <MdDelete size={20} color="red" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewImageId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <img
              src={viewImageId}
              alt="Partner"
              className="max-w-full max-h-96"
            />
            <button
              onClick={() => setViewImageId(null)}
              className="mt-4 bg-[#11aaf6] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ShowModalCountry
        isOpen={isDescriptionModalOpen}
        onClose={() => setDescriptionModalOpen(false)}
      >
        <p>{description}</p>
      </ShowModalCountry>
    </div>
  );
};

export default PartnersList;
