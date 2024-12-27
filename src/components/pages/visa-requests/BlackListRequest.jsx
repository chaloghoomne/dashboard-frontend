// src/components/RejectedRequests.js
import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import UserList from "./components/TravelersList";
import { toast } from "react-toastify";

const BlackListRequest = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}visa-orders?page=${currentPage}&status=blacklist`
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
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}process-visa-order/${userId}`,
        { status: `${action}` }
      );
      if (response) {
        toast.success(`${action.toUpperCase()}`);
        try {
          const response = await fetchDataFromAPI(
            "GET",
            `${BASE_URL}visa-orders?page=${currentPage}&status=blacklist`
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
      type="blackList"
      handleBlockAction={handleAction}
      onPageChange={setCurrentPage}
    />
  );
};

export default BlackListRequest;
