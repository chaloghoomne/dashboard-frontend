import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";

const CountryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    heading: "",
    description: "",
    price: "",
    image: null,
    tourTypes: [],
    showCoTraveller: "",
    rating: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}place/${id}`
        );
        setFormData({
          country: response.data.country,
          heading: response.data.heading,
          description: response.data.description,
          price: response.data.price,
          image: response.data.image,
          showCoTraveller: response.data.showCoTraveller,
          rating: response.data.rating,
          tourTypes: response.data.tourTypes.map((tourType) => ({
            name: tourType.name,
            image: tourType.image,
          })),
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleTourTypeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTourTypes = [...formData.tourTypes];
    updatedTourTypes[index] = { ...updatedTourTypes[index], [name]: value };
    setFormData({ ...formData, tourTypes: updatedTourTypes });
  };

  const handleTourTypeImageChange = (index, e) => {
    const updatedTourTypes = [...formData.tourTypes];
    updatedTourTypes[index] = {
      ...updatedTourTypes[index],
      image: e.target.files[0],
    };
    setFormData({ ...formData, tourTypes: updatedTourTypes });
  };

  const addTourType = () => {
    setFormData({
      ...formData,
      tourTypes: [...formData.tourTypes, { name: "", image: null }],
    });
  };

  const removeTourType = (index) => {
    const updatedTourTypes = formData.tourTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, tourTypes: updatedTourTypes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("country", formData.country);
    data.append("heading", formData.heading);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);
    data.append("rating", formData.rating);
    data.append("showCoTraveller", formData.showCoTraveller);
    formData.tourTypes.forEach((tourType, index) => {
      data.append(`tourTypes[${index}][name]`, tourType.name);
    });
    formData.tourTypes.forEach((item) => {
      if (typeof item.image === "string") {
        console.log("");
      } else {
        data.append("tourTypes", item.image);
      }
    });
    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}edit-place/${id}`,
        data
      );
      if (response) {
        toast.success("Updated successfully");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
      alert("Error In Updating ");
    }
  };

  return (
    <div className="min-h-[95%] w-full bg-slate-300 p-6 max-h-[95%] overflow-auto">
      <h1 className="text-2xl text-blue-500 font-semibold">Edit Package</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heading
          </label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          {formData?.image && (
            <img
              src={
                typeof formData?.image === "string"
                  ? formData?.image
                  : URL.createObjectURL(formData.image)
              }
              alt="Current"
              className="mt-2 w-20 h-20 object-cover"
            />
          )}
        </div>
        {/* <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Show Co-Traveller
          </label>
          <select
            name="showCoTraveller"
            value={formData.showCoTraveller}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div> */}
        <div>
          <h3 className="text-lg font-medium text-gray-700">
            {" "}
            Visa Categories
          </h3>
          {formData.tourTypes.map((tourType, index) => (
            <div
              key={index}
              className="mt-4 p-4 border border-gray-300 rounded-md space-y-2"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Visa Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={tourType.name}
                  onChange={(e) => handleTourTypeChange(index, e)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Visa Category Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleTourTypeImageChange(index, e)}
                  className="mt-1 block w-full"
                />
                {tourType?.image && (
                  <img
                    src={
                      typeof tourType?.image === "string"
                        ? tourType?.image
                        : URL.createObjectURL(tourType?.image)
                    }
                    alt={tourType.name}
                    className="mt-2 w-20 h-20 object-cover"
                  />
                )}
              </div>
              <button
                type="button"
                onClick={() => removeTourType(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTourType}
            className="mt-4 px-4 py-2 bg-[#11aaf6] text-white rounded-md"
          >
            Add Visa Category
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CountryEdit;
