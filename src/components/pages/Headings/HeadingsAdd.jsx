import React, { useState } from "react";
import Main from "./components/Main";
import Feedback from "./components/FeedBack";
import About from "./components/About";
import VisaTypes from "./components/VisaTypes";
import Recommendations from "./components/Recommendations";

const HeadingsAdd = () => {
  const [selectedPage, setSelectedPage] = useState("");

  const renderPage = () => {
    switch (selectedPage) {
      case "Main":
        return <Main type={selectedPage} />;
      case "Feedback":
        return <Feedback type={selectedPage} />;
      case "About":
        return <About type={selectedPage} />;
      case "VisaTypes":
        return <VisaTypes type={selectedPage} />;
      case "Recommendations":
        return <Recommendations type={selectedPage} />;
      default:
        return "";
    }
  };

  return (
    <div className=" w-full p-4 min-h-[89%] overflow-auto h-[89%] bg-slate-300 max-h-[89%] ">
      <div className="mb-4 ">
        <label className="block text-gray-700">Select Page</label>
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        >
          <option value="">-- Select Page --</option>
          <option value="Main">Main</option>
          <option value="Feedback">Feedback</option>
          <option value="About">About</option>
          <option value="VisaTypes">VisaTypes</option>
          <option value="Recommendations">Recommendations</option>
        </select>
      </div>
      <div className="w-full max-h-[95%] overflow-auto h-[95%]">
        {renderPage()}
      </div>
    </div>
  );
};

export default HeadingsAdd;
