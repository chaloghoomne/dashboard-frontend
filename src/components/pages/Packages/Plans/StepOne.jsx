import React from 'react';

const StepOne = ({ formData, handleChange, handleImageChange, nextStep }) => {
  const handleNext = (e) => {
    e.preventDefault();
    // Add validation here if needed
    nextStep();
  };

 


  return (
    <form onSubmit={handleNext} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Package</label>
        <select name="package" value={formData.package} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
          <option value="">Select Package</option>
                    <option value="demo">demo</option>
                              <option value="demo 2">demo 2</option>
          {/* Fetch and map package options from API */}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
          <option value="">Select Type</option>
          <option value="Recommended">Recommended</option>
          <option value="Best">Best</option>
          <option value="Popular">Popular</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input type="text" name="heading" value={formData.heading} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Period</label>
        <input type="text" name="period" value={formData.period} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Validity</label>
        <input type="text" name="validity" value={formData.validity} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Processing Time</label>
        <input type="text" name="processingTime" value={formData.processingTime} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>
     <div>
  <label className="block text-sm font-medium text-gray-700">Icon</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleImageChange(e, 'icon')}
    className="mt-1 block w-full"
    required
  />
</div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image</label>
        <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'image')} className="mt-1 block w-full" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Plan Disclaimer</label>
        <input type="text" name="planDisclaimer" value={formData.planDisclaimer} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter points separated by commas" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Important Info</label>
        <input type="text" name="importantInfo" value={formData.importantInfo} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Enter points separated by commas" required />
      </div>
      <button type="submit" className="px-4 py-2 bg-[#11aaf6] text-white rounded-md">Next</button>
    </form>
  );
};

export default StepOne;
