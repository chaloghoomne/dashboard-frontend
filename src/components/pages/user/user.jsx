import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import ProgressBar from "@ramonak/react-progress-bar";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import { useParams } from "react-router-dom";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { IoIosEye } from "react-icons/io";
// import UserModal from "./components/UserModal";
import { toast } from "react-toastify";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const User = () => {
  const [userData, setUserData] = useState({});
  const [premiumPlan, setPremiumPlan] = useState(null);
  const [company, setCompany] = useState({});
  const [modalData, setModalData] = useState([]);
  const [profile, setProfile] = useState(true);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchDataFromAPI(
          "POST",
          `${BASE_URL}${NetworkConfig.USERBYID}`,
          { id }
        );
        if (response) {
          setUserData(response?.user);
          setCompany(response?.companies[0]);
          setPremiumPlan(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);

  const handleRequestMadeClick = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}${NetworkConfig.MADEREQUEST}`,
        { id }
      );
      if (response) {
        setModalData(response?.requestedCompanies);
        setModalTitle("Request Made");
        setIsModalOpen(true);
      }
    } catch (error) {
      toast.error("No Requested Company");
      console.log(error);
    }
  };

  const handleRequestReceivedClick = async (id) => {
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}${NetworkConfig.REQUESTRECEIVED}`,
        { id }
      );
      if (response) {
        setModalData(response?.requestingCompanies);
        setModalTitle("Request Received");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("No Requester Company");
    }
  };

  const {
    last_name,
    first_name,
    city,
    email,
    state,
    pin,
    chapter,
    phone,
    profile_pic,
    sector_title,
  } = userData;

  const calculateProgress = (remainingDays, planType) => {
    const totalDays = planType === "Annually" ? 365 : 30;
    const usedDays = totalDays - remainingDays;
    return Math.floor((usedDays / totalDays) * 100);
  };

  const remainingDays = premiumPlan?.vipPlanDetails?.remainingDays;
  const planType = premiumPlan?.vipPlanDetails?.plan_type;
  const progress =
    remainingDays !== undefined
      ? calculateProgress(remainingDays, planType)
      : 0;

  const totalDays = planType === "Annually" ? 365 : 30;
  const usedPosts = premiumPlan?.postCount;
  const totalPosts = premiumPlan?.vipPlanDetails?.post_count;
  const usedServices = premiumPlan?.serviceCount;
  const totalServices = premiumPlan?.vipPlanDetails?.service_count;
  const startDate = premiumPlan?.vipPlanDetails?.purchasedDate?.slice(0, 10);
  return (
    <div className="w-full pl-10 flex overflow-auto min-h-[70%] max-h-[90%] flex-col pt-5 bg-[#F7F8FA] h-full">
      <h1 className="text-2xl text-black font-medium">USER</h1>
      <p className="text-black text-md pb-2">
        {" "}
        User/view/<span className="text-md text-[#FC6011]">Account</span>
      </p>
      <div className="overflow-auto flex flex-col gap-7 min-h-[85%] max-h-[85%] "> 
      {premiumPlan?.vipPlanDetails && (
          <div className="w-[90%] mb-3 self-start justify-center h-auto bg-white shadow-md shadow-[#00000029] flex flex-col items-center rounded-md p-5">
      <div className="w-full  flex items-center justify-center px-5 pt-4 relative">
  <button
    style={{ background: 'linear-gradient(to right, #ff9800, #ffc107)' }}
    className="p-2 w-[40%] rounded-md text-white font-medium relative z-10"
  >
    PREMIUM MEMBER
  </button>
  {/* <div className="absolute top-4 inset-0 flex items-center justify-center">
    <div className="sparkles"></div>
  </div> */}
</div>



      <p className="text-[#FC6011] pb-2 font-medium text-2xl">
        {premiumPlan?.vipPlanDetails?.amount}&#8377;/
        <span className="text-lg text-[#C5C5C6] ">
          {premiumPlan?.vipPlanDetails?.plan_type === "Annually" ? "year" : "month"}
        </span>
      </p>
<div className="flex justify-evenly w-full">

      <div className="w-[30%] h-40 bg-slate-100 shadow-md shadow-gray-300  flex flex-col items-start px-5 pt-3">
        <h2 className="text-lg font-medium text-[#535355]">Plan Benefits</h2>
        <ul className="text-[#535355] text-sm list-disc list-inside">
          <li>Total Posts: {totalPosts}</li>
          <li>Used Posts: {usedPosts}</li>
          <li>Total Services: {totalServices}</li>
          <li>Used Services: {usedServices}</li>
        </ul>
      </div>

      <div className=" w-[30%] h-40 bg-slate-100 shadow-md shadow-gray-300  flex justify-between  py-3">
        <div className="w-full px-5">
          <h2 className="text-lg font-medium text-[#535355]">Plan Details</h2>
          <p className="text-[#535355] flex gap-2 items-center text-md">
            <GoDotFill size={12} color="#535355" />
            Start Date:
            <span className="text-[#C5C5C6] text-sm">{startDate}</span>
          </p>
          <p className="text-[#535355] flex gap-2 items-center text-md">
            <GoDotFill size={12} color="#535355" />
            Total Days:
            <span className="text-[#C5C5C6] text-sm">{totalDays}</span>
          </p>
          <p className="text-[#535355] flex gap-2 items-center text-md">
            <GoDotFill size={12} color="#535355" />
            Remaining Days:
            <span className="text-[#C5C5C6] text-sm">{remainingDays}</span>
          </p>
        </div>
        </div>

        <div className=" min-w-[30%] flex flex-col items-center justify-center h-40 p-4 bg-slate-100 shadow-md shadow-gray-300 " style={{ width: 160, height: 160 }}>
          <h2 className="text-lg font-medium pb-2 text-[#535355]">Plan Consumed</h2>
          <div style={{ width: 110, height: 110 }}>
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: 'round',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `rgba(252, 96, 17, ${progress / 100})`,
              textColor: '#FC6011',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
         </div>
        </div>
      </div>
    </div>
        )}
      <div className="flex w-[90%] my-4 justify-between gap-5">
        <div className="w-96 bg-white shadow-md shadow-[#00000029] flex flex-col items-center rounded-md">
          <div className="w-full relative flex items-center px-8 self-center flex-col pt-4">
            <h1 className="pb-2 text-xl font-bold text-[#FC6011]">User </h1>
             <div className="border relative bottom-2 border-[#C5C5C6] mb-3 rounded-xl bg-[#C5C5C6] w-14"></div>
            
            <img
            className="w-24 h-24 rounded-lg"
              src={
                profile_pic
                  ? profile_pic 
                  : "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              }
            />
            <p className="text-[#6B6B6B] pb-2 pt-2 font-medium text-lg">
              {first_name} ${last_name}
            </p>
</div>
            <div className="border border-[#C5C5C6] my-3 rounded-xl bg-[#C5C5C6] w-full"></div>
         

          <div className="w-[85%] bg-slate-100 shadow-md shadow-gray-300 mb-5 flex px-8 self-center flex-col pt-1 pb-2">
            <h1 className="pb-2 font-bold text-[#383737]">User Details</h1>
            <div className=" flex flex-col gap-1 ">
              <p className="text-[#535355] font-medium text-sm">
                Email:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {email}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                First Name:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {first_name}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Last Name:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {last_name}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                City:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {city}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                State:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {state}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Pincode:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {pin}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Chapter:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {chapter}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Phone:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {phone}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Sector:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {sector_title}
                </span>{" "}
              </p>
            </div>
          </div>
          
         
        </div>


         <div className="w-96 bg-white shadow-md shadow-[#00000029] flex flex-col items-center rounded-md">
          <div className="w-full relative flex items-center px-8 self-center flex-col pt-4">
            <h1 className="pb-2 text-xl font-bold text-[#FC6011]">Company </h1>
            <div className="border relative bottom-2 border-[#C5C5C6] mb-3 rounded-xl bg-[#C5C5C6] w-24"></div>
            
            <img
              className="w-24 h-24 rounded-lg"
              src={
                profile_pic
                  ? company?.logo 
                  : "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
              }
            />
            <p className="text-[#6B6B6B]  py-2 font-medium text-lg">
              {company?.name}
            </p>
</div>
            <div className="border my-3 border-[#C5C5C6] rounded-xl bg-[#C5C5C6] w-full"></div>
         

           <div className="w-[85%] bg-slate-100 shadow-md shadow-gray-300  flex px-8 gap-1 self-center flex-col pt-1 pb-2">
            <h1 className="pb-2 font-bold text-[#383737]">Company Details</h1>
            <div className="flex flex-col gap-1 ">
              <p className="text-[#535355] font-medium text-sm">
                Name:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.name}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Phone:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.contact_no}
                </span>{" "}
              </p>
              {/* <p className="text-[#535355] font-medium text-sm">
                City:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.city}
                </span>{" "}
              </p> */}
              <p className="text-[#535355] font-medium text-sm">
                Email:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.email}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                GST_NO:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.gst_no}
                </span>{" "}
              </p>
               <p className="text-[#535355] font-medium text-sm">
                REG_DATE:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.reg_date}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                Portfolio:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.portfolio_url}
                </span>{" "}
              </p>
              {/* <p className="text-[#535355] font-medium text-sm">
                Pincode:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.pin}
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium text-sm">
                State:{" "}
                <span className="text-[#C5C5C6] font-normal text-sm">
                  {company?.state}
                </span>{" "}
              </p> */}

              <p className="text-[#535355] font-medium w-full flex justify-between items-center text-sm">
                Request Made{" "}
                <span
                  className="text-[#C5C5C6] font-normal"
                  onClick={() => handleRequestMadeClick(company?.id)}
                >
                  {company?.requestsMade}{" "}
                  <IoIosEye
                    size={20}
                    style={{
                      display: "inline",
                      marginLeft: "5px",
                      cursor: "pointer",
                    }}
                    color="blue"
                  />
                </span>{" "}
              </p>
              <p className="text-[#535355] font-medium w-full flex items-center justify-between text-sm">
                Request Received{" "}
                <span
                  className="text-[#C5C5C6] font-normal"
                  onClick={() => handleRequestReceivedClick(company?.id)}
                >
                  {" "}
                  {company?.requestsReceived}
                  <IoIosEye
                    size={20}
                    style={{
                      display: "inline",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    color="blue"
                  />
                </span>{" "}
              </p>
            </div>
           
          </div>
          
         
        </div>

        
      </div>


      
</div>
      {/* <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        data={modalData}
      /> */}
    </div>
  );
};

export default User;
