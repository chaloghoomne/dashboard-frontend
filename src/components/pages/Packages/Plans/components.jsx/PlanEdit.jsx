import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { fetchDataFromAPI } from "../../../../../Api/fetchData";
import { BASE_URL } from "../../../../../Api/urls";
import { useNavigate, useParams } from "react-router-dom";

const PlanEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    heading: "",
    description: "",
    price: "",
    image: null,
    tourTypes: [],
    package: "",
    tourType: "",
    type: "",
    entryType: "",
    period: "",
    validity: "",
    processingTime: "",
    icon: null,
    expressHeading: "",
    expressPrice: "",
    expressDays: "",
    instantHeading: "",
    instantPrice: "",
    instantDays: "",
    visaTypeHeading: "",
    faq: [],
    insuranceAmount: 0,
    longDescription: "",
    documents: [],
    childPrice:""
  });

  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [tourtypes, setTourtypes] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const fetchPackageData = async () => {
      const packageData = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}visa-category/${id}`
      );
      setFormData(packageData.data);
      setDocuments(packageData?.data?.documents);
    };

    fetchPackageData();
  }, []);

  useEffect(() => {
    // Create a copy of the second documents array
    const updatedDocs2 = documents.map((doc2, index) => {
      // Find the corresponding document from the first documents array
      const correspondingDoc1 = formData?.documents.find(
        (doc1) => doc1.name === doc2.name
      );
      // If a corresponding document is found, update the "show" key
      if (correspondingDoc1) {
        return {
          ...doc2,
          show: correspondingDoc1.show,
        };
      }
      return doc2;
    });

    // Update the state with the modified documents2 array
    setDocuments(updatedDocs2);
  }, []);


  const handleDocumentSelect = (index) => {
    const updatedDocuments = formData?.documents?.map((doc, i) =>
      i === index ? { ...doc, show: !doc.show } : doc
    );
    // setDocuments(updatedDocuments);
    setFormData({ ...formData, documents: updatedDocuments });
    // setSelectedDocuments(selected);
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetchDataFromAPI("GET", `${BASE_URL}documents`);
      if (response) {
        setDocuments(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      const countriesData = await fetchDataFromAPI("GET", `${BASE_URL}places`);
      const tourTypesData = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}place/${formData?.package}`
      );
      setCountries(countriesData.data);
      setTourtypes(tourTypesData.data.tourTypes);
    };

    fetchInitialData();
  }, [id, formData?.package]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, type) => {
    setFormData({ ...formData, [type]: e.target.files[0] });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else handleSubmit();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaq = [...formData.faq];
    updatedFaq[index] = { ...updatedFaq[index], [name]: value };
    setFormData({ ...formData, faq: updatedFaq });
  };

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      faq: [...formData.faq, { question: "", answer: "" }],
    });
  };

  const handleRemoveQuestion = (index) => {
    const updatedFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: updatedFaq });
  };

  const handleSubmit = async () => {
    // const data = new FormData();
    // Object.keys(formData).forEach((key) => {
    //   if (key === "faq" || key === "tourTypes") {
    //     formData[key].forEach((item, index) => {
    //       Object.keys(item).forEach((subKey) => {
    //         data.append(`${key}[${index}][${subKey}]`, item[subKey]);
    //       });
    //     });
    //   } else {
    //     data.append(key, formData[key]);
    //   }
    // });

    const newformData = new FormData();

    newformData.append("package", formData.package);
    newformData.append("tourType", formData.tourType);
    newformData.append("type", formData.type);
    newformData.append("entryType", formData.entryType);
    newformData.append("period", formData.period);
    newformData.append("validity", formData.validity);
    newformData.append("processingTime", formData.processingTime);
    newformData.append("price", formData.price);
    newformData.append("childPrice", formData.childPrice);
    newformData.append("icon", formData.icon);
    newformData.append("image", formData.image);
    { formData.expressHeading && newformData.append("expressHeading", formData.expressHeading);}
    { formData.expressPrice && newformData.append("expressPrice", formData.expressPrice);}
{  formData.expressDays &&   newformData.append("expressDays", formData.expressDays);}
    {  formData.instantHeading  &&newformData.append("instantHeading", formData.instantHeading);}
{  formData.instantPrice &&  newformData.append("instantPrice", formData.instantPrice);}
  { formData.instantDays &&  newformData.append("instantDays", formData.instantDays);}
  {  newformData.append("insuranceAmount", formData.insuranceAmount);}
    newformData.append("visaTypeHeading", formData.visaTypeHeading);
    newformData.append("longDescription", formData.longDescription);
    formData?.faq?.forEach((item, index) => {
      newformData.append(`faq[${index}][question]`, item.question);
      newformData.append(`faq[${index}][answer]`, item.answer);
    });
    formData?.documents?.forEach((item, index) => {
      newformData.append(`documents[${index}][name]`, item.name);
      newformData.append(`documents[${index}][icon]`, item.icon);
      newformData.append(`documents[${index}][description]`, item.description);
      newformData.append(`documents[${index}][show]`, item.show);
    });

    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}edit-visa-category/${id}`,
        newformData
      );
      if (response) {
        toast.success("Package updated successfully");
        navigate(-1);
      }
    } catch (error) {
      toast.error("Error in updating package");
    }
  };

  return (
    <div className="bg-slate-300 min-h-[85%]  p-6">
      <h1 className="text-2xl text-blue-500 font-semibold">Edit Plan</h1>
      <div className="min-h-[95%] max-h-[95%] overflow-auto py-2">
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Package
              </label>
              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Package</option>
                {countries?.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tour Type
              </label>
              <select
                name="tourType"
                value={formData.tourType}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Type</option>
                {tourtypes?.map((tour) => (
                  <option key={tour._id} value={tour._id}>
                    {tour.name}
                  </option>
                ))}
              </select>
            </div>
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
                <option value="">Select Type</option>
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
                Stay Period
              </label>
              <input
                type="text"
                name="period"
                value={formData.period}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Visa Validity
              </label>
              <input
                type="text"
                name="validity"
                value={formData.validity}
                onChange={handleChange}
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
                Insurance Amount
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
              <label className="block text-sm font-medium text-gray-700">
                Icon
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "icon")}
                className="mt-1 bg-white block p-1 w-full"
              />
              {formData.icon && (
                <img
                  src={
                    typeof formData.icon === "string"
                      ? formData.icon
                      : URL.createObjectURL(formData.icon)
                  }
                  className="w-32 object-cover h-32"
                />
              )}
            </div> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "image")}
                className="mt-1 bg-white p-1 block w-full"
              />
              {formData.image && (
                <img
                  src={
                    typeof formData.image === "string"
                      ? formData.image
                      : URL.createObjectURL(formData.image)
                  }
                  className="w-32 object-cover h-32"
                />
              )}
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
                Express Days
              </label>
              <input
                type="text"
                name="expressDays"
                value={formData.expressDays}
                onChange={handleChange}
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
                Instant Days
              </label>
              <input
                type="text"
                name="instantDays"
                value={formData.instantDays}
                onChange={handleChange}
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
        )}
        {step === 2 && (
          <form onSubmit={handleNext} className="space-y-4">
            {/* <div className="space-y-2">
              {formData.faq.map((item, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    name="question"
                    value={item.question}
                    onChange={(e) => handleQuestionChange(index, e)}
                    className="block w-1/2 p-2 border border-gray-300 rounded-md"
                    placeholder="Question"
                    required
                  />
                  <input
                    type="text"
                    name="answer"
                    value={item.answer}
                    onChange={(e) => handleQuestionChange(index, e)}
                    className="block w-1/2 p-2 border border-gray-300 rounded-md"
                    placeholder="Answer"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
              >
                Add FAQ
              </button>
            </div> */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-500">
                Select Documents to Show
              </h2>
              {formData?.documents.map((doc, index) => (
                <div key={doc.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      doc.show === "true" || doc.show === true ? true : false
                    }
                    onChange={() => handleDocumentSelect(index)}
                  />
                  <span>{doc.name}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-blue-500">
                Long Description
              </h2>
              <textarea
                name="longDescription"
                value={formData?.longDescription}
                onChange={(e) => handleChange(e)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter the long description here..."
                rows="4"
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PlanEdit;
