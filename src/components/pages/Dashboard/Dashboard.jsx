import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Container, Grid } from "@mui/material";
import { borderRadius, styled } from "@mui/system";
import { BASE_URL } from "../../../Api/urls";
import { fetchDataFromAPI } from "../../../Api/fetchData";

const Root = styled(Box)({
	background: "linear-gradient(to right, #000046, #1cb5e0)",
	minHeight: "100vh",
	color: "white",
	padding: "20px 0",
});

const CarouselContainer = styled(Box)({
	marginBottom: "40px",
});

const Card = styled(Box)({
	background: "white",
	color: "black",
	padding: "20px",
	borderRadius: "10px",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	textAlign: "center",
});

const SectionTitle = styled(Typography)({
	marginBottom: "20px",
});

const Dashboard = () => {
	const [packages, setPackages] = useState();
	const [visaOrder, setTopVisaOrder] = useState();
	const [visaCategory, setTopVisaCategory] = useState();

	const carouselSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const response = await fetchDataFromAPI(
					"GET",
					`${BASE_URL}top-packages`
				);

				// console.log(response);
				if (response) {
					setPackages(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchProfileImage();
	}, []);
	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const response = await fetchDataFromAPI(
					"GET",
					`${BASE_URL}top-visa-categories`
				);
				// console.log(response)
				if (response) {
					setTopVisaCategory(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchProfileImage();
	}, []);
	useEffect(() => {
		const fetchProfileImage = async () => {
			try {
				const response = await fetchDataFromAPI(
					"GET",
					`${BASE_URL}top-visa-order`
				);
				if (response) {
					setTopVisaOrder(response.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchProfileImage();
	}, []);

	const sections = [
		{ title: "Top Countries", content: "India,Australia,Canada,Thailand" },
		{ title: "Top Visa Plans", content: "India,Australia,Canada,Thailand" },
		{ title: "Top Partners", content: "Agoda,MakemyTrip" },
		{
			title: "Maximum Amount Visa ",
			content: "$300000",
		},
	];

	return (
		<div className="max-h-[89%]  overflow-y-auto">
			<Root style={{ width: "full", padding: "20px" }}>
				<Container
					style={{
						display: "flex",
						width: "full",
						justifyContent: "space-between",
					}}
				>
					<CarouselContainer
						style={{ width: "40%", marginLeft: "20px" }}
					>
						<h1 className="text-2xl">Top Visa </h1>
						<Slider {...carouselSettings}>
							{packages?.map((item, index) => {
								return (
									<Box key={item?.id || index}>
										<img
											className="bg-cover"
											src={item?.package?.image}
											alt="Rome"
											style={{
												width: "400px",
												borderRadius: "10px",
												height: "250px",
												marginTop: "10px",
											}}
										/>
										<Typography
											variant="h4"
											style={{
												textAlign: "center",
												marginTop: "10px",
											}}
										>
											{item?.package?.country}
										</Typography>
									</Box>
								);
							})}

							{/* Add more slides as needed */}
						</Slider>
					</CarouselContainer>

					<CarouselContainer
						style={{ width: "40%", marginLeft: "20px" }}
					>
						<h1 className="text-2xl">Top Plans</h1>
						<Slider {...carouselSettings}>
							{visaCategory?.map((item, index) => {
								return (
									<Box key={item?.id || index}>
										{/* <img
											className="bg-cover"
											src={item?.image}
											alt="Rome"
											style={{
												width: "540px",
												borderRadius: "10px",
												height: "250px",
												marginTop: "10px",
											}}
										/> */}

										<div
											style={{
												backgroundImage: `url("https://static.vecteezy.com/system/resources/thumbnails/008/079/335/small_2x/empty-showcase-abstract-pastel-color-background-3d-illustration-free-vector.jpg")`, // Dynamically set background image
											}}
											className="w-[540px] h-[250px] rounded-xl p-4 mt-2.5 flex flex-col justify-between text--right bg-cover"
										>
											{/* Tour Type */}
											<div className="font-bold text-lg text-gray-800">
												Tour Type:{" "}
												{item?.visaTypeHeading.toString() +
													"Visa" || "N/A"}
											</div>

											{/* Price */}
											<div className="font-bold text-xl text-gray-800">
												Price: ₹
												{item?.price?.toLocaleString()}
											</div>

											{/* Child Price */}
											<div className="text-lg text-gray-600">
												Child Price: ₹
												{item?.childPrice?.toLocaleString()}
											</div>

											{/* Processing Time */}
											<div className="text-sm text-gray-500">
												Processing Time:{" "}
												{item?.processingTime} days
											</div>
										</div>
										<Typography
											variant="h4"
											style={{
												textAlign: "center",
												marginTop: "10px",
											}}
										>
											₹{item?.price}
										</Typography>
									</Box>
								);
							})}

							{/* Add more slides as needed */}
						</Slider>
					</CarouselContainer>
				</Container>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Card>
							<SectionTitle variant="h5">
								Top Countries
							</SectionTitle>
							{/* <Typography>
								{packages?.map((item, index) => {
									return (
										<>
											<span key={item?.id || index}>
												{" "}
												{item?.package?.country},
											</span>
										</>
									);
								})}
							</Typography> */}
							<Typography>
								{packages?.map((item, index) => (
									<span key={item?.id || index}>
										{item?.package?.country},
									</span>
								))}
							</Typography>
						</Card>
					</Grid>

					<Grid item xs={12} md={6}>
						<Card>
							<SectionTitle variant="h5">
								Maximum Amount Visa{" "}
							</SectionTitle>
							<Typography>
								₹{Math.floor(visaOrder?.totalAmount)}
							</Typography>
						</Card>
					</Grid>
				</Grid>
			</Root>
		</div>
	);
};

export default Dashboard;
