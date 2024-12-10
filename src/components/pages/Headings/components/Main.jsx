import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../../Api/urls";
import { toast } from "react-toastify";

const Main = ({ type }) => {
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const[subHeading,setSubHeading]=useState("");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_HEADING_BY_ID}/${type}`
        );
        if (response) {
          setTitle(response.data?.title);
          setDescription(response.data?.description);
          setShortDescription(response.data?.shortDescription);
          setHeading(response.data?.heading);
          setSubHeading(response.data?.subHeading)
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
      description: description,
      shortDescription: shortDescription,
      heading: heading,
      subHeading:subHeading,
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
      <h2 className="text-xl font-bold mb-4">Main Page</h2>
      <form action="" onSubmit={handleSave}>
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

        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
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
          <label className="block text-gray-700">Sub Heading</label>
          <input
            type="text"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#11aaf6] text-white p-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Main;
