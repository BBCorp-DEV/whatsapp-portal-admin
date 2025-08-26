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


  const roleBasedMenuItems = {
    policyholder: [
      { text: "Dashboard", path: "/dashboard-policy" },
      { text: "Policy", path: "/policyList" },
      { text: "Payment", path: "/payments" },
      { text: "Plan", path: "/user-plan" },
    ],
    insurance: [
      { text: "Dashboard", path: "/dashboard-insurance" },
      { text: "User Management", path: "/users-mNgement" },
      { text: "Claim", path: "/claimList" },
      { text: "Policy", path: "/policyList" },
      { text: "Payment", path: "/payments" },
    ],
    admin: [
      { text: "Dashboard", path: "/dashboard" },
      { text: "Deposit", path: "/deposit-list" },
      { text: "User Management", path: "/user-list" },
      { text: "WhatsApp user", path: "/whatsapp-user" },
      { text: "Withdrawal", path: "/withdrawal-list" },
      { text: "Transfer", path: "/transfer" },
      { text: "Account", path: "/acounts-list" },
      { text: "Error Log", path: "/error-lists" },
      // { text: "Sub Admin", path: "/sub-admin" },
      // { text: "Medicine", path: "/medicine" },
      // { text: "Diagnosis", path: "/diagnosis" },
      // { text: "Report Management", path: "/report" },
      // { text: "Static Management", path: "/about" },
      // { text: "Team Management", path: "/team" },
      // { text: "FAQ", path: "/faq" },
      // {
      //   text: "Static",
      //   icon: <GiStaticGuard />,
      //   children: [
      //     { text: "Team", path: "/team" },
      //     { text: "About", path: "/about" },
      //   ],
      // },
      // { text: "faq", path: "/faq" },
    ],
    hospital: [
      { text: "Dashboard", path: "/dashboard-hospital" },
      { text: "Policy", path: "/policies" },
      { text: "Claim", path: "/claimList" },
    ],
  };

  const menuItems = roleBasedMenuItems[ "admin"] || [];

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
          {menuItems?.map((item, index) => {
            const isParentActive =
              location.pathname.startsWith(item.path || "") ||
              (item.children &&
                item.children.some((child) =>
                  location.pathname.startsWith(child.path)
                ));
            const hasChildren = !!item.children;
            const isStaticItem = item.text === "Static";
            const isActive = isParentActive || (isStaticItem && staticOpen);

            return (
              <React.Fragment key={item.text}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (hasChildren) {
                        setStaticOpen((prev) => !prev);
                      } else {
                        navigate(item.path);
                        if (isMobile) setMobileOpen(false);
                      }
                    }}
                    sx={{
                      backgroundColor: isActive ? "#0077cc" : "transparent",
                      borderRadius: "8px",
                      mb: 1,
                      "&:hover": {
                        backgroundColor: isActive ? "#0077cc" : "#f0f0f0",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? "#fff" : "inherit",
                        fontSize: "23px",
                        minWidth: { xs: "40px", md: "42px" },
                      }}
                    >
                      {item.icon || icons[index]}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ color: isActive ? "#fff" : "inherit" }}
                    />
                    {hasChildren &&
                      (staticOpen ? (
                        <ExpandLess sx={{ color: "#fff" }} />
                      ) : (
                        <ExpandMore sx={{ color: "#fff" }} />
                      ))}
                  </ListItemButton>
                </ListItem>

                {hasChildren && (
                  <Collapse in={staticOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{ pl: 4 }}>
                      {item.children.map((child) => {
                        const isChildActive = location.pathname.startsWith(
                          child.path
                        );
                        return (
                          <ListItem key={child.text} disablePadding>
                            <ListItemButton
                              component={Link}
                              to={child.path}
                              onClick={() => isMobile && setMobileOpen(false)}
                              sx={{
                                backgroundColor: isChildActive
                                  ? "#0077cc"
                                  : "transparent",
                                borderRadius: "8px",
                                mb: 1,
                                "&:hover": {
                                  backgroundColor: isChildActive
                                    ? "#0077cc"
                                    : "#f0f0f0",
                                },
                              }}
                            >
                              <ListItemText
                                primary={child.text}
                                sx={{
                                  color: isChildActive ? "#fff" : "inherit",
                                  pl: 2,
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
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
              padding: "6px 51px",
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
              style={{ height: 55, marginRight: 5.5, marginLeft: "-22px",cursor:"pointer" }}
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
