import React, { useEffect, useState } from "react";

import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDataFromAPI } from "../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../Api/urls";
import Navbar from "./navbar/navbar";
import SidebarGhoomne from "./sidebar/sidebar";

function HomeLayoutGhoomne() {
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    profilePic: "",
  });

  const [show, setShow] = useState(true);

  const navigate = useNavigate();
  const handlelogics = (to) => {
    navigate(to);
  };

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          BASE_URL + NetworkConfig.ADMINPROFILE
        );
        setAdminDetails({
          name: response.result.name,
          profilePic: response.result.prifilePic,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAdmin();
  }, []);

  const handleSubRoute = (url) => {
    navigate(url);
  };

  const signouthandler = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("LogOut SuccesFully");
  };

  return (
    <div className="flex h-screen w-screen ">
      {/* Sidebar */}
      {show && (
        <div
          className={`flex  flex-col min-w-[20%]  max-w-[20%] bg-purple max-h-[100%]  `}
        >
          <SidebarGhoomne />
        </div>
      )}

      {/* right component */}
      <div className={`flex flex-col ${show ? "w-[80%]" : "w-full"}`}>
        {/* navbar */}
        <Navbar handlesidebar={() => setShow(!show)} />
        {/* main content */}
        <Outlet />
      </div>
    </div>
  );
}

export default HomeLayoutGhoomne;
