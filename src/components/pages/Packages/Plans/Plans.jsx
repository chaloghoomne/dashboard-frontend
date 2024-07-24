import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const Plans = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    package: '',
    type: '',
    heading: '',
    period: '',
    validity: '',
    processingTime: '',
    price: '',
    icon: '',
    image: null,
    planDisclaimer: '',
    importantInfo: '',
    faq: [],
    documents: []
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleImageChange = (e, field) => {
  setFormData({ ...formData, [field]: e.target.files[0] });
};

  const handleFaqChange = (faq) => {
    setFormData({ ...formData, faq });
  };

  const handleDocumentsChange = (documents) => {
    setFormData({ ...formData, documents });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma-separated strings to arrays
    const dataToSend = {
      ...formData,
      planDisclaimer: formData.planDisclaimer.split(',').map(item => item.trim()),
      importantInfo: formData.importantInfo.split(',').map(item => item.trim())
    };
    // Send data to the backend
    console.log(dataToSend,"datatosend");
  };

  return (
    <div className="p-4 w-full max-h-[95%] h-[89%] bg-gray-300 overflow-auto min-h-[89%]">
      {step === 1 && <StepOne formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} nextStep={nextStep} />}
      {step === 2 && <StepTwo formData={formData} handleChange={handleFaqChange} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <StepThree formData={formData} handleChange={handleDocumentsChange} prevStep={prevStep} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default Plans;
