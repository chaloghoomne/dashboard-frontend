import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDataFromAPI } from "../../../../Api/fetchData";
import { BASE_URL } from "../../../../Api/urls";
import { toast } from "react-toastify";
import TextEditor from "../../blogs/TextEditor";

const CountryEdit = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [headings, setHeadings] = useState([]);

	const [faq, setFaq] = useState([]);
	const [formData, setFormData] = useState({
		country: "",
		heading: "",
		description: "",
		price: "",
		image: null,
		tourTypes: [],
		showCoTraveller: "",
		rating: "",
		docHeading: "",
		docDescription: "",
		docPoints: [],
		slug: "",
	});
	const [descriptions, setDescriptions] = useState(formData.description || "");
	const [visaCategories, setVisaCategories] = useState([]);

	useEffect(() => {
		fetchHeadings();
		// fetchDescriptions();
		fetchVisaCategories();
		fetchPackageData();
	}, [id]);

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

	// const fetchDescriptions = async () => {
	// 	try {
	// 		const response = await fetchDataFromAPI(
	// 			"GET",
	// 			`${BASE_URL}package-note-by-type/description`
	// 		);
	// 		if (response) {
	// 			setDescriptions(response.data);
	// 			console.log(descriptions)
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

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

	const fetchPackageData = async () => {
		try {
			const response = await fetchDataFromAPI(
				"GET",
				`${BASE_URL}place/${id}`
			);
			if (response && response.data) {
				const { data } = response;
				setFormData({
					country: data.country,
					heading: data.heading,
					description: data.description,
					price: data.price,
					image: data.image,
					slug: data.slug,
					docDescription: data.docDescription,
					docHeading: data.docHeading,
					tourTypes: data.tourTypes.map((type) => type._id), // Store only IDs
					faq: data.faq || [],
					altImage: data.altImage,
					metaTitle: data.metaTitle,
					metaDescription: data.metaDescription,
					metaKeywords: data.metaKeywords,
				});
				setDescriptions(data.description);
				setFaq(data.faq || []);
			}
		} catch (error) {
			console.log(error);
			toast.error("Error fetching package data");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleDescriptionChange =  (value) => {
		setDescriptions(value);
	}

	const handleImageChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	const handleVisaCategoryChange = (id) => {
		const updatedTourTypes = formData.tourTypes.includes(id)
			? formData.tourTypes.filter((typeId) => typeId !== id)
			: [...formData.tourTypes, id];

		setFormData({ ...formData, tourTypes: updatedTourTypes });
	};

	const keywords =
		typeof formData.metaKeywords === "string"
			? formData.metaKeywords.split(",").map((kw) => kw.trim())
			: [];

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("country", formData.country);
		data.append("heading", formData.heading);
		data.append("description", descriptions);
		data.append("price", formData.price);
		data.append("metaTitle", formData.metaTitle);
		data.append("metaDescription", formData.metaDescription);
		data.append("altImage", formData.altImage);
		data.append("slug", formData.slug);
		data.append("metaKeywords", JSON.stringify(keywords));
		if (formData.image) {
			data.append("image", formData.image);
		}
		if (formData.image instanceof File) {
			data.append("image", formData.image);
		}

		formData.tourTypes.forEach((typeId) => {
			data.append("tourTypes[]", typeId);
		});

		formData.faq.forEach((item, index) => {
			data.append(`faq[${index}][question]`, item.question);
			data.append(`faq[${index}][answer]`, item.answer);
		});

		try {
			const response = await fetchDataFromAPI(
				"PUT",
				`${BASE_URL}edit-place/${id}`,
				data
			);
			if (response) {
				toast.success("Updated successfully");
				navigate(-1);
			} else {
				toast.error("Failed to update");
			}
		} catch (error) {
			console.log(error);
			toast.error("Error in updating");
		}
	};

	const handleAddQuestion = () => {
		setFaq([...faq, { question: "", answer: "" }]);
	};

	const handleEditorChange = (index, value) => {
		const updatedFaq = faq.map(
			(item, i) => (i === index ? { ...item, answer: value } : item) // ✅ Set `answer` directly
		);
		setFaq(updatedFaq);
	};


	const handleQuestionChange = (index, e) => {
		const updatedFaq = faq.map((item, i) =>
			i === index ? { ...item, [e.target.name]: e.target.value } : item
		);
		setFaq(updatedFaq);
	};

	const handleRemoveQuestion = (index) => {
		const updatedFaq = faq.filter((_, i) => i !== index);
		setFaq(updatedFaq);
	};

	const saveFaq = () => {
		setFormData({ ...formData, faq });
		toast.success("FAQ saved successfully!");
	};

	return (
		<div className="min-h-[95%] w-full bg-slate-300 p-6 max-h-[95%] overflow-auto">
			<h1 className="text-2xl text-blue-500 font-semibold">
				Edit Package
			</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Form fields */}
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
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Heading
					</label>
					<input
						type="text"
						name="heading"
						value={formData.heading}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div >
					<label className="block text-sm font-medium text-gray-700">
					Slug
					</label>
					<input
						type="text"
						name="slug"
						value={formData.slug}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Description
					</label>
					<TextEditor
								className="w-full h-100 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
								value={descriptions}
								onChange={handleDescriptionChange} // ✅ Use a new handler for TextEditor
							/>
					{/* <textarea
						name="description"
						value={formData.description}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						required
					/> */}
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Price
					</label>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						required
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

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Image
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
						className="mt-1 block w-full"
					/>
					{formData.image && (
						<img
							src={
								typeof formData.image === "string"
									? formData.image
									: URL.createObjectURL(formData.image)
							}
							alt="Current"
							className="mt-2 w-20 h-20 object-cover"
						/>
					)}
				</div>
				<div>
					<label className="block text-lg font-semibold mb-2">
						Alt Text for Image
					</label>
					<input
						type="text"
						name="altImage"
						value={formData.altImage}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
						onChange={handleChange}
					/>
				</div>

				<div className="space-y-4">
					<h2 className="text-xl font-bold text-blue-500">
						Select Visa Categories
					</h2>
					{visaCategories.map((item) => (
						<div
							key={item._id}
							className="flex items-center space-x-2"
						>
							<input
								type="checkbox"
								checked={formData.tourTypes.includes(item._id)}
								onChange={() =>
									handleVisaCategoryChange(item._id)
								}
							/>
							<span>{item.name}</span>
						</div>
					))}
				</div>

				<div className="space-y-2">
					<h2 className="text-xl font-bold text-blue-500">
						FAQ Section
					</h2>
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
								className="w-full h-100 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
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
						Add FAQ
					</button>
					<button
						type="button"
						onClick={saveFaq}
						className="px-4 py-2 bg-blue-500 ml-5 text-white rounded-md"
					>
						Save FAQ
					</button>
				</div>

				<button
					type="submit"
					className="px-4 py-2 bg-[#11aaf6] text-white rounded-md"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CountryEdit;
