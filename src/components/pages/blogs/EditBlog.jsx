import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    publisher: '',
    readingTime: '',
  });

  useEffect(() => {
    // Fetch the blog data by ID and set it in the state
    axios.get(`${BASE_URL}blog/${blogId}`)
      .then(response => setFormData(response.data.data))
      .catch(error => toast.error('Error fetching blog data', error));
  }, [blogId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('publisher', formData.publisher);
    data.append('readingTime', formData.readingTime);
    if (formData.image) {
      data.append('image', formData.image);
    }

    axios.put(`${BASE_URL}edit-blog/${blogId}`, data)
      .then(() => {
        return (
            toast.success('Blog updated!'),
            navigate(`/home/blog/list`)
        )
      })
      .catch((error) => toast.error('Error updating blog', error));
  };

  return (
    <div className="container mx-auto p-6 w-full bg-slate-300  ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-blue-600 font-bold">Edit Blog</h1>
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
            value={formData.title}
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
            value={formData.description}
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
            className="block w-full text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
            onChange={handleChange}
          />
          {formData.imageUrl && (
            <img
              src={typeof formData.imageUrl === "string" ? formData.imageUrl : URL.createObjectURL(formData.image)}
              alt="Current"
              className="mt-2 w-20 h-20 object-cover"
            />
          )}
        </div>
        <div>
          <label htmlFor="publisher" className="block text-lg font-semibold mb-2">
            Publisher Name
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="readingTime" className="block text-lg font-semibold mb-2">
            Reading Time
          </label>
          <input
            type="text"
            id="readingTime"
            name="readingTime"
            value={formData.readingTime}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
