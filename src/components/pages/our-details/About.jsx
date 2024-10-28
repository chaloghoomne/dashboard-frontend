import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';

const AboutUs = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });
  
  // Fetch the existing data by ID
  useEffect(() => {
    const fetchData = async()=>{
      const resp = await  axios.get(`${BASE_URL}/about`)
      setFormData(resp.data.data)
    }
    fetchData()
    
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    axios.post(`${BASE_URL}/about`,formDataToSend)
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
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">Update</button>
      </form>
    </div>
  );
};

export default AboutUs;
