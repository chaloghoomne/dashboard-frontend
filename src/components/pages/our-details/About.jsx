import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    sections: [{ heading: '', point: [''], summary: [''] }],

  });


  // Add new section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { heading: '', point: [''], summary: [''] }],
    });
  };

  //remove section 
  const removeSection = (index) => {
    const updatedSectionData = formData.sections.splice(index, 1);
    setFormData({
      ...formData,
      sections: formData.sections,
    });
  }

   // Add new point in a section
   const addPoint = (index) => {
    const updatedSections = formData.sections.map((section, i) =>
      i === index ? { ...section, point: [...section.point, ''] } : section
    );
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };
  // Remove a point from a section
  const removePoint = (index, pointIndex) => {
    const updatedPoints = formData.sections[index].point.filter((_, pi) => pi !== pointIndex);
    const updatedSections = formData.sections.map((section, i) =>
      i === index ? { ...section, point: updatedPoints } : section
    );
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Add new Summary in a section
  const addSummary = (index) => {
    const updatedSections = formData.sections.map((section, i) =>
      i === index ? { ...section, summary: [...section.summary, ''] } : section
    );
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Remove a Summary from a section
  const removeSummary = (index, summaryIndex) => {
    const updatedSummary = formData.sections[index].summary.filter((_, pi) => pi !== summaryIndex);
    const updatedSections = formData.sections.map((section, i) =>
      i === index ? { ...section, summary: updatedSummary } : section
    );
    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Handle form changes
  const handleInputChange = (e, index = null, pointIndex = null, summaryIndex = null) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      // Handle image file input
      setFormData({
        ...formData,
        image: files[0], // Store the image file
      });
    } else if (index === null) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      // Update section heading or point
      if (pointIndex === null && summaryIndex === null) {
        const updatedSections = formData.sections.map((section, i) =>
          i === index ? { ...section, [name]: value } : section
        );
        setFormData({
          ...formData,
          sections: updatedSections,
        });
      }
      else if (pointIndex != null && summaryIndex === null) {
        const updatedPoints = formData.sections[index].point.map((point, pi) =>
          pi === pointIndex ? value : point
        );
        const updatedSections = formData.sections.map((section, i) =>
          i === index ? { ...section, point: updatedPoints } : section
        );
        setFormData({
          ...formData,
          sections: updatedSections,
        });
      } else {
        const updatedSummary = formData.sections[index].summary.map((summary, pi) =>
          pi === summaryIndex ? value : summary
        );
        const updatedSections = formData.sections.map((section, i) =>
          i === index ? { ...section, summary: updatedSummary } : section
        );
        setFormData({
          ...formData,
          sections: updatedSections,
        });
      }
    }
  };

  // Fetch the existing data by ID
  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(`${BASE_URL}/about`)
      setFormData(resp.data.data)
    }
    fetchData()

  }, []);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleImageInputChange = (e) => {
    const value = e.target.files[0];
    setFormData({ ...formData, image: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('image', formData.image);
    formDataToSend.append('sections', JSON.stringify(formData.sections)); // Convert sections array to string
    axios.post(`${BASE_URL}/about`, formDataToSend)
      .then(data => toast.success('About Us updated successfully!'));
  };

  return (
    <div className="bg-slate-300  text-black overflow-auto p-8 min-h-[89%]">
      <h1 className="text-3xl text-blue-600 font-bold mb-4"> About Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-blue-600 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-black rounded"
          />
        </div>
        <div>
          <label className="block text-blue-600 mb-2">Image URL</label>
          <input
            type="file"
            name="image"
            onChange={handleImageInputChange}
            className="w-full p-2 border border-black rounded"
          />
          {formData.image && (
            <img
              src={typeof formData.image === "string" ? formData.image : URL.createObjectURL(formData.image)}
              alt="Current"
              className="mt-2 w-20 h-20 object-cover"
            />
          )}
          {/* Sections */}
        {formData?.sections?.map((section, index) => (
          <div key={index} className="bg-white p-4 rounded-lg mt-4">
            <div className='flex justify-between'>
              <label className="block text-lg text-blue-600">Section {index + 1} Heading</label>
              <button
                  type="button"
                  onClick={() => removeSection(index)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-xs text-white py-1 px-2 rounded"
                >
                  Remove
                </button>
            </div>

            <input
              type="text"
              name="heading"
              value={section.heading}
              onChange={(e) => handleInputChange(e, index)}
              className="mt-2 w-full bg-white border border-gray-700 text-black rounded"
            />
            {/* Points */}
            {section?.point?.map((point, pointIndex) => (
              <div key={pointIndex} className="mt-4 flex items-center">
                <label className="block w-full flex flex-col text-blue-600">Point {pointIndex + 1}
                  <textarea
                    value={point}
                    onChange={(e) => handleInputChange(e, index, pointIndex)}
                    className="mt-2 min-w-full p-2 bg-white border border-gray-700 text-black rounded"
                    rows="2"
                  />
                </label>
                {/* Remove Point Button */}
                <button
                  type="button"
                  onClick={() => removePoint(index, pointIndex)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-xs text-white py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            {/* Add Point Button */}
            <button
              type="button"
              onClick={() => addPoint(index)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Add Point
            </button>

            {/* Summary */}
            {section?.summary?.map((summary, summaryIndex) => (
              <div key={summaryIndex} className="mt-4 flex items-center">
                <label className="block w-full flex flex-col text-blue-600">Summary {summaryIndex + 1}
                  <textarea
                    value={summary}
                    onChange={(e) => handleInputChange(e, index, null, summaryIndex)}
                    className="mt-2 min-w-full p-2 bg-white border border-gray-700 text-black rounded"
                    rows="2"
                  />
                </label>
                {/* Remove Point Button */}
                <button
                  type="button"
                  onClick={() => removeSummary(index, summaryIndex)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-xs text-white py-1 px-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            {/* Add Point Button */}
            <button
              type="button"
              onClick={() => addSummary(index)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-4"
            >
              Add Summary
            </button>

          </div>
        ))}

        </div>
        <button type="button" onClick={addSection} className="bg-blue-500 text-white p-2 rounded">Add Section</button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg ml-5">Update</button>
      </form>
    </div>
  );
};

export default AboutUs;
