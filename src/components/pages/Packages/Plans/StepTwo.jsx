import React, { useState, useEffect } from "react";
import AddDescription from "./components.jsx/AddDescription"; // Assuming this is another component you may want to use
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";

const StepTwo = ({
  formData,
  handleChange,
  nextStep,
  prevStep,
  handleLongDescriptionChange,
  handleDocumentsChange,
  handleSubmit,
  setFormData,
}) => {
  const [faq, setFaq] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [longDescription, setLongDescription] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

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

  const handleDocumentSelect = (index) => {
    const updatedDocuments = documents.map((doc, i) =>
      i === index ? { ...doc, show: !doc.show } : doc
    );
    setDocuments(updatedDocuments);

    //
  };

  const saveFaq = () => {
    handleChange(faq);
    toast.success(` Faq Saved SuccessFully!  `);
  };

  const handleSave = () => {

    handleDocumentsChange(documents);

    setShow(true);
    toast.success(` Documents Saved SuccessFully!  `);
  };

  const savedesc = () => {
    handleLongDescriptionChange(longDescription);
    toast.success(`Long  Description Saved SuccessFully!  `);
  };

  const handleNext = (e) => {
    e.preventDefault();

    setShow(false);
    handleSubmit();
  };

  return (
    <div className="flex flex-col gap-10">
      {/* <div className="space-y-2">
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
          Add FAQ
        </button>
        <button
          type="button"
          onClick={saveFaq}
          className="px-4 py-2 bg-blue-500 ml-5 text-black rounded-md"
        >
          Save FAQ
        </button>
      </div> */}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-500">
          Select Documents to Show
        </h2>
        {documents.map((doc, index) => (
          <div key={doc.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={doc.show ? true: false}
              onChange={() => handleDocumentSelect(index)}
            />
            <span>{doc.name}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 w-44 text-black rounded-md"
      >
        Save Documents
      </button>

      <div className="space-y-2">
        <h2 className="text-xl font-bold text-blue-500">Long Description</h2>
        <textarea
          name="longDescription"
          value={longDescription}
          onChange={(e) => setLongDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter the long description here..."
          rows="4"
          required
        ></textarea>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-5">
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-400 text-black rounded-md"
          >
            Back
          </button>
          <button
            type="button"
            onClick={savedesc}
            className="px-4 py-2 bg-blue-500 w-44 text-black rounded-md"
          >
            Save Description
          </button>
        </div>
        <button
          onClick={handleNext}
          disabled={!show}
          className="px-4 py-2 bg-blue-500  text-white rounded-md"
        >
          Submit
        </button>
      </div>

      {/* <AddDescription /> */}
    </div>
  );
};

export default StepTwo;
