import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    offices: [{ city: '', address: '',phone:"",email:""  }],
    supportEmail: '',
    phoneNumber:"",
    addressLine1:"",
    addressLine2:""
  });

  useEffect(() => {
    // Fetch existing contact info (if available)
    const fetchData = async()=>{
    const resp = await axios.get(`${BASE_URL}/contact`)
    setFormData(resp.data.data)
    }
    fetchData()
     
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'supportEmail') {
      setFormData({ ...formData, supportEmail: value });
    }else if(name === 'phoneNumber'){
      setFormData({ ...formData, phoneNumber: value });
    }else if(name === 'addressLine1'){
      setFormData({ ...formData, addressLine1: value });
    }else if(name === 'addressLine2'){
      setFormData({ ...formData, addressLine2: value });
    } else {
      const updatedOffices = [...formData.offices];
      updatedOffices[index][name] = value;
      setFormData({ ...formData, offices: updatedOffices });
    }
  };

  const addOffice = () => {
    setFormData({ ...formData, offices: [...formData.offices, { city: '', address: '' ,phone:"",email:"" }] });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated data to the backend
    axios.post(`${BASE_URL}/contact`,formData)
      .then(data => toast.success('Contact information updated successfully!'));
  };

  const handleRemove = (index)=>{
    formData.offices.splice(index,1);
    console.log("New form data : ",formData)
    setFormData({...formData})
  }

  useEffect(()=>{

  },[formData])

  console.log("Formdata : ",formData)

  return (
    <div className="bg-slate-300 text-black overflow-auto p-8 min-h-[89%]">
      <h1 className="text-3xl text-blue-600 font-bold mb-6"> Contact Us </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Offices */}
        {formData?.offices?.map((office, index) => (
          <div key={index}>
            <div className='w-full flex items-end justify-end'>  
              <button type='button' className='bg-red-700 text-white font-bold rounded-md px-2 py-1' onClick={()=>handleRemove(index)}>Remove</button>
            </div>
            <label className="block mb-2">City {index + 1}</label>
            <input
              type="text"
              name="city"
              value={office.city}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full p-2 border border-black rounded mb-4"
              placeholder="City"
            />
            <textarea
              name="address"
              value={office.address}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full p-2 border border-black rounded"
              placeholder="Address"
            />
            <input
              type="tel"
              name="phone"
              value={office.phone}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full p-2 border border-black rounded mb-4"
              placeholder="Phone "
            />
            <input
              type="email"
              name="email"
              value={office.email}
              onChange={(e) => handleInputChange(e, index)}
              className="w-full p-2 border border-black rounded mb-4"
              placeholder="Email"
            />
          </div>
        ))}
        <button type="button" onClick={addOffice} className="bg-blue-500 text-white p-2 rounded">Add Office</button>

        {/* Support Email */}
        <div className=''>
          <label className="block mb-2">Support Email</label>
          <input
            type="email"
            name="supportEmail"
            value={formData?.supportEmail}
            onChange={handleInputChange}
            className="w-full p-2 border border-black rounded"
            placeholder="support@example.com"
          />
        </div>
        <div className=''>
          <label className="block mb-2">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData?.phoneNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-black rounded"
            placeholder="9878987678"
          />
        </div>
        <div className=''>
          <label className="block mb-2">Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData?.addressLine1}
            onChange={handleInputChange}
            className="w-full p-2 border border-black rounded"
            placeholder="  125, 2nd Floor New UCO Bank Shahhpur Jats"
          />
        </div>
        <div className=''>
          <label className="block mb-2">Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={formData?.addressLine2}
            onChange={handleInputChange}
            className="w-full p-2 border border-black rounded"
            placeholder=" Siri Fort, New Delhi - 110049"
          />
        </div>

        <button type="submit" className="bg-[#F26337] text-white p-2 rounded">Save Changes</button>
      </form>
    </div>
  );
};

export default ContactUs;
