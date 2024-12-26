import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import { BASE_URL } from '../../../Api/urls';
import Pagination from '../Packages/components/Pagination';

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null)

  const [getTotalPage, setTotalPages] = useState(0);
  const [getCurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch Career form submissions from API
    const fetchData = async () => {
      const resp = await axios.get(`${BASE_URL}careers?page=${getCurrentPage}`);
      setCareers(resp?.data?.data?.careers);
      setTotalPages(resp?.data?.data?.totalPages)
    };
    fetchData();
  }, [getCurrentPage]);

  const openModal = (career) => {
    setSelectedCareer(career);
  };

  const closeModal = () => {
    setSelectedCareer(null);
  };

  const handleResumeDownload = async (resumeUrl) => {
    try {
      // Make GET request to fetch the file
      const response = await axios({
        url: resumeUrl,
        method: 'GET',
        responseType: 'blob', // Important: Set responseType to blob
      });

      // Create a blob URL for the file
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);

      // Create temporary link element
      const link = document.createElement('a');
      link.href = url;

      // Extract filename from URL or use default
      const filename = resumeUrl.substring(resumeUrl.lastIndexOf('/') + 1) || 'resume.pdf';
      link.setAttribute('download', filename);

      // Append to body, click and remove
      document.body.appendChild(link);
      link.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Error downloading resume. Please try again.');
    }
  };

  //   const handleResumeDownloadfull = (url)=>{
  //   const fullResumeUrl = `${BASE_URL}${url}`;
  // handleResumeDownload(fullResumeUrl);
  //   }


  return (
    <div className="p-8 bg-slate-300 min-h-[89%]" style={{ overflowY: 'scroll' }}>
      <h1 className="text-3xl font-bold text-[#F26337] mb-6">Career Submissions</h1>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-2">Name</th>
            <th className="border border-black p-2">Phone Number</th>
            <th className="border border-black p-2">Email</th>
            <th className="border border-black p-2">Current Designation</th>
            <th className="border border-black p-2">Position Applied</th>
            <th className="border border-black p-2">Skills</th>
            <th className="border border-black p-2">Resume</th>
            <th className="border border-black p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers?.map((career) => (
            <tr key={career.id} className="text-center">
              <td className="border border-black p-2">{career?.name}</td>
              <td className="border border-black p-2">{career?.phoneNumber}</td>
              <td className="border border-black p-2">{career?.email}</td>
              <td className="border border-black p-2">{career?.currentDesignation}</td>
              <td className="border border-black p-2">{career?.position}</td>
              <td className="border border-black p-2">{career?.skills}</td>
              <td
                onClick={() => handleResumeDownload(career?.resume)} // Make sure career.resume contains the full URL
                className="border text-orange-500 border-black p-2 cursor-pointer"
              >
                Download Resume
              </td>
              <td className="border border-black p-2">
                <button onClick={() => openModal(career)}>
                  <FaEye className="text-xl text-[#F26337]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to show career details */}
      {selectedCareer && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Career Details</h2>
            <p>
              <strong>Name:</strong> {selectedCareer.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedCareer.phoneNumber}
            </p>
            <p>
              <strong>Email:</strong> {selectedCareer.email}
            </p>
            <p>
              <strong>Current Designation:</strong> {selectedCareer.currentDesignation}
            </p>
            <p>
              <strong>Position Applied:</strong> {selectedCareer.position}
            </p>
            <p>
              <strong>Description:</strong> {selectedCareer.description}
            </p>
            <button
              className="mt-4 bg-[#F26337] text-white p-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
            <Pagination currentPage={getCurrentPage} totalPages={getTotalPage} onPageChange={setCurrentPage}/>

    </div>
  );
};

export default CareerList;
