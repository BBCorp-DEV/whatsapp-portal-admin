import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Auth/context/Auth";
import { useNavigate } from "react-router-dom";
import ApiConfig from "../../Auth/ApiConfig";
import toast from "react-hot-toast";

const ImageEnroll = () => {
  const navigate = useNavigate();
  const { enrollment, setEnrollment } = useContext(AuthContext);
  console.log("enrollment", enrollment);
  const [loading, setLoading] = React.useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  // console.log("enrollment",enrollment)

  const initialValues = {
    national_id_doc_path: "",
  };

  const validationSchema = Yup.object().shape({
    national_id_doc_path: Yup.string().required("Image is required"),
  });

  const handleImageUpload = async (file, setFieldValue) => {
    const formData = new FormData();
    formData.append("filename", file?.name ?? "");
    formData.append("filefor", "national_id_doc_path");
    formData.append("userPhoto", file);
    setLoading(true);
    try {
      const response = await fetch(
        ApiConfig.uploadSignup,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log("Upload response", data);
      if (data?.success && data?.data) {
        setLoading(false);
        toast.success(data?.message);
        setFieldValue("national_id_doc_path", data?.data?.filename);
      } else {
        setLoading(false);
        console.error("Upload failed", data);
        alert("Failed to upload image.");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response.data.message);
      console.error("Upload error", error);
      alert("Error uploading image.");
    }
  };

  return (
    <Box>
      <Box sx={{ bgcolor: "#0077cc", p: 4 }}>
        <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
          UhuruCare Plan Enrollment
        </Typography>
      </Box>

      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitted Values:", values);
          setEnrollment((prev) => ({ ...prev, ...values }));
          navigate("/payment-confirm"); // Change this route to your actual next step
        }}
      >
        {({ values, errors, touched, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Container maxWidth="lg">
              {console.log("values", values)}
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
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "600", fontSize: "25px" }}
                >
                  Step 3: Upload Required Documents
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
                  marginBottom: "30px",
                }}
              >
                <Typography variant="h6" gutterBottom></Typography>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Proof of identity (Ghana Card, Passport, or Driver’s License).
                </Typography>

                <Grid container spacing={2}>
                  <Grid item size={{ xs: 12, md: 6 }}>
                    <TextField
                      disabled
                      fullWidth
                      // label="Uploaded image filename"
                      placeholder="Uploaded image filename"
                      name="national_id_doc_path"
                      value={values.national_id_doc_path}
                      error={
                        touched.national_id_doc_path &&
                        Boolean(errors.national_id_doc_path)
                      }
                      helperText={
                        touched.national_id_doc_path &&
                        errors.national_id_doc_path
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {loading ? (
                              <CircularProgress size={24} />
                            ) : (
                              <IconButton component="label" edge="end">
                                <UploadFileIcon />
                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  onChange={(event) => {
                                    const file = event.target.files[0];
                                    if (file) {
                                      handleImageUpload(file, setFieldValue);
                                    }
                                  }}
                                />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Box mt={4}>
                  <Button variant="contained" type="submit"
                    sx={{
                      background: "#03A7E5",
                      color: "#fff !important",
                      textTransform: "capitalize !important",
                    }}
                  >
                    Submit and Continue
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

export default ImageEnroll;
