import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ApiConfig from "../ApiConfig";
import axios from "axios";
import { AuthContext } from "../context/Auth";
import toast from "react-hot-toast";

// Validation Schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(
      /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
      "Enter at least first and last name with only letters"
    )
    .required("Full name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = useContext(AuthContext);
const navigate = useNavigate();
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const SignupHandler = async (values) => {
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.signup,
        data: {
          emailid: values?.email,
          password: values?.password,
          full_name: values?.firstName,
        },
      });
      console.log("successsuccess", response?.data?.success);
      if (response?.data?.success === true) {
        console.log("jwtTokenjwtToken", response?.data?.data);
        toast.success(response.data.message);
        auth.checkLogin(response?.data?.data?.jwtToken);
        window.localStorage.setItem(
          "adminToken",
          response?.data?.data?.jwtToken
        );
        window.localStorage.setItem(
          "userData",
          JSON.stringify(response?.data?.data)
        );

        auth.getProfileData();
        auth.setIsLogin(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // 2 seconds
        // navigate("/dashboard");
        // history.push("/dashboard");
        console.log("responseresponse", response);
      }
    } catch (error) {
      toast.error(error?.response.data.message);
      console.log("errorerror", error);
      return error?.response;
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: {xs:"60vh",md:"100vh"} }}>
      <Grid
        spacing={5}
        container
        sx={{
          minHeight: {xs:"60vh",md:"100vh"},
          backgroundColor: "#fdfbf9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              p: 5,
              borderRadius: 2,
              width: "100%",
              maxWidth: 450,
              color: "#000",
              border: "1px solid #fff",
              boxShadow: 1,
              zIndex: 111,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Sign Up
            </Typography>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                SignupHandler(values);
                console.log("✅ Form submitted", values);
                // You can now send data to the backend
              }}
            >
              {({ values, handleChange, handleBlur, errors, touched }) => (
                <Form>
                  {[
                    { label: "Full name", name: "firstName", type: "text" },

                    { label: "Email", name: "email", type: "text" },
                    { label: "Password", name: "password", type: "password" },
                    {
                      label: "Confirm Password",
                      name: "confirmPassword",
                      type: "password",
                    },
                  ].map(({ label, name, type }) => (
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
                      <Field
                        as={TextField}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        variant="filled"
                        type={
                          name === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : name === "confirmPassword"
                            ? showConfirmPassword
                              ? "text"
                              : "password"
                            : type
                        }
                        name={name}
                        value={values[name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        error={touched[name] && !!errors[name]}
                        
                        helperText={touched[name] && errors[name]}
                        FormHelperTextProps={{
                          style: {
                            color: "red",
                            fontSize: "0.8rem",
                            marginTop: "4px",
                            marginLeft:"0px"
                          },
                        }}
                        sx={{
                          mt: 2,
                          input: {
                            color: "black",
                            padding: "10px",
                            "::placeholder": {
                              color: "#888",
                              opacity: 1,
                            },
                          },
                          label: {
                            color: "#ccc",
                          },
                          ".MuiFilledInput-root": {
                            backgroundColor: "#fff",
                            borderRadius: 2,
                            border: "2px solid #0000004a",
                            paddingTop: "3px",
                            paddingLeft: "5px",
                          },
                          ".MuiFilledInput-root:hover": {
                            border: "2px solid #0077cc",
                          },
                        }}
                        InputProps={{
                          disableUnderline: true,
                          ...(name === "password" || name === "confirmPassword"
                            ? {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={
                                        name === "password"
                                          ? handleTogglePassword
                                          : handleToggleConfirmPassword
                                      }
                                      edge="end"
                                    >
                                      {name === "password" ? (
                                        showPassword ? (
                                          <GoEye />
                                        ) : (
                                          <GoEyeClosed />
                                        )
                                      ) : showConfirmPassword ? (
                                        <GoEye />
                                      ) : (
                                        <GoEyeClosed />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }
                            : {}),
                        }}
                      />
                    </div>
                  ))}

                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          color: "#0077cc",
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
                          color: "#0077cc",
                          fontSize: "12px",
                          lineHeight: {xs:"17px", md:"20px"},
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
                    sx={{
                      mt: 4,
                      background: "#0077cc",
                      textTransform: "none",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    Create account
                  </Button>
                </Form>
              )}
            </Formik>

            <Divider sx={{ mt: 3, mb: 1, backgroundColor: "#0077cc" }} />

            <Typography align="center" variant="body2" sx={{ color: "#888" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  listStyle: "none",
                  color: "#0077cc",
                }}
              >
                Login
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
