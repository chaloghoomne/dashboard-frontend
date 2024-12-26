

import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
import PlanEdit from "../Plans/components.jsx/PlanEdit";
import Loader from "../../../Loader/Loader";
import Pagination from "../components/Pagination";

const VisaCategories = () => {
  const [documents, setDocuments] = useState([]);
  const [showLoader,setShowLoader] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    image: null,
    show:false,
  });
  
  const [showIconModal, setShowIconModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [getTotalPage,setTotalPages] = useState(0);
  const [getCurrentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDocuments();
  }, [getCurrentPage]);

  const fetchDocuments = async () => {
    try {
      const response = await fetchDataFromAPI("GET", `${BASE_URL}tour-types?page=${getCurrentPage}`);
      if (response) {
        setDocuments(response.data);
        setTotalPages(response.totalPages)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    setShowLoader(true)
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", formData.image);
  

    if (formData.id) {
      try {
        const response = await fetchDataFromAPI(
          "PUT",
          `${BASE_URL}edit-tour-type/${formData.id}`,
          data
        );
        if (response) {
          toast.success(" Updated  Successfully");
          try {
            const response = await fetchDataFromAPI("GET", `${BASE_URL}tour-types?page=${getCurrentPage}`);
            if (response) {
              setDocuments(response.data);
              setTotalPages(response.totalPages)
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error("Error");
      }
    } else {
      try {
        const response = await fetchDataFromAPI(
          "POST",
          `${BASE_URL}add-tour-type`,
          data
        );
        if (response) {
          toast.success(" Added  successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error");
      }
    }
    setFormData({ id: null, name: "", image: null});
    fetchDocuments();
    setShowLoader(false)
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}tour-type/${id}`
      );
      if (response) {
        setFormData({
          id: response.data._id,
          name: response.data.name,
          image: response.data.image,
      
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "DELETE",
        `${BASE_URL}delete-tour-type/${id}`
      );
      if (response) {
        toast.success("Deleted Succesfully")
        fetchDocuments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDescriptionModal = (document) => {
    setSelectedDocument(document);

  };

  const openIconModal = (document) => {
    setSelectedDocument(document);
    setShowIconModal(true);
  };
  


return (
    <>
    {
      showLoader? <Loader /> :
      <div className="container mx-auto min-h-[89%] overflow-auto bg-slate-300 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Visa Categories</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
         
         <label htmlFor="" className="flex flex-col gap-1"> <span className="text-sm flex gap-2">Visa Category Name</span>
            <input
            type="text"
            placeholder="Visa Category Name"
            className="p-2 border border-blue-500 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
</label>
<label htmlFor="" className="flex flex-col gap-1"><span className="text-sm flex gap-2">Image <span className="text-xs">(128*92px)</span></span>
          <input
            type="file"
            className="p-2 border bg-white border-blue-500 rounded"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            required
          />
        </label>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {formData.id ? " Update Visa Category" : "Add Visa Category"}
        </button>
      </form>

      <table className="min-w-full  border border-blue-500">
        <thead className="text-center bg-blue-500 text-white">
          <tr>
            <th className="border bg-blue-500 px-4 py-2 ">S.No</th>
            <th className="border bg-blue-500 px-4 py-2 ">Name</th>
            <th className="border bg-blue-500 px-4 py-2 ">Image</th>
           
            <th className="border  bg-blue-500 px-4 py-2 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc.id} className="text-center bg-white">
              <td className="border px-4 py-1">{index + 1}</td>
              <td className="border px-4 py-1">{doc.name}</td>
              <td className="border px-4 py-1 text-center">
                <button
                  onClick={() => openIconModal(doc)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  👁️
                </button>
              </td>
              {/* <td className="border text-left px-4 py-1">
                {doc.description.length > 20
                  ? `${doc.description.substring(0, 20)}...`
                  : doc.description}{" "}
                <button
                  onClick={() => openDescriptionModal(doc)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Read more
                </button>
              </td> */}
              <td className="border px-4 py-1">
                <button
                  onClick={() => handleEdit(doc?._id)}
                  className="bg-blue-500 p-2 px-3  rounded-lg text-white active:bg-blue-300  mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc?._id)}
                  className="bg-red-500 p-2 px-3 rounded-lg active:bg-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* {showDescriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 w-[500px] max-h-[400px] overflow-y-auto rounded-md">
            <h2 className="text-xl font-bold mb-4">Full Description</h2>
            <p
              className="  max-h-[400px] overflow-y-auto"
              style={{ overflowWrap: "anywhere" }}
            >
              {selectedDocument.description}
            </p>
            <button
              onClick={() => setShowDescriptionModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )} */}

      <Pagination currentPage={getCurrentPage} totalPages={getTotalPage} onPageChange={setCurrentPage}/>

      {showIconModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Image Preview</h2>
            <img
              src={selectedDocument?.image} // Assuming icon is a URL or a file path
              alt="Document Icon"
              className="w-[400px] h-[400px]"
            />
            <button
              onClick={() => setShowIconModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    }
    </>
    
  );
};

export default VisaCategories;
