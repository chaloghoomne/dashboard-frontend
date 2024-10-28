import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    publisher: '',
    readingTime: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('publisher', formData.publisher);
    data.append('readingTime', formData.readingTime);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const resp = await  axios.post(`${BASE_URL}add-blog`, data)
    
      if(resp){
        toast.success('Blog added!')
        navigate(`/home/blog/list`)
      }
    } catch (error) {
      toast.error('Error adding blog', error)
    }
   
      
     
  };

  return (
    <div className="container max-h-[89%] overflow-auto bg-slate-300 mx-auto p-6 w-full  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add Blog</h1>
        <Link
          to="/home/blog/list"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Blog List
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-semibold mb-2">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="block w-full bg-white p-2 text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="publisher" className="block text-lg font-semibold mb-2">
            Publisher Name
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="readingTime" className="block text-lg font-semibold mb-2">
            Reading Time <span className='text-xs '>(in min)</span>
          </label>
          <input
            type="text"
            id="readingTime"
            name="readingTime"
            placeholder='10'
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
