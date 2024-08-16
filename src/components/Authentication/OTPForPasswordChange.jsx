import React, { useState } from "react";
import LoginLayoutButton from "../sharedComponents/LoginLayoutButton";
import OTPInput from "../sharedComponents/OTPInput";
import { BASE_URL, NetworkConfig } from "../../Api/urls";
import { useNavigate, useParams } from "react-router-dom";

const OTPForPasswordChange = ({ value }) => {
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const { email } = useParams();
  const Navigate = useNavigate();

  const setOTPVerified = (val) => {
    setIsOTPVerified(val);
  };
  const onClick = () => {
    if (isOTPVerified) {
      Navigate(`/setPassword/${email}`);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[35%] h-[80%] p-5 bg-white/20 rounded-[100px]">
        <div className=" w-full h-full p-5 gap-2 bg-white rounded-[100px] justify-center items-center flex flex-col">
          <p className="text-[#3180CA] font-medium text-3xl mb-1">
            OTP VERIFICATION
          </p>
          <p className="text-[#3180CA] text-lg mb-2 ">
            Hope You Are Doing Well!
          </p>
          <OTPInput
            length={4}
            title={"Email"}
            method={"PUT"}
            url={BASE_URL + NetworkConfig.FORGOTPASSWORDVERIFYOTP}
            setOTPVerified={setOTPVerified}
            value={email}
          />

          <button
            className="bg-[#3180CA] mt-4 rounded-lg text-white p-2 w-[90%]"
            onClick={onClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPForPasswordChange;
