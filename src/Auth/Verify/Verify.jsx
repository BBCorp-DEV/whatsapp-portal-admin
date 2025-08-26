import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const Verify = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // only digits or empty

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move focus to next input if value entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 4) {
      setOtpError("OTP must be 4 digits.");
      return;
    }

    setOtpError("");
    console.log("OTP Verified:", enteredOtp);
    // Call API or redirect here
  };

  const handleResend = () => {
    console.log("OTP Resent");
    setOtp(["", "", "", ""]);
    setOtpError("");
    setTimer(60);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    // Resend logic here
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      <Grid
        spacing={5}
        container
        sx={{
          minHeight: "100vh",
          backgroundColor: "#fdfbf9",
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
              Verify OTP
            </Typography>

            <Typography sx={{ mt: 1, color: "#555" }}>
              Enter the 4-digit code sent to your email.
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
                mb: 1,
                gap: 6,
              }}
            >
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  variant="filled"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center", fontSize: "24px" },
                  }}
                  sx={{
                    width: "60px",
                    ".MuiFilledInput-root": {
                      backgroundColor: "#fff",
                      borderRadius: 2,
                      border: "2px solid #0000004a",
                    },
                    ".MuiFilledInput-root:hover": {
                      border: "2px solid #03A7E5",
                    },
                  }}
                  InputProps={{ disableUnderline: true }}
                />
              ))}
            </Box>

            {otpError && (
              <Typography color="error" sx={{ fontSize: "14px", mt: 1 }}>
                {otpError}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                mt: 4,
                background: "#03A7E5",
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              Verify
            </Button>

            <Typography sx={{ mt: 2, textAlign: "center", color: "#888" }}>
              {canResend ? (
                <Button onClick={handleResend} sx={{ textTransform: "none" }}>
                  Resend OTP
                </Button>
              ) : (
                `Resend available in ${timer}s`
              )}
            </Typography>

            <Typography sx={{ mt: 2, textAlign: "center" }}>
              <Link to="/login" style={{ textDecoration: "none", color: "#03A7E5" }}>
                Back to Login
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Verify;
