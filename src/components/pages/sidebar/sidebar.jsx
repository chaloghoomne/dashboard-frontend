import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { LiaBlogSolid } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdContactPhone } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { IoTicketSharp } from "react-icons/io5";
import { SiGoogleforms } from "react-icons/si";
import { IoMdNotifications } from "react-icons/io";
import { MdPolicy } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { MdLabelImportant } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { LiaHeadingSolid } from "react-icons/lia";
import { RiGitPullRequestFill } from "react-icons/ri";
import { FaCcVisa } from "react-icons/fa6";
import { FaUsersViewfinder } from "react-icons/fa6";

import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";

const SidebarGhoomne = () => {
  const navigate = useNavigate();
  const pathName = window.location.pathname;
  const [activeItem, setActiveItem] = useState("");
  const [activeSublist, setActiveSublist] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const parts = pathName.split("/");
    const main = parts[2];
    const sub = parts[3];

    setActiveItem(main);
    setActiveSublist(sub);
  }, [pathName]);

  const activecolor = "#11aaf6";
  const inactivecolor = "";
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.PENDINGUSERS}`
        );
        setPendingUsers(response.profiles);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPendingPosts = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}/pending-post`
        );
        setPendingPosts(response.post);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIssues = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_TICKETS}`
        );

        if (response) {
          // const openTickets = response?.data?.filter((item)=>{
          //   return item.status === 'open'
          // })
          setTickets(response?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssues();

    fetchPendingUsers();
    fetchPendingPosts();
  }, []);

  const handleNavigate = (to, item, sublist = "") => {
    navigate(to);
    setActiveItem(item);
    setActiveSublist(sublist);
  };

  const handleItemWithSublist = (item) => {
    const firstSublistItem = item.sublist[0];
    handleNavigate(
      firstSublistItem.url,
      item.to.split("/")[2],
      firstSublistItem.url.split("/")[3]
    );
  };

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      to: "/home",
      icon: (
        <RiDashboardFill
          color={pathName === "/home" ? "white" : "black"}
          size={20}
        />
      ),
    },
    {
      id: 1,
      name: "Users",
      to: "/home/users",
      icon: (
        <FaUsers color={activeItem === "users" ? "white" : "black"} size={20} />
      ),
    },
    {
      id: 2,
      name: "Visa Requests",
      to: "/home/request/accepted",
      icon: (
        <RiGitPullRequestFill
          color={activeItem === "request" ? "white" : "black"}
          size={20}
        />
      ),
      sublist: [
        {
          subitem: "Pending ",
          icon: (
            <GoDotFill
              color={activeSublist === "pending" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/request/pending",
        },
        {
          subitem: "Sent to Immigration ",
          icon: (
            <GoDotFill
              color={
                activeSublist === "senttoimmigration" ? activecolor : "#faa773"
              }
              size={20}
            />
          ),
          url: "/home/request/senttoimmigration",
        },
        {
          subitem: "Blacklist Check ",
          icon: (
            <GoDotFill
              color={activeSublist === "blacklist" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/request/blacklist",
        },
        {
          subitem: "Approve/Rejected ",
          icon: (
            <GoDotFill
              color={activeSublist === "rejected" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/request/rejected",
        },
      ],
    },
    {
      id: 1,
      name: "Draft  Visa Request ",
      to: "/home/pending",
      icon: (
        <FaCcVisa
          color={activeItem === "pending" ? "white" : "black"}
          size={20}
        />
      ),
    },
    {
      id: 3,
      name: "Visa",
      to: "/home/visa/country",
      icon: (
        <FaCcVisa color={activeItem === "visa" ? "white" : "black"} size={20} />
      ),
      sublist: [
        {
          subitem: "Country",
          icon: (
            <GoDotFill
              color={activeSublist === "country" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/visa/country",
        },
        {
          subitem: "Plans",
          icon: (
            <GoDotFill
              color={activeSublist === "plans" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/visa/plans",
        },
        {
          subitem: "Visa Categories",
          icon: (
            <GoDotFill
              color={activeSublist === "visaCategories" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/visa/visaCategories",
        },
        {
          subitem: "Documents",
          icon: (
            <GoDotFill
              color={activeSublist === "documents" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/visa/documents",
        },
      ],
    },
    {
      id: 1,
      name: "Headings",
      to: "/home/headings",
      icon: (
        <LiaHeadingSolid
          color={activeItem === "headings" ? "white" : "black"}
          size={20}
        />
      ),
    },
    {
      id: 1,
      name: "Partners",
      to: "/home/partners",
      icon: (
        <GiThreeFriends
          color={activeItem === "partners" ? "white" : "black"}
          size={20}
        />
      ),
    },
    // {
    //   id: 1,
    //   name: "Important Points",
    //   to: "/home/important",
    //   icon: (
    //     <MdLabelImportant
    //       color={activeItem === "important" ? "white" : "black"}
    //       size={20}
    //     />
    //   ),
    // },
    {
      id: 1,
      name: "Subscribers",
      to: "/home/subscriber",
      icon: (
        <FaUsersViewfinder
          color={activeItem === "subscriber" ? "white" : "black"}
          size={20}
        />
      ),
    },
    {
      id: 1,
      name: "Blogs",
      to: "/home/blogs",
      icon: (
        <LiaBlogSolid
          color={activeItem === "blogs" ? "white" : "black"}
          size={20}
        />
      ),
    },
    {
      id: 3,
      name: "Policies",
      to: "/home/policies/privacy",
      icon: (
        <MdPolicy color={activeItem === "policies" ? "white" : "black"} size={20} />
      ),
      sublist: [
        {
          subitem: "Privacy Policy",
          icon: (
            <GoDotFill
              color={activeSublist === "privacy" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/policies/privacy",
        },
        {
          subitem: "Refund Policy",
          icon: (
            <GoDotFill
              color={activeSublist === "refund" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/policies/refund",
        },
        {
          subitem: "Terms Conditions",
          icon: (
            <GoDotFill
              color={activeSublist === "terms" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/policies/terms",
        },
       
      ],
    },
    {
      id: 3,
      name: "Our Details",
      to: "/home/details/contact",
      icon: (
        <MdContactPhone color={activeItem === "details" ? "white" : "black"} size={20} />
      ),
      sublist: [
        {
          subitem: "Contact Us",
          icon: (
            <GoDotFill
              color={activeSublist === "contact" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/details/contact",
        },
        {
          subitem: "About Us",
          icon: (
            <GoDotFill
              color={activeSublist === "about" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/details/about",
        },
        
       
      ],
    },
    {
      id: 3,
      name: "Forms",
      to: "/home/forms/career",
      icon: (
        <SiGoogleforms color={activeItem === "forms" ? "white" : "black"} size={20} />
      ),
      sublist: [
        {
          subitem: "Career Listing",
          icon: (
            <GoDotFill
              color={activeSublist === "career" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/forms/career",
        },
        {
          subitem: "Travel Agent Listing",
          icon: (
            <GoDotFill
              color={activeSublist === "travel" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/forms/travel",
        },
        
       
      ],
    },
    // {
    //   id: 1,
    //   name: "Transactions",
    //   to: "/home/transaction",
    //   icon: (
    //     <LiaBlogSolid
    //       color={activeItem === "transaction" ? "white" : "black"}
    //       size={20}
    //     />
    //   ),
    // },
   

    {
      id: 1,
      name: "Notifications",
      to: "/home/notification",
      icon: (
        <IoMdNotifications
          color={activeItem === "notification" ? "white" : "black"}
          size={20}
        />
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      <img src={logo} className="pt-5 pb-2 self-center w-[50%]" />
      <div className="w-full max-h-full  overflow-auto no-scrollbar flex flex-col gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="w-full">
            <div
              className={`${
                activeItem === item.to.split("/")[2]
                  ? `border-l-4 border-[#11aaf6]`
                  : ""
              } w-full cursor-pointer flex justify-center items-center`}
            >
              <div
                onClick={() =>
                  item.sublist
                    ? handleItemWithSublist(item)
                    : handleNavigate(item.to, item.to.split("/")[2])
                }
                className={`${
                  activeItem === item.to.split("/")[2]
                    ? `bg-[#11aaf6]  text-white`
                    : "text-black "
                } min-w-[70%] rounded-sm p-2 gap-2 flex items-center`}
              >
                <p>{item.icon}</p>
                <p>{item.name}</p>
                {item.name === "Users" && pendingUsers?.length >= 1 && (
                  <span className="text-red-500  ml-2">•</span>
                )}
                {item.name === "Post" && pendingPosts?.length >= 1 && (
                  <span className="text-red-500 ml-2">•</span>
                )}
                {item.name === "Assistant" &&
                  tickets?.length >= 1 &&
                  typeof tickets === "object" && (
                    <span className="text-red-500 ml-2">•</span>
                  )}
              </div>
            </div>
            {item.sublist && activeItem === item.to.split("/")[2] && (
              <div className="w-full cursor-pointer self-center flex flex-col justify-center items-center">
                <div className="w-[70%] flex flex-col justify-start items-center">
                  <p className="w-[15px] ml-7  self-start h-2 border-b-2 border-l-2 border-[#11aaf6]"></p>
                  {item.sublist.map((subitem) => (
                    <>
                      <p
                        className={`${
                          activeSublist === subitem.url.split("/")[3]
                            ? " self-start "
                            : "self-start"
                        }  gap-2 mt-[-8px] font-bold px-2 ml-8 text-[#11aaf6] flex justify-center items-center`}
                      >
                        |
                      </p>
                      <div
                        key={subitem.url}
                        onClick={() =>
                          handleNavigate(
                            subitem.url,
                            item.to.split("/")[2],
                            subitem.url.split("/")[3]
                          )
                        }
                        className={`${
                          activeSublist === subitem.url.split("/")[3]
                            ? " self-start "
                            : "self-start"
                        }  px-2 gap-2 ml-6 text-black flex justify-center items-center`}
                      >
                        <p>{subitem.icon}</p>
                        <p>{subitem.subitem}</p>
                        {subitem.subitem === "Pending User" &&
                          pendingUsers?.length >= 1 && (
                            <span className="text-red-500  ml-2">•</span>
                          )}
                        {subitem.subitem === "Query" &&
                          pendingUsers?.length >= 1 && (
                            <span className="text-red-500  ml-2">•</span>
                          )}
                      </div>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        <div
          className={`active:border-l-4 cursor-pointer self-start  active:border-orange-400 w-[70%] flex justify-center items-center`}
        >
          <div
            onClick={handleLogout}
            className={`active:bg-orange-400 active:text-white pr-4 text-black min-w-[90%] p-2 my-2 gap-2 flex justify-center items-center`}
          >
            <p>
              <BiLogOut color="black" size={20} />
            </p>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarGhoomne;
