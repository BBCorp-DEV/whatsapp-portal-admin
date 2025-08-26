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
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/Auth";
import { IoArrowBackSharp } from "react-icons/io5";

const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const userType = location?.state?.type;
  console.log("bdjkgbjrgb", userType);
  const auth = useContext(AuthContext);
  const userData = auth.userData;
  const navigate = useNavigate();
  const sectionList = [
    "Dashboard",
    "Deposit Management",
    "WhatsApp User",
    "Withdrawal",
    "Transfer",
    "Account",
    "Error Log"
  ];

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      role: userData?.role === "admin" ? "" : "hospital",
      password: "",
      confirmPassword: "",
      permissions: sectionList.reduce((acc, section) => {
        acc[section] = false;
        return acc;
      }, {}),
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, "Enter a valid full name")
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      role: Yup.string().required("Role is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      // Optionally, you can add validation for permissions if needed
    }),
    onSubmit: (values) => {
      Adduserhandler(values);
    },
  });

  const Adduserhandler = async (values) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.users,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          emailid: values?.email,
          full_name: values?.firstName,
          password: values?.password,
          role: values?.role || "hospital",
          type_of_hospital: formik.values.type,
        },
      });
      if (response.data?.success === true) {
        toast.success(response.data?.message);
        navigate("/users");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  };
  const isSmall = useMediaQuery("(max-width:600px)");
  return (
    <Box sx={{ position: "relative", overflow: "hidden" }}>
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
        container
        spacing={3}
        sx={{
          // minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          marginTop: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2,
              width: "100%",
              maxWidth: { xs: "100%", sm: "90%", md: "75%" },
              color: "#000",
              border: "1px solid #fff",
              boxShadow: 1,
              zIndex: 111,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "20px", sm: "24px" } }}
            >
              {userType === "userList"
                ? "Add New User"
                : userType === "hospital"
                ? "Add New Hospital"
                : userType === "insurance"
                ? "Add New Insurance"
                : "Add New User"}
            </Typography>

            <form onSubmit={formik.handleSubmit}>
              {/* Full Name & Email */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={2}
              >
                {[
                  { label: "Full name", name: "firstName", type: "text" },
                  { label: "Email", name: "email", type: "email" },
                ].map(({ label, name, type }) => (
                  <Box key={name} flex={1}>
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
                      fullWidth
                      error={
                        formik.touched[name] && Boolean(formik.errors[name])
                      }
                      helperText={
                        formik.touched[name] && formik.errors[name]
                          ? formik.errors[name]
                          : " "
                      }
                      FormHelperTextProps={{
                        style: {
                          color: "red", // Custom text color
                          fontSize: "0.8rem", // Custom font size
                          marginTop: "4px",
                          marginLeft: "0px", // Optional spacing
                        },
                      }}
                      sx={{
                        mt: 2,
                        input: {
                          color: "black",
                          padding: "10px",
                          "::placeholder": {
                            color: "#888",
                          },
                        },
                        ".MuiFilledInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          border: "2px solid #0000004a",
                          paddingTop: "3px",
                          paddingLeft: "5px",
                          paddingRight: { xs: "0px", md: "135px" },
                          "&:before, &:after": {
                            borderBottom: "none !important", // 👈 hides the default underline
                          },
                        },
                        ".MuiFilledInput-root:hover": {
                          border: "2px solid #0077cc",
                        },
                        ".MuiFormHelperText-root": {
                          color: "#f44336",
                        },
                        ".MuiFilledInput-input::placeholder": {
                          color: "#888",
                        },
                        ".MuiFormHelperText-root": {
                          marginLeft: "0px", // This sets the helper text margin-left
                          color: "red",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Password Fields */}
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={2}
              >
                {[
                  { label: "Password", name: "password", type: "password" },
                  {
                    label: "Confirm Password",
                    name: "confirmPassword",
                    type: "password",
                  },
                ].map(({ label, name, type }) => (
                  <Box key={name} flex={1}>
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
                      type={type}
                      name={name}
                      value={formik.values[name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      error={
                        formik.touched[name] && Boolean(formik.errors[name])
                      }
                      helperText={
                        formik.touched[name] && formik.errors[name]
                          ? formik.errors[name]
                          : " "
                      }
                      FormHelperTextProps={{
                        style: {
                          color: "red", // Custom text color
                          fontSize: "0.8rem", // Custom font size
                          marginTop: "4px",
                          marginLeft: "0px", // Optional spacing
                        },
                      }}
                      sx={{
                        mt: 2,
                        input: {
                          color: "black",
                          padding: "10px",
                          "::placeholder": {
                            color: "#888",
                          },
                        },
                        ".MuiFilledInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          border: "2px solid #0000004a",
                          paddingTop: "3px",
                          paddingLeft: "5px",
                          paddingRight: "135px",
                          "&:before, &:after": {
                            borderBottom: "none !important", // 👈 hides the default underline
                          },
                        },
                        ".MuiFilledInput-root:hover": {
                          border: "2px solid #0077cc",
                        },
                        ".MuiFormHelperText-root": {
                          color: "#f44336",
                        },
                        ".MuiFilledInput-input::placeholder": {
                          color: "#888",
                        },
                        ".MuiFormHelperText-root": {
                          marginLeft: "0px", // This sets the helper text margin-left
                          color: "red",
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Role Dropdown */}
              {userData?.role === "admin" && (
                <>
                  <label
                    style={{
                      color: "#000",
                      display: "block",
                      marginBottom: -5,
                      paddingTop: "20px",
                    }}
                  >
                    Role
                  </label>
                  <FormControl
                    variant="filled"
                    fullWidth
                    sx={{
                      mt: 2,
                      ".MuiFilledInput-root": {
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        border: "2px solid #0000004a",
                        paddingLeft: "5px",
                        paddingTop: "6px",
                        height: "55px",
                        paddingBottom: "15px",
                        "&:before, &:after": {
                          borderBottom: "none !important", // 👈 hides the default underline
                        },
                      },
                      ".MuiFilledInput-root:hover": {
                        border: "2px solid #0077cc",
                      },
                    }}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                  >
                    <Select
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      displayEmpty
                    >
                      <MenuItem value="" disabled>
                        Select Role
                      </MenuItem>
                      <MenuItem value="insurance">Insurance</MenuItem>
                      <MenuItem value="policyholder">Policy Holder</MenuItem>
                      <MenuItem value="hospital">Hospital</MenuItem>
                    </Select>
                    <FormHelperText style={{ marginLeft: "0px" }}>
                      {formik.touched.role && formik.errors.role}
                    </FormHelperText>
                  </FormControl>
                </>
              )}

              {/* New Field */}
              {userData?.role === "admin" &&
                formik.values.role === "hospital" && (
                  <>
                    <label
                      style={{
                        color: "#000",
                        display: "block",
                        marginBottom: -5,
                        paddingTop: "20px",
                      }}
                    >
                      Type
                    </label>
                    <FormControl
                      variant="filled"
                      fullWidth
                      sx={{
                        mt: 2,
                        ".MuiFilledInput-root": {
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          border: "2px solid #0000004a",
                          paddingLeft: "5px",
                          paddingTop: "6px",
                          height: "55px",
                          paddingBottom: "15px",
                          "&:before, &:after": {
                            borderBottom: "none !important",
                          },
                        },
                        ".MuiFilledInput-root:hover": {
                          border: "2px solid #0077cc",
                        },
                      }}
                      error={formik.touched.type && Boolean(formik.errors.type)}
                    >
                      <Select
                        name="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Role
                        </MenuItem>
                        <MenuItem value="Primary">Primary</MenuItem>
                        <MenuItem value="Secondary">Secondary</MenuItem>
                        <MenuItem value="Tertiary">Tertiary</MenuItem>
                      </Select>
                      <FormHelperText style={{ marginLeft: "0px" }}>
                        {formik.touched.type && formik.errors.type}
                      </FormHelperText>
                    </FormControl>

                    {formik.values.type && (
                      <div style={{ marginTop: "20px", color: "#0077cc" }}>
                        {/* Your content to show after selection */}
                        You selected: <strong>{formik.values.type}</strong>
                      </div>
                    )}
                  </>
                )}

              {/* Permission Checkboxes */}
              <Box sx={{ mt: 3, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: "#0077cc", mb: 1 }}>
                  Permissions
                </Typography>
                <Grid container spacing={2}>
                  {sectionList.map((section) => (
                    <Grid item xs={12} sm={6} md={4} key={section}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={formik.values.permissions[section]}
                            onChange={e => {
                              formik.setFieldValue(`permissions.${section}`, e.target.checked);
                            }}
                            sx={{
                              color: "#0077cc",
                              "&.Mui-checked": {
                                color: "#00CFFD",
                              },
                            }}
                          />
                        }
                        label={<Typography sx={{ color: "#0077cc", fontSize: { xs: "13px", sm: "14px" } }}>{section}</Typography>}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 4,
                  background: "#0077cc",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                {loading ? "Adding..." : "Add User"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddUser;
