import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Slide,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PhoneIcon from '@mui/icons-material/Phone'
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline'
import SecurityIcon from '@mui/icons-material/Security'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import SwipeIcon from '@mui/icons-material/Swipe'
import { styled } from '@mui/system'

const FloatingAppBar = styled(AppBar)({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  zIndex: 1100,
})

const MegaMenuBox = styled(Box)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  position: 'absolute',
  top: 64,
  left: 0,
  padding: theme.spacing(3),
  zIndex: 1099,
  display: 'none',
  // Transition effect for smooth slide in and out
  transition: 'transform 0.3s ease-in-out',
}))

const StyledButton = styled(Button)({
  color: '#000',
  fontWeight: 500,
  fontSize: '0.95rem',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(0,178,255,0.08)',
    color: '#00b2ff',
  },
})

const products = [
  { name: 'Analytics', icon: <PieChartOutlineIcon fontSize="medium" />, href: '#' },
  { name: 'Engagement', icon: <SwipeIcon fontSize="medium" />, href: '#' },
  { name: 'Security', icon: <SecurityIcon fontSize="medium" />, href: '#' },
  { name: 'Integrations', icon: <IntegrationInstructionsIcon fontSize="medium" />, href: '#' },
  { name: 'Automations', icon: <AutorenewIcon fontSize="medium" />, href: '#' },
]

export default function FloatingHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)

  const toggleDrawer = (open) => () => setDrawerOpen(open)
  const toggleMegaMenu = () => setMegaOpen((prev) => !prev)

  return (
    <>
      <FloatingAppBar position="fixed">
        <Toolbar sx={{ px: { xs: 2, sm: 4 }, py: 1.5 }}>
          <Box component="a" href="#" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Logo"
              height={30}
              style={{ marginRight: 8 }}
            />
            <Typography variant="h6" sx={{ color: '#00b2ff', fontWeight: 700 }}>
              Empower
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, gap: 2 }}>
            <StyledButton endIcon={<ExpandMoreIcon />} onClick={toggleMegaMenu}>
              Product
            </StyledButton>
            <StyledButton href="#">Features</StyledButton>
            <StyledButton href="#">Marketplace</StyledButton>
            <StyledButton href="#">Company</StyledButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button
              variant="outlined"
              href="#"
              sx={{
                textTransform: 'none',
                borderColor: '#00b2ff',
                color: '#00b2ff',
                '&:hover': {
                  backgroundColor: '#e6f7ff',
                },
              }}
            >
              Log in →
            </Button>
          </Box>

          <IconButton sx={{ ml: 'auto', display: { md: 'none' } }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </FloatingAppBar>

      {/* Smooth Full-Width Flyout Mega Menu */}
      <Slide direction="down" in={megaOpen} mountOnEnter unmountOnExit>
        <MegaMenuBox>
          <Grid container spacing={3}>
            {products.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.name}>
                <Paper
                  component="a"
                  href={item.href}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: '#f0faff',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {item.icon}
                  <Typography fontWeight={600}>{item.name}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </MegaMenuBox>
      </Slide>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight={600}>
              Menu
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ mt: 2 }}>
            <ListItem button onClick={toggleMegaMenu}>
              <ListItemText primary="Product" />
              <ExpandMoreIcon fontSize="small" />
            </ListItem>
            <ListItem button component="a" href="#">
              <ListItemText primary="Features" />
            </ListItem>
            <ListItem button component="a" href="#">
              <ListItemText primary="Marketplace" />
            </ListItem>
            <ListItem button component="a" href="#">
              <ListItemText primary="Company" />
            </ListItem>
            <ListItem button component="a" href="#">
              <ListItemText primary="Log in" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
