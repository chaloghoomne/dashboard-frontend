import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
const AddImportantPoints = ({ handleActive }) => {
  const [selectedSection, setSelectedSection] = useState("Image");
  const [image, setImage] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState([]);
  const [newPoint, setNewPoint] = useState("");
  const [packageId, setPackageId] = useState(null);
  const [countries, setCountries] = useState();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI("GET", `${BASE_URL}places`);
        if (response) {
          setCountries(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleAddPoint = () => {
    if (newPoint) {
      setPoints([...points, newPoint]);
      setNewPoint("");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("type", selectedSection);
    formData.append("heading", heading);
    formData.append("description", description);
    points?.forEach((item, index) => {
      formData.append(`points[${index}]`, item);
    });
    formData.append("image", image);
    formData.append("packageId", packageId);
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}add-note`,
        formData
      );
      if (response) {
        toast.success(" Added successfully");
        setPoints([]);
        setDescription("");
        setHeading("");
        setImage("");
        handleActive("list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <div className="w-full p-4  ">
      <div className=" w-full  px-6">
        <h1 className="text-2xl text-blue-500  font-semibold">
          Add Important Points
        </h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <select
            name="package"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Country</option>
            {countries?.map((country) => {
              return (
                <>
                  <option value={country?._id}>{country?.country}</option>
                </>
              );
            })}
            {/* Fetch and map package options from API */}
          </select>
        </div>
        <div className="mb-6 flex flex-col">
          <label htmlFor="">Selector</label>{" "}
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
          >
            {" "}
            <option value="Image">Image</option>{" "}
            <option value="Personal Details">Personal Details</option>{" "}
            <option value="About Package">About Package</option>
            <option value="Instructions">Instructions</option>{" "}
          </select>{" "}
        </div>{" "}
        {selectedSection === "Instructions" ? (
          ""
        ) : (
          <div className="mb-4 flex flex-col">
            {" "}
            <label htmlFor="">Image</label>{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
            />{" "}
          </div>
        )}{" "}
        <div className="mb-4 flex flex-col">
          {" "}
          <label htmlFor="">Heading</label>{" "}
          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
          />{" "}
        </div>{" "}
        <div className="mb-4 flex flex-col">
          {" "}
          <label htmlFor="">Descriptiion</label>{" "}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6] h-32"
          ></textarea>{" "}
        </div>{" "}
        <div className="mb-4 flex flex-col">
          {" "}
          <label htmlFor="">Points</label>{" "}
          <div className="flex space-x-2">
            {" "}
            <input
              type="text"
              placeholder="New point"
              value={newPoint}
              onChange={(e) => setNewPoint(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
            />{" "}
            <button
              onClick={() => handleAddPoint()}
              className="bg-[#11aaf6] text-white px-4 py-2 rounded-lg hover:bg-[#0e8fd3] transition-colors"
            >
              {" "}
              Add Point{" "}
            </button>{" "}
          </div>{" "}
        </div>{" "}
        {points.length > 0 && (
          <div className="mb-4">
            {" "}
            <h3 className="font-semibold mb-2">Points:</h3>{" "}
            <ul className="list-disc pl-5">
              {" "}
              {points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}{" "}
            </ul>{" "}
          </div>
        )}{" "}
        <button
          onClick={() => handleSubmit()}
          className="bg-[#11aaf6] text-white px-4 py-2 rounded-lg hover:bg-[#0e8fd3] transition-colors"
        >
          {" "}
          Submit{" "}
        </button>
      </div>{" "}
    </div>
  );
};
export default AddImportantPoints;
