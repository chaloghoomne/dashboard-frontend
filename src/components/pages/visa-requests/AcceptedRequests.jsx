// src/components/AcceptedRequests.js
import React, { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL } from "../../../Api/urls";
import UserList from "./components/TravelersList";
import { toast } from "react-toastify";

const AcceptedRequests = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}visa-orders?page=${currentPage}&status=sent-to-immigration`
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

  const handleAction = async (userId, action, data) => {
    if (typeof data === "string") {
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
              `${BASE_URL}visa-orders?page=${currentPage}&status=sent-to-immigration`
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
    } else {
      try {
        const newformData = new FormData();

        newformData.append("status", action);
        newformData.append("documents", data);
        const response = await fetchDataFromAPI(
          "PUT",
          `${BASE_URL}process-visa-order/${userId}`,
          newformData
        );
        if (response) {
          toast.success(`${action.toUpperCase()}`);
          try {
            const response = await fetchDataFromAPI(
              "GET",
              `${BASE_URL}visa-orders?page=${currentPage}&status=sent-to-immigration`
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
    }
  };

  return (
    <UserList
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      handleAction={handleAction}
      type="sent"
    />
  );
};

export default AcceptedRequests;
