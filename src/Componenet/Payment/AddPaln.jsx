import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
import JoditEditor from "jodit-react";
import { IoArrowBackSharp } from "react-icons/io5";

export default function AddPaln({ plan }) {
  const location = useLocation();
  const { userData } = location?.state || {};
  const navigate = useNavigate();

  const [plans, setPlans] = useState("");
  console.log("dafsadfdfsa", plans);
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);
  const config = {
    readonly: false,
  };


  const handleSubmit = (values) => {
    AddPlansHandler(values);
    console.log("Updated Plan Values:", values);
  };

  const AddPlansHandler = async (values) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.PlanAdding,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          
          plan_name:values?.plan_name,
          plan_description:values?.plan_description,
          coverage_amount:values?.coverage_amount,
          coverage_duration: values?.coverage_duration,
          status: "active",
          inpatient:values?.inpatient,
          outpatient:values?.outpatient,
       
         
        },
      });
      if (response?.data?.success === true) {
        setLoading(false);
        navigate("/plans");
        console.log("Plan updated successfully");
      }
    } catch (error) {
      setLoading(false);
      return error?.response;
    } finally {
      setLoading(false);
    }
  };
  const initialValues = {
    plan_name:  "",
    plan_description: "",
    coverage_amount:  "",
    coverage_duration: "",
    inpatient:"",
    outpatient:"",

  };

  const validationSchema = Yup.object().shape({
    plan_name: Yup.string()
      .matches(
        /^[A-Za-z0-9+ ]{3,30}$/,
        "Only letters, numbers, spaces or '+' allowed"
      )
      .required("Plan name is required"),
    coverage_amount: Yup.number()
      .typeError("Amount must be a number")
      .required("Coverage amount is required"),
    coverage_duration: Yup.number()
      .typeError("Duration must be a number")
      .required("Coverage duration is required"),
    plan_description: Yup.string().required("Plan description is required"),
    inpatient: Yup.number()
    .typeError("Amount must be a number")
    .required("Inpatient amount is required"),
    outpatient: Yup.number()
    .typeError("Amount must be a number")
    .required("Outpatient amount is required"),
  });

  return (
    <Box>
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
        onClick={() => navigate("/plans")}
      >
        <IconButton sx={{ color: "#000", p: 0 }}>
          <IoArrowBackSharp size={25} />
        </IconButton>
      </Box>

      <Paper
        elevation={1}
        sx={{ p: 3, maxWidth: 800, mx: "auto", mt: 4, borderRadius: 4 }}
      >
        <Typography variant="h5" mb={2} sx={{ fontWeight: 600 }}>
          Add Plan Details
        </Typography>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Plan Name"
                    name="plan_name"
                    value={values.plan_name}
                    onChange={handleChange}
                    error={touched.plan_name && Boolean(errors.plan_name)}
                    helperText={touched.plan_name && errors.plan_name}
                    FormHelperTextProps={{
                      style: {
                        color: "red",            // Custom text color
                        fontSize: "0.8rem",      // Custom font size
                        marginTop: "4px",
                        marginLeft: "0px"     // Optional spacing
                      },
                    }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Coverage Amount (GHS)"
                    name="coverage_amount"
                    value={values.coverage_amount}
                    onChange={handleChange}
                    error={
                      touched.coverage_amount && Boolean(errors.coverage_amount)
                    }
                    helperText={
                      touched.coverage_amount && errors.coverage_amount
                    }
                    FormHelperTextProps={{
                      style: {
                        color: "red",            // Custom text color
                        fontSize: "0.8rem",      // Custom font size
                        marginTop: "4px",
                        marginLeft: "0px"     // Optional spacing
                      },
                    }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Coverage Duration (in years)"
                    name="coverage_duration"
                    value={values.coverage_duration}
                    onChange={handleChange}
                    error={
                      touched.coverage_duration &&
                      Boolean(errors.coverage_duration)
                    }
                    helperText={
                      touched.coverage_duration && errors.coverage_duration
                    }
                    FormHelperTextProps={{
                      style: {
                        color: "red",            // Custom text color
                        fontSize: "0.8rem",      // Custom font size
                        marginTop: "4px",
                        marginLeft: "0px"     // Optional spacing
                      },
                    }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="inpatient"
                    name="inpatient"
                    value={values.inpatient}
                    onChange={handleChange}
                    error={
                      touched.inpatient &&
                      Boolean(errors.inpatient)
                    }
                    helperText={
                      touched.inpatient && errors.inpatient
                    }
                    FormHelperTextProps={{
                      style: {
                        color: "red",            // Custom text color
                        fontSize: "0.8rem",      // Custom font size
                        marginTop: "4px",
                        marginLeft: "0px"     // Optional spacing
                      },
                    }}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="outpatient"
                    name="outpatient"
                    value={values.outpatient}
                    onChange={handleChange}
                    error={
                      touched.outpatient &&
                      Boolean(errors.outpatient)
                    }
                    helperText={
                      touched.outpatient && errors.outpatient
                    }
                    FormHelperTextProps={{
                      style: {
                        color: "red",            // Custom text color
                        fontSize: "0.8rem",      // Custom font size
                        marginTop: "4px",
                        marginLeft: "0px"     // Optional spacing
                      },
                    }}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant="subtitle1" mb={1}>
                  Plan Description
                </Typography>
                <JoditEditor
                  ref={editor}
                  value={values.plan_description}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    setFieldValue("plan_description", newContent);
                  }}
                />
                {touched.plan_description && errors.plan_description && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.plan_description}
                  </Typography>
                )}
              </Box>

              <Box textAlign="right" mt={3} sx={{ height: "45px" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#0077cc",
                    textTransform: "Capitalize",
                    px: 4,
                    py: 1,
                    borderRadius: "8px",
                    fontWeight: "bold",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
