import React from "react";
import { Box, Grid, Typography, Avatar, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StorageIcon from "@mui/icons-material/Storage";
import CountUp from "react-countup";

const stats = [
  {
    icon: <PersonIcon />,
    value: 90,
    suffix: "+",
    label: "Users",
  },
  {
    icon: <LocationOnIcon />,
    value: 30,
    suffix: "+",
    label: "Locations",
  },
  {
    icon: <StorageIcon />,
    value: 50,
    suffix: "+",
    label: "Servers",
  },
];

export default function UserCount() {
  return (
    <Box
    
      sx={{
        backgroundColor: "#fff",
        borderRadius: 3,
        width: "100%",
        maxWidth: "70%",
        alignItems: "center",
        // boxShadow: "0px 4px 20px rgb(218, 226, 234)",
        borderLeft:"1px solid #FFFFFF",
        p: 6,
        display: "flex",
        justifyContent: "center",
        margin: "auto",
        marginTop:"16px"
      }}
    >
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {stats.map((item, index) => (
          <React.Fragment key={item.label}>
            <Grid item xs={12} sm={4} textAlign="center">
              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                  gap: "20px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "#E3F2FD",
                    color: "#0288D1",
                    width: 56,
                    height: 56,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    <CountUp
                      end={item.value}
                      duration={2}
                      suffix={item.suffix}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {index < stats.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: "none", sm: "block" },
                  mx: 2,
                  borderColor: "#eee",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
}
