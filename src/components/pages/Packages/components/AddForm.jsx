import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";

const AddForm = ({ handleActive }) => {
  const [headings, setHeadings] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [faq, setFaq] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    heading: "",
    description: "",
    price: "",
    image: null,
    rating: "",
    showCoTraveller: "",
    tourTypes: [], // Stores selected visa category IDs
    docHeading: "",
    docDescription: "",
    docPoints: [],
    faq: [],
  });
  const [visaCategories, setVisaCategories] = useState([]);

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}package-note-by-type/heading`
        );
        if (response) {
          setHeadings(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHeadings();
  }, []);

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}package-note-by-type/description`
        );
        if (response) {
          setDescriptions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDescriptions();
  }, []);

  useEffect(() => {
    fetchVisaCategories();
  }, []);

  const fetchVisaCategories = async () => {
    try {
      const response = await fetchDataFromAPI("GET", `${BASE_URL}tour-types`);
      if (response) {
        setVisaCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleVisaCategoryChange = (id) => {
    const isSelected = formData.tourTypes.includes(id);

    // Add or remove category based on checkbox status
    const updatedTourTypes = isSelected
      ? formData.tourTypes.filter((categoryId) => categoryId !== id)
      : [...formData.tourTypes, id];

    setFormData({ ...formData, tourTypes: updatedTourTypes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData?.tourTypes?.length < 1) {
      toast.error(`Please Add at least One Visa Category`);
      return;
    }

    const validFaq = faq.filter(
      (item) => item.question.trim() || item.answer.trim()
    );
    const data = new FormData();
    data.append("country", formData.country);
    data.append("heading", formData.heading);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);
    // data.append("docHeading", formData.docHeading);
    // data.append("docDescription", formData.docDescription);

    // Append selected visa categories
    formData.tourTypes.forEach((id) => {
      data.append("tourTypes[]", id);
    });

    validFaq?.forEach((item, index) => {
      data.append(`faq[${index}][question]`, item.question);
      data.append(`faq[${index}][answer]`, item.answer);
    });

    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}add-place`,
        data
      );
      if (response) {
        toast.success("Added successfully");
        handleActive("list");
      }
    } catch (error) {
      console.log(error);
      toast.error("Country Already Exist");
    }
  };

  const handleAddQuestion = () => {
    setFaq([...faq, { question: "", answer: "" }]);
  };

  const handleQuestionChange = (index, e) => {
    const updatedFaq = faq.map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    setFaq(updatedFaq);
  };

  const handleRemoveQuestion = (index) => {
    const updatedFaq = faq.filter((item, i) => i !== index);
    setFaq(updatedFaq);
  };

  const saveFaq = () => {
    setFormData({ ...formData, faq });
    toast.success("Faq Saved Successfully!");
  };

  return (
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
      {/* <div>
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div> */}
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
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
          pattern="[0-9]*"
        />
      </div>
      <div className="">
        <label className="block text-sm font-medium text-gray-700">
          Image <span className="text-xs">(280*192px)</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block bg-white p-1 px-2 rounded-md w-full"
          required
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-500">
          Select Visa Categories to Show
        </h2>
        {visaCategories.map((item) => (
          <div key={item._id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.tourTypes.includes(item._id)}
              onChange={() => handleVisaCategoryChange(item._id)}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="px-4 py-2 bg-blue-500  text-black rounded-md"
        onClick={() => toast.success("Visa Categories Saved")}
      >
        Save Visa Categories
      </button>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-blue-500">FAQ Section</h2>
        {faq.map((item, index) => (
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
          Add Question
        </button>
        <button
          type="button"
          onClick={saveFaq}
          className="px-4 py-2 ml-4 bg-green-500 text-white rounded-md"
        >
          Save Faq
        </button>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 w-44 text-white rounded-md"
      >
        Save All
      </button>
    </form>
  );
};

export default AddForm;
