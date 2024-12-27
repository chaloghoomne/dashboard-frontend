// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { fetchDataFromAPI } from "../../../../Api/fetchData";
// import { BASE_URL } from "../../../../Api/urls";
// import { toast } from "react-toastify";
// import { FaEdit } from "react-icons/fa";
// import { MdOutlineDeleteOutline } from "react-icons/md";

// const Docs = () => {
//   const [headings, setHeadings] = useState([]);
//   const [descriptions, setDescriptions] = useState([]);
//   const [points, setPoints] = useState([]);

//   const [currentEditId, setCurrentEditId] = useState(null);
//   const [newHeading, setNewHeading] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [newPoint, setNewPoint] = useState("");

//   useEffect(() => {
//     fetchHeadings();
//     fetchDescriptions();
//     fetchPoints();
//   }, []);

//   const fetchHeadings = async () => {
//     try {
//       const response = await fetchDataFromAPI(
//         "GET",
//         `${BASE_URL}package-note-by-type/heading`
//       );
//       console.log(response, "response headings");
//       if (response) {
//         setHeadings(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const addHeading = async () => {
//     try {
//       const response = await fetchDataFromAPI(
//         "POST",
//         `${BASE_URL}add-package-note`,
//         { heading: newHeading, type: "heading" }
//       );
//       console.log(response);
//       if (response) {
//         setNewHeading("");
//         fetchHeadings();
//         toast.success(" Added Heading successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error");
//     }
//   };

//   const addDescription = async () => {
//     try {
//       const response = await fetchDataFromAPI(
//         "POST",
//         `${BASE_URL}add-package-note`,
//         { description: newDescription, type: "description" }
//       );
//       console.log(response);
//       if (response) {
//         setNewDescription("");
//         fetchDescriptions();
//         toast.success(" Added Heading successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error");
//     }
//   };

//   const addPoint = async () => {
//     try {
//       const response = await fetchDataFromAPI(
//         "POST",
//         `${BASE_URL}add-package-note`,
//         { point: newPoint, type: "point" }
//       );
//       console.log(response);
//       if (response) {
//         setNewPoint("");
//         fetchPoints();
//         toast.success(" Added Heading successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(" Network Error");
//     }
//   };

