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

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_HEADING_BY_ID}/${type}`
        );
        if (response) {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setHeading(response.data.heading);
          setBoxes(response.data.subItems || []); // Safely set boxes data
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [type]);

  // Handle form submission and save data
  const handleSave = async (e) => {
    e.preventDefault();

    // Log the boxes data before submission
    console.log("Boxes data before submission:", boxes);

    // Check if boxes contain any valid data
    const formData = {
      title: title,
      description: description,
      heading: heading,
      subItems: boxes, // Include boxes data
    };

    // Log form data for debugging
    console.log("Form Data to be sent:", formData);

    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}page-types/${type}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json", // Send as JSON
          },
        }
      );
      if (response) {
        toast.success("Updated successfully");
      }
    } catch (error) {
      console.error("Error during save operation:", error);
      toast.error("Error updating the page");
    }
  };

  // Update box data dynamically
  const handleBoxChange = (index, field, value) => {
    const updatedBoxes = [...boxes];
    updatedBoxes[index][field] = value;
    setBoxes(updatedBoxes);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <form onSubmit={handleSave}>
        <h2 className="text-xl font-bold mb-4">About Page</h2>

        {/* Title input */}
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

        {/* Heading input */}
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

        {/* Description input */}
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Boxes input */}
        {boxes.map((box, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700">
              Box {index + 1} Heading
            </label>
            <input
              type="text"
              value={box.heading}
              onChange={(e) => handleBoxChange(index, "heading", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />

            <label className="block text-gray-700">
              Box {index + 1} Description
            </label>
            <textarea
              value={box.description}
              onChange={(e) => handleBoxChange(index, "description", e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
        ))}

        {/* Save button */}
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

export default About;
