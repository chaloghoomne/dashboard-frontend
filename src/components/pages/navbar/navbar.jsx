// import threelines from "../../../assets/threelines.png"
import { AiFillBell } from "react-icons/ai";
import { IoMoonSharp } from "react-icons/io5";
import { IoMdInformationCircle } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
const Navbar = ({ handlesidebar }) => {
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [count, setCount] = useState(0);
  const [hit, setHit] = useState(false);
  const handleEdit = () => {
    navigate("/home/editprofile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.NOTIFICATIONLST}`
        );

        setCount(response?.unreadNotifications);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [hit]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_PROFILE_PIC}`
        );
        if (response) {
          setProfileImageUrl(response?.data?.profile_url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, []);

  const gotoNotificationPage = async () => {
    try {
      const response = await fetchDataFromAPI("PUT", `${BASE_URL}admin-read`);
      if (response) {
        setHit(!hit);
      }
    } catch (error) {
      console.log(error);
    }
    navigate(`/home/getnotification`);
  };

  return (
    <div className="w-full h-[11%] bg-white flex justify-between cursor-pointer items-center">
      {/* three lines */}
      <div className=" ml-5 items-center flex justify-between  w-[50%]">
        <div className="" onClick={handlesidebar}>
          {/* <img src={threelines} className='w-6 ml-5 ' alt="" /> */}
          <IoReorderThreeOutline size={30} color="black" />
        </div>

        <div className="bg-white flex m-2 cursor-pointer items-center justify-evenly mr-10 min-w-96 p-1 rounded-xl ">
          <div className=" flex border border-[#D5D5D5]  cursor-pointer items-center rounded-lg h-8 justify-evenly bg-[#F5F6FA] w-96">
            <p>
              <IoSearchSharp size={24} color="#D5D5D5" style={{}} />
            </p>
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none bg-[#F5F6FA] w-80 text-black pl-2  "
            />
          </div>
          {/* <AiFillBell size={22} color='orange' />
<IoMoonSharp size={22} color='orange' />
<IoMdInformationCircle size={22} color='orange' /> */}
        </div>
      </div>
      <div className="mr-8 gap-2 flex justify-center items-center">
        <div
          onClick={() => gotoNotificationPage()}
          className="relative p-[8px] cursor-pointer"
        >
          <IoNotifications size={25} color="orange" />
          <span className="absolute top-0 right-0 w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-white p-1 text-[8px]">
            {count}
          </span>
        </div>
        <img
          onClick={() => handleEdit()}
          src={
            profileImageUrl
              ? profileImageUrl
              : "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          }
          className="w-10 h-10  rounded-full "
          alt=""
        />
        <p onClick={() => handleEdit()} className="text-lg text-black">
          Chalo ghoomne
        </p>
      </div>
    </div>
  );
};

export default Navbar;
