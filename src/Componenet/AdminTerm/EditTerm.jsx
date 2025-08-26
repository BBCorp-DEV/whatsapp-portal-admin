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
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
import JoditEditor from "jodit-react";
import { IoArrowBackSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export default function EditTerm() {
  const location = useLocation();
  const { userData } = location?.state || {};
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [plans, setPlans] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  console.log("dafsadfdfsa", plans);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  console.log("imagePreviewimagePreview", imagePreview)
  const editor = useRef(null);
  const config = {
    readonly: false,

  };
  const handleSubmit = (values) => {
    EditPlansHandler(values);
    console.log("Updated Plan Values:", values);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement("div");
    // Remove <style> and <script> tags manually
    tmp.innerHTML = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
    return tmp.textContent || tmp.innerText || "";
  };

  const EditPlansHandler = async (values) => {
    console.log("Asdfgadsgsadgas", values);
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", values?.image);
    formData.append("type", values?.type);
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
        setLoading(false);
        navigate(-1);
        console.log("Plan updated successfully");
        toast.success(response?.data?.message ?? "Plan Add successfully");
      }
      else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.data?.message ?? "Please try again");
      return error?.response;

    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    plan_name: "",
    plan_description: "",
    type: "", // <- new
  };

  const validationSchema = Yup.object().shape({

    plan_name: Yup.string()
      .required("About name is required"),

    plan_description: Yup.string().required("About description is required"),
    type: Yup.string().required("Type is required"), // <- new
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
        onClick={() => navigate(-1)}
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
          Add Static Details
        </Typography>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              {console.log("values", values)}
              <Grid container spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={touched.type && Boolean(errors.type)}
                    >
                      <InputLabel id="type-label">Select</InputLabel>
                      <Select
                        labelId="type-label"
                        id="type"
                        name="type"
                        value={values.type}
                        label="Type"
                        onChange={(e) => setFieldValue("type", e.target.value)}
                      >
                        <MenuItem value="about">About Us</MenuItem>
                        <MenuItem value="values">Leadership</MenuItem>
                        <MenuItem value="feedback">Customer Feedback</MenuItem>
                        <MenuItem value="work">Partnerships & Affiliations</MenuItem>
                      </Select>
                      {touched.type && errors.type && (
                        <FormHelperText>{errors.type}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
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
                  Description
                </Typography>
                <JoditEditor
                  ref={editor}
                  value={values.plan_description}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => {
                    const plainText = stripHtml(newContent);
                    setFieldValue("plan_description", plainText); // Only plain text sent
                  }}
                  onChange={(newContent) => {
                    const plainText = stripHtml(newContent);
                    setFieldValue("plan_description", plainText); // Only plain text sent
                  }}
                />
                {touched.plan_description && errors.plan_description && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.plan_description}
                  </Typography>
                )}
              </Box>
              <Grid item xs={12} md={6}>
                <Box mt={2}>
                  <label htmlFor="upload-image">
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="upload-image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setImagePreview(URL.createObjectURL(file));
                          setFieldValue("image", file);
                        }
                      }}
                    />
                    <Button variant="contained" component="span">
                      Upload Image
                    </Button>
                  </label>
                  {touched.image && errors.image && (
                    <FormHelperText
                      style={{
                        color: "red",
                        fontSize: "0.8rem",
                        marginTop: "4px",
                        marginLeft: "0px",
                      }}
                    >
                      {errors.image}
                    </FormHelperText>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                {imagePreview && (
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        textAlign: "center",
                        maxHeight: 200,
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "auto",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Grid>
                )}
              </Grid>
              <Box textAlign="center" mt={5} sx={{ height: "45px" }}>
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
