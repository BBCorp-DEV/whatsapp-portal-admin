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
  first_name: Yup.string()
    .min(2, "First name is too short")
    .required("First name is required"),
  last_name: Yup.string()
    .min(2, "Last name is too short")
    .required("Last name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d{7,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  permissions: Yup.array().of(Yup.string()),
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

  const [permissionsList] = useState([
    "Read",
    "Write",
    "Delete",
    "Admin",
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: userDetails?.full_name?.split(" ")[0] ?? "",
      last_name: userDetails?.full_name?.split(" ")[1] ?? "",
      email: userDetails?.emailid ?? "",
      phone: userDetails?.phone_number ?? "",
      permissions: userDetails?.permissions ?? [],
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
        {
          emailid: values?.email,
          full_name: `${values?.first_name} ${values?.last_name}`,
          phone_number: values?.phone,
          permissions: values?.permissions,
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
            color: "red",
            fontSize: "0.8rem",
            marginTop: "4px",
            marginLeft: "0px",
          },
        }}
        sx={{
          mt: 2,
          input: { color: "black", padding: "10px" },
          ".MuiFilledInput-root": {
            backgroundColor: "#fff",
            borderRadius: 2,
            width: "100%",
            border: "2px solid #0000004a",
            paddingTop: "3px",
            paddingLeft: "5px",
            paddingRight: { xs: "0px", md: "135px" },
            "&:before, &:after": {
              borderBottom: "none !important",
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
            marginLeft: "0px",
            color: "red",
          },
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {renderTextField({ label: "First Name", name: "first_name", type: "text" })}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderTextField({ label: "Last Name", name: "last_name", type: "text" })}
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  {renderTextField({ label: "Email", name: "email", type: "email" })}
                </Grid>
                <Grid item xs={12} md={6}>
                  {renderTextField({ label: "Phone", name: "phone", type: "text" })}
                </Grid>
              </Grid>
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  Permissions
                </Typography>
                <Grid container spacing={1}>
                  {permissionsList.map((perm) => (
                    <Grid item key={perm}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.permissions.includes(perm)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              formik.setFieldValue(
                                "permissions",
                                checked
                                  ? [...formik.values.permissions, perm]
                                  : formik.values.permissions.filter((p) => p !== perm)
                              );
                            }}
                            name={perm}
                            sx={{
                              color: "#03A7E5",
                              "&.Mui-checked": {
                                color: "#00CFFD",
                              },
                            }}
                          />
                        }
                        label={perm}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
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