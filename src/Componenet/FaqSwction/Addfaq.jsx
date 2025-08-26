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
  FormHelperText,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
import JoditEditor from "jodit-react";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function Addfaq({ plan }) {
  const location = useLocation();
  const { userData } = location?.state || {};
  const navigate = useNavigate();

  const [plans, setPlans] = useState("");
  console.log("dafsadfdfsa", plans);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const editor = useRef(null);
  const config = {
    readonly: false,
  };

  const getPlansHanlder = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    // setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}api/v1/plans/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success === true) {
        setPlans(response?.data?.data);
        toast.success(response?.data?.message ?? "faq Add successfully");
      } else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      return error?.response;
      toast.error(error?.data?.message ?? "Please try again");
    } finally {
      // setLoading(false);
    }
  };

  const handleSubmit = (values) => {
    EditPlansHandler(values);
    console.log("Updated Plan Values:", values);
  };

  const EditPlansHandler = async (values) => {
    console.log("Asdfgadsgsadgas", values);
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", "https://www.youtube.com/watch?v=example");
    formData.append("type", "faqs");
    formData.append("title", values?.plan_name);
    formData.append("description", values?.plan_description);
    formData.append("video_url", "https://www.youtube.com/watch?v=example");
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.AllContent,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response?.data?.success === true) {
          toast.success(response?.data?.message ?? "Faq Add successfully");
        setLoading(false);
        navigate(-1);
        console.log("Plan updated successfully");
      }
      else{
          toast.error(response?.data?.message ?? "Please Try Again");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.message ?? "Please Try Again");
      return error?.response;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.plan_id) {
      getPlansHanlder(userData?.plan_id);
    }
  }, [userData?.plan_id]);

  const initialValues = {
    plan_name: "",
    plan_description: "",
  };

  const validationSchema = Yup.object().shape({
    plan_name: Yup.string()
      .matches(
        /^[A-Za-z0-9.,?'"\-()! ]{3,200}$/,
        "Only valid question characters allowed"
      )
      .required("Question is required"),
    plan_description: Yup.string().required("Answer is required"),
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
        onClick={() => navigate("/faq")}
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
          Add Faq Details
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Question"
                      name="plan_name"
                      value={values.plan_name}
                      onChange={handleChange}
                      error={touched.plan_name && Boolean(errors.plan_name)}
                      helperText={touched.plan_name && errors.plan_name}
                      FormHelperTextProps={{
                        style: {
                          color: "red", // Custom text color
                          fontSize: "0.8rem", // Custom font size
                          marginTop: "4px",
                          marginLeft: "0px", // Optional spacing
                        },
                      }}
                      margin="normal"
                    />
                  </Grid>
                </Box>
              </Grid>

              <Box mt={3}>
                <Typography variant="subtitle1" mb={1}>
                  Faq answer
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
