import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../../Api/urls";
import { toast } from "react-toastify";

const About = ({ type }) => {
  const [title, setTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [boxes, setBoxes] = useState([
    { heading: "", description: "" },
    { heading: "", description: "" },
    { heading: "", description: "" },
    { heading: "", description: "" },
  ]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_HEADING_BY_ID}/${type}`
        );
        if (response) {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setHeading(response.data.heading);
          setBoxes(response.data.subItems);
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
      heading: heading,
      subItems: boxes,
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
      <form action="" onSubmit={handleSave}>
        <h2 className="text-xl font-bold mb-4">About Page</h2>
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
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        {boxes.map((box, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">
              Box {index + 1} Heading
            </label>
            <input
              type="text"
              value={box.heading}
              onChange={(e) => {
                const newBoxes = [...boxes];
                newBoxes[index].heading = e.target.value;
                setBoxes(newBoxes);
              }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <label className="block text-gray-700">
              Box {index + 1} Description
            </label>
            <textarea
              value={box.description}
              onChange={(e) => {
                const newBoxes = [...boxes];
                newBoxes[index].description = e.target.value;
                setBoxes(newBoxes);
              }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="bg-[#11aaf6] text-white p-2 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default About;
