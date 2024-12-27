import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../Api/urls";
import PlanListing from "../Plans/components.jsx/PlanListing";
import { fetchDataFromAPI } from "../../../../Api/fetchData";

const ShowFull = () => {
  const { id } = useParams();
  const [selectedTourType, setSelectedTourType] = useState("");
  const [plans, setPlans] = useState([]);
  const [country, setCountry] = useState();

  const location = useLocation();
  const { tourTypes } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}place/${id}`
        );
        if (response) {
          setCountry(response.data.country);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleTourTypeChange = async (event) => {
    const visaTypeId = event.target.value;
    setSelectedTourType(visaTypeId);

    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}visa-category-by-package`,
        { package: id, tourType: visaTypeId }
      );
      if (response) {
        setPlans(response.data);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  return (
    <div className="bg-slate-300 min-h-[89%] w-full px-10 py-5">
      <h2 className="text-2xl font-bold">
        {" "}
        Country:<span className="text-orange-500 "> {country}</span>
      </h2>
      <h4 className="pt-5 font-bold">Select a Tour Type to see Plans</h4>
      <select
        value={selectedTourType}
        onChange={handleTourTypeChange}
        className="mt-2 p-2 border rounded"
      >
        <option value="" disabled>
          Select a tour type
        </option>
        {tourTypes.map((tourType) => (
          <option key={tourType._id} value={tourType._id}>
            {tourType.name}
          </option>
        ))}
      </select>
      <div className="w-full my-5">
        {plans.length > 0 && <PlanListing data={plans} view={true} />}
      </div>
    </div>
  );
};

export default ShowFull;
