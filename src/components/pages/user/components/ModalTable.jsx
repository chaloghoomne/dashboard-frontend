// Table.js
import React, { useState } from 'react';
import Modal from '../../insights/components/Modal';

const ModalTable = ({ companies }) => {

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleContentClick = (content, title) => {
    setModalContent(content);
    setModalTitle(title);
    setShowModal(true);
  };
  return (
    <div className="max-w-full w-[95%] max-h-[90%] min-h-[85%] ">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sno</th>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Contact No</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Sector</th>
                <th className="py-2 px-4 border-b">Short Description</th>
              <th className="py-2 px-4 border-b">Long Description</th>
                  <th className="py-2 min-w-36 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {companies?.map((company, index) => (
            <tr key={company.id} className='text-center'>
              <td className="py-1 px-4 border-b">{index + 1}</td>
              <td className="py-1 px-4 border-b">{company.name}</td>
              <td className="py-1 px-4 border-b">{company.contact_no}</td>
              <td className="py-1 px-4 border-b">{company.city}</td>
              <td className="py-1 px-4 border-b">{company.email}</td>
                     <td className="py-1 px-4 border-b">{company.sector_name}</td>
              <td onClick={() => handleContentClick(company?.short_desc, "Short Description")} className="py-1 px-4 border-b">{company?.short_desc.slice(0,10)}...</td>
              <td  onClick={() => handleContentClick(company?.short_desc, "Long Description")} className="py-1 px-4 border-b">{company?.long_desc.slice(0,20)}...</td>
              <td className="py-1 px-4 min-w-36 border-b">{company?.created_at?.slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        content={modalContent}
        title={modalTitle}
      >
        
      </Modal>
    </div>
  );
};

export default ModalTable;
