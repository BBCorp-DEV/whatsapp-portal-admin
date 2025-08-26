
import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Container,
  useMediaQuery,
  InputLabel,
  MenuItem,
  Select,
  FormGroup,
  Checkbox,
  FormHelperText,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AuthContext } from "../../Auth/context/Auth";
import { Formik } from "formik";
import * as Yup from "yup";
import '../../App.css';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { data, useNavigate } from "react-router-dom";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MedicalHistoryNotice from "./MedicalHistoryNotice";

const NewEnroll = () => {
  const navigate = useNavigate();
  const { enrollment, setEnrollment } = useContext(AuthContext);
  console.log("enrollment", enrollment);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const countryCodes = [
    { code: "+233", label: "Ghana (+233)" },
    { code: "++1", label: "USA (+1)" },
    { code: "+44", label: "UK (+44)" },
    { code: "+33", label: "France (+33)" },
    { code: "+49", label: "Germany (+49)" },
    { code: "+39", label: "Italy (+39)" },
    { code: "+1", label: "Canada (+1)" },
    { code: "+34", label: "Spain (+34)" },
    { code: "+31", label: "Netherlands (+31)" },
    { code: "+46", label: "Sweden (+46)" },
    { code: "+41", label: "Switzerland (+41)" },
  ];

  const initialValues = {
    first_name: "",
    last_name: "",
    full_name: "", // this will be computed on submit
    dob: null,
    national_id: "",
    gender: "",
    emailid: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
    address: "",
    medical_history: [],
    checked: false,
  };
  const formatDateToYMD = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };



  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    dob: Yup.date().nullable().required("Date of birth is required"),
    national_id: Yup.string().required("Ghana Card Number (or other valid ID)"),
    gender: Yup.string().required("Gender is required"),
    emailid: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phone_number: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    medical_history: Yup.array().min(1, "Select at least one medical condition"),
    checked: Yup.boolean().oneOf([true], "You must accept the terms"),
  });


  return (
    <Box>
      <Box sx={{ bgcolor: "#0077cc", p: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
          UhuruCare Plan Enrollment
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("adsfasdfasdfasd",values);
          const dataToSubmit = {
            ...values,
            full_name: `${values.first_name} ${values.last_name}`.trim(),
          };

          // Remove confirmPassword before submission
          delete dataToSubmit.confirmPassword;

          // Ensure proper country code formatting
          const correctedCountryCode =
            values.countryCode === "++1" ? "+1" : values.countryCode;

          // Update the global enrollment state
          setEnrollment((prev) => ({
            ...prev,
            ...dataToSubmit,
            countryCode: correctedCountryCode, // ensure it’s actually used
            dob: formatDateToYMD(values.dob),
          }));

          console.log("Final Data:", {
            ...dataToSubmit,
            countryCode: correctedCountryCode,
            dob: formatDateToYMD(values.dob),
          });

          console.log("Submitted Values:", values);
          navigate("/image-enroll");
        }}

      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} noValidate>

            <Container maxWidth="lg">
              <Box
                sx={{
                  bgcolor: "#f8f8f8",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                  border: "1px solid #ccc",
                  borderBottom: "1px solid #ccc",
                  p: 2,
                  px: 4,
                  maxWidth: 1300,
                  margin: "auto",
                  mt: 4,

                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "600", fontSize: "25px" }}>
                  Step 2: Provide Personal, Contact & Medical Information
                </Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "0 0 8px 8px",
                  border: "1px solid #ccc",
                  borderTop: "none",
                  p: 4,
                  maxWidth: 1300,
                  margin: "auto",
                  marginBottom: "30px"

                }}
              >

                {/* Personal Details */}
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Personal Details:
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    mt={2}
                  >
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.first_name && Boolean(errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_name && Boolean(errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        name="national_id"
                        label="Ghana Card Number (or other valid ID)"
                        placeholder="Type your unique id card number."
                        value={values.national_id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.national_id && Boolean(errors.national_id)}
                        helperText={touched.national_id && errors.national_id}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row value={values.gender}
                          name="gender"
                          onChange={handleChange}
                          onBlur={handleBlur}>
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid size={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Date of Birth"
                          value={values.dob}
                          onChange={(value) => setFieldValue("dob", value)}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              error={touched.dob && Boolean(errors.dob)}
                              helperText={touched.dob && errors.dob}
                              FormHelperTextProps={{
                                sx: {
                                  marginLeft: '0px'
                                }
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Box>

                {/* Contact Information */}
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Contact Information:
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    mt={2}
                  // rowSpacing={1}
                  // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="emailid"
                        value={values.emailid}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Type your email id"
                        error={touched.emailid && Boolean(errors.emailid)}
                        helperText={touched.emailid && errors.emailid}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Type your password here."
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Type your confirm password here."
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Residential Address"
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Type your postal address"
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                    <Grid size={6}>
                      <FormControl fullWidth error={touched.countryCode && Boolean(errors.countryCode)}>
                        <InputLabel>Country Code</InputLabel>
                        <Select
                          name="countryCode"
                          label="Country Code"
                          value={values.countryCode}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          {countryCodes.map((item) => (
                            <MenuItem key={item.code} value={item.code}>
                              {item.label}
                            </MenuItem>
                          ))}

                        </Select>
                        {touched.countryCode && errors.countryCode && (
                          <FormHelperText sx={{ marginLeft: '0px', color: 'red' }}>{errors.countryCode}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone_number"
                        value={values.phone_number}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Type your phone number"
                        error={touched.phone_number && Boolean(errors.phone_number)}
                        helperText={touched.phone_number && errors.phone_number}
                        FormHelperTextProps={{
                          sx: {
                            marginLeft: '0px'
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Mandatory : Select a Past Medical History (Multiple Choice) and
                    Provide Additional Details if Needed:
                  </Typography>
                </Box>
                <FormGroup>
                  {[
                    "Hypertension",
                    "Diabetes",
                    "Asthma",
                    "Heart Disease",
                    "Stroke",
                    "Kidney Disease",
                    "Sickle Cell Disease",
                    "Arthritis",
                    "Cancer",
                    "None of the above",
                  ].map((condition) => (
                    <FormControlLabel
                      key={condition}
                      control={
                        <Checkbox
                          checked={values.medical_history.includes(condition)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            const updated = checked
                              ? [...values.medical_history, condition]
                              : values.medical_history.filter((item) => item !== condition);
                            setFieldValue("medical_history", updated);
                          }}
                        />
                      }
                      label={condition}
                    />
                  ))}
                  {/* "Other" - add extra input for other if needed */}
                  <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.medical_history.includes("Other")}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...values.medical_history, "Other"]
                            : values.medical_history.filter((item) => item !== "Other");
                          setFieldValue("medical_history", updated);
                        }}
                      />
                    }
                    label="Other (Please specify):"
                  />
                  <TextField

                    label="....."
                    name="other"
                    value={values.other}
                    placeholder="other"
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setFieldValue("other", newValue);
                  
                      // Remove any existing 'other' value first
                      const withoutOther = values.medical_history.filter(
                        (item) => item !== values.other
                      );
                  
                      // Add new 'other' value if it's non-empty
                      const updated = newValue
                        ? [...withoutOther, newValue]
                        : withoutOther;
                  
                      setFieldValue("medical_history", updated);
                    }}
                    FormHelperTextProps={{
                      sx: {
                        marginLeft: '0px',
                        width: '120px',
                        height: '20px!important',
                      }
                    }}
                  />
                  </Box>
                 
                </FormGroup>
                <Box>
                  <MedicalHistoryNotice />
                  <FormControlLabel
                    control={<Checkbox checked={values?.checked} name="checked" onChange={handleChange} onBlur={handleBlur} />}
                    label="I acknowledge and agree to the Medical History Disclaimer & Privacy Policy."
                  />
                  {touched.checked && errors.checked && (
                    <FormHelperText sx={{ marginLeft: '0px', color: 'red' }}>{errors.checked}</FormHelperText>
                  )}
                </Box>
                <Box sx={{ mt: 4, cursor: "pointer" }}>
                  <Button
                    sx={{
                      background: "#03A7E5",
                      color: "#fff !important",
                      textTransform: "capitalize !important",
                    }}

                    type="submit"
                    startIcon={<ArrowForwardIcon />}
                  >
                    Next Step
                  </Button>
                </Box>
              </Box>
            </Container>





          </form>
        )}
      </Formik>
    </Box>
  );
};

export default NewEnroll;
