import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../Api/urls";
import { toast } from "react-toastify";
import TextEditor from "../blogs/TextEditor";

const AboutUs = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		image: null,
		metaTitle: "",
		metaDescription: "",
		metaKeywords: "",
	});

	// Handle form changes
	// const handleInputChange = (
	// 	e,
	// 	index = null,
	// 	pointIndex = null,
	// 	summaryIndex = null
	// ) => {
	// 	const { name, value, files } = e.target;

	// 	if (name === "image") {
	// 		// Handle image file input
	// 		setFormData({
	// 			...formData,
	// 			image: files[0], // Store the image file
	// 		});
	// 	} else if (index === null) {
	// 		setFormData({
	// 			...formData,
	// 			[name]: value,
	// 		});
	// 	} else {
	// 		// Update section heading or point
	// 		if (pointIndex === null && summaryIndex === null) {
	// 			const updatedSections = formData.sections.map((section, i) =>
	// 				i === index ? { ...section, [name]: value } : section
	// 			);
	// 			setFormData({
	// 				...formData,
	// 				sections: updatedSections,
	// 			});
	// 		} else if (pointIndex != null && summaryIndex === null) {
	// 			const updatedPoints = formData.sections[index].point.map(
	// 				(point, pi) => (pi === pointIndex ? value : point)
	// 			);
	// 			const updatedSections = formData.sections.map((section, i) =>
	// 				i === index ? { ...section, point: updatedPoints } : section
	// 			);
	// 			setFormData({
	// 				...formData,
	// 				sections: updatedSections,
	// 			});
	// 		} else {
	// 			const updatedSummary = formData.sections[index].summary.map(
	// 				(summary, pi) => (pi === summaryIndex ? value : summary)
	// 			);
	// 			const updatedSections = formData.sections.map((section, i) =>
	// 				i === index
	// 					? { ...section, summary: updatedSummary }
	// 					: section
	// 			);
	// 			setFormData({
	// 				...formData,
	// 				sections: updatedSections,
	// 			});
	// 		}
	// 	}
	// };

	// Fetch the existing data by ID
	useEffect(() => {
		const fetchData = async () => {
			const resp = await axios.get(`${BASE_URL}about`);
			setFormData(resp.data.data);
			console.log(resp.data);
		};
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleImageChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};
	const handleEditorChange = (value) => {
		setFormData((prev) => ({
			...prev,
			description: value,
		}));
	};

	const keywords =
    typeof formData.metaKeywords === "string"
      ? formData.metaKeywords.split(",").map((kw) => kw.trim())
      : [];
	const handleSubmit = async (e) => {
		e.preventDefault(); // ✅ Prevent default form submission

		const formDataToSend = {
			title: formData.title || "",
			description: formData.description || "",
			image: formData.image, // ✅ Ensure image is a string URL
			metaTitle:formData.metaTitle || "",
			metaDescription:formData.metaDescription || "",
			metaKeywords:formData.metaKeywords || "",
		};
		// console.log("Sendig form data", formData);
		// console.log("🚀 Sending JSON Data:", formDataToSend);

		try {
			const response = await axios.post(
				`${BASE_URL}about`,
				formDataToSend,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			toast.success(
				response.data.message || "About Us updated successfully!"
			);
		} catch (error) {
			console.error("❌ Error submitting form:", error);
			toast.error(
				error.response?.data?.message || "Failed to update About Us."
			);
		}
	};

	return (
		<div className="bg-slate-300  text-black overflow-auto p-8 min-h-[89%]">
			<h1 className="text-3xl text-blue-600 font-bold mb-4"> About Us</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-blue-600 mb-2">Title</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						className="w-full p-2 border border-black rounded"
					/>
				</div>
				{/* <div>
					<label className="block text-blue-600 mb-2">
						Description
					</label>
					<textarea
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						className="w-full p-2 border border-black rounded"
					/>
				</div> */}
				<div>
					<TextEditor
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 overflow-scroll"
						value={formData.description}
						onChange={(value) => handleEditorChange(value)} // ✅ Use a new handler for TextEditor
					/>
				</div>
				<div>
					<label className="block text-blue-600 mb-2">
						Image URL
					</label>
					<input
						type="file"
						name="image"
						onChange={handleImageChange}
						className="w-full p-2 border border-black rounded"
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
							onChange={handleInputChange}
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
							onChange={handleInputChange}
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
							onChange={handleInputChange}
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
	// console.log("Formdata : ", formData);
};

export default AboutUs;
