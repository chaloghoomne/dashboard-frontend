import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";

const StepOne = ({ formData, handleChange, handleImageChange, nextStep }) => {
  const [countries, setCountries] = useState();
  const [tourtypes, setTourTypes] = useState();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}place/${formData.package}`
        );
        setTourTypes(response.data.tourTypes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [formData.package]);

  const handleNext = (e) => {
    e.preventDefault();
    // Add validation here if needed
    nextStep();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          name="package"
          value={formData.package}
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {" "}
          Visa Category
        </label>
        <select
          name="tourType"
          value={formData.tourType}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Visa Category</option>
          {tourtypes?.map((tour) => {
            return (
              <>
                <option value={tour._id}>{tour.name}</option>
              </>
            );
          })}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Visa Placement
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
       
        >
          <option value="">Select Visa Placement</option>
          <option value="Recommended">Recommended</option>
          <option value="Best">Best</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Entry Type
        </label>
        <select
          name="entryType"
          value={formData.entryType}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Type</option>
          <option value="Single Entry">Single Entry</option>
          <option value="Multiple Entry">Multiple Entry</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Visa Type Heading
        </label>
        <input
          type="text"
          name="visaTypeHeading"
          value={formData.visaTypeHeading}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Stay Period <span className="text-xs">(number)</span>
        </label>
        <input
          type="text"
          name="period"
          value={formData.period}
          onChange={handleChange}
          placeholder="60 "
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Visa Validity <span className="text-xs">(number)</span>
        </label>
        <input
          type="text"
          name="validity"
          value={formData.validity}
          onChange={handleChange}
            placeholder="90"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Processing Time
        </label>
        <input
          type="text"
          name="processingTime"
          value={formData.processingTime}
          onChange={handleChange}
              placeholder="3 To 5 "
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
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
        <label className="block text-sm font-medium text-gray-700"> Child Price</label>
        <input
          type="number"
          name="childPrice"
          value={formData.childPrice}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
      
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Insurance Amount <span className="text-xs">(optional*)</span>
        </label>
        <input
          type="text"
          name="insuranceAmount"
          value={formData.insuranceAmount}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "icon")}
          className="mt-1 bg-white block p-1 w-full"
          required
        />
      </div> */}

      <div>
        <label className="block text-sm font-medium text-gray-700">Image <span className="text-xs">(1230*450px)</span></label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "image")}
          className="mt-1 bg-white p-1 block w-full"
          required
        />
      </div>
      <div>
        <h3
          style={{ textShadow: "2px 2px 4px rgba(66, 185, 245, 0.5)" }}
          className="text-2xl text-center drop-shadow-xl mt-8 font-medium text-gray-800"
        >
          Express Visa Details
          <span className="text-sm ml-3">(optional*)</span>
        </h3>
        <label className="block text-sm font-medium text-gray-700">
          Express Heading
        </label>
        <input
          type="text"
          name="expressHeading"
          value={formData.expressHeading}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Express Price
        </label>
        <input
          type="text"
          name="expressPrice"
          value={formData.expressPrice}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Express Processing Time <span className="text-xs">(number)</span>
        </label>
        <input
          type="text"
          name="expressDays"
          value={formData.expressDays}
          onChange={handleChange}
          placeholder="3"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <h3
          style={{ textShadow: "2px 2px 4px rgba(66, 185, 245, 0.5)" }}
          className="text-2xl text-center drop-shadow-xl mt-8 font-medium text-gray-800"
        >
          Instant Visa Details <span className="text-sm ml-3">(optional*)</span>
        </h3>
        <label className="block text-sm font-medium text-gray-700">
          Instant Heading
        </label>
        <input
          type="text"
          name="instantHeading"
          value={formData.instantHeading}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Instant Price
        </label>
        <input
          type="text"
          name="instantPrice"
          value={formData.instantPrice}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Instant Processing Time <span className="text-xs">(number)</span>
        </label>
        <input
          type="text"
          name="instantDays"
          value={formData.instantDays}
          onChange={handleChange}
          placeholder="2"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
      >
        Next
      </button>
    </form>
  );
};

export default StepOne;
