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
  Link,
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Pagination,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdBlock,
  MdModeEditOutline,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";
import { TbPasswordUser } from "react-icons/tb";
import { IoEyeSharp } from "react-icons/io5";
import PoliciesPlan from "../../Common/DashboardCards/PoliciesPlan";
import { AuthContext } from "../../Auth/context/Auth";

const rows = [
  {
    date: "Bajaj",
    transactionId: "4863514160",
    method: "paystack",
    status: "complete",
    purchase: "Rahul",
  },
  {
    date: "LIC",
    transactionId: "4863514160",
    purchase: "Vikash",
    method: "paystack",
    status: "complete",
  },
];

export default function NewPolicy() {
  const location = useLocation();
  const [totalPages, setTotalPages] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userStoredData, setUserStoredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userData = auth.userData;
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const userListing = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.policies,
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
          limit: limit,
          q: searchQuery,
        },
      });
      console.log("654as56fa56dsf456ad", response);
      if (response.data?.success === true) {
        console.log("asf6+5as+6f5as+", response?.data?.data);
        setUserStoredData(response?.data?.data);
        setTotalPages(response?.data?.data[0]?.count);
        setLoading(false);
      } else {
        setLoading(false);
        setUserStoredData([]);
      }
    } catch (error) {
      setLoading(false);
      setUserStoredData([]);
      console.log("error", error);
    }
  };

  useEffect(() => {
    userListing();
  }, [page, limit, searchQuery]);
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
     {["admin", "insurance"].includes(userData?.role) && (
        <PoliciesPlan />
      )}
    
    <Box
      sx={{
        height: "100vh",
        marginTop: { xs: "0px", md: "3rem" },
        background: "#F5F5F5",
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
          sx={{ fontSize: "30px", fontWeight: "700", fontFamily: "rubik" }}
        >
        Digital ID
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
            width: {
              xs: "auto", // full width on extra-small screens
              sm: "auto", // auto or specific width on small and up
            },
            marginTop: {
              xs: "10px",
              md: "0px",
            },
            minWidth: {
              sm: 200, // minimum width on small screens and up
            },

            minWidth: 200,
            "& .MuiOutlinedInput-root": {
              paddingRight: 0,
              padding: "2.5px 0px",
              borderRadius: "10px",
            },
          }}
          InputProps={{
            sx: { paddingRight: "8px" },
          }}
        />
      </Box>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          height: "auto",
          background: "#fff",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
               
                "Policy Name",
                "Email",
                "Policy Holder",
                "Policy ID",
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
                  colSpan={6}
                  align="center"
                  sx={{ borderBottom: "none" }}
                >
                  <Box sx={{ py: 4 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : userStoredData?.[0]?.rows?.length > 0 ? (
              userStoredData?.[0]?.rows?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    background: index % 2 === 0 ? "#f5f5f5" : "#fff",
                  }}
                >
                
                  <TableCell sx={{ fontWeight: 500 }}>
                    {row.plan_name}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{row.emailid}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {row.full_name}
                  </TableCell>
                  <TableCell>{row.policy_id}</TableCell>
                  <TableCell>
                    <Tooltip title={"View Policy"}>
                      <IconButton>
                        <IoEyeSharp
                          style={{
                            cursor: "pointer",
                            // color: row.status === "active" ? "red" : "green",
                          }}
                          onClick={() =>
                            navigate("/newviewpolicy", {
                              state: { row },
                            })
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} sx={{ height: "100px", p: 0 }}>
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      color="textSecondary"
                      sx={{ fontSize: "15px !important" }}
                    >
                      No Data Found
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && userStoredData?.[0]?.rows?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            // marginTop: "10px",
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
