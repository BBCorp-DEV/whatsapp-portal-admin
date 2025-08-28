import React, { useContext, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { IoArrowBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/context/Auth";
import moment from "moment";

const ViewUserList = () => {
  const location = useLocation();
  const userData = location.state.userData;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [getDataStored] = useState([]);

  return (
    <Box
      sx={{
        px: 2,
        py: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Back Button - moved outside the card */}
      <Box sx={{ alignSelf: "flex-start", mb: 0 }}>
        <IconButton
          onClick={() => navigate("/sub-admin")}
          sx={{
            width: 40,
            height: 40,
            color: "#000",
          }}
        >
          <IoArrowBackSharp size={24} />
        </IconButton>
      </Box>

      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          bgcolor: "white",
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 2 } }}>
          {/* Title */}
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: 700, mb: 3, color: "#000" }}
          >
            Sub Admin Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* User Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Full Name", value: `${userData?.firstName || ""} ${userData?.lastName || ""}` },
              { label: "Email", value: userData.email },
              { label: "Phone", value: userData.phone },
              { label: "User Type", value: userData.userTyphe || "Sub Admin" },
              { label: "Date & Time", value: moment(getDataStored.dob).format("lll") },
              {
                label: "Permission",
                value: Array.isArray(userData?.role)
                  ? userData.role.join(", ")
                  : userData?.role,
              },
              ...(userData.role === "hospital"
                ? [{ label: "Type", value: userData.type_of_hospital }]
                : []),
              {
                label: "Status",
                value: (
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color:
                        userData.status === "ACTIVE" ? "#4caf50" : "#f44336",
                      textTransform: "capitalize",
                    }}
                  >
                    {userData.status || "--"}
                  </Typography>
                ),
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between",
                  gap: 1,
                  p: 1.5,
                  borderRadius: "8px",
                  bgcolor: index % 2 === 0 ? "#f8fafc" : "#f1f5f9",
                }}
              >
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    color: "text.secondary",
                    wordBreak: "break-word",
                  }}
                >
                  {item.value || "--"}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewUserList;
