import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Changepassword from "../../Auth/ChangePassword/Changepassword";
import { AuthContext } from "../../Auth/context/Auth";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => setOpenDialog(true);
  const auth = useContext(AuthContext);

  const handleDialogClose = () => setOpenDialog(false);
  const [open, setOpen] = useState(false);
  const userData = auth.userData;
console.log("asdfasdfdsdd",userData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    gender: "",
    status: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const maskEmail = (email) => {
    if (!email || email.length < 12) return email;
    const firstPart = email.slice(0, 2);
    const lastPart = email.slice(email.indexOf("@") - 2);
    return `${firstPart}****${lastPart}`;
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    console.log("Updated Data:", formData);
    handleClose();
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        // minHeight: "100vh",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
        // py: 5,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: isSmDown ? "90%" : "55%",
          borderRadius: 5,
          p: 4,
          textAlign: "start",
          boxShadow: "none",
        }}
      >
        <Typography variant="h4" align="start" fontWeight={600} gutterBottom>
          User Details
        </Typography>

        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            background: "#f5f5f5",
            padding: "10px 24px",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Full Name:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography color="subtitle1">{userData?.full_name ?? "__"}</Typography>
          </Grid>

          {/* <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Last Name:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.full_name ?? "__"}</Typography>
          </Grid> */}

          {/* <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">User Name:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.full_name ?? "__"}</Typography>
          </Grid> */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Email:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.emailid ?? "__"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Mobile:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.phone_number ?? "__"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Date of Birth:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.dob_display ?? "__"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Address</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.address ?? "__"}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Role:</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1"> {userData?.role ?? "__"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Gender:</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1"> {userData?.gender ?? "__"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Date:</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1"> {userData?.created_at ?? "__"}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Last Updated:</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1"> {userData?.updated_at ?? "__"}</Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography variant="subtitle1">Status:</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1">{userData?.status ?? "__"}</Typography>
          </Grid>
        </Grid>

        <Box
          mt={4}
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "start" }}
          gap={2}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/password")}
            sx={{
              fontSize: "15px",
              textTransform: "capitalize",
              fontWeight: "500",
              borderRadius: "20px",
              border: "1px solid #03A7E5",
              color: "#03A7E5",
              width: { xs: "100%", sm: "30%" },

              "&:hover": {
                backgroundColor: "#03A7E5",
                boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                color: "#fff",
              },
            }}
          >
            Change Password
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/update")}
            sx={{
              fontSize: "15px",
              textTransform: "capitalize",
              fontWeight: "500",
              borderRadius: "20px",
              border: "1px solid #03A7E5",
              color: "#03A7E5",
              width: { xs: "100%", sm: "30%" },

              "&:hover": {
                backgroundColor: "#03A7E5",
                boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                color: "#fff",
              },
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Paper>
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Change password</DialogTitle>
        <DialogContent dividers>
          <Changepassword />
        </DialogContent>
      </Dialog>
      {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  First Name
                </Typography>
                <TextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Last Name
                </Typography>
                <TextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Username
                </Typography>
                <TextField
                  name="username"
                  value={formData.username || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Email Address
                </Typography>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Mobile Number
                </Typography>
                <TextField
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Country
                </Typography>
                <TextField
                  name="country"
                  value={formData.country || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
};

export default Dashboard;