//   const fetchDescriptions = async () => {
//     try {
//       const response = await fetchDataFromAPI(
//         "GET",
//         `${BASE_URL}package-note-by-type/description`
//       );
//       console.log(response, "response descriptions");
//       if (response) {
//         setDescriptions(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchPoints = async () => {
//     try {
//       const response = await fetchDataFromAPI(
//         "GET",
//         `${BASE_URL}package-note-by-type/point`
//       );
//       console.log(response, "response descriptions");
//       if (response) {
//         setPoints(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEditClick = async (type, id) => {
//     setCurrentEditId(id);
//     try {
//       const response = await fetchDataFromAPI(
//         "GET",
//         `${BASE_URL}package-notes/${id}`
//       );
//       console.log(response, "response descriptions");
//       if (response) {
//         if (type === "heading") {
//           setNewHeading(response.data.heading);
//         } else if (type === "description") {
//           setNewDescription(response.data.description);
//         } else if (type === "point") {
//           setNewPoint(response.data.point);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleUpdate = async (type) => {
//     if (type === "heading") {
//       try {
//         const response = await fetchDataFromAPI(
//           "PUT",
//           `${BASE_URL}edit-package-note/${currentEditId}`,
//           {
//             heading: newHeading,
//             type: "heading",
//           }
//         );
//         console.log(response, "response descriptions");
//         if (response) {
//           setCurrentEditId(null);
//           type === "heading"
//             ? fetchHeadings()
//             : type === "description"
//             ? fetchDescriptions()
//             : fetchPoints();
//           setNewHeading("");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else if (type === "description") {
//       try {
//         const response = await fetchDataFromAPI(
//           "PUT",
//           `${BASE_URL}edit-package-note/${currentEditId}`,
//           {
//             description: newDescription,
//             type: "description",
//           }
//         );
//         console.log(response, "response descriptions");
//         if (response) {
//           setCurrentEditId(null);
//           type === "heading"
//             ? fetchHeadings()
//             : type === "description"
//             ? fetchDescriptions()
//             : fetchPoints();
//           setNewDescription("");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else if (type === "points") {
//       try {
//         const response = await fetchDataFromAPI(
//           "PUT",
//           `${BASE_URL}edit-package-note/${currentEditId}`,
//           {
//             point: newPoint,
//             type: "point",
//           }
//         );
//         console.log(response, "response descriptions");
//         if (response) {
//           setNewPoint("");
//           setCurrentEditId(null);
//           type === "heading"
//             ? fetchHeadings()
//             : type === "description"
//             ? fetchDescriptions()
//             : fetchPoints();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   const deleteItem = async (type, id) => {
//     try {
//       const response = await fetchDataFromAPI(
//         "DELETE",
//         `${BASE_URL}package-notes/${id}`
//       );
//       console.log(response);
//       if (response) {
//         type === "heading"
//           ? fetchHeadings()
//           : type === "description"
//           ? fetchDescriptions()
//           : fetchPoints();
//         toast.success("Successfully Deleted");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const renderTable = (data, type) => (
//     <table className="min-w-full bg-white border border-blue-500">
//       <thead className="text-center items-center">
//         <tr className="text-center items-center">
//           <th className="py-2 px-4 bg-[#11aaf6] text-white">Sno</th>
//           <th className="py-2 px-4 bg-[#11aaf6] text-white capitalize">
//             {type}
//           </th>
//           <th className="py-2 px-4 bg-[#11aaf6] text-white">Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data?.map((item, index) => (
//           <tr key={item._id} className="border-b text-center">
//             <td className="py-1 px-4">{index + 1}</td>
//             <td className="py-1 px-4">{item[type]}</td>
//             <td className="py-1 px-4 flex justify-center items-center">
//               <button
//                 className=" text-white px-2 py-1 mr-2 rounded"
//                 onClick={() => handleEditClick(type, item._id)}
//               >
//                 <FaEdit size={20} color="black" />
//               </button>
//               <button
//                 className=" text-white px-2 py-1 rounded"
//                 onClick={() => deleteItem(type, item._id)}
//               >
//                 <MdOutlineDeleteOutline size={22} color="red" />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div className="p-8  bg-slate-300 min-h-[89%] max-h-[89%] overflow-auto">
//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-4">Headings</h2>
//         <input
//           type="text"
//           value={newHeading}
//           onChange={(e) => setNewHeading(e.target.value)}
//           className="border border-blue-500 rounded px-4 py-2 mr-2"
//           placeholder="Add/Edit Heading"
//         />
//         <button
//           onClick={() =>
//             currentEditId ? handleUpdate("heading") : addHeading()
//           }
//           className="bg-[#11aaf6] text-white px-4 mb-5 py-2 rounded"
//         >
//           {currentEditId ? "Update Heading" : "Add Heading"}
//         </button>
//         {renderTable(headings, "heading")}
//       </div>

//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-4">Descriptions</h2>
//         <input
//           type="text"
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//           className="border border-blue-500 rounded px-4 py-2 mr-2"
//           placeholder="Add/Edit Description"
//         />
//         <button
//           onClick={() =>
//             currentEditId ? handleUpdate("description") : addDescription()
//           }
//           className="bg-[#11aaf6] text-white px-4 mb-5 py-2 rounded"
//         >
//           {currentEditId ? "Update Description" : "Add Description"}
//         </button>
//         {renderTable(descriptions, "description")}
//       </div>

//       <div>
//         <h2 className="text-xl font-bold mb-4">Points</h2>
//         <input
//           type="text"
//           value={newPoint}
//           onChange={(e) => setNewPoint(e.target.value)}
//           className="border border-blue-500 rounded px-4 py-2 mr-2"
//           placeholder="Add/Edit Point"
//         />
//         <button
//           onClick={() => (currentEditId ? handleUpdate("point") : addPoint())}
//           className="bg-[#11aaf6] text-white px-4 mb-5 py-2 rounded"
//         >
//           {currentEditId ? "Update Point" : "Add Point"}
//         </button>
//         {renderTable(points, "point")}
//       </div>
//     </div>
//   );
// };

