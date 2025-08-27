import React, { useContext, useEffect, useState } from "react";
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
  Pagination,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../../Auth/ApiConfig";
import PlansCard from "../../Common/DashboardCards/PlansCard";
import { AuthContext } from "../../Auth/context/Auth";

export default function Error() {
  const location = useLocation();
  const isAdminPayment = location.pathname === "/payments";
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1); // keep page starting from 1 for Pagination
  const [limit, setLimit] = useState(10);
  const auth = useContext(AuthContext);
  const userData = auth.userData;

  // 🔹 Static Data fallback
  const staticData = [
    {
      transaction_id: "TXN001",
      reference_id: "REF1001",
      full_name: "John Doe",
      payment_for: "Health Insurance",
      policy_id: "POL123",
      method: "Credit Card",
      status: "complete",
      amount: "1500",
      currency: "USD",
    },
    {
      transaction_id: "TXN002",
      reference_id: "REF1002",
      full_name: "Jane Smith",
      payment_for: "Car Insurance",
      policy_id: "POL124",
      method: "UPI",
      status: "pending",
      amount: "3000",
      currency: "INR",
    },
    {
      transaction_id: "TXN003",
      reference_id: "REF1003",
      full_name: "Robert Wilson",
      payment_for: "Life Insurance",
      policy_id: "POL125",
      method: "Net Banking",
      status: "complete",
      amount: "5000",
      currency: "USD",
    },
  ];

  useEffect(() => {
    getPlansHanlder();
  }, [page, limit, searchQuery]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getPlansHanlder = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);

    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.getallpayments,
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          limit: limit,
          q: searchQuery,
        },
      });

      if (response?.data?.success === true) {
        setLoading(false);
        setPlans(
          response?.data?.data[0]?.rows?.filter(
            (item) => item?.status === "complete"
          )
        );
        setTotalPages(response?.data?.data?.[0]?.count);
      } else {
        // if API returns error, use static data
        setPlans(staticData);
        setTotalPages(1);
        setLoading(false);
      }
    } catch (error) {
      console.log("API error, loading static data...", error);
      setPlans(staticData);
      setTotalPages(1);
      setLoading(false);
    }
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {["admin", "insurance"].includes(userData?.role) && <PlansCard />}
      <Box
        sx={{
          height: "100vh",
          background: "#F5F5F5",
          marginTop: { xs: "0px", md: "0px" },
          p:2
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "700", }}
          >
            Error List
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            type="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              marginTop: { xs: "10px", md: "0px" },
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                paddingRight: 0,
                padding: "2.5px 0px",
                borderRadius: "10px",
              },
            }}
            InputProps={{ sx: { paddingRight: "8px" } }}
          />
        </Box>
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            background: "#fff",
            borderRadius: "10px",
            marginTop: "20px",
            width: { xs: "100%", md: "100%" },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Transaction Id",
                  "Policy Holder",
                  "Purchase",
                  "Policy Id",
                  "Method",
                  "Status",
                  "Amount",
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
                  <TableCell colSpan={7} align="center">
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : plans?.length > 0 ? (
                plans.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      borderRadius: "10px",
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>
                      {row.transaction_id} {row?.reference_id}
                    </TableCell>
                    <TableCell>{row.full_name}</TableCell>
                    <TableCell>{row.payment_for}</TableCell>
                    <TableCell>{row.policy_id}</TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {row.amount} {row?.currency}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{ fontSize: "15px !important" }}
                    >
                      No Data Found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              "& .Mui-selected": {
                backgroundColor: "#00b2ff !important",
                color: "#fff !important",
                borderRadius: "5px",
              },
              "& .MuiPaginationItem-root": { color: "black" },
            }}
          >
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={totalPages}
            />
          </Box>
        )}
      </Box>
    </>
  );
}
