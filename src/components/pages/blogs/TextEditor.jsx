import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ value, onChange }) => {
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, false] }], // Allows different heading levels
			[{ font: [] }],
			[{ list: "ordered" }, { list: "bullet" }],
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ align: [] }],
			[{ color: [] }, { background: [] }],
			["link", "image", "video"],
			["clean"],
		],
	};

	const formats = [
		"header",
		"font",
		"list",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"code-block",
		"align",
		"color",
		"background",
		"link",
		"image",
		"video",
	];

	return (
		<ReactQuill
			value={value}
			onChange={onChange}
			modules={modules}
			formats={formats}
			className="w-full h-50 border rounded-lg bg-white"
			placeholder="Write your blog here..."
		/>
	);
};

export default TextEditor;
