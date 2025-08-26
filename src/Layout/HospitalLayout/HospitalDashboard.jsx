import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/Auth";

const drawerWidth = 240;

export default function HospitalDashboard({ children }) {
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = React.useContext(AuthContext);
  const userData = auth?.userData;
  const handleLogout = () => {
    console.log("Logging out...");
    setOpenLogoutDialog(false);
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userData"); // clear the role info
    // Add your logout logic here
    navigate("/login");
    // Add your logout logic here
  };

  // const menuItems = [
  //   { text: "Dashboard", path: "/dashboard" },
  //   { text: "Policy", path: "/hospitalPolicy" },
  //   { text: "Claim", path: "/hospitalClaim" },
  // ];

  const roleBasedMenuItems = {
    policyholder: [
      { text: "Dashboard", path: "/dashboard" },
      { text: "Policy", path: "/policyList" },
      { text: "Payment", path: "/payments" },
    ],
    admin: [
      { text: "Dashboard", path: "/dashboard" },
      { text: "User Management", path: "/users" },
      { text: "Plan", path: "/plans" },
      { text: "Claim", path: "/claimList" },
      { text: "Policy", path: "/policyList" },
      { text: "Payment", path: "/payments" },
    ],
    insurance: [
      { text: "Dashboard", path: "/dashboard" },
      { text: "User Management", path: "/users" },
      { text: "Claim", path: "/claimList" },
      { text: "Policy", path: "/policyList" },
      { text: "Payment", path: "/payments" },
    ],
    hospital: [
      { text: "Dashboard", path: "/dashboard" },
      { text: "Policy", path: "/policyList" },
      // { text: "Policy", path: "/hospitalPolicy" },
      { text: "Claim", path: "/claimList" },
    ],
  };
  return (
    <Box sx={{ display: "flex", background: "#F5F5F5" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#F5F5F5",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ p: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#fff",
              padding: "12px 54px",
              marginLeft: "-24px",
              height: "100%",
            }}
          >
            <img
              src="Images/navbarLogo.png"
              alt="logo"
              style={{ height: 40, marginRight: 8, marginLeft: "-22px" }}
            />
            <Typography variant="h6" fontWeight="bold" color="black">
              UhuruCare
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px 8px",
            borderRight: "none",
            boxShadow: "none",
          },
        }}
      >
        {/* Top Section */}
        <Box>
          <Toolbar />
          <List>
            {roleBasedMenuItems[userData?.role]?.map((item, index) => {
              const isActive =
                item.path === "/hospital"
                  ? location.pathname === "/hospital"
                  : location.pathname.startsWith(item.path);
              return (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      backgroundColor: isActive ? "#03A7E5" : "transparent",
                      borderRadius: "8px",
                      mb: 1,
                      "&:hover": {
                        backgroundColor: isActive ? "#03A7E5" : "#f0f0f0",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: isActive ? "#fff" : "inherit" }}>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        color: isActive ? "#fff" : "inherit",
                        display: {
                          xs: "none",
                          sm: "block",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Bottom Logout Button */}
        <Box sx={{ p: 1 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setOpenLogoutDialog(true)}
            sx={{
              textTransform: "capitalize",
              background: "#03A7E5",
              borderRadius: "10px",
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, height: "100%" }}>
        {children}
      </Box>

      {/* Logout Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        PaperProps={{
          sx: {
            padding: "1.5rem",
            width: "400px",
            maxWidth: "90%",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "600", fontSize: "20px" }}
        >
          Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ textAlign: "center" }}>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", gap: 2 }}
        >
          <Button
            onClick={() => setOpenLogoutDialog(false)}
            variant="outlined"
            fullWidth
            sx={{
              fontSize: "15px",
              textTransform: "capitalize",
              fontWeight: "500",
              width: "30%",
              borderRadius: "10px",
              border: "1px solid #03A7E5",
              color: "#03A7E5",
              "&:hover": {
                backgroundColor: "#03A7E5",
                boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                color: "#fff",
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={handleLogout}
            // onClick={() => navigate("/login")}
            variant="outlined"
            fullWidth
            sx={{
              fontSize: "15px",
              textTransform: "capitalize",
              fontWeight: "500",
              width: "30%",
              borderRadius: "10px",
              border: "1px solid #03A7E5",
              color: "#03A7E5",
              "&:hover": {
                backgroundColor: "#03A7E5",
                boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                color: "#fff",
              },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
