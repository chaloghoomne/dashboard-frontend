import React, { useState } from 'react';

const AddForm = () => {
  const [formData, setFormData] = useState({
    country: '',
    heading: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form here
    const data = new FormData();
    data.append('country', formData.country);
    data.append('heading', formData.heading);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', formData.image);

    // Send data to the backend
    fetch('/api/packages', {
      method: 'POST',
      body: data,
    }).then((response) => response.json()).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
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
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
          required
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-[#11aaf6] text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

export default AddForm;
