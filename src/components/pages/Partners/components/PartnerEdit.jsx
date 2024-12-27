import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../Api/urls";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { toast } from "react-toastify";

const EditPartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    link: "",
    image: "",
    title: "",
    heading: "",
    travellersCount: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}partner/${id}`
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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.link) newErrors.link = "Link is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.heading) newErrors.heading = "Heading is required";
    if (!formData.noOfTravelers && formData.type === "partners")
      newErrors.noOfTravelers = "Number of travelers is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.title?.length > 30 ){
      toast.error("you can add title upto 30 characters")
      return;
          }
          if(!formData?.link.includes("http")){
            toast.error("Enter a valid Link")
            return;
                }
    // Submit updated form data to API
    const newformData = new FormData();
    newformData.append("type", formData.type);
    newformData.append("heading", formData.heading);
    newformData.append("title", formData.title);
    newformData.append("link", formData.link);
    newformData.append("image", formData.image);
    {
      formData.type === "partners" &&
        newformData.append("travellersCount", formData.travellersCount);
    }

    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}edit-partner/${id}`,
        newformData
      );
      if (response) {
        toast.success("SuccessFully Updated")
        setFormData(response.data);
        navigate("/home/partners");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 bg-slate-300 w-full max-h-[89%] overflow-auto  min-h-[89%] h-[89%]">
      <h2 className="text-2xl mb-4">Edit Partner</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Package</option>
            <option value="hotels">Hotels Partners</option>
            <option value="partners"> Our Partners</option>
            {/* Fetch and map package options from API */}
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
        </div>
        <div>
          <label className="block mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border bg-white rounded"
          />
          {formData.image && (
            <img
              src={
                typeof formData?.image === "string"
                  ? formData?.image
                  : imagePreview
              }
              className="w-44 py-2 h-44"
            />
          )}
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.heading && (
            <p className="text-red-500 text-sm">{errors.heading}</p>
          )}
        </div>
        {formData.type === "partners" && (
          <div>
            <label className="block mb-1">Number of Travelers</label>
            <input
              type="number"
              name="travellersCount"
              value={formData.travellersCount}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.noOfTravelers && (
              <p className="text-red-500 text-sm">{errors.noOfTravelers}</p>
            )}
          </div>
        )}

        <div>
          <label className="block mb-1">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
        </div>

        <button
          type="submit"
          className="bg-[#11aaf6] text-white px-4 py-2 rounded hover:bg-[#0e8fd3]"
        >
          Update Partner
        </button>
      </form>
    </div>
  );
};

export default EditPartner;
