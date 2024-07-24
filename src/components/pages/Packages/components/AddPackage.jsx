import React, { useEffect, useState } from 'react';
import AddForm from './AddForm';
import PackageList from './PackageList';
import Pagination from './Pagination';
import DeleteModal from './DeleteModal';

const AddPackagePage = () => {
  const [activeTab, setActiveTab] = useState('add');
   const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
   const [isModalOpen,setIsModelOpen] = useState(false)
   const [deletedId,setDeletedId] = useState("")
  useEffect(() => {
    fetch(`/api/packages?page=${currentPage}`)
      .then((response) => response.json())
      .then((data) => {
        setPackages(data.packages);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [currentPage]);

   const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit package', id);
  };

  const handleDelete = (id) => {
    setIsModelOpen(true)
setDeletedId(id)
    console.log('Delete package', id);
  };

  const confirmDelete = ()=>{
  console.log("Delete")
  setIsModelOpen(false)
  }


  return (
    <div className="p-4 w-full h-[95%] ">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'add' ? 'bg-[#11aaf6] text-white' : 'bg-white border border-[#11aaf6] text-[#11aaf6]'} `}
          onClick={() => setActiveTab('add')}
        >
          Add
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'list' ? 'bg-[#11aaf6] text-white' : 'bg-white border border-[#11aaf6] text-[#11aaf6]'} `}
          onClick={() => setActiveTab('list')}
        >
          List
        </button>
      </div>
     
      {activeTab === 'add' ? 
       <div className='min-h-[95%] w-full max-h-[95%] overflow-auto'>
      <AddForm />
       </div>
       :
       <div className='min-h-[95%] h-[95%] w-full max-h-[95%]'>
        <div className='min-h-[87%] w-full max-h-[87%] overflow-auto '>
       <PackageList data={packages} edit={handleEdit} deleted={handleDelete} />
        </div>
         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div> }
     {
      isModalOpen &&
     <DeleteModal   id={deletedId} setIsModelOpen={setIsModelOpen} handleModal={confirmDelete} />
     }
    </div>
  );
};

export default AddPackagePage;
