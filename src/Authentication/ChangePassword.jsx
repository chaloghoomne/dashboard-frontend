import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../Api/urls";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(isValidEmail(e.target.value) ? "" : "Please enter a valid email");
  };

  const onButtonClick = async () => {
    if (!email) {
      return setError("Email field cannot be empty");
    }

    if (!isValidEmail(email)) {
      return setError("Please enter a valid email");
    }

    try {
      const response = await fetchDataFromAPI(
        "POST",
        BASE_URL + NetworkConfig.FORGOTPASSWORD,
        { email: email }
      );
      localStorage.setItem('id', response.id);
      navigate(`/changePasswordOTP/${email}`);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[35%] h-[80%] p-5 bg-white/20 rounded-[100px]">
        <div className="w-full h-full p-5 gap-2 bg-white rounded-[100px] flex flex-col justify-center items-center">
          <p className="text-[#FC6011] font-medium text-3xl">CHANGE PASSWORD</p>
          <p className="text-black text-lg mb-[20px]">Hope you are doing well</p>
          <input
            className="w-[90%] border focus:outline-none border-[#5B5B5B] p-1 text-md rounded-lg"
            placeholder="Email"
            autoComplete="on"
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <p className="text-black">ababa</p>
          <button
            className="bg-[#FC6011] mt-4 rounded-lg text-white p-2 w-[90%]"
            onClick={onButtonClick}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
