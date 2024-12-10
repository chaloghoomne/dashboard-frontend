import React, { useState } from "react";
import EyeOpen from "../../assets/EyeOpen.png";
import EyeClose from "../../assets/EyeClose.png";
import { fetchDataFromAPI } from "../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../Api/urls";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoginLayoutButton from "../sharedComponents/LoginLayoutButton";
import Input from "../sharedComponents/Input";
const SetPasswordPage = () => {
  const navigate= useNavigate()
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState({
    new: false,
    confirm: false,
  });
  const togglePasswordVisibility = (id) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const { email } = useParams();
  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
      password
    );
  };
  const InputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      setError((prev) => ({
        ...prev,
        newPassword: validatePassword(value)
          ? ""
          : "Password must be 8 characters long, include caps, special character, and a numerical character",
      }));
    }

    if (name === "confirmPassword") {
      setError((prev) => ({
        ...prev,
        confirmPassword:
          value === formData.newPassword ? "" : "Passwords must match",
      }));
    }
  };

  const onNewPasswordChange = (e)=>{
setError((prev)=>({
  ...prev,
newPassword:''}))
setFormData((prev)=>({
  ...prev,
  newPassword:e.target.value
}))
setError((prev)=>({
  ...prev,
  newPassword:validatePassword(e.target.value)?'':"Password must be 0f 8 characters long and include a number, a special character, a small and a capital letter"
}))
  }
  const onConfirmPasswordChange = (e)=>{
    setError((prev)=>({
      ...prev,
    confirmPassword:''}))
    setFormData((prev)=>({
      ...prev,
      confirmPassword:e.target.value
    }))
    setError((prev)=>({
      ...prev,
      confirmPassword:e.target.value === formData.newPassword?'':"Passwords do not match"
    }))
      }
  const onSubmit = async (e) => {
    e.preventDefault();
    if(!formData.newPassword || !formData.confirmPassword || formData.newPassword !==formData.confirmPassword)return;
    try {
      const response = await fetchDataFromAPI(
        "POST",
        BASE_URL + NetworkConfig.RESETADMINPASSWORD,
        {
          email: email,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        }
      );
      toast.success(response.message);
      navigate("/login")
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
   <div className="w-full h-full flex justify-center items-center" >
      <div className="w-[35%] h-[80%] p-5 bg-white/20 rounded-[100px]">
    <div  className=" w-full h-full p-5 gap-2 bg-white rounded-[100px] justify-center items-center flex flex-col">
     <p className="text-3xl text-[#FC6011]">CHANGE PASSWORD</p>
      <p className="text-xl text-[#FC6011] mb-[25px]">Hope you are doing well !</p>
     
      
<input
  className="border p-1 w-[90%] rounded-lg focus:outline-none border-[#FC6011]"
          placeholder="Password"
        value={formData.newPassword}
        onClick={() => togglePasswordVisibility("new")}
        type={passwordVisible.new ? "text" : "password"}
        onChange={onNewPasswordChange}
      />
      <input
        className="border p-1 w-[90%] rounded-lg focus:outline-none border-[#FC6011]"
          placeholder=" Confirm Password"
        value={formData.confirmPassword}
        onClick={() => togglePasswordVisibility("confirm")}
        type={passwordVisible.confirm ? "text" : "password"}
        onChange={onConfirmPasswordChange}
       
      />
      
     
      
      <button
        className="bg-[#FC6011] mt-4 rounded-lg text-white p-2 w-[90%]"
        onClick={onSubmit}
      >Continue</button>

      
      
    </div>
    </div>
    </div>
  );
};

export default SetPasswordPage;

