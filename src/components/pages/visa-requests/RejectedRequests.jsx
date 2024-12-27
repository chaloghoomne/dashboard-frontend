// src/components/RejectedRequests.js
import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import UserList from "./components/TravelersList";

const RejectedRequests = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}visa-orders?page=${currentPage}&status=rejected`
        );
        if (response) {
          setUsers(response.data);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAcceptedRequests();
  }, [currentPage]);

  const handleAction = async (userId, action) => {
    try {
      await fetchDataFromAPI("DELETE", `${BASE_URL}delete-user/${userId}`);
      // Refresh the data after action
      setUsers(users.filter((user) => user.id !== userId));
      fetchAcceptedRequests();
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
      type="approve"
      handleBlockAction={handleAction}
    />
  );
};

export default RejectedRequests;
