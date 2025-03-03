import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';
import TextEditor from '../blogs/TextEditor'

const PrivacyPolicy = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null, // New field for the image
    sections: [{ heading: '', point: [''], summary: [''] }],
    pageType: 'privacy', // Added type field
  });

  // Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}page-by-type/privacy`);
        const sanitizedSections = response.data.data.sections.map((section) => ({
          ...section,
          summary: section.summary || [], // Initialize summary as an empty array if missing
        }));
        setFormData({
          ...response.data.data,
          sections: sanitizedSections,
          pageType: 'privacy',
        });
      } catch (error) {
        console.error('Error fetching privacy policy:', error);
      }
    };
    fetchData();
  }, []);

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

  // Add new section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { heading: '', point: [''], summary: [''] }],
    });
  };

  //remove section 
  const removeSection = (index) => {
    const updatedSectionData = formData.sections.splice(index,1);
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('pageType', 'privacy'); // Add type to formData
    data.append('image', formData.image); // Append the image file
    data.append('sections', JSON.stringify(formData.sections)); // Convert sections array to string

    try {
      const result = await axios.post(`${BASE_URL}add-page`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (result) {
        toast.success('Privacy Policy updated successfully');
        try {
          const response = await axios.get(`${BASE_URL}page-by-type/privacy`);
          setFormData({
            ...response.data.data,
            pageType: 'privacy', // Ensures the type is set to "privacy"
          });
        } catch (error) {
          console.error('Error fetching privacy policy:', error);
        }
      }
    } catch (error) {
      console.error('Error updating privacy policy:', error);
    }
  };

  async function handleEditorChange(value) {
    setFormData({
      ...formData,
      description:value,
    })
  }

  return (
    <div className="bg-slate-300 min-h-[89%] overflow-auto p-8 text-black">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Privacy Policy</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg text-blue-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-2 w-full p-2 bg-white border border-gray-700 text-black rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg text-blue-600">
            Description
          </label>
          <TextEditor value = {formData.description} onChange = {handleEditorChange}/>
        </div>

        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-lg text-blue-600">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            className="mt-2 w-full p-2 bg-white border border-gray-700 text-black rounded"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 ml-5 hover:bg-green-600 text-white py-2 px-6 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PrivacyPolicy;
