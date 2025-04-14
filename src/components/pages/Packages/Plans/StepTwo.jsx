import React, { useState, useEffect } from "react";
import AddDescription from "./components.jsx/AddDescription"; // Assuming this is another component you may want to use
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
import {
	Button,
	Label,
	ListBox,
	ListBoxItem,
	Popover,
	Select,
	SelectValue,
} from "react-aria-components";
import TextEditor from "../../blogs/TextEditor";

const StepTwo = ({
	formData,
	handleChange,
	nextStep,
	prevStep,
	handleLongDescriptionChange,
	handleDocumentsChange,
	handleSubmit,
	setFormData,
}) => {
	const [faq, setFaq] = useState([]);
	const [documents, setDocuments] = useState([]);
	const [show, setShow] = useState(false);
	const [selectedDocuments, setSelectedDocuments] = useState([]);
	const [longDescription, setLongDescription] = useState("");
	const [selectedOPtions, setSelectedOptions] = useState("");
	const [clicked, setClicked] = useState(false);

	useEffect(() => {
		fetchDocuments();
	}, []);

	const handleEditorChange = (value) => {
		setLongDescription(value);
	};

	const fetchDocuments = async () => {
		try {
			const response = await fetchDataFromAPI(
				"GET",
				`${BASE_URL}documents`
			);
			if (response) {
				setDocuments(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	let options = [
		{ id: 1, name: "Aardvark" },
		{ id: 2, name: "Cat" },
		{ id: 3, name: "Dog" },
		{ id: 4, name: "Kangaroo" },
		{ id: 5, name: "Koala" },
		{ id: 6, name: "Penguin" },
		{ id: 7, name: "Snake" },
		{ id: 8, name: "Turtle" },
		{ id: 9, name: "Wombat" },
	];

	const handleAddQuestion = () => {
		setFaq([...faq, { question: "", answer: "" }]);
	};

	const handleQuestionChange = (index, e) => {
		const updatedFaq = faq.map((item, i) =>
			i === index ? { ...item, [e.target.name]: e.target.value } : item
		);
		setFaq(updatedFaq);
	};

	const handleRemoveQuestion = (index) => {
		const updatedFaq = faq.filter((item, i) => i !== index);
		setFaq(updatedFaq);
	};

	const handleDocumentSelect = (index) => {
    setDocuments((prevDocs) => {
      let updatedDocs = [...prevDocs];
  
      // Toggle selection
      updatedDocs[index].show = !updatedDocs[index].show;
  
      // If newly selected, assign next available position
      if (updatedDocs[index].show) {
        const maxPosition =
          Math.max(...updatedDocs.map((doc) => doc.position || 0), 0) + 1;
        updatedDocs[index].position = maxPosition;
      } else {
        // Reset position if deselected
        updatedDocs[index].position = 0;
      }
  
      // Sort by position so the order is maintained
      updatedDocs.sort((a, b) => (a.position || 999) - (b.position || 999));
  
      return updatedDocs;
    });
  };
  
  const handlePositionChange = (index, position) => {
    setDocuments((prevDocs) => {
      let updatedDocs = [...prevDocs];
  
      // Update position without affecting selection
      updatedDocs[index].position = position;
  
      // Ensure sorting by position
      updatedDocs.sort((a, b) => (a.position || 999) - (b.position || 999));
  
      return updatedDocs;
    });
  };
  
  

	const saveFaq = () => {
		handleChange(faq);
		toast.success(` Faq Saved SuccessFully!  `);
	};

	const handleSave = () => {
		handleDocumentsChange(documents);

		setShow(true);
		toast.success(` Documents Saved SuccessFully!  `);
	};

	const savedesc = () => {
		handleLongDescriptionChange(longDescription);
		toast.success(`Long  Description Saved SuccessFully!  `);
	};

	const handleNext = () => {
		// e.preventDefault();

		setShow(false);
		handleSubmit();
	};

	return (
		<div className="flex flex-col gap-10">
			{/* <div className="space-y-2">
        <h2 className="text-xl font-bold text-blue-500">FAQ Section</h2>
        {faq.map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              name="question"
              value={item.question}
              onChange={(e) => handleQuestionChange(index, e)}
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              placeholder="Question"
              required
            />
            <input
              type="text"
              name="answer"
              value={item.answer}
              onChange={(e) => handleQuestionChange(index, e)}
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              placeholder="Answer"
              required
            />
            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
        >
          Add FAQ
        </button>
        <button
          type="button"
          onClick={saveFaq}
          className="px-4 py-2 bg-blue-500 ml-5 text-black rounded-md"
        >
          Save FAQ
        </button>
      </div> */}

<div className="space-y-4">
  <h2 className="text-xl font-bold text-blue-500">Select Documents to Show</h2>
  {documents.map((doc, index) => (
    <div key={index} className="flex items-center space-x-4">
      {/* Checkbox for Show/Hide */}
      <input
        type="checkbox"
        checked={doc.show}
        onChange={() => handleDocumentSelect(index)}
      />
      <span>{doc.name}</span>

      {/* Dropdown for Position Selection */}
      {doc.show && (
        <Select
          selectedKey={String(doc?.position)}
          onSelectionChange={(value) =>
            handlePositionChange(index, Number(value))
          }
		  
        >
          <Label className="m-2">Select Position</Label>
          <Button>
            <SelectValue />
            <span aria-hidden="true">▼</span>
          </Button>
          <Popover>
            <ListBox className="bg-slate-900 p-5 m-2 text-white">
              {[...Array(documents.length)].map((_, i) => (
                <ListBoxItem key={i + 1} id={String(i + 1)}>
                  {i + 1}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
      )}
    </div>
  ))}
</div>

			<button
				type="button"
				onClick={handleSave}
				className="px-4 py-2 bg-blue-500 w-44 text-black rounded-md"
			>
				Save Documents
			</button>

			<div className="space-y-2">
				<h2 className="text-xl font-bold text-blue-500">
					Long Description
				</h2>
				{/* <textarea
					name="longDescription"
					
					onChange={(e) => setLongDescription(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded-md"
					placeholder="Enter the long description here..."
					rows="4"
					
				></textarea> */}
		
					<TextEditor

						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
						value={longDescription}
						onChange={(value) => handleEditorChange(value)} // ✅ Use a new handler for TextEditor
						required
					/>
		
				
			</div>

			<div className="flex justify-between">
				<div className="flex gap-5">
					<button
						type="button"
						onClick={prevStep}
						className="px-4 py-2 bg-gray-400 text-black rounded-md"
					>
						Back
					</button>
					<button
						type="button"
						onClick={savedesc}
						className="px-4 py-2 bg-blue-500 w-44 text-black rounded-md"
					>
						Save Description
					</button>
				</div>
				<button
					onClick={() => {handleNext();setClicked(!clicked)}}
					disabled={!show}
					className={`px-4 py-2 rounded text-white ${
						clicked ? "bg-green-500" : "bg-blue-800"
					  }`}
				>
					Submit
				</button>
			</div>

			{/* <AddDescription /> */}
		</div>
	);
};

export default StepTwo;
