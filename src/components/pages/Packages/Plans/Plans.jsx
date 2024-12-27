import React, { useEffect, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { BASE_URL } from "../../../../Api/urls";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { toast } from "react-toastify";
import PlanListing from "./components.jsx/PlanListing";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import PlanDeleteModal from "./components.jsx/PlanDeleteModal";

const Plans = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState();
  const [activeTab, setActiveTab] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deletedId, setDeletedId] = useState("");
  const [formData, setFormData] = useState({
    package: "",
    tourType: "",
    type: "",
    entryType: "",
    period: "",
    validity: "",
    processingTime: "",
    price: "",
    icon: "",
    image: null,
    expressHeading: "",
    expressPrice: "",
    expressDays: "",
    instantHeading: "",
    instantPrice: "",
    instantDays: "",
    visaTypeHeading: "",
    faq: [],
    insuranceAmount: 0,
    documents: [],
    longDescription: "",
    childPrice:""
  });
  // console.log(formData.faq, "faq");

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetchDataFromAPI(
          "GET",
          `${BASE_URL}visa-categories?page=${currentPage}`
        );
        if (response) {
          setPlans(response.data);
          setTotalPages(response.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileImage();
  }, [currentPage, activeTab]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleFaqChange = (FAQ) => {

    setFormData({ ...formData, faq: FAQ });
  };
  const handleDocumentsChange = (docs) => {
    setFormData({ ...formData, documents: docs });
  };
  const handleLongDescriptionChange = (longDescription) => {
    setFormData({ ...formData, longDescription: longDescription });
  };

  const handleSubmit = async () => {
    const newformData = new FormData();

    newformData.append("package", formData.package);
    newformData.append("tourType", formData.tourType);
    newformData.append("type", formData.type);
    newformData.append("entryType", formData.entryType);
    newformData.append("period", formData.period);
    newformData.append("validity", formData.validity);
    newformData.append("processingTime", formData.processingTime);
    newformData.append("price", formData.price);
    newformData.append("childPrice", formData.childPrice);
    newformData.append("icon", formData.icon);
    newformData.append("image", formData.image);
    newformData.append("expressHeading", formData.expressHeading);
    newformData.append("expressPrice", formData.expressPrice);
    newformData.append("expressDays", formData.expressDays);
    newformData.append("instantHeading", formData.instantHeading);
    newformData.append("instantPrice", formData.instantPrice);
    newformData.append("instantDays", formData.instantDays);
    newformData.append("insuranceAmount", formData.insuranceAmount);
    newformData.append("visaTypeHeading", formData.visaTypeHeading);
    newformData.append("longDescription", formData.longDescription);
    formData?.faq?.forEach((item, index) => {
      newformData.append(`faq[${index}][question]`, item.question);
      newformData.append(`faq[${index}][answer]`, item.answer);
    });
    formData?.documents?.forEach((item, index) => {
      newformData.append(`documents[${index}][name]`, item.name);
      newformData.append(`documents[${index}][icon]`, item.icon);
      newformData.append(`documents[${index}][description]`, item.description);
      newformData.append(`documents[${index}][show]`, item.show);
    });
    try {
      const response = await fetchDataFromAPI(
        "POST",
        `${BASE_URL}add-visa-category`,
        newformData
      );
      if (response) {
        toast.success("Added successfully");
       window.location.href =  `/home/visa/plans`;
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  const handleEdit = (id) => {
    navigate(`/home/visa/plans/${id}`);
  };

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setDeletedId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetchDataFromAPI(
        "DELETE",
        `${BASE_URL}delete-visa-category/${deletedId}`
      );
      if (response) {
        toast.success("Successfully Deleted");
        try {
          const response = await fetchDataFromAPI(
            "GET",
            `${BASE_URL}visa-categories?page=${currentPage}`
          );
          if (response) {
            setPlans(response.data);
            setTotalPages(response.totalPages);
          }
        } catch (error) {
          console.log(error);
        }
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 w-full max-h-[95%] h-[89%] bg-slate-300 overflow-auto min-h-[89%]">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "add"
              ? "bg-[#11aaf6] text-white"
              : "bg-white border border-[#11aaf6] text-[#11aaf6]"
          } `}
          onClick={() => setActiveTab("add")}
        >
          Add
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "list"
              ? "bg-[#11aaf6] text-white"
              : "bg-white border border-[#11aaf6] text-[#11aaf6]"
          } `}
          onClick={() => setActiveTab("list")}
        >
          List
        </button>
      </div>
      {activeTab === "add" && (
        <>
          <h1 className="text-2xl text-blue-500 font-semibold">
            <h1
              style={{ textShadow: "2px 2px 4px rgba(66, 185, 245, 0.5)" }}
              className="text-2xl text-blue-500 font-semibold"
            >
              Add Visa
            </h1>
          </h1>

          {step === 1 && (
            <StepOne
              formData={formData}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              handleChange={handleFaqChange}
              handleLongDescriptionChange={handleLongDescriptionChange}
              handleDocumentsChange={handleDocumentsChange}
              nextStep={nextStep}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              setFormData={() => setFormData()}
            />
          )}
        </>
      )}
      {activeTab === "list" && (
        <div className="min-h-[95%] h-[95%] w-full max-h-[95%] ">
          <div className="min-h-[84%] w-full max-h-[84%] overflow-auto ">
            <PlanListing
              data={plans}
              edit={handleEdit}
              deleted={handleDelete}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
      {isModalOpen && (
        <PlanDeleteModal
          id={deletedId}
          setIsModalOpen={setIsModalOpen}
          handleModal={confirmDelete}
        />
      )}
    </div>
  );
};

export default Plans;