// export default Docs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
import PlanEdit from "../Plans/components.jsx/PlanEdit";
import Loader from "../../../Loader/Loader";
import Pagination from "../components/Pagination";

const Docs = () => {
  const [documents, setDocuments] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    icon: null,
    description: "",
    show: false,
  });
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [getTotalPage, setTotalPages] = useState(0);
  const [getCurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchDocuments();
  }, [getCurrentPage]);

  const fetchDocuments = async () => {
    try {
      const response = await fetchDataFromAPI("GET", `${BASE_URL}documents?page=${getCurrentPage}`);
      if (response) {
        setDocuments(response.data);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    setShowLoader(true);
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("icon", formData.icon);
    data.append("description", formData.description);
    data.append("show", false);

    if (formData.id) {
      try {
        const response = await fetchDataFromAPI(
          "PUT",
          `${BASE_URL}edit-document/${formData.id}`,
          data
        );
        if (response) {
          toast.success(" Updated  successfully");
          setShowLoader(false);
          try {
            const response = await fetchDataFromAPI(
              "GET",
              `${BASE_URL}documents`
            );
            if (response) {
              setDocuments(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
        setShowLoader(false);
        toast.error("Error");
      }
    } else {
      try {
        const response = await fetchDataFromAPI(
          "POST",
          `${BASE_URL}add-document`,
          data
        );
        if (response) {
          setShowLoader(false);
          toast.success(" Added  successfully");
        }
      } catch (error) {
        console.log(error);
        setShowLoader(false);
        toast.error("Error");
      }
    }
    setFormData({ id: null, name: "", icon: null, description: "" });
    fetchDocuments();
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "GET",
        `${BASE_URL}document/${id}`
      );
      if (response) {
        setFormData({
          id: response.data._id,
          name: response.data.name,
          icon: response.data.icon,
          description: response.data.description,
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
        `${BASE_URL}delete-document/${id}`
      );
      if (response) {
        toast.success("Deleted Succesfully");
        fetchDocuments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDescriptionModal = (document) => {
    setSelectedDocument(document);
    setShowDescriptionModal(true);
  };

  const openIconModal = (document) => {
    setSelectedDocument(document);
    setShowIconModal(true);
  };

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="container mx-auto min-h-[89%] overflow-auto bg-slate-300 p-4">
          <h1 className="text-2xl font-bold mb-4 text-blue-500">Documents</h1>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Document Name"
                className="p-2 border border-blue-500 rounded"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="file"
                className="p-2 border bg-white border-blue-500 rounded"
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.files[0] })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="p-2 border border-blue-500 min-h-32 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {formData.id ? "Update Document" : "Add Document"}
            </button>
          </form>

          <table className="min-w-full  border border-blue-500">
            <thead className="text-center bg-blue-500 text-white">
              <tr>
                <th className="border bg-blue-500 px-4 py-2 ">S.No</th>
                <th className="border bg-blue-500 px-4 py-2 ">Name</th>
                <th className="border bg-blue-500 px-4 py-2 ">Icon</th>
                <th className="border bg-blue-500 px-4 py-2 ">Description</th>
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
                  <td className="border text-left px-4 py-1">
                    {doc.description.length > 20
                      ? `${doc.description.substring(0, 20)}...`
                      : doc.description}{" "}
                    <button
                      onClick={() => openDescriptionModal(doc)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Read more
                    </button>
                  </td>
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
          <Pagination currentPage={getCurrentPage} totalPages={getTotalPage} onPageChange={setCurrentPage} />


          {showDescriptionModal && (
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
          )}

          {showIconModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md">
                <h2 className="text-xl font-bold mb-4">Icon Preview</h2>
                <img
                  src={selectedDocument?.icon} // Assuming icon is a URL or a file path
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
      )}
    </>
  );
};

export default Docs;
