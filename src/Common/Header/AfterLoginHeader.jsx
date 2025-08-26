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
  Avatar,
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

const AfterLoginHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250, px: 2, py: 3 }}
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
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{ px: { xs: 2, sm: 6 }, background: "#fdfbf9" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        {/* Logo + Brand */}
        <Box display="flex" alignItems="center">
          <Link to="/">
            <img
              src="Images/navbarLogo.png"
              alt="logo"
              style={{ height: 40, marginRight: 8 }}
            />
          </Link>
          {/* <Typography variant="h6" fontWeight="bold" color="black">
            UhuruCare
          </Typography> */}
        </Box>

        {/* Desktop Navigation Links */}
        <Box display={{ xs: "none", md: "flex" }} alignItems="center">
          <Avatar alt="Your Name" src="/Images/image.png" />
          <Typography variant="body1" style={{ marginLeft: 8   }}>
            Your Name
          </Typography>
        </Box>

        {/* Desktop Auth Buttons */}

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

export default AfterLoginHeader;
