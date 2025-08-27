// ... All imports remain unchanged
import * as React from "react";
import {
  Box,
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { PiUsersThreeFill } from "react-icons/pi";
import { AiOutlineMedicineBox } from "react-icons/ai";

import ExpandMore from "@mui/icons-material/ExpandMore";
import { FaQ } from "react-icons/fa6";

import { FaQuinscape } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineUnsubscribe,
  MdPolicy,
  MdPayments,
  MdOutlineReportGmailerrorred,
} from "react-icons/md";
import { FaUsers, FaHospitalUser } from "react-icons/fa6";
import { GiStaticGuard } from "react-icons/gi";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/context/Auth";

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [staticOpen, setStaticOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = React.useContext(AuthContext);
  const userData = auth?.userData;
  console.log("vewfvrfgib", userData);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    setOpenLogoutDialog(false);
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  const icons = [
    <MdDashboard />,
    <FaUsers />,
    <MdOutlineUnsubscribe />,
    <FaHospitalUser />,
    <MdPolicy />,
    <MdPayments />,
    <AiOutlineMedicineBox />,
    <MdOutlineReportGmailerrorred />,
    <GiStaticGuard />,
    <PiUsersThreeFill />,
    <FaQ />,
    <FaHospitalUser />,
    <MdOutlineUnsubscribe />,
    <MdOutlineReportGmailerrorred />,
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  React.useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const allMenuItems = [
    {
      text: "Dashboard",
      path: "/dashboard",
       icon: <MdDashboard size={24} />,
      roles: ["Dashboard"],
    },
    {
      text: "Deposit",
      path: "/deposit-list",
      icon: <MdPayments size={24} />,
      roles: ["Deposit Management"],
    },
    {
      text: "User Management",
      path: "/user-list",
      icon: <FaUsers size={24} />,
      roles: ["admin"],
    },
    {
      text: "WhatsApp User",
      path: "/whatsapp-user",
      icon: <PiUsersThreeFill size={24} />,
      roles: ["WhatsApp User"],
    },
    {
      text: "Withdrawal",
      path: "/withdrawal-list",
      icon: <MdPayments size={24} />,
      roles: ["Withdrawal"],
    },
    {
      text: "Transfer",
      path: "/transfer",
      icon: <FaHospitalUser size={24} />,
      roles: ["Transfer"],
    },
    {
      text: "Account",
      path: "/acounts-list",
      icon: <FaHospitalUser size={24} />,
      roles: ["Account"],
    },
    {
      text: "Error Log",
      path: "/error-lists",
      icon: <MdOutlineReportGmailerrorred size={24} />,
      roles: ["admin", "Error Log"],
    },
  ];

  // const roleBasedMenuItems = {

  //   admin: [
  //     { text: "Dashboard", path: "/dashboard", },
  //     { text: "Deposit", path: "/deposit-list" },
  //     { text: "User Management", path: "/user-list" },
  //     { text: "WhatsApp user", path: "/whatsapp-user" },
  //     { text: "Withdrawal", path: "/withdrawal-list" },
  //     { text: "Transfer", path: "/transfer" },
  //     { text: "Account", path: "/acounts-list" },
  //     { text: "Error Log", path: "/error-lists" },
  //   ],

  // };
  const userRoles = userData?.role || []; // e.g. ["WhatsApp User", "Account"]
  const userType = userData?.userType;

  // const menuItems = roleBasedMenuItems[ "admin"] || [];
const menuItems =
  userType === "ADMIN"
    ? allMenuItems
    : allMenuItems.filter((item) =>
        item.roles.some((role) => userRoles.includes(role))
      );
  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 1,
      }}
    >
      <Box>
        <Toolbar />
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    backgroundColor: isActive ? "#0077cc" : "transparent",
                    borderRadius: "8px",
                    mb: 1,
                    "&:hover": {
                      backgroundColor: isActive ? "#0077cc" : "#f0f0f0",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: isActive ? "#fff" : "inherit" ,}}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{ color: isActive ? "#fff" : "inherit",ml:"-15px" }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box>
        <Button
          color="primary"
          onClick={() => setOpenLogoutDialog(true)}
          sx={{
            textTransform: "capitalize",
            marginLeft: "10px",
            fontWeight: "500",
            color: "#0077cc",
          }}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

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
        <Toolbar
          sx={{ p: 0, display: "flex", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#ffffffff",
              padding: "11.8px 51px",
              marginLeft: isMobile ? "0px" : "-39px",
              height: "100%",
              width: isMobile ? "100%" : "255px",
            }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 3, color: "#000", marginLeft: { xs: "-30px" } }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <img
              src="Images/NavbarLogo1.png"
              alt="logo"
              style={{
                height: 40,
                marginRight: 5.5,
                marginLeft: "-22px",
                cursor: "pointer",
              }}
              // onClick={handleLogoClick}
            />
            {/* <Typography
              variant="h6"
              fontWeight="bold"
              color="#000"
              sx={{ fontSize: "24.4px", marginRight: "-22px" }}
            >
              Connect
            </Typography> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "none",
            boxShadow: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          height: "100%",
          height: "calc(100vh - 60px)",
          width: "100%",
          overflow: "scroll",
        }}
      >
        {children}
      </Box>

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
              border: "1px solid #0077cc",
              color: "#0077cc",
              "&:hover": {
                backgroundColor: "#0077cc",
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
              border: "1px solid #0077cc",
              color: "#0077cc",
              "&:hover": {
                backgroundColor: "#0077cc",
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
