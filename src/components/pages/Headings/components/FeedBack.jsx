import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL, NetworkConfig } from "../../../../Api/urls";
import { fetchDataFromAPI } from "../../../../Api/fetchData";

const Feedback = ({ type }) => {
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_HEADING_BY_ID}/${type}`
        );
        if (response) {
          setTitle(response.data.title);
          setHeading(response.data.heading);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleSave = async (e) => {
    // Send data to backend
    const formData = {
      title: title,
      heading: heading,
    };
    e.preventDefault();
    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}page-types/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        toast.success(" Updated successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating profile picture");
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Feedback Page</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Heading</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          required
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-[#11aaf6] text-white p-2 rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default Feedback;
