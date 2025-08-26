import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";

export default function Plans() {
  const location = useLocation();
  const isAdminPayment = location.pathname === "/payments";
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPlansHanlder();
  }, []);

  const getPlansHanlder = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.plansMain,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response?.data?.success === true) {
        setPlans(response?.data?.data);
      }
    } catch (error) {
      return error?.response;
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box
      sx={{
        width: { xs: "100%", md: "100%" },
        backgroundColor: "#F5F5F5",
        // height: isUsersPage ? (hideOnScroll ? 0 : "100vh") : 0,
        height: "100vh",
      }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: { xs: "100%", sm: "auto" },
          justifyContent:"space-between",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: "24px", sm: "30px" },
              fontWeight: "700",
              fontFamily: "rubik",
            }}
          >
            Plan List
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            onClick={() => navigate("/addPlans")}
            sx={{
              backgroundColor: "#0077cc",
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "8px",
              fontWeight: "bold",
              color: "#fff",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                backgroundColor: "#0077cc",
              },
            }}
          >
            Add Plan
          </Button>
        </Box>
      </Box>
      {/* Responsive Wrapper */}
      <Box
        sx={{
          overflowX: { xs: "auto", sm: "auto", md: "visible" }, // only scroll on small screens
          mt: 2,
        }}
      >
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            minWidth: "700px", // ensures scroll triggers on small screens
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Serial Number",
                  "Plan name",
                  "Amount",
                  "Coverage duration",
                  "Plan ID",
                  "Status",
                  "Action",
                ].map((heading, i) => (
                  <TableCell key={i} sx={{ fontWeight: "bold" }}>
                    {heading}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ borderBottom: "none" }}
                  >
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : plans?.[0]?.rows?.length > 0 ? (
                plans?.[0]?.rows?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.plan_name}</TableCell>
                    <TableCell>{row.coverage_amount}</TableCell>
                    <TableCell>{row.coverage_duration}</TableCell>
                    <TableCell>{row.plan_id}</TableCell>
                    <TableCell>
                      {row?.status?.charAt(0).toUpperCase() +
                        row?.status?.slice(1)}
                    </TableCell>
                    <TableCell>
                    
                      <Tooltip title={"Update plan"}>
                        <IconButton
                          onClick={() =>
                            navigate("/editPlans", {
                              state: { userData: row },
                            })
                          }
                        >
                          <MdModeEditOutline style={{ cursor: "pointer" }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    align="center"
                    sx={{ borderBottom: "none" }}
                  >
                    <Box sx={{ py: 4 }}>No Data found</Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
