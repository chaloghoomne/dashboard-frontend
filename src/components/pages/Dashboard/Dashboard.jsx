import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";

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
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

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
      <Root style={{ width: "full" }}>
        <Container>
          <CarouselContainer>
            <Slider {...carouselSettings}>
              <Box>
                <img
                  className="bg-cover"
                  src="https://media.istockphoto.com/id/683962492/photo/sunrise-at-colosseum-rome-italy.webp?b=1&s=170667a&w=0&k=20&c=Ql9ZvuQQXvmWIiz39v0se1kSEsWKMU3HJtCssPutVEw="
                  alt="Rome"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "250px",
                  }}
                />
                <Typography
                  variant="h4"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  Canada
                </Typography>
              </Box>

              <Box>
                <img
                  className="bg-cover"
                  src="https://i0.wp.com/reporterontheroad.com/wp-content/uploads/voyage-a-rome-cover.png?fit=1170%2C780&ssl=1"
                  alt="Rome"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "250px",
                  }}
                />
                <Typography
                  variant="h4"
                  style={{ textAlign: "center", marginTop: "10px" }}
                >
                  Rome
                </Typography>
              </Box>

              <Box>
                <img
                  className="bg-cover"
                  src="https://media.istockphoto.com/id/683962492/photo/sunrise-at-colosseum-rome-italy.webp?b=1&s=170667a&w=0&k=20&c=Ql9ZvuQQXvmWIiz39v0se1kSEsWKMU3HJtCssPutVEw="
                  alt="Rome"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    height: "250px",
                  }}
                />
                <Typography
                  variant="h4"
                  style={{ textAlign: "center", marginTop: "5px" }}
                >
                  India
                </Typography>
              </Box>
              {/* Add more slides as needed */}
            </Slider>
          </CarouselContainer>
          <Grid container spacing={3}>
            {sections.map((section, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <SectionTitle variant="h5">{section.title}</SectionTitle>
                  <Typography>{section.content}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Root>
    </div>
  );
};

export default Dashboard;
