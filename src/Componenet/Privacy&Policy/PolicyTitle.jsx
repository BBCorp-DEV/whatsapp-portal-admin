import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

export default function PolicyTitle() {
    return (
        <Box className="back-bann-211">
            <Container maxWidth="md">
                <Box mt={6} className="text-center">
                    <Typography variant="h5" sx={{ color: "#000",textAlign:"center",fontWeight:"700" }}>
                    UhuruCare Privacy Policy
                    </Typography>
                    <Typography className="mt-4 animate__animated animate__fadeInLeft" sx={{ color: "grey",textAlign:'center' }} variant="body2">
                    Effective Date: 29/04/2025
                    </Typography>


                </Box>
            </Container>
        </Box>
    );
}
