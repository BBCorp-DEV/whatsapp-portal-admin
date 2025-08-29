import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import ApiConfig from "../ApiConfig";
import { IoArrowBackSharp } from "react-icons/io5";

const Changepassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Must be at least 8 characters, contain one uppercase and one number"
      )
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const token = window.localStorage.getItem("adminToken");

    try {
      const response = await axios.put(
        ApiConfig.changepassword,
        {
          old_password: values.currentPassword,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Replace `yourToken` with your actual token
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <Box
        sx={{
          cursor: "pointer",
          background: "#82828214;",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => navigate("/dashboard")}
      >
        <IconButton sx={{ color: "#000", p: 0 }}>
          <IoArrowBackSharp size={25} />
        </IconButton>
      </Box>
      <Grid
        container
        spacing={5}
        sx={{
          // minHeight: { xs: "10vh", md: "100vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              p: 5,
              borderRadius: 2,
              width: "100%",
              maxWidth: 450,
              color: "#000",
              boxShadow: 1,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Change Password
            </Typography>

            <Formik
              initialValues={{
                currentPassword: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
              }) => (
                <Form>
                  {[
                    {
                      label: "Current Password",
                      name: "currentPassword",
                      showToggle: false,
                    },
                    {
                      label: "New Password",
                      name: "password",
                      showToggle: true,
                      isVisible: showPassword,
                      toggle: togglePasswordVisibility,
                    },
                    {
                      label: "Confirm Password",
                      name: "confirmPassword",
                      showToggle: true,
                      isVisible: showConfirmPassword,
                      toggle: toggleConfirmPasswordVisibility,
                    },
                  ].map(({ label, name, showToggle, isVisible, toggle }) => (
                    <div key={name}>
                      <label
                        style={{
                          color: "#000",
                          display: "block",
                          marginBottom: -5,
                          paddingTop: "20px",
                        }}
                      >
                        {label}
                      </label>
                      <TextField
                        placeholder={`Enter ${label.toLowerCase()}`}
                        variant="filled"
                        name={name}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched[name] && Boolean(errors[name])}
                        helperText={touched[name] && errors[name]}
                        FormHelperTextProps={{
                          style: {
                            color: "red",            // Custom text color
                            fontSize: "0.8rem",      // Custom font size
                            marginTop: "4px",   
                            marginLeft:"0px"     // Optional spacing
                          },
                        }}
                        sx={{
                          mt: 2,
                          ml: 0,
                          input: {
                            color: "black",
                            padding: "10px",
                          },
                          ".MuiFilledInput-root": {
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            border: "2px solid #0000004a",
                            paddingTop: "3px",
                            paddingLeft: "5px",
                          },
                          ".MuiFilledInput-root:hover": {
                            border: "2px solid #03A7E5",
                          },
                          ".MuiFormHelperText-root": {
                            marginLeft: "0px", // This sets the helper text margin-left
                          },
                        }}
                        type={
                          showToggle
                            ? isVisible
                              ? "text"
                              : "password"
                            : "password"
                        }
                        InputProps={{
                          disableUnderline: true,
                          ...(showToggle && {
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={toggle} edge="end">
                                  {isVisible ? <GoEye /> : <GoEyeClosed />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }),
                        }}
                      />
                    </div>
                  ))}

                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "#03A7E5",
                          "&.Mui-checked": {
                            color: "#00CFFD",
                          },
                        }}
                      />
                    }
                    sx={{ mt: 1 }}
                    label={
                      <Typography
                        variant="body2"
                        style={{
                          color: "#03A7E5",
                          fontSize: "12px",
                          lineHeight: "20px",
                          textAlign: "justify",
                          marginTop: "25px",
                        }}
                      >
                        Don’t email me about product updates. If this box is
                        left unticked, UhuruCare will occasionally send helpful
                        and relevant emails. You can unsubscribe at any time.{" "}
                        <a
                          href="#"
                          style={{
                            color: "#00CFFD",
                            textDecoration: "none",
                            fontWeight: "600",
                          }}
                        >
                          Privacy Policy
                        </a>
                      </Typography>
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    sx={{
                      mt: 4,
                      background: "#03A7E5",
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Changepassword;
