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
import ApiConfig, { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import JoditEditor from "jodit-react";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function EditFAQS({ plan }) {
  const location = useLocation();
  const { userData } = location?.state || {};

  console.log("Afgadsfgasdfsad", userData);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [plans, setPlans] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  console.log("dafsadfdfsa", plans);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    userData ? `${IMAGEURL}/${userData.image_path}` : null
  );
  const [uploadResponse, setUploadResponse] = useState(null);
  console.log("adgasdgasdg", uploadResponse);
  const editor = useRef(null);
  const config = {
    readonly: false,
  };

  const handleSubmit = (values) => {
    EditPlansHandler(values);
    console.log("Updated Plan Values:", values);
  };

  const uploadImageHandler = async (type, image) => {
    const formData = new FormData();

    formData.append("userPhoto", {
      uri: image?.path,
      name: image?.filename || "image.jpg",
      type: image?.mime,
    });

    // Add extra fields
    formData.append("mimetype", image?.mime);
    formData.append("filename", image?.filename || "image.jpg");
    formData.append("doc_id", "123"); // Replace with actual doc_id
    formData.append("doc_category", "receipt");

    try {
      const token = window.localStorage.getItem("adminToken");

      const res = await axios({
        method: "POST",
        url: `${API_BASE_URL}api/v1/claims/uploads`,
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      console.log("Upload success:", res.data);
    } catch (error) {
      console.log("upload error ---->", error);
    }
  };

  const EditPlansHandler = async (values) => {
    const token = window.localStorage.getItem("adminToken");
    const formData = new FormData();

    values?.image && formData.append("image", "https://www.youtube.com/watch?v=example");
    formData.append("title", values?.plan_name);
    formData.append("type", values?.type);
    formData.append("description", values?.plan_description);
    formData.append("video_url", "https://www.youtube.com/watch?v=example");
    setLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: `${API_BASE_URL}api/v1/content/${userData?.content_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });
      if (response?.data?.success === true) {
        setLoading(false);
        toast.success(response?.data?.message);
        navigate("/faq");
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
    plan_name: userData?.title ?? "",
    plan_description: userData?.description ?? "",
    type: userData?.type ?? "",
  };

  const validationSchema = Yup.object().shape({
    plan_name: Yup.string()
      .matches(
        /^[A-Za-z0-9.,?'"\-()! ]{3,200}$/,
        "Only valid question characters allowed"
      )
      .required("Question is required"),

    plan_description: Yup.string().required("Answer is required"),
    type: Yup.string().required("Type is required"),
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
          Edit Faqs Details
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Type"
                      name="Type"
                      value={values.type}
                      disabled
                      onChange={handleChange}
                      error={touched.type && Boolean(errors.type)}
                      helperText={touched.type && errors.type}
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
                  Answers
                </Typography>
                <JoditEditor
                  ref={editor}
                  value={values.plan_description}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    // Option 1: Remove all HTML tags using regex
                    const plainText = newContent.replace(/<[^>]*>/g, "");

                    setFieldValue("plan_description", plainText);
                  }}
                />
                {touched.plan_description && errors.plan_description && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.plan_description}
                  </Typography>
                )}
              </Box>
            
              <Box textAlign="center" mt={5} sx={{ height: "45px" }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#00b2ff",
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
