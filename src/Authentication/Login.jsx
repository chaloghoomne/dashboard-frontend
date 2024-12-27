import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDataFromAPI } from "../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../Api/urls";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
// import logo from "../assets/logo.jpg"
import { generateToken } from "../firebase/config";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(true);
  const [token, setToken] = useState();
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      email: "",
      password: "",
    });
  }, []);

  const generateDeviceToken = async () => {
    const resp = await generateToken();
    const tken = localStorage.getItem("deviceToken");
    setToken(tken);
  };

  useEffect(() => {
    generateDeviceToken();
  }, []);

  const isvalidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
    setError((prev) => ({
      ...prev,
      email: isvalidEmail(value) ? "" : "Please enter a valid email",
    }));
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      password: value,
    }));
    setError((prev) => ({
      ...prev,
      password: value ? "" : "Password field must not be empty",
    }));
  };

  const validateInputs = () => {
    const emailError = !formData.email
      ? "Email field must not be empty"
      : !isvalidEmail(formData.email)
      ? "Please enter a valid email"
      : "";
    const passwordError = !formData.password
      ? "Password field must not be empty"
      : "";

    setError({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  };

  const onNextButtonClick = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await fetchDataFromAPI(
        "POST",
        BASE_URL + NetworkConfig.ADMINLOGIN,
        {
          email: formData.email,
          password: formData.password,
          device_token: token,
        }
      );

      if (response.data) {
        toast.success("Successfully Login");
        localStorage.setItem("token", response.data);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/home");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[35%] h-[80%] p-5 bg-white/20 rounded-[100px]">
        <div className="w-full h-full p-5 gap-2 bg-white rounded-[100px] justify-center items-center flex flex-col">
          {/* <img src={logo} className="pb-10 w-40" alt="" /> */}
          <div className="flex flex-col w-[90%]  ">
            <input
              className="w-full mb-2 border focus:outline-none border-[#9D9D9D] p-2 text-md rounded-lg"
              placeholder="Email Address"
              type="text"
              autoComplete="on"
              value={formData.email}
              onChange={handleEmailChange}
            />
            {error.email && (
              <span className="text-red-500 relative bottom-3">
                {error.email}
              </span>
            )}
          </div>
          <div className="flex relative rounded-lg  border border-[#9D9D9D] flex-col w-[90%]  ">
            <input
              className=" p-2 w-[90%] rounded-lg focus:outline-none "
              placeholder="Password"
              type={`${show ? "password" : "text"}`}
              autoComplete="on"
              onChange={handlePasswordChange}
              value={formData.password}
            />
            <div
              onClick={() => setShow(!show)}
              className="absolute cursor-pointer right-3 top-2"
            >
              {show ? (
                <IoMdEyeOff size={22} color="black" />
              ) : (
                <IoEye size={22} color="black" />
              )}
            </div>
            {error.password && (
              <p className="text-red-500 relative bottom-1">{error.password}</p>
            )}
          </div>

          <p
            className="text-[#FC6011] relative right-5 text-end self-end cursor-pointer opacity-[100%] text-md z-[2]"
            style={{ opacity: "100%" }}
            onClick={() => navigate("/changePassword")}
          >
            Forgot Password?
          </p>
          <button
            className="bg-[#FC6011] mt-4 rounded-lg text-white p-2 w-[90%]"
            onClick={onNextButtonClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
