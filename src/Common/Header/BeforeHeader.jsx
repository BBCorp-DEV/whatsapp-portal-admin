import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useNavigate } from "react-router-dom";
import { COLORS } from "../../lib/Theme";
import { AuthContext } from "../../Auth/context/Auth";

const NavLink = styled(MuiLink)(({ theme }) => ({
  color: "#4a4a4a",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.95rem",
  padding: 8,
  "&:hover": {
    textDecoration: "underline !important",
    padding: 8,
  },
}));

const SignUpButton = styled(Button)(({ theme }) => ({
  border: "1px solid #00AEEF",
  color: "#00AEEF",
  borderRadius: 999,
  textTransform: "none",
  fontWeight: "bold",
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  height: 36,
}));

const BeforeHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const {userLoggedIn} = useContext(AuthContext); // Assuming you provide this from context
  console.log("auth---authauth", userLoggedIn);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false); // close drawer after navigation
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (userLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };


  const drawerContent = (
    <Box sx={{ width: 250, px: 2, py: 3 }} role="presentation">
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
          <img
            src="Images/navbarLogo.png"
            alt="logo"
            style={{ height: 40, display: "block", backgroundColor: "transparent", maskRepeat: "no-repeat" }}
          />
        </Box>
        <Typography variant="body" fontWeight="bold">
          UhuruCare
        </Typography>
      </Box>

      <List>
        <ListItem button onClick={() => handleNavigation("/")}>
          <ListItemText primary="Home" />
        </ListItem>

        {/* About Us with Expand/Collapse */}
        <ListItem button onClick={() => setAboutOpen(!aboutOpen)}>
          <ListItemText primary="About Us"  onClick={() => handleNavigation("#")} />
          {aboutOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={aboutOpen} timeout="auto" unmountOnExit >
          <List component="div" disablePadding>
            {/* <ListItem button sx={{ pl: 2 }} onClick={() => handleNavigation("/mission")}> */}
                <ListItem button sx={{ pl: 2 }} onClick={() => handleNavigation("/mission")}>
              <ListItemText primary="Our Story" />
            </ListItem>
            {/* <ListItem button sx={{ pl: 2 }} onClick={() => handleNavigation("/aboutUs")}> */}
                <ListItem button sx={{ pl: 2 }} onClick={() => handleNavigation("/aboutUs")}>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button sx={{ pl: 2 }} onClick={() => handleNavigation("/values")}>
              <ListItemText primary="Leadership" />
            </ListItem>
            <ListItem button sx={{ pl: 2 }}  onClick={() => handleNavigation("/leader")}>
              <ListItemText primary="Partnerships & Affiliations" />
            </ListItem>
            <ListItem button sx={{ pl: 2 }} onClick={() => handleNavigation("/teams")}>
              <ListItemText primary="Corporate Social Responsibility" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleNavigation("/health")}>
          <ListItemText primary="Plans" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/login")}>
          <ListItemText primary="Members Portal" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/login")}>
          <ListItemText primary="Provider Portal" />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ px: { xs: 2, sm: 6 }, background: COLORS.WHITE }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        {/* Logo + Brand */}
        <Box display="flex" alignItems="center">
          <Link to="/">
            <img
             src="Images/NavbarLogo.jpg"
              alt="logo"
              style={{ height: 60, marginRight: 8 }}
            />
          </Link>
          <Typography variant="h4" fontWeight="bold" color="black">
          Connect
          </Typography>
        </Box>

        {/* Desktop Navigation Links */}
        <Box display={{ xs: "none", md: "flex" }} alignItems="center">
          <NavLink
            href="/"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Home
          </NavLink>

          {/* About Us Hover Dropdown */}
          <div
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <a
              href="#"
              style={{
                textDecoration: isHovered ? "underline" : "none",
                color: isHovered ? "#0077cc" : "black",
                padding: "8px 16px",
                display: "inline-block",
                fontWeight: "500",
              }}
            >
              About Us
            </a>

            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                  zIndex: 1000,
                  minWidth: "200px",
                }}
              >
                <a
                  href="/story"
                  style={{
                    color: "black",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "black")}
                >
                  Our Story
                </a>
                {/* <a
                  href="/aboutUs"
                  style={{
                    color: "black",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "black")}
                >
                About Us
                </a> */}
                <a
                  href="/leaderShip"
                  style={{
                    color: "black",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "black")}
                >
                  Leadership
                </a>
                <a
                  href="/partnership"
                  style={{
                    color: "black",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "black")}
                >
                  Partnerships & Affiliations
                </a>
                <a
                  href="/corporate"
                  style={{
                    color: "black",
                    padding: "12px 16px",
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "black")}
                >
                  Corporate Social Responsibility
                </a>
              </div>
            )}
          </div>
          <NavLink
            href="/login"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Members Portal
          </NavLink>
          <NavLink
            href="/health"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Plans
          </NavLink>
          <NavLink
            to={userLoggedIn ? "/dashboard" : "/login"} // Still setting "to" just in case
            onClick={handleClick}
            href="/login"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Provider Portal
          </NavLink>
        </Box>

        {/* Mobile Menu Icon */}
        <Box display={{ xs: "flex", md: "none" }}>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default BeforeHeader;
