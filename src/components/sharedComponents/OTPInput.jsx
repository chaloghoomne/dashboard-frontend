import React, { useEffect, useRef, useState } from "react";
import { fetchDataFromAPI } from "../../Api/fetchData";
import { toast } from "react-toastify";
// import Button from "../Button";
// import axios from "axios";
// import { fetchDataFromAPI } from "../../../Api/fetchData";
// import { toast,ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const OTPInput = ({
  title,
  subtext,
  value,
  length,
  close,
  setOTPVerified,
  method,
  url,
  body,
  resendOtp,
  reqbody,
}) => {
  const inputRef = useRef(Array(length).fill(null));
  const [OTP, setOTP] = useState(Array(length).fill(""));
  const [resendOTP, setResendOTP] = useState(false);
  const [counter, setCounter] = useState({
    minutes: 1,
    seconds: 30,
  });
  const[error,setError] =useState({
    isError:false,
    message:''
  })
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter.seconds > 0) {
        setCounter((prev) => ({
          ...prev,
          seconds: counter.seconds - 1,
        }));
      }
      if (counter.seconds === 0) {
        if (counter.minutes === 0) {
          setResendOTP(true);
          clearInterval(interval);
        } else {
          setCounter((prev) => ({
            seconds: 59,
            minutes: counter.minutes - 1,
          }));
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [counter.seconds]);
  const closePopup = () => {
    close();
  };
  const handleTextchange = async (input, index) => {
    setError({isError:false})
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    if (index === length - 1 && input.length === 1) {
      const enteredOTP = newPin.join("");
      const id =  localStorage.getItem('id')
      try {
       body = {
              email:value,
              otp: enteredOTP,
            };
        // if (method === "POST") {
        //   body = {
        //   };
        // } 
        // else if (method === "PUT") {
        //     
        // }
        const response = await fetchDataFromAPI("POST", url, body);
        toast.success(response.message)
        setOTPVerified(true)
        // if (response && response.token) {
        //   localStorage.setItem("token", response.token);
        // }
        // if (response &&( response.status === 1 || response.result.status_code===200)) {
        //    ;
        // } else {
        //  setError({isError:true})
        // }
      } catch (error) {
        setError({isError:true})
        toast.error(error.message)
      }
    }
  };
  const onResend = async() => {
    setCounter(() => ({
      minutes: 1,
      seconds: 30,
    }));
    resendOtp();

  };
 
  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowLeft" && index > 0) {
      inputRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    } else if ((e.key === "Backspace" || e.key === "Delete") && index > 0) {
      e.preventDefault(); 
      setOTP((prev) => {
        const newOTP = [...prev];
        newOTP[index] = ""; 
        // setOTPVerified(false); 
        return newOTP;
      });
      inputRef.current[index - 1]?.focus(); 
    }
  };

  return (
    <div className="w-full px-5 self-center flex items-center justify-evenly flex-col">
      <div className="flex items-center justify-center w-full flex-col">
        <p className=" text-black text-lg lg:text-md mt-1 ">{`${title} OTP Authentication`}</p>
        <div className="lg:mt-1 mb-1">
          <p className=" text-black text-xs lg:text-md mt-1 mb-1">
            {" "}
            An authentication code has been sent to{" "}<br/>
            <span className=" text-md text-center">{value}</span>
          </p>
        </div>
      </div>
      <div className="flex  w-full self-center justify-center items-center mt-4">
        {Array.from({ length }, (_, index) => (
          <div className="w-10 h-10 rounded-lg  lg:w-12 lg:h-12 lg:rounded-xl  opacity-100 bg-white  flex items-center justify-center ">
            <input
              className="w-10 text-center rounded-xl border border-black text-black bg-white outline-none focus:border-orange h-full "
              key={index}
              type="text"
              maxLength={1}
              value={OTP[index]}
              onChange={(e) => handleTextchange(e.target.value, index)}
              onKeyDown={(e)=>handleKeyDown(e,index)}
              ref={(ref) => (inputRef.current[index] = ref)}
            />
          </div>
        ))}
      </div>
        {error.isError?<p style={{color:'red',fontSize:"12px",marginBottom:'5px'}}>Please re-enter the otp</p>:""}
      <div className=" text-2xl lg:text-4xl text-orange">
        {counter.seconds > 0 || counter.minutes > 0 ? (
          <p className="">
            {counter.minutes < 10 ? ` 0${counter.minutes}` : counter.minutes} :{" "}
            {counter.seconds < 10 ? `0${counter.seconds}` : counter.seconds}
          </p>
        ) : (
          ""
        )}
      </div>
      <button
        title={"Resend"}
        disabled={!resendOTP}
        onClick={onResend}
        
      ></button>
   
    </div>
  );
};

export default OTPInput;
