import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";

const EditImportantPoints = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [countries, setCountries] = useState();
  const [formData, setFormData] = useState({
    type: "",
    image: "",
    heading: "",
    description: "",
    packageId: "",
    points: [],
  });
  const [newPoint, setNewPoint] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}notes/${id}`
        );
        if (response) {
          setFormData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

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
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddPoint = () => {
    if (newPoint) {
      setFormData({ ...formData, points: [...formData.points, newPoint] });
      setNewPoint("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit updated form data to API
    const newformData = new FormData();
    newformData.append("type", formData?.type);
    newformData.append("heading", formData?.heading);
    newformData.append("description", formData?.description);
    formData?.points?.forEach((item, index) => {
      newformData.append(`points[${index}]`, item);
    });
    newformData.append("image", formData?.image);
    newformData.append("packageId", formData?.packageId);
    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}edit-note/${id}`,
        newformData
      );
      if (response) {
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
    navigate("/home/important");
  };

  return (
    <div className="bg-slate-300 w-full max-h-[89%] overflow-auto  min-h-[89%] h-[89%]  p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl mb-4 font-semibold">Edit Important Point</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="packageId"
              value={formData?.packageId}
              onChange={handleChange}
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
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Selector</label>
            <select
              name="type"
              value={formData?.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
            >
              <option value="">Select Type</option>
              <option value="Image">Image</option>
              <option value="Personal Details">Personal Details</option>
              <option value="About Package">About Package</option>
              <option value="Instructions">Instructions</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
            />
            {typeof formData?.image === "string" ? (
              <img src={formData?.image} alt="" className="w-24 h-24" />
            ) : (
              <img
                src={URL.createObjectURL(formData?.image)}
                alt=""
                className="w-24 h-24"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6] h-32"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Points</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newPoint}
                onChange={(e) => setNewPoint(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#11aaf6]"
                placeholder="New point"
              />
              <button
                type="button"
                onClick={handleAddPoint}
                className="bg-[#11aaf6] text-white px-4 py-2 rounded-lg hover:bg-[#0e8fd3] transition-colors"
              >
                Add Point
              </button>
            </div>
          </div>

          {formData.points.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Points:</h3>
              <ul className="list-disc pl-5">
                {formData.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="bg-[#11aaf6] text-white px-4 py-2 rounded-lg hover:bg-[#0e8fd3] transition-colors"
          >
            Update Important Point
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditImportantPoints;
