import React, { useRef, useState } from "react";
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

export default function EditAbout() {
  const location = useLocation();
  const navigate = useNavigate();
  const paramData = location?.state?.userData || null;
  // console.log("userData", location?.state );
  console.log("userData", paramData);

  const [imagePreview, setImagePreview] = useState(paramData ? `${IMAGEURL}/${paramData.image_path}` : null);
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);


  const initialValues = {
    plan_name: paramData?.title || "",
    plan_description: paramData?.description || "",
    plan_designation:paramData?.field1 ?? "",
    image: paramData ? `${IMAGEURL}/${paramData.image_path}` : null,
  };

  const validationSchema = Yup.object().shape({

    plan_name: Yup.string()
      .required("Team name is required"),
    plan_designation: Yup.string()
      .required("Team designation is required"),
    // plan_designation: Yup.string()
    //   .matches(/^[A-Za-z0-9+ ]{3,30}$/, "Only letters, numbers, spaces or '+' allowed")
    //   .required("Team designation is required"),
    plan_description: Yup.string().required("Team description is required"),
    // image: Yup.mixed().required("Image is required"),
  });

  const handleFormSubmit = async (values) => {
    if (values.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        AddAboutData({ ...values, image_url: base64Image });
      };
      reader.readAsDataURL(values.image); // Convert to Base64
    } else {
      AddAboutData(values); // No image
    }
  };

  const AddAboutData = async (values) => {
    console.log("values", values);
    const token = window.localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", values?.image)
    formData.append("type", "teams")
    formData.append("title", values?.plan_name)
    formData.append("description", values?.plan_description)
    formData.append("field1", values?.plan_designation)
    formData.append("video_url", "https://www.youtube.com/watch?v=example");
    const jsonData = {
      type: "teams",
      title: values?.plan_name,
      description: values?.plan_description,
      field1: values?.plan_designation,
      video_url: "https://www.youtube.com/watch?v=example",
      image: values?.image
    };


    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": values?.image ? "multipart/form-data" : 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: paramData ? "PUT" : "POST",
        url: paramData ? `${ApiConfig.ContentAdd}/${paramData?.content_id}` : ApiConfig.ContentAdd,
        data: values?.image ? formData : jsonData,
      }

      const response = await axios(config);

      if (response.data?.success === true) {
        toast.success(response.data?.message);
        navigate(-1);
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
          background: "#82828214",
          width: 45,
          height: 45,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => navigate("/team")}
      >
        <IconButton sx={{ color: "#000", p: 0 }}>
          <IoArrowBackSharp size={25} />
        </IconButton>
      </Box>

      <Paper elevation={1} sx={{ p: 3, maxWidth: 800, mx: "auto", mt: 4, borderRadius: 4 }}>
        <Typography variant="h5" mb={2} fontWeight={600}>
          {paramData ? "Edit" : "Add"} Team Details
        </Typography>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={AddAboutData}
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Team Name"
                    name="plan_name"
                    value={values.plan_name}
                    onChange={handleChange}
                    error={touched.plan_name && Boolean(errors.plan_name)}
                    helperText={touched.plan_name && errors.plan_name}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Team Designation"
                    name="plan_designation"
                    value={values.plan_designation}
                    onChange={handleChange}
                    error={touched.plan_designation && Boolean(errors.plan_designation)}
                    helperText={touched.plan_designation && errors.plan_designation}
                    margin="normal"
                  />
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant="subtitle1" mb={1}>
                  Team Description
                </Typography>
                <JoditEditor
                  ref={editor}
                  value={values.plan_description}
                  config={{ readonly: false }}
                  onBlur={(newContent) => setFieldValue("plan_description", newContent)}
                />
                {touched.plan_description && errors.plan_description && (
                  <Typography color="error" variant="body2" mt={1}>
                    {errors.plan_description}
                  </Typography>
                )}
              </Box>

              <Box mt={3}>
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
                  <FormHelperText error>{errors.image}</FormHelperText>
                )}
              </Box>

              {imagePreview && (
                <Box
                  mt={2}
                  sx={{
                    maxWidth: 200,
                    border: "1px solid #ccc",
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}

              <Box textAlign="right" mt={4}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#0077cc",
                    px: 4,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "capitalize",
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
    </>
  );
}
