import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

export default function TermTitle() {
    return (
        <Box className="back-bann-211">
            <Container maxWidth="md">
                <Box mt={6} className="text-center">
                    <Typography variant="h5" sx={{ color: "#000",textAlign:"center",fontWeight:"700" }}>
                    UHURUCARE LTD WEBSITE TERMS AND CONDITIONS (Under Ghanaian Law)
                    </Typography>
                    {/* <Typography className="mt-4 animate__animated animate__fadeInLeft" sx={{ color: "#FFFFFFB2" }} variant="h4">
                    Last updated February 19, 2025
                    </Typography> */}


                </Box>
            </Container>
        </Box>
    );
}
