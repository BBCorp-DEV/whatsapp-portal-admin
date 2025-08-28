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
import moment from "moment";
import { AuthContext } from "../Auth/context/Auth";

const TransferView = () => {
  const location = useLocation();
  console.log("bvdigberiu",location)
  const userData = location.state.staticClaims[0];
  const navigate = useNavigate();
    console.log("bvdigbregreheriu",userData)
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
          onClick={() => navigate("/transfer")}
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
            Transfer Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* User Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { label: "Full Name", value:userData.name },
              { label: "Email", value: userData.email },
              { label: "Phone", value: userData.whatsappPhone },
              { label: "Type", value: userData.type },
              { label: "Date & Time", value: moment(getDataStored.dob).format("lll") },
                { label: "Amount", value: userData.requestData?.amount },
              {
                label: "Status",
                value: (
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color:
                        userData.status === "success" ? "#4caf50" : "#f44336",
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

export default TransferView;
