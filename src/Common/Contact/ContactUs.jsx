


import React, { useState } from "react";
import { Grid, Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("First name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  message: Yup.string().required("Message is required"),
});

const ContactUs = () => {
  const [show, setShow] = useState(false);

  const contactForm = async (values, { resetForm }) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios.post(ApiConfig.contactUs, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setShow(true);
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: contactForm,
  });

  return (
    <Box sx={{
      width: "100%",
      maxWidth: "95%",
      margin: "auto",
      p: "10px 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "auto",
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Box
              component="img"
              src="/cont1.png"
              alt="description"
              sx={{
                width: { xs: "100%", md: "500px" },
                height: "400px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ p: 4, width: "100%" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "600", fontSize: "30px" }}>
              Contact Us
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              {/* Row 1: First Name & Last Name */}
            
                <Box sx={{  /* or "500px", "80%", etc. */ }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                  </Box>
               
                {/* <Grid item xs={12} sm={6}>
                <Box sx={{ width: "300px" }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                  </Box>
                </Grid> */}
             

              {/* Row 2: Email & Phone */}
              <Grid container spacing={2} mt={1}>
                <Grid item xs={12} sm={6}>
                  <Box mt={1} sx={{ width: "300px" /* or "500px", "80%", etc. */ }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      sx={{
                        "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                      }}
                    />
                  </Box>

                </Grid>
                <Grid item xs={12} sm={6}>
                <Box mt={1} sx={{ width: "300px" /* or "500px", "80%", etc. */ }}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    sx={{
                      "& .MuiOutlinedInput-root": { borderRadius: "10px" },
                    }}
                  />
                    </Box>
                </Grid>
              </Grid>

              {/* Message */}
              <TextField
                fullWidth
                margin="normal"
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
              />

              {/* Success Message */}
              {/* {show && (
                <Typography color="success.main" fontSize="small">
                  Thank you, we’ll get back to you soon.
                </Typography>
              )} */}

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                  borderRadius: "12px",
                  textTransform: "none",
                  transition: "0.3s",
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0 0%, #1e88e5 100%)",
                    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.25)",
                  },
                }}
              >
                Send Message
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;

