// src/components/PendingRequests.js
import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import UserList from "./components/TravelersList";
import { toast } from "react-toastify";

const PendingRequests = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}visa-orders?page=${currentPage}&status=pending`
        );
        if (response) {
          setUsers(response.data);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPendingRequests();
  }, [currentPage]);

  const handleAction = async (userId, action, data) => {
    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}process-visa-order/${userId}`,
        { status: `${action}`, description: data }
      );
      if (response) {
        toast.success(`${action.toUpperCase()}`);
        try {
          const response = await fetchDataFromAPI(
            "GET",
            `${BASE_URL}visa-orders?page=${currentPage}&status=pending`
          );
          if (response) {
            setUsers(response.data);
            setTotalPages(response.totalPages);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserList
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      handleAction={handleAction}
      type="pending"
    />
  );
};

export default PendingRequests;
