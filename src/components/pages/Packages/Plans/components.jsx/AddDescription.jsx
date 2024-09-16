import React, { useState } from "react";
import { toast } from "react-toastify";

const AddDescription = () => {
  const [paragraphs, setParagraphs] = useState([""]);
  const [points, setPoints] = useState([""]);

  const handleParagraphChange = (index, value) => {
    const updatedParagraphs = [...paragraphs];
    updatedParagraphs[index] = value;
    setParagraphs(updatedParagraphs);
  };

  const handlePointChange = (index, value) => {
    const updatedPoints = [...points];
    updatedPoints[index] = value;
    setPoints(updatedPoints);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, ""]);
  };

  const addPoint = () => {
    setPoints([...points, ""]);
  };

  const removeParagraph = (index) => {
    const updatedParagraphs = paragraphs.filter((_, i) => i !== index);
    setParagraphs(updatedParagraphs);
  };

  const removePoint = (index) => {
    const updatedPoints = points.filter((_, i) => i !== index);
    setPoints(updatedPoints);
  };

  const handleSubmit = async () => {
    const descriptionData = {
      paragraphs: paragraphs.filter((p) => p.trim() !== ""),
      points: points.filter((p) => p.trim() !== ""),
    };

    // API call to send data to backend
    try {
      // Replace with actual API call
      const response = await fetch("YOUR_BACKEND_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(descriptionData),
      });

      if (response.ok) {
        toast.success("Description saved successfully!");
      } else {
        toast.error("Failed to save description.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while saving the description.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-md space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">
        Edit Website Description
      </h2>

      {/* Paragraph Inputs */}
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="space-y-2">
          <textarea
            value={paragraph}
            onChange={(e) => handleParagraphChange(index, e.target.value)}
            placeholder={`Paragraph ${index + 1}`}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => removeParagraph(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove Paragraph
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addParagraph}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Add Paragraph
      </button>

      {/* Points Inputs */}
      {points.map((point, index) => (
        <div key={index} className="space-y-2">
          <input
            type="text"
            value={point}
            onChange={(e) => handlePointChange(index, e.target.value)}
            placeholder={`Point ${index + 1}`}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={() => removePoint(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove Point
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addPoint}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Add Point
      </button>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Save Description
      </button>
    </div>
  );
};

export default AddDescription;
