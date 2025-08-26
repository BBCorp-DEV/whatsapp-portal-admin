import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { API_BASE_URL, IMAGEURL } from "../../Auth/ApiConfig";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/context/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import moment from "moment";

const ViewUserList = () => {
  const location = useLocation();
  const userData = location.state.userData;
  console.log("UserDa777tatatata", userData);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const avatarUrl = "https://i.pravatar.cc/800?img=5";
  const [loading, setLoading] = useState(false);
  const [getDataStored, setGetDataStored] = useState([]);
  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 1, sm: 2 },
        py: 4,
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          cursor: "pointer",
          background: "#fff",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: 2,
        }}
        onClick={() => navigate("/user-list")}
      >
        <IconButton sx={{ color: "#1976d2", p: 0 }}>
          <IoArrowBackSharp size={25} />
        </IconButton>
      </Box>

      {/* User Info Card */}
      <Card
        sx={{
          maxWidth: 700,
          mx: "auto",
          mt: 3,
          borderRadius: "16px",
          boxShadow: 0,
          background: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#1976d2" }}>
            User Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
           { label: "Full Name", value: `${userData?.firstName || ""} ${userData?.lastName || ""}` },
             { label: "Email", value: userData.email },
             { label: "Phone", value: userData.phone },
             { label: "UserTpe", value: userData.userType },
             { label: "Date & Time", value: moment(getDataStored.dob).format("lll") },
            { label: "Role", value: Array.isArray(userData?.role) ? userData.role.join(", ") : userData?.role },
             ...(userData.role === "hospital"
               ? [{ label: "Type", value: userData.type_of_hospital }]
               : []),
             {
               label: "Status",
               value: (
                 <strong style={{ color: "#4caf50", textTransform: "capitalize" }}>
                   {userData.status || "--"}
                 </strong>
               ),
             },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                  alignItems: "center",
                  background: index % 2 === 0 ? "#f5f7fa" : "#e3eafc",
                  borderRadius: "8px",
                  px: 2,
                  py: 1,
                }}
              >
                <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold", minWidth: 120 }}>
                  {item.label}:
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.05rem" }}>
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