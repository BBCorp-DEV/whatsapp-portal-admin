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
  console.log("UserDatatatata", userData);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const avatarUrl = "https://i.pravatar.cc/800?img=5";
  const [loading, setLoading] = useState(false);
  const [getDataStored, setGetDataStored] = useState([]);

  const getOneUserData = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: `${API_BASE_URL}api/v1/users/${id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success === true) {
        setGetDataStored(response?.data?.data);
        // toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      getOneUserData(userData?.id);
    }
  }, [userData?.id]);

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 1, sm: 2 },
        py: 4,
        // backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          cursor: "pointer",
          background: "#82828214",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => navigate("/user-list")}
      >
        <IconButton sx={{ color: "#000", p: 0 }}>
          <IoArrowBackSharp size={25} />
        </IconButton>
      </Box>

      {/* User Info Card */}
      <Card
        sx={{
          maxWidth: 1300,
          mx: "auto",
          mt: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          p: 3,
          gap: 3,
          borderRadius: "10px",
        }}
      >
        {/* User Info Section */}
        <CardContent sx={{ flex: 1, width: "100%" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
             { label: "Full Name", value: getDataStored.created_by_full_name },
             { label: "Email", value: getDataStored.emailid },
             { label: "Phone", value: getDataStored.phone_number },
             { label: "Notional ID", value: getDataStored.national_id },
             { label: "Gender", value: getDataStored.gender },
             { label: "Address", value: getDataStored.address },
             { label: "DOB", value: moment(getDataStored.dob).format("lll") },
             { label: "Role", value: getDataStored.role },
             ...(userData.role === "hospital"
               ? [{ label: "Type", value: userData.type_of_hospital }]
               : []),
             {
               label: "Status",
               value: (
                 <strong style={{ color: "#4caf50", textTransform: "capitalize" }}>
                   {getDataStored.status || "--"}
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
                }}
              >
                <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  {item.label}:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {item.value || "--"}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>

        {/* Avatar Section */}
        {/* Avatar Section */}
        {getDataStored.national_id_doc_path ? (
          <a
            href={`${IMAGEURL}uploads/${getDataStored.national_id_doc_path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box
              component="img"
              src={`${IMAGEURL}uploads/${getDataStored.national_id_doc_path}`}
              alt="National ID"
              sx={{
                width: { xs: 150, sm: 200, md: 280 },
                height: { xs: 150, sm: 200, md: 280 },
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: 2,
                cursor: "pointer", // optional, to indicate it's clickable
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/280x280?text=No+Image";
              }}
            />
          </a>
        ) : (
          <Box
            sx={{
              width: { xs: 150, sm: 200, md: 280 },
              height: { xs: 150, sm: 200, md: 280 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e0e0e0",
              borderRadius: "8px",
              fontSize: "1rem",
              color: "#757575",
              boxShadow: 2,
              textAlign: "center",
            }}
          >
            No Image Preview
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default ViewUserList;
