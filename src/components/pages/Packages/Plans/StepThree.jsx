import React, { useState } from "react";

const StepThree = ({ formData, handleChange, prevStep, handleSubmit }) => {
  const [documents, setDocuments] = useState(formData.documents);

  const handleAddDocument = () => {
    setDocuments([...documents, { name: "" }]);
  };


  // const handleDocumentChangeImage = (index, e, field) => {
  //   const updatedDocuments = documents.map((item, i) =>
  //     i === index ? { ...item, [field]: e.target.files[0] } : item
  //   );
  //   setDocuments(updatedDocuments);
  // };

  const handleDocumentChange = (index, e) => {
    const updatedDocuments = documents.map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    setDocuments(updatedDocuments);
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = documents.filter((item, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  const handleNext = (e) => {
    e.preventDefault();
    handleChange(documents);
    handleSubmit(e);
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div className="space-y-2">
        {documents.map((item, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              name="heading"
              value={item.heading}
              onChange={(e) => handleDocumentChange(index, e)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Document Heading"
              required
            />
            {/* <div>
  <label className="block text-sm font-medium text-gray-700">Document Icon</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleDocumentChangeImage(index, e, 'icon')}
    className="mt-1 block w-full"
    required
  />
</div> */}

            {/* <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleDocumentChange(index, e)}
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Document Description (comma-separated points)"
              required
            /> */}
            <button
              type="button"
              onClick={() => handleRemoveDocument(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDocument}
          className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
        >
          Add Document
        </button>
      </div>
      <div className="flex justify-between">
        {/* <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 text-black rounded-md"
        >
          Back
        </button> */}
        <button
          type="submit"
          className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default StepThree;
