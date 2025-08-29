import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from "@mui/material";
import { IoMdArrowForward } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";

function SliderSection() {
  const sliderRef = useRef(null); // Ref for slider control
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const ads = [
    {
      title: "Super Sale!",
      semiTitle: "Warsaw, Poland",
      description:
        "Check out the latest fashion trends in our store. Up to 50% off on all electronics. Limited time offer. Enjoy free shipping on orders over $99.",
      image: "/Images/Ellipse1.png",
      cta: "Shop Now",
    },
    {
      title: "New Arrival",
      semiTitle: "Warsaw, Poland",
      description:
        "Check out the latest fashion trends in our store. Up to 50% off on all electronics. Limited time offer. Enjoy free shipping on orders over $99.",
      image: "/Images/Ellipse2.png",
      cta: "Explore",
    },
    {
      title: "Free Shipping",
      semiTitle: "Warsaw, Poland",
      description:
        "Check out the latest fashion trends in our store. Up to 50% off on all electronics. Limited time offer. Enjoy free shipping on orders over $99.",
      image: "/Images/Ellipse3.png",
      cta: "Get Offer",
    },
    {
      title: "Fitness Gear",
      semiTitle: "Warsaw, Poland",
      description:
        "Check out the latest fashion trends in our store. Up to 50% off on all electronics. Limited time offer. Enjoy free shipping on orders over $99.",
      image: "/Images/Ellipse1.png",
      cta: "Browse Now",
    },
    {
      title: "More Discounts",
      semiTitle: "Warsaw, Poland",
      description:
        "Check out the latest fashion trends in our store. Up to 50% off on all electronics. Limited time offer. Enjoy free shipping on orders over $99.",
      image: "/Images/Ellipse3.png",
      cta: "Get Offer",
    },
  ];

  return (
    <div style={{ width: "93%", margin: "auto", marginTop: "2rem" }}>
      <Slider ref={sliderRef} {...settings}>
        {ads.map((ad, index) => (
          <Box key={index} px={2}>
            <Box
              border="2px solid #ccc"
              width="80%"
              borderRadius={4}
              p={4}
              textAlign="center"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                "&:hover": {
                  backgroundColor: "#fff",
                  border: "2px solid #03A7E5",
               
                
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  justifyContent: "start",
                }}
              >
                <Box
                  component="img"
                  src={ad.image}
                  alt={ad.title}
                  sx={{ maxWidth: "40px", height: "auto" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "rubik",
                      fontSize: "18px",
                      fontWeight: 500,
                    }}
                  >
                    {ad.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "rubik",
                      fontSize: "14px",
                      fontWeight: 300,
                    }}
                  >
                    {ad.semiTitle}
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="body2"
                sx={{ textAlign: "start", lineHeight: "25px" }}
              >
                {ad.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Slider>

      {/* Control buttons */}
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginTop="3rem"
        gap={2}
        width="97%"
        paddingBottom="50px"
      >
        <IoArrowBackOutline
          size={30}
          onClick={() => sliderRef.current?.slickPrev()}
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          style={{
            cursor: "pointer",
            backgroundColor: isHovered2 ? "#03A7E5" : "#fff",
            padding: "6px",
            borderRadius: "50%",
            color: isHovered2 ? "#fff" : "#03A7E5",
            border: isHovered2 ? "1px solid #03A7E5" : "1px solid #03A7E5",
          }}
        />
        <IoMdArrowForward
          size={30}
          onClick={() => sliderRef.current?.slickNext()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            cursor: "pointer",
            backgroundColor: isHovered ? "#03A7E5" : "#fff",
            padding: "6px",
            borderRadius: "50%",
            color: isHovered ? "#fff" : "#03A7E5",
            border: isHovered ? "1px solid #03A7E5" : "1px solid #03A7E5",
          }}
        />
      </Box>
    </div>
  );
}

export default SliderSection;
