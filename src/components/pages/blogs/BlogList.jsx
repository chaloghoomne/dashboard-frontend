import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../Api/urls';
import { toast } from 'react-toastify';
import ViewModal from './ViewModal';
import DeleteModal from './DeleteModal';
import Pagination from '../Packages/components/Pagination';


const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [getTotalPage,setTotalPages] = useState(0);
    const [getCurrentPage,setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get(`${BASE_URL}blogs?page=${getCurrentPage}`)
      .then(response =>{
        setBlogs(response.data.data)
        setTotalPages(response.data?.totalPages)
      })
      .catch(error => toast.error('Error fetching blogs'));
  }, [getCurrentPage]);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}blog/${id}`)
      .then(() => {
        toast.success('Blog deleted!');
        axios.get(`${BASE_URL}blogs`)
        .then(response => setBlogs(response.data.data))
        .catch(error => toast.error('Error fetching blogs'));
        setDeleteModalOpen(false);
      })
      .catch(error => toast.error('Error deleting blog'));
  };

  const openDeleteModal = (blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };

  const openViewModal = (blog, type) => {
    setSelectedBlog({ ...blog, type });  // type is either 'image' or 'description'
    setViewModalOpen(true);
  };

  return (
    <div className="container min-h-[89%] overflow-auto bg-slate-300 mx-auto py-5 px-4">
      <h1 className="text-3xl text-blue-600 font-bold mb-4">Blog List</h1>
      <Link to="/home/blogs">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white">Add New Blog</button>
      </Link>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Publisher</th>
            <th className="py-2">Reading Time</th>
            <th className="py-2">Description</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog?.id} className='text-center'>
              <td className="py-2">{blog?.title}</td>
              <td className="py-2">{blog?.publisher}</td>
              <td className="py-2">{blog?.readingTime}</td>
              <td className="py-2"> {blog?.description?.length > 20 ? (
                  <button onClick={() => openViewModal(blog, 'description')} className="px-2 py-1 bg-green-500 text-white">View Full Description</button>
                ) : (
                  <span>{blog?.description}</span>
                )}</td>
              <td className="py-2">
                <Link to={`/home/blog/edit/${blog?._id}`}>
                  <button className="mr-2 px-2 py-1 bg-yellow-500 text-white">Edit</button>
                </Link>
                <button onClick={() => openDeleteModal(blog)} className="mr-2 px-2 py-1 bg-red-500 text-white">Delete</button>
                <button onClick={() => openViewModal(blog, 'image')} className="mr-2 px-2 py-1 bg-blue-500 text-white">View Image</button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={getCurrentPage} totalPages={getTotalPage} onPageChange={setCurrentPage}/>

      {viewModalOpen && <ViewModal blog={selectedBlog} onClose={() => setViewModalOpen(false)} />}
      {deleteModalOpen && <DeleteModal blog={selectedBlog} onDelete={handleDelete} onClose={() => setDeleteModalOpen(false)} />}
    </div>
  );
};

export default BlogList;
