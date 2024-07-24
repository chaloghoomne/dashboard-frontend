import React, { useState, useEffect } from "react";
import logo from "../../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { IoTicketSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { GrChapterAdd } from "react-icons/gr";
import { ImSection } from "react-icons/im";
import { FcAssistant } from "react-icons/fc";
import { MdContactSupport } from "react-icons/md";
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
  console.log(typeof tickets, typeof pendingPosts);
  useEffect(() => {
    const parts = pathName.split("/");
    const main = parts[2];
    const sub = parts[3];

    setActiveItem(main);
    setActiveSublist(sub);
  }, [pathName]);

  const activecolor = "#11aaf6"
  const inactivecolor = ""
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
        console.log(response);

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
      id: 2,
      name: "Requests",
      to: "/home/requests/:id",
      icon: (
        <FaUsers color={activeItem === "requests" ? "white" : "black"} size={20} />
      ),
      sublist: [
        {
          subitem: "Accepted ",
          icon: (
            <GoDotFill
              color={activeSublist === "accepted" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/requests/accepted",
        },
        {
          subitem: "Rejected ",
          icon: (
            <GoDotFill
              color={activeSublist === "rejected" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/requests/rejected",
        },
        {
          subitem: "Pending ",
          icon: (
            <GoDotFill
              color={activeSublist === "pending" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/requests/pending",
        },
        {
          subitem: "Blocked ",
          icon: (
            <GoDotFill
              color={activeSublist === "blocked" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/requests/blocked",
        },
      ],
    },
    {
      id: 3,
      name: "Packages",
      to: "/home/packages/country",
      icon: (
        <HiOutlineLightBulb
          color={activeItem === "packages" ? "white" : "black"}
          size={20}
        />
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
          url: "/home/packages/country",
        },
        {
          subitem: "Plans",
          icon: (
            <GoDotFill
              color={activeSublist === "plans" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/packages/plans",
        },
        {
          subitem: "Knowledge",
          icon: (
            <GoDotFill
              color={activeSublist === "ads" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/insights/ads",
        },
        {
          subitem: "Events",
          icon: (
            <GoDotFill
              color={activeSublist === "events" ? activecolor : "#faa773"}
              size={20}
            />
          ),
          url: "/home/insights/events",
        },
      ],
    },
    {
      id: 4,
      name: "Premium Plans",
      to: "/home/premium",
      icon: (
        <MdOutlineWorkspacePremium
          color={pathName === "/home/premium" ? "white" : "black"}
          size={20}
        />
      ),
    },

    {
      id: 2,
      name: "Sectors",
      to: "/home/sectors/list",
      icon: (
        <ImSection
          color={activeItem === "sectors" ? "white" : "black"}
          size={20}
        />
      ),
    },

    {
      id: 2,
      name: "Chapters",
      to: "/home/chapters/add",
      icon: (
        <GrChapterAdd
          color={activeItem === "chapters" ? "white" : "black"}
          size={20}
        />
      ),
      sublist: [
        {
          subitem: "Add",
          icon: (
            <GoDotFill
              color={activeSublist === "add" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/chapters/add",
        },
        {
          subitem: "List",
          icon: (
            <GoDotFill
              color={activeSublist === "list" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/chapters/list",
        },
      ],
    },
    {
      id: 2,
      name: "Services",
      to: "/home/services/list",
      icon: (
        <GrServices
          color={activeItem === "services" ? "white" : "black"}
          size={20}
        />
      ),
      sublist: [
        {
          subitem: "List",
          icon: (
            <GoDotFill
              color={activeSublist === "list" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/services/list",
        },
      ],
    },
    {
      id: 4,
      name: "Support",
      to: "/home/support/add",
      icon: (
        <FcAssistant
          color={activeItem === "support" ? "white" : "black"}
          size={20}
        />
      ),
      sublist: [
        {
          subitem: "Add",
          icon: (
            <GoDotFill
              color={activeSublist === "add" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/support/add",
        },
        {
          subitem: "List",
          icon: (
            <GoDotFill
              color={activeSublist === "list" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/support/list",
        },
      ],
    },
    {
      id: 4,
      name: "Post",
      to: "/home/post",
      icon: (
        <MdOutlineLocalPostOffice
          color={pathName === "/home/post" ? "white" : "black"}
          size={20}
        />
      ),
    },

    {
      id: 2,
      name: "Assistant",
      to: "/home/assistant/ticket",
      icon: (
        <MdContactSupport
          color={activeItem === "assistant" ? "white" : "black"}
          size={20}
        />
      ),
      sublist: [
        {
          subitem: "Tickets",
          icon: (
            <GoDotFill
              color={activeSublist === "ticket" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/assistant/ticket",
        },
        {
          subitem: "Query",
          icon: (
            <GoDotFill
              color={activeSublist === "query" ? "#32a852" : "#faa773"}
              size={20}
            />
          ),
          url: "/home/assistant/query",
        },
      ],
    },
    {
      id: 4,
      name: "Notification",
      to: "/home/notification",
      icon: (
        <IoNotificationsSharp
          color={activeItem === "notification" ? "white" : "black"}
          size={20}
        />
      ),
    },
    {
      id: 2,
      name: "APK File",
      to: "/home/apkfile",
      icon: (
        <ImSection
          size={20}
          color={activeItem === "apkfile" ? "white" : "black"}
        />
      ),
    },
    {
      id: 2,
      name: "Tickets",
      to: "/home/tickets",
      icon: (
        <IoTicketSharp
          size={20}
          color={activeItem === "tickets" ? "white" : "black"}
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
                    ?`bg-[#11aaf6]  text-white`
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
                         {subitem.subitem === "Pending User" && pendingUsers?.length >= 1 && (
                  <span className="text-red-500  ml-2">•</span>
                )}
                {subitem.subitem === "Query" && pendingUsers?.length >= 1 && (
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
