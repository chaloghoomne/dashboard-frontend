import React, { useState } from "react";

const StepTwo = ({
  formData,
  handleChange,
  nextStep,
  prevStep,
  handleSubmit,
}) => {
  const [faq, setFaq] = useState(formData.faq);

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

  const handleSave = () => {
    handleChange(faq);
  };

  const handleNext = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div className="space-y-2">
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
          onClick={handleSave}
          className="px-4 py-2 ml-5 bg-[#11aaf6] text-white rounded-md"
        >
          Save
        </button>
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
  );
};

export default StepTwo;
