
import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const regexPatterns = {
    firstName: /^[A-Za-z]{2,}$/,
    lastName: /^[A-Za-z]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      setFormErrors((prev) => ({ ...prev, [name]: "This field is required" }));
      return;
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setFormErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, confirmPassword: "" }));
      }
      return;
    }

    const pattern = regexPatterns[name];
    if (pattern && !pattern.test(value)) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "Invalid format",
      }));
    } else {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] = "This field is required";
      } else if (
        key !== "confirmPassword" &&
        regexPatterns[key] &&
        !regexPatterns[key].test(value)
      ) {
        errors[key] = "Invalid format";
      }
    });

    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("✅ Form submitted", formData);
      // You can now send data to backend
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <Grid
        spacing={5}
        container
        sx={{
          minHeight: "100vh",
          //   backgroundColor: "#fdfbf9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#fff",
              p: 5,
              borderRadius: 2,
              width: "100%",
              maxWidth: 450,
              color: "#000",
              border: "1px solid #fff",
              boxShadow: 1,
              zIndex: 111,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Edit Admin Details888
            </Typography>

            <form onSubmit={handleSubmit}>
              {[
                { label: "First name", name: "firstName", type: "text" },
                { label: "Last name", name: "lastName", type: "text" },
                { label: "Email", name: "email", type: "text" },

                { label: "Phone", name: "phone", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
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
                    value={formData[name]}
                    onChange={handleChange}
                    fullWidth
                    error={!!formErrors[name]}
                    helperText={formErrors[name]}
                    FormHelperTextProps={{
                      style: {
                        color: "red",            // Custom text color
                        fontSize: "0.8rem",      // Custom font size
                        marginTop: "4px",   
                        marginLeft:"0px !important"     // Optional spacing
                      },
                    }}
                    sx={{
                      mt: 2,

                      input: {
                        color: "black",
                        padding: "10px",
                        "::placeholder": {
                          color: "#888",
                          opacity: 1,
                        },
                      },
                      label: {
                        color: "#ccc",
                      },
                      ".MuiFilledInput-root": {
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        border: "2px solid #0000004a",
                        paddingTop: "3px",
                        paddingLeft: "5px",
                      },
                      ".MuiFilledInput-root:hover": {
                        border: "2px solid #03A7E5",
                      },
                    }}
                  />
                </div>
              ))}

              <FormControlLabel
                control={
                  <Checkbox
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
                    style={{
                      color: "#03A7E5",
                      fontSize: "12px",
                      lineHeight: "20px",
                      textAlign: "justify",
                      marginTop: "25px",
                    }}
                  >
                    if you'd like to receive helpful tips, updates, and news
                    from UhuruCare. We only send relevant content, and you can
                    unsubscribe anytime.{" "}
                  </Typography>
                }
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={() => navigate("/home")}
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

export default AdminUpdate;
