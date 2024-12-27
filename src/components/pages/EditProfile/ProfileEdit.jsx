import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { fetchDataFromAPI } from "../../../Api/fetchData";
import { BASE_URL, NetworkConfig } from "../../../Api/urls";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const ProfileEdit = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}${NetworkConfig.GET_PROFILE_PIC}`
        );
        if (response) {
          setProfileImageUrl(response.data.profile_url);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", profileImage);

    try {
      const response = await fetchDataFromAPI(
        "PUT",
        `${BASE_URL}${NetworkConfig.UPDATE_PROFILE_PIC}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.message === "admin updated successfully") {
        setProfileImageUrl(response.imageUrl);
        toast.success("Profile picture updated successfully");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating profile picture");
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    const passwordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}admin-reset-password`,
        passwordData
      );
      if (response) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        toast.success("Password changed successfully");
      } else {
        toast.error(response.message || "Error changing password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error changing password");
    }
  };

  return (
    <div className="bg-slate-300 h-[89%]">
      <h1 className="text-2xl text-[#11aaf6] pt-3 pl-5 font-bold mb-5">
        Edit Profile
      </h1>

      <div className="container flex justify-evenly mx-auto py-10">
        <div className="mb-10">
          <h2 className="text-xl text-black font-semibold mb-3">
            Profile Picture
          </h2>
          <div className="relative w-32 h-32 mb-5">
            {previewImageUrl ? (
              <img
                src={previewImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <input
              type="file"
              id="profileImageInput"
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <label
              htmlFor="profileImageInput"
              className="absolute bottom-0 right-0 bg-[#11aaf6] text-white p-2 rounded-full cursor-pointer"
            >
              <FaPlus />
            </label>
          </div>
          <button
            onClick={handleProfileImageSubmit}
            className="px-4 py-2 bg-[#11aaf6] text-white rounded"
          >
            Update Profile Picture
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Change Password</h2>
          <form onSubmit={handlePasswordChangeSubmit}>
            <div className="mb-3 relative">
              <label htmlFor="oldPassword" className="block mb-1">
                Old Password
              </label>
              <input
                type={`${show1 ? "password" : "text"}`}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <div
                onClick={() => setShow1(!show1)}
                className="absolute cursor-pointer right-3 top-10"
              >
                {show1 ? (
                  <IoMdEyeOff size={22} color="black" />
                ) : (
                  <IoEye size={22} color="black" />
                )}
              </div>
            </div>
            <div className="mb-3 relative">
              <label htmlFor="newPassword" className="block mb-1">
                New Password
              </label>
              <input
                type={`${show2 ? "password" : "text"}`}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <div
                onClick={() => setShow2(!show2)}
                className="absolute cursor-pointer right-3 top-10"
              >
                {show2 ? (
                  <IoMdEyeOff size={22} color="black" />
                ) : (
                  <IoEye size={22} color="black" />
                )}
              </div>
            </div>
            <div className="mb-3 relative">
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
              </label>
              <input
                type={`${show3 ? "password" : "text"}`}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
              <div
                onClick={() => setShow3(!show3)}
                className="absolute cursor-pointer right-3 top-10"
              >
                {show3 ? (
                  <IoMdEyeOff size={22} color="black" />
                ) : (
                  <IoEye size={22} color="black" />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#11aaf6] text-white rounded"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
