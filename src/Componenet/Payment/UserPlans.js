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

export default function UserPlans() {
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

  const getBuySubscription = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);

    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.policies,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          plan_id: id,
        },
      });
      if (response?.data?.success === true) {
        console.log("jjjdjdjdjd",response?.data?.data?.authorization_url);
        console.log("2556465465464",response?.data?.authorization_url);
        console.log("adfgadsgsadgsadfsafasd", response);
        window.location.href = response?.data?.data?.authorization_url; // Redirect to the Paystack authorization page
        // setPlans(response?.data?.data);
      }
    } catch (error) {
      console.log("errorerrorerrorerror", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "100vh" },
        background: "#F5F5F5",
        marginTop: "3rem",
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: "30px", fontWeight: "700", fontFamily: "rubik" }}
      >
        Plans
      </Typography>

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
                      <Box>
                        <Button
                          onClick={() => getBuySubscription(row.plan_id)}
                          style={{
                            background: "#469bd4",
                            color: "#fff",
                            borderRadius: "10px",
                          }}
                        >
                          Buy
                        </Button>
                      </Box>
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
