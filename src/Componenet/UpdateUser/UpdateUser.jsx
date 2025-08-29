import React, { useContext } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/Auth";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";
import toast from "react-hot-toast";
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

const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Matches YYYY-MM-DD format
const validationSchema = Yup.object({
  full_name: Yup.string()
  .required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{7,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  // gender: Yup.string().required("Gender is required"),
  national_id: Yup.string(), // Optional — validate if needed
  dob: Yup.string()
    .required("Date of birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .test("is-valid-date", "Invalid date", (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .test(
      "is-between-ages",
      "You must be between 12 and 90 years old",
      (value) => {
        const date = new Date(value);
        return date >= minDate && date <= maxDate;
      }
    ),
});

const UpdateUser = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userData = auth?.userData;

  const formik = useFormik({
    initialValues: {
      full_name: userData?.full_name ?? "",
      email: userData?.emailid ?? "",
      phone: userData?.phone_number ?? "",
      address: userData?.address ?? "",
      national_id: userData?.national_id ?? "",
      dob: userData?.dob
        ? new Date(userData.dob).toISOString().split("T")[0]
        : "",
    },
    validationSchema,
    onSubmit: (values) => {
      EditProfileHandler(values);
      console.log("✅ Submitted:", values);
      // navigate("/dashboard");
    },
  });

  const EditProfileHandler = async (values) => {
    const token = window.localStorage.getItem("adminToken");
    try {
      const response = await axios({
        method: "PUT",
        url: ApiConfig.profile,
        headers: { authorization: `Bearer ${token}` },
        data: {
          address: values?.address,
          emailid: values?.email,
          dob: values?.dob,
          full_name: values?.full_name,
          national_id: values?.national_id,
          phone_number: values?.phone,
          // gender: values?.gender,
        },
      });
      console.log("successsuccess", response?.data?.success);
      if (response?.data?.success === true) {
        console.log("jwtTokenjwtToken", response?.data?.data);
        toast.success(response.data.message);
        navigate("/dashboard");
        auth.getProfileData();
        console.log("responseresponse", response);
      }
    } catch (error) {
      toast.error(error?.response.data.message);

      console.log("errorerror", error);
      return error?.response;
    }
  };
  const isSmall = useMediaQuery("(max-width:600px)");
  const renderTextField = ({ label, name, type }) => {
    const shouldDisable =
      userData?.role !== "admin" && (name === "email");
    return (
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
          disabled={shouldDisable}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched[name] && formik.errors[name]
              ? formik.errors[name]
              : " "
          }
          sx={{
            mt: 2,
            input: { color: "black", padding: "10px" },
            ".MuiFilledInput-root": {
              backgroundColor: "#fff",
              borderRadius: 2,
              border: "2px solid #0000004a",
              paddingTop: "3px",
              paddingLeft: "5px",
              paddingRight: "135px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            ".MuiFilledInput-root:hover": {
              border: "2px solid #03A7E5",
            },
            ".MuiFormHelperText-root": {
              color: "#f44336",
            },
            ".MuiFilledInput-input::placeholder": {
              color: "#888", // Change this to your desired placeholder color
            },
          }}
        />
      </div>
    );
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
        spacing={5}
        container
        sx={{
          minHeight: "100vh",
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
              maxWidth: 820,
              mx: "auto",
              color: "#000",
              border: "1px solid #fff",
              boxShadow: 1,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Edit{" "}
              {userData?.role?.charAt(0).toUpperCase() +
                userData?.role?.slice(1)}{" "}
              Details
            </Typography>

            <form onSubmit={formik.handleSubmit}>
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

              {/* Role Dropdown */}

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
                      mt: 2,
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
                  background: "#03A7E5",
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

export default UpdateUser;
