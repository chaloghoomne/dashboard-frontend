import React from "react";
import ForwardArrow from '../../assets/forwardArrow.png'

const LoginLayoutButton = ({ className, title, onClick, src }) => {
  return (
    <div
      className="w-[310px] cursor-pointer opacity-[100%] h-[50px] bg-white rounded-[16px] flex p-3  z-[2] relative justify-between items-center mt-[25px]"
      onClick={onClick}
    
    style={{opacity:'100%'}}>
      <p className="text-grey text-[20px] ">{title?title:'Continue'}</p>
      <img className="w-[35px] h-[10px]" src={src?src:ForwardArrow} alt="" />
    </div>
  );
};

export default LoginLayoutButton;
