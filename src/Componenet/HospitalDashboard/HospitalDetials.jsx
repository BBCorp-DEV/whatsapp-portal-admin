import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Changepassword from "../../Auth/ChangePassword/Changepassword";

const HospitalDetials = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    gender: "",
    status: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const maskEmail = (email) => {
    if (!email || email.length < 12) return email;
    const firstPart = email.slice(0, 2);
    const lastPart = email.slice(email.indexOf("@") - 2);
    return `${firstPart}****${lastPart}`;
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log("Updated Data:", formData);
    handleClose();
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
        // py: 5,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: isSmDown ? "90%" : "55%",
          borderRadius: 5,
          p: 4,
          textAlign: "start",
          boxShadow: "none",
        }}
      >
        <Typography variant="h4" align="start" fontWeight={600} gutterBottom>
          Hospital Details
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ background: "#f5f5f5", padding: "10px 24px", borderRadius: "10px" }}
        >
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Hospital Name:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">All India Campus</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Owner Name:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="text.secondary">Richard Harry</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Address:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">Delhi</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Email:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">richard@gmial.com</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Phone:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">7412589630</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Number of Beds:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">985</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Website:</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">https://ricahrd.com</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Year of Establishment:</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">1986</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">24x7 Services (Yes/No):</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1"> Yes</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Parking Availability:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">Yes</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HospitalDetials;
