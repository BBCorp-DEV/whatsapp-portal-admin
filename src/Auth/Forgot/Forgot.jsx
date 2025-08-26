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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CountryDropdown } from "react-country-region-selector";
import { HiOutlineSelector } from "react-icons/hi";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const Forgot = () => {
  const [country, setCountry] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Empty checks first
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (valid) {
      console.log("Login successful");
      // redirect or API call here
    }
  };

  return (
    <>
      <Box
        sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
      >
        <Grid
          spacing={5}
          container
          sx={{
            minHeight: "100vh",
            backgroundColor: "#fdfbf9",
            display: "flex",
            alignItems: "center", // Vertical center
            justifyContent: "center", // Horizontal center (for smaller screens)
          }}
        >
          {/* Left Column */}

          {/* Right Column */}
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
                Forgot Password
              </Typography>

              <label
                style={{
                  color: "#000",
                  display: "block",
                  marginBottom: -5,
                  paddingTop: "20px",
                }}
              >
                Email
              </label>

              <TextField
                placeholder="Enter email address"
                variant="filled"
                type="text"
                color="#000"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!e.target.value) {
                    setEmailError("Email is required.");
                  } else if (!validateEmail(e.target.value)) {
                    setEmailError("Please enter a valid email address.");
                  } else {
                    setEmailError("");
                  }
                }}
                error={!!emailError}
                helperText={emailError}
                FormHelperTextProps={{
                  style: { color: 'red', fontSize: '0.8rem', marginTop: '4px',marginLeft:"0px" }
                }}
                sx={{
                  width: "450px", // Set your desired width here
                  mt: 2,
                  input: {
                    color: "#000",
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
                    paddingLeft: "7px",
                    paddingTop: "3px",
                  },
                  ".MuiFilledInput-root:hover": {
                    border: "2px solid #03A7E5",
                  },
                }}
                InputProps={{ disableUnderline: true }}
              />
              <Link to="/verify">
                <Button
                  variant="contained"
                  fullWidth
                //   onClick={handleSubmit}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
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
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Forgot;
