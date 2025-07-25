import React, { useEffect, useState } from "react";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
import TextEditor from "../../blogs/TextEditor";

const AddForm = ({ handleActive }) => {
	const [headings, setHeadings] = useState([]);
	const [descriptions, setDescriptions] = useState([]);
	const [seoDescription, setSeoDescription] = useState([]);
	const [faq, setFaq] = useState([]);
	const [formData, setFormData] = useState({
		country: "",
		heading: "",
		description: "",
		seoDescription:"",
		price: "",
		slug: "",
		image: null,
		rating: "",
		bannerImage:null,
		showCoTraveller: "",
		tourTypes: [], // Stores selected visa category IDs
		docHeading: "",
		docDescription: "",
		docPoints: [],
		faq: [],
		metaTitle: "",
		metaDescription: "",
		metaKeywords: "",
		altImage: "",
	});
	const [visaCategories, setVisaCategories] = useState([]);

	useEffect(() => {
		const fetchHeadings = async () => {
			try {
				const response = await fetchDataFromAPI(
					"GET",
					`${BASE_URL}package-note-by-type/heading`
				);
				if (response) {
					setHeadings(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchHeadings();
	}, []);

	useEffect(() => {
		const fetchDescriptions = async () => {
			try {
				const response = await fetchDataFromAPI(
					"GET",
					`${BASE_URL}package-note-by-type/description`
				);
				if (response) {
					setDescriptions(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchDescriptions();
	}, []);

	useEffect(() => {
		fetchVisaCategories();
	}, []);

	const fetchVisaCategories = async () => {
		try {
			const response = await fetchDataFromAPI(
				"GET",
				`${BASE_URL}tour-types`
			);
			if (response) {
				setVisaCategories(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleImageChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	const handleBannerImageChange = (e) => {
		setFormData({ ...formData, bannerImage: e.target.files[0] });
	};

	const handleVisaCategoryChange = (id) => {
		const isSelected = formData.tourTypes.includes(id);

		// Add or remove category based on checkbox status
		const updatedTourTypes = isSelected
			? formData.tourTypes.filter((categoryId) => categoryId !== id)
			: [...formData.tourTypes, id];

		setFormData({ ...formData, tourTypes: updatedTourTypes });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const keywords =
			typeof formData.metaKeywords === "string"
				? formData.metaKeywords.split(",").map((kw) => kw.trim())
				: [];

		if (formData?.tourTypes?.length < 1) {
			toast.error(`Please Add at least One Visa Category`);
			return;
		}

		const validFaq = faq.filter(
			(item) => item.question.trim() || item.answer.trim()
		);
		const data = new FormData();
		data.append("country", formData.country);
		data.append("heading", formData.heading);
		data.append("description", descriptions);
		data.append("seoDescription", seoDescription);
		data.append("price", formData.price);
		data.append("slug", formData.slug);
		data.append("image", formData.image);
		data.append("metaTitle", formData.metaTitle);
		data.append("metaDescription", formData.metaDescription);
		data.append("altImage", formData.altImage);

		data.append("metaKeywords", JSON.stringify(keywords));
		if (formData.image) {
			data.append("image", formData.image);
		}
		if (formData.bannerImage) {
			data.append("bannerImage", formData.bannerImage);
		}
		// data.append("docHeading", formData.docHeading);
		// data.append("docDescription", formData.docDescription);

		// Append selected visa categories
		formData.tourTypes.forEach((id) => {
			data.append("tourTypes[]", id);
		});

		validFaq?.forEach((item, index) => {
			data.append(`faq[${index}][question]`, item.question);
			data.append(`faq[${index}][answer]`, item.answer);
		});
		// console.log("formdata",formData)

		try {
			const response = await fetchDataFromAPI(
				"POST",
				`${BASE_URL}add-place`,
				data
			);
			if (response) {
				toast.success("Added successfully");
				handleActive("list");
			}
		} catch (error) {
			console.log(error);
			toast.error("Country Already Exist");
		}
	};

	const handleAddQuestion = () => {
		setFaq([...faq, { question: "", answer: "" }]);
	};

	const handleQuestionChange = (index, e) => {
		const updatedFaq = faq.map((item, i) =>
			i === index ? { ...item, [e.target.name]: e.target.value } : item
		);
		setFaq(updatedFaq);
	};
	const handleEditorChange = (index, value) => {
		const updatedFaq = faq.map(
			(item, i) => (i === index ? { ...item, answer: value } : item) // ✅ Set `answer` directly
		);
		setFaq(updatedFaq);
	};

	const handleDescriptionChange =  (value) => {
		setDescriptions(value);
	}

	const handleSeoDescriptionChange =  (value) => {
		setSeoDescription(value);
	}

	const handleRemoveQuestion = (index) => {
		const updatedFaq = faq.filter((item, i) => i !== index);
		setFaq(updatedFaq);
	};

	const saveFaq = () => {
		setFormData({ ...formData, faq });
		toast.success("Faq Saved Successfully!");
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Country
				</label>
				<input
					type="text"
					name="country"
					value={formData.country}
					onChange={handleChange}
					className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
					required
				/>
			</div>
			{/* <div>
        <label className="block text-sm font-medium text-gray-700">Heading</label>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div> */}
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<TextEditor
								className="w-full h-100 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
								value={descriptions}
								onChange={handleDescriptionChange} // ✅ Use a new handler for TextEditor
							/>
			</div>
			
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Seo	Description
				</label>
				<TextEditor
								className="w-full h-100 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
								value={seoDescription}
								onChange={handleSeoDescriptionChange} // ✅ Use a new handler for TextEditor
							/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Slug
				</label>
				<input
					type="text"
					name="slug"
					value={formData.slug.toLowerCase().replace(/\s+/g, "-")}
					onChange={handleChange}
					className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
					required
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700">
					Price
				</label>
				<input
					type="text"
					name="price"
					value={formData.price}
					onChange={handleChange}
					className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
					required
					pattern="[0-9]*"
				/>
			</div>
			<div className="">
				<label className="block text-sm font-medium text-gray-700">
					Image <span className="text-xs">(280*192px)</span>
				</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageChange}
					className="mt-1 block bg-white p-1 px-2 rounded-md w-full"
					
				/>
			</div>
			<div className="">
				<label className="block text-sm font-medium text-gray-700">
					Banner Image <span className="text-xs">(280*192px)</span>
				</label>
				<input
					type="file"
					accept="image/*"
					onChange={handleBannerImageChange}
					className="mt-1 block bg-white p-1 px-2 rounded-md w-full"
					
				/>
			</div>
			<div>
				<label className="block text-lg font-semibold mb-2">
				 Alternate Image Title
				</label>
				<input
					type="text"
					name="altImage"
					value={formData.altImage}
					className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
					onChange={handleChange}
				/>
			</div>
			{/* Meta Fields */}
			<div>
				<label className="block text-lg font-semibold mb-2">
					Meta Title
				</label>
				<input
					type="text"
					name="metaTitle"
					value={formData.metaTitle}
					className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label className="block text-lg font-semibold mb-2">
					Meta Description
				</label>
				<textarea
					name="metaDescription"
					value={formData.metaDescription}
					className="w-full h-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label className="block text-lg font-semibold mb-2">
					Meta Keywords (comma separated)
				</label>
				<input
					type="text"
					name="metaKeywords"
					value={formData.metaKeywords}
					className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
					onChange={handleChange}
				/>
			</div>

			<div className="space-y-4">
				<h2 className="text-xl font-bold text-blue-500">
					Select Visa Categories to Show
				</h2>
				{visaCategories.map((item) => (
					<div key={item._id} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={formData.tourTypes.includes(item._id)}
							onChange={() => handleVisaCategoryChange(item._id)}
						/>
						<span>{item.name}</span>
					</div>
				))}
			</div>

			<button
				type="button"
				className="px-4 py-2 bg-blue-500  text-black rounded-md"
				onClick={() => toast.success("Visa Categories Saved")}
			>
				Save Visa Categories
			</button>

			<div className="space-y-2">
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
						{/* <input
              type="text"
              name="answer"
              value={item.answer}
              onChange={(e) => handleQuestionChange(index, e)}
              className="block w-1/2 p-2 border border-gray-300 rounded-md"
              placeholder="Answer"
              required
            /> */}
						<TextEditor
							className="w-full h-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
							value={item.answer}
							onChange={(value) =>
								handleEditorChange(index, value)
							} // ✅ Use a new handler for TextEditor
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
					Add Question
				</button>
				<button
					type="button"
					onClick={saveFaq}
					className="px-4 py-2 ml-4 bg-green-500 text-white rounded-md"
				>
					Save Faq
				</button>
			</div>

			<button
				type="submit"
				className="px-4 py-2 bg-green-600 w-44 text-white rounded-md"
			>
				Save All
			</button>
		</form>
	);
};

export default AddForm;
