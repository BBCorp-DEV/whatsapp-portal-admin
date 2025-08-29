import React, { useState } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const NavLink = styled(MuiLink)(({ theme }) => ({
  margin: theme.spacing(0, 2),
  color: "#4a4a4a",
  textDecoration: "none",
  fontWeight: 500,
  fontSize: "0.95rem",
  "&:hover": {
    textDecoration: "underline",
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

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, px: 2, py: 3.5 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        UhuruCare
      </Typography>
      <List>
        {["Home", "About Us", "Members Portal", "Plans", "Provider Portal"].map(
          (text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider sx={{ my: 2 }} />
      <Box>
        <Typography variant="body2" fontWeight="bold" sx={{ mb: 1 }}>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              listStyle: "none",
              color: "#000",
            }}
          >
            Sign In
          </Link>
        </Typography>
        <SignUpButton fullWidth variant="outlined">
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
              listStyle: "none",
              color: "#0077cc",
            }}
          >
            Sign Up
          </Link>
        </SignUpButton>
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ px: { xs: 2, sm: 6 }, background: "#fff" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        {/* Logo + Brand */}
        <Box display="flex" alignItems="center">
          <img
            src="Images/navbarLogo.png"
            alt="logo"
            style={{ height: 60, marginRight: 8 }}
          />
          <Typography variant="h4" fontWeight="bold" color="black">
            UhuruCare
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

          <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href="#"
        style={{
          textDecoration: "none",
          color: isHovered ? "#0077cc" : "black",
          padding: "8px 16px",
          display: "inline-block",
          fontWeight:"500",
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
            zIndex: 1,
            minWidth: "160px",
          }}
        >
          <a
            href="/mission"
            style={{
              color: "black",
              padding: "12px 16px",
              textDecoration: "none",
              display: "block",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Our Mission
          </a>
          <a
            href="values"
            style={{
              color: "black",
              padding: "12px 16px",
              textDecoration: "none",
              display: "block",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Our Values
          </a>
          <a
            href="/leader"
            style={{
              color: "black",
              padding: "12px 16px",
              textDecoration: "none",
              display: "block",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Our Work
          </a>
         
        </div>
      )}
          </div>
          {/* <NavLink
            href="/signin"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Members Portal
          </NavLink> */}
          <NavLink
            href="#"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Plans
          </NavLink>
          <NavLink
            href="/login"
            style={{ textDecoration: "none", color: "black" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#0077cc")}
            onMouseOut={(e) => (e.currentTarget.style.color = "black")}
          >
            Provider Portal
          </NavLink>
          {/* <Typography
            variant="body2"
            fontWeight="bold"
            color="black"
            sx={{ mr: 2 }}
          >
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "#000",
              }}
            >
              Sign In
            </Link>
          </Typography> */}
          {/* <SignUpButton variant="outlined">
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                listStyle: "none",
                color: "#0077cc",
                padding: "14px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#0282b4")}
              onMouseLeave={(e) => (e.target.style.color = "#0077cc")}
            >
              Login
            </Link>
          </SignUpButton> */}
        </Box>

        {/* Desktop Auth Buttons */}
        {/* <Box display={{ xs: "none", md: "flex" }} alignItems="center">
    
        </Box> */}

        {/* Mobile Menu Icon */}
        <Box display={{ xs: "flex", md: "none" }}>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
