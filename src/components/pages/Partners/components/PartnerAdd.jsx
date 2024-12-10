import React, { useState } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";

const AddPartnerForm = ({ handleActive }) => {
  const [formData, setFormData] = useState({
    type: "",
    link: "",
    image: "",
    title: "",
    heading: "",
    noOfTravelers: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

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
    if (validateForm()) {
      const newformData = new FormData();
      newformData.append("type", formData.type);
      newformData.append("heading", formData.heading);
      newformData.append("title", formData.title);
      newformData.append("link", formData.link);
      newformData.append("image", formData.image);
      newformData.append("travellersCount", formData.noOfTravelers);

      try {
        const response = await fetchDataFromAPI(
          "POST",
          `${BASE_URL}add-partner`,
          newformData
        );
        if (response) {
          toast.success(" Added successfully");
          setFormData({
            type: "",
            link: "",
            image: "",
            title: "",
            heading: "",
            noOfTravelers: "",
          });
          handleActive("list");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
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
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
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
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
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
            name="noOfTravelers"
            value={formData.noOfTravelers}
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
        Add Partner
      </button>
    </form>
  );
};

export default AddPartnerForm;
