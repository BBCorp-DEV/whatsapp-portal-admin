import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../../Auth/ApiConfig";
import { IoArrowBackSharp } from "react-icons/io5";

const today = new Date();
const minDate = new Date(
  today.getFullYear() - 90,
  today.getMonth(),
  today.getDate()
);
const maxDate = new Date(
  today.getFullYear() - 12,
  today.getMonth(),
  today.getDate()
);

const validationSchema = Yup.object({
  full_name: Yup.string()
    .matches(
      /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
      "Enter at least first and last name with only letters"
    )
    .required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{7,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  national_id: Yup.string(),
  dob: Yup.string()
    .required("Date of birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .test(
      "is-valid-date",
      "Invalid date",
      (value) => !isNaN(new Date(value).getTime())
    )
    .test(
      "is-between-ages",
      "You must be between 12 and 90 years old",
      (value) => {
        const date = new Date(value);
        return date >= minDate && date <= maxDate;
      }
    ),
});

const EditUser = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const { userData } = location?.state || {};
  const [userDetails, setUserDetails] = useState({});

  const getProfileDataIds = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios.get(`${API_BASE_URL}api/v1/users/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setUserDetails(response.data.data);
      } else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Please try again");
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      full_name: userDetails?.full_name ?? "",
      email: userDetails?.emailid ?? "",
      phone: userDetails?.phone_number ?? "",
      address: userDetails?.address ?? "",
      national_id: userDetails?.national_id ?? "",
      dob: userDetails?.dob
        ? new Date(userDetails.dob).toISOString().split("T")[0]
        : "",
      subscribe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      EditProfileHandler(values);
    },
  });

  useEffect(() => {
    if (userData?.id) {
      getProfileDataIds(userData.id);
    }
  }, [userData?.id]);

  const EditProfileHandler = async (values) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios.put(
        `${API_BASE_URL}api/v1/users/${userDetails?.id}/profile`,
        // `http://3.144.242.180/api/v1/users/${userDetails?.id}/profile`,
        {
          address: values?.address,
          emailid: values?.email,
          dob: values?.dob,
          full_name: values?.full_name,
          national_id: values?.national_id,
          phone_number: values?.phone,
        },
        { headers: { authorization: `Bearer ${token}` } }
      );

      if (response?.data?.success === true) {
        toast.success(response.data.message);
        navigate("/dashboard");
        auth.getProfileData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const isSmall = useMediaQuery("(max-width:600px)");
  const renderTextField = ({ label, name, type }) => (
    <div key={name}>
      <label
        style={{
          color: "#000",
          display: "block",
          marginBottom: -5,
          paddingTop: isSmall ? "0px" : "20px",
         
        }}
      >
        {label}
      </label>
      <TextField
        placeholder={`Enter ${label.toLowerCase()}`}
        variant="filled"
        type={type}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        helperText={
          formik.touched[name] && formik.errors[name]
            ? formik.errors[name]
            : " "
        }
        FormHelperTextProps={{
          style: {
            color: "red",            // Custom text color
            fontSize: "0.8rem",      // Custom font size
            marginTop: "4px",   
            marginLeft:"0px"  ,
               // Optional spacing
          },
        }}
        sx={{
          mt: 2,
          input: { color: "black", padding: "10px" },
          ".MuiFilledInput-root": {
            backgroundColor: "#fff",
            borderRadius: 2,
            width:"100%",
            border: "2px solid #0000004a",
            paddingTop: "3px",
            paddingLeft: "5px",
            paddingRight: {xs:"0px",md:"135px"},
            "&:before, &:after": {
              borderBottom: "none !important", // 👈 hides the default underline
            },
          },
          ".MuiFilledInput-root:hover": {
            border: "2px solid #03A7E5",
          },
          ".MuiFormHelperText-root": {
            color: "#f44336",
          },
          ".MuiFilledInput-input::placeholder": {
            color: "#888",
          },
          ".MuiFormHelperText-root": {
            marginLeft: "0px", // This sets the helper text margin-left
            color:"red"
          }
        }}
      />
    </div>
  );

  return (
    <Box sx={{ position: "relative", overflow: "hidden", }}>
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
              onClick={() => navigate("/user-list")}
            >
              <IconButton sx={{ color: "#000", p: 0 }}>
                <IoArrowBackSharp size={25} />
              </IconButton>
            </Box>
      <Grid
        spacing={5}
        container
        sx={{
          // minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:"10px"
        }}
      >
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              p: 5,
              borderRadius: 2,
              maxWidth: 820,
              mx: "auto",
              color: "#000",
              border: "1px solid #fff",
              boxShadow: 1,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom
            sx={{fontSize:{xs:"1.4rem",md:"1.5rem"}}}
            >
              Edit User Details
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              {/* Full Name + Email side by side */}
              <Grid container spacing={2}>
                {[
                  { label: "Full name", name: "full_name", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                ].map(({ label, name, type }) => (
                  <Grid item xs={12} md={6} key={name}>
                    {renderTextField({ label, name, type })}
                  </Grid>
                ))}
              </Grid>

              {/* Phone + Address side by side */}
              <Grid container spacing={2}>
                {[
                  { label: "Phone", name: "phone", type: "text" },
                  { label: "Address", name: "address", type: "text" },
                ].map(({ label, name, type }) => (
                  <Grid item xs={12} md={6} key={name}>
                    {renderTextField({ label, name, type })}
                  </Grid>
                ))}
              </Grid>

              {/* Other fields one per row */}

              <Grid container spacing={2}>
                {[
                  { label: "National ID", name: "national_id", type: "text" },
                  { label: "Date of Birth", name: "dob", type: "text" },
                ].map(({ label, name, type }) => (
                  <Grid item xs={12} md={6} key={name}>
                    {renderTextField({ label, name, type })}
                  </Grid>
                ))}
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    name="subscribe"
                    checked={formik.values.subscribe}
                    onChange={formik.handleChange}
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
                    sx={{
                      color: "#03A7E5",
                      fontSize: "12px",
                      lineHeight: "20px",
                      mt: 3,
                    }}
                  >
                    If you'd like to receive helpful tips, updates, and news
                    from UhuruCare. We only send relevant content, and you can
                    unsubscribe anytime.
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
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUser;
