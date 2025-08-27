import React, { useContext, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoEye, GoEyeClosed } from "react-icons/go";
import ApiConfig from "../ApiConfig";
import { AuthContext } from "../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.+$/;
    return passwordRegex.test(password);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      loginHandler();
    }
  };

  const loginHandler = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.login,
        data: {
          identity: email,
          password: password,
        },
      });

      console.log("FULL API RESPONSE:", response);
      if (response?.status === 200) {
        toast.success(response.data.message);
        auth.checkLogin(response?.data?.token);

        window.localStorage.setItem("adminToken", response?.data?.data?.token);
        auth.getProfileData();
        auth.setIsLogin(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("API ERROR RESPONSE:", error?.response?.data);
      toast.error(error?.response?.data?.message || "Login failed");
      return error?.response;
    }
  };

  return (
    <>
      <Box
        sx={{ position: "relative", overflow: "hidden", minHeight: { xs: "60vh", md: "100vh" } }}
      >
        <Grid
          spacing={5}
          container
          sx={{
            minHeight: { xs: "60vh", md: "100vh" },
            // backgroundColor: "#fdfbf9",
               backgroundColor: "#f9f9f9ff",
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
                backgroundColor: "#fdfbf9",
                p: 5,
                borderRadius: 2,
                width: "100%",
                maxWidth: 550,
                color: "#000",
                border: "1px solid #fff",
                boxShadow: 1,
                zIndex: 111,
                textAlign: "center",
              }}
            >
              {/* Logo at center */}
              <Box sx={{ mb: 3 }}>
                <img
                  src="/images/bbc_loginlogo.jpg"
                  alt="Login Logo"
                  style={{ width: "120px", height: "auto" ,background: "white", }}
                />
              </Box>

              <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                onClick={() => navigate("/home")}
              >
                Login
              </Typography>

              <label
                style={{
                  color: "#000",
                  display: "block",
                  marginBottom: -5,
                  paddingTop: "20px",
                  textAlign: "left",
                }}
              >
                Email
              </label>

              <TextField
                placeholder="Enter email address"
                variant="filled"
                type="text"
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
                  style: {
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: "4px",
                    marginLeft: "0px",
                  },
                }}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                    md: "450px",
                  },
                  mt: 2,
                  input: {
                    color: "#000",
                    padding: "10px",
                    "::placeholder": {
                      color: "#888",
                      opacity: 1,
                    },
                  },
                  ".MuiFilledInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    border: "2px solid #0000004a",
                    paddingLeft: "7px",
                    paddingTop: "3px",
                  },
                  ".MuiFilledInput-root:hover": {
                    border: "2px solid#0077cc",
                  },
                }}
                InputProps={{ disableUnderline: true }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <label
                  style={{
                    color: "#000",
                    display: "block",
                    marginBottom: -5,
                    paddingTop: "20px",
                  }}
                >
                  Password
                </label>
              </Box>

              <TextField
                placeholder="Enter your password"
                variant="filled"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!e.target.value) {
                    setPasswordError("Password is required.");
                  } else if (!validatePassword(e.target.value)) {
                    setPasswordError("Password must be at least 8 characters");
                  } else {
                    setPasswordError("");
                  }
                }}
                error={!!passwordError}
                helperText={passwordError}
                FormHelperTextProps={{
                  style: {
                    color: "red",
                    fontSize: "0.8rem",
                    marginTop: "4px",
                    marginLeft: "0px",
                  },
                }}
                fullWidth
                sx={{
                  mt: 2,
                  input: {
                    color: "#000",
                    padding: "10px",
                    "::placeholder": {
                      color: "#888",
                      opacity: 1,
                    },
                  },
                  ".MuiFilledInput-root": {
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    border: "2px solid #0000004a",
                    paddingLeft: "7px",
                    paddingTop: "3px",
                  },
                  ".MuiFilledInput-root:hover": {
                    border: "2px solid #0077cc",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <GoEye /> : <GoEyeClosed />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                sx={{
                  mt: 4,
                  background: "#0077cc",
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Submit"
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;

// import React, { useContext, useState } from "react";
// import {
//   Grid,
//   Typography,
//   TextField,
//   Paper,
//   Button,
//   Box,
//   Divider,
//   InputAdornment,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
// import { GoEye } from "react-icons/go";
// import { GoEyeClosed } from "react-icons/go";
// import ApiConfig from "../ApiConfig";
// import { AuthContext } from "../context/Auth";
// import axios from "axios";
// import toast from "react-hot-toast";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const auth = useContext(AuthContext);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleTogglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePassword = (password) => {
//     const passwordRegex = /^.+$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let valid = true;

//     // Empty checks first
//     if (!email) {
//       setEmailError("Email is required.");
//       valid = false;
//     } else if (!validateEmail(email)) {
//       setEmailError("Please enter a valid email address.");
//       valid = false;
//     } else {
//       setEmailError("");
//     }

//     if (!password) {
//       setPasswordError("Password is required.");
//       valid = false;
//     } else if (!validatePassword(password)) {
//       setPasswordError("Password must be at least 8 characters");
//       valid = false;
//     } else {
//       setPasswordError("");
//     }

//     if (valid) {
//       loginHandler();
//       console.log("Login successful");
//       // redirect or API call here
//     }
//   };

//   const loginHandler = async () => {
//   setLoading(true);
//   try {
//     const response = await axios({
//       method: "POST",
//       url: ApiConfig.login,
//       data: {
//         identity: email,
//         password: password,
//       },
//     });

//     // ✅ Log full response
//     console.log("FULL API RESPONSE:", response);
//     if (response?.status === 200) {
//       toast.success(response.data.message);
//       auth.checkLogin(response?.data?.token);

//       window.localStorage.setItem("adminToken", response?.data?.data?.token);
//       // window.localStorage.setItem("userData", JSON.stringify(response.data.data));

//       auth.getProfileData();
//       auth.setIsLogin(true);

//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 2000);
//     } else {
//       setLoading(false);
//     }
//   } catch (error) {
//     setLoading(false);
//     console.error("API ERROR RESPONSE:", error?.response?.data);
//     toast.error(error?.response?.data?.message || "Login failed");
//     return error?.response;
//   }
// };


//   return (
//     <>
//       <Box
//         sx={{ position: "relative", overflow: "hidden", minHeight: {xs:"60vh",md:"100vh"} }}
//       >
//         <Grid
//           spacing={5}
//           container
//           sx={{
//             minHeight: {xs:"60vh",md:"100vh"},
//             backgroundColor: "#fdfbf9",
//             display: "flex",
//             alignItems: "center", // Vertical center
//             justifyContent: "center", // Horizontal center (for smaller screens)
//           }}
//         >
//           {/* Left Column */}

//           {/* Right Column */}
//           <Grid
//             item
//             xs={12}
//             md={6}
//             lg={6}
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               p: 4,
//             }}
//           >
//             <Paper
//               elevation={0}
//               sx={{
//                 backgroundColor: "#fff",
//                 p: 5,
//                 borderRadius: 2,
//                 width: "100%",
//                 maxWidth: 550,
//                 color: "#000",
//                 border: "1px solid #fff",
//                 boxShadow: 1,
//                 zIndex: 111,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 fontWeight="bold"
//                 gutterBottom
//                 onClick={() => navigate("/home")}
//               >
//                 Login
//               </Typography>

//               <label
//                 style={{
//                   color: "#000",
//                   display: "block",
//                   marginBottom: -5,
//                   paddingTop: "20px",
//                 }}
//                 onClick={() => navigate("/hospital")}
//               >
//                 Email
//               </label>

//               <TextField
//                 placeholder="Enter email address"
//                 variant="filled"
//                 type="text"
//                 color="#000"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   if (!e.target.value) {
//                     setEmailError("Email is required.");
//                   } else if (!validateEmail(e.target.value)) {
//                     setEmailError("Please enter a valid email address.");
//                   } else {
//                     setEmailError("");
//                   }
//                 }}
//                 error={!!emailError}
//                 helperText={emailError}
//                 FormHelperTextProps={{
//                   style: {
//                     color: "red",
//                     fontSize: "0.8rem",
//                     marginTop: "4px",
//                     marginLeft: "0px",
//                   },
//                 }}
//                 sx={{
//                   width: {
//                     xs: "100%",
//                     sm: "100%",
//                     md: "450px",
//                   },
//                   mt: 2,
//                   input: {
//                     color: "#000",
//                     padding: "10px",
//                     "::placeholder": {
//                       color: "#888",
//                       opacity: 1,
//                     },
//                   },
//                   label: {
//                     color: "#ccc",
//                   },
//                   ".MuiFilledInput-root": {
//                     backgroundColor: "#fff",
//                     borderRadius: 2,
//                     border: "2px solid #0000004a",
//                     paddingLeft: "7px",
//                     paddingTop: "3px",
//                   },
//                   ".MuiFilledInput-root:hover": {
//                     border: "2px solid#0077cc",
//                   },
//                 }}
//                 InputProps={{ disableUnderline: true }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <label
//                   style={{
//                     color: "#000",
//                     display: "block",
//                     marginBottom: -5,
//                     paddingTop: "20px",
//                   }}
//                 >
//                   Password
//                 </label>
//                 {/* <Link to="/forgot"></Link>
//                 <label
//                   onClick={() => navigate("/forgot")}
//                   style={{
//                     color: "#0077cc",
//                     display: "block",
//                     cursor: "pointer",
//                     marginBottom: -5,
//                     paddingTop: "20px",
//                   }}
//                 >
//                   Forgot ?
//                 </label> */}
//               </Box>
//               <TextField
//                 placeholder="Enter your password"
//                 variant="filled"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   if (!e.target.value) {
//                     setPasswordError("Password is required.");
//                   } else if (!validatePassword(e.target.value)) {
//                     setPasswordError("Password must be at least 8 characters");
//                   } else {
//                     setPasswordError("");
//                   }
//                 }}
//                 error={!!passwordError}
//                 helperText={passwordError}
//                 FormHelperTextProps={{
//                   style: {
//                     color: "red",
//                     fontSize: "0.8rem",
//                     marginTop: "4px",
//                     marginLeft: "0px",
//                   },
//                 }}
//                 fullWidth
//                 sx={{
//                   mt: 2,
//                   input: {
//                     color: "#000", // Text color
//                     padding: "10px",
//                     "::placeholder": {
//                       color: "#888", // <-- Placeholder color
//                       opacity: 1,
//                     },
//                   },
//                   label: {
//                     color: "#ccc", // Label color
//                   },
//                   ".MuiFilledInput-root": {
//                     backgroundColor: "#fff",
//                     borderRadius: 2,
//                     border: "2px solid #0000004a",
//                     paddingLeft: "7px",
//                     paddingTop: "3px",
//                   },
//                   ".MuiFilledInput-root:hover": {
//                     border: "2px solid #0077cc", // Customize the border color as needed
//                   },
//                 }}
//                 InputProps={{
//                   disableUnderline: true,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={handleTogglePassword} edge="end">
//                         {showPassword ? <GoEye /> : <GoEyeClosed />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               {/* <Link to="/dashboard"> */}
//               <Button
//                 variant="contained"
//                 fullWidth
//                 onClick={handleSubmit}
//                 sx={{
//                   mt: 4,
//                   background: "#0077cc",
//                   textTransform: "none",
//                   fontWeight: "bold",
//                   borderRadius: "8px",
//                   padding: "10px",
//                 }}
//               >
//                 {loading ? (
//                   <CircularProgress size={24} sx={{ color: "white" }} />
//                 ) : (
//                   "Submit"
//                 )}
//               </Button>
//               {/* </Link> */}
//               {/* <Divider sx={{ mt: 3, mb: 1, backgroundColor: "#0077cc" }} />

//               <Typography align="center" variant="body2" sx={{ color: "#888" }}>
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signin"
//                   style={{
//                     textDecoration: "none",
//                     listStyle: "none",
//                     color: "#0077cc",
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </Typography> */}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default LoginPage;
