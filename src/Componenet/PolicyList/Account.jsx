import React, { useContext, useEffect, useRef, useState } from "react";
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
  IconButton,
  Tooltip,
  Pagination,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import ApiConfig from "../../Auth/ApiConfig";
import axios from "axios";
import { AuthContext } from "../../Auth/context/Auth";
import toast from "react-hot-toast";
import moment from "moment";

export default function Account() {
  const location = useLocation();
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [userStoredData, setUserStoredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const userData = auth.userData;
   const effectRan = useRef(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const userListing = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.accountList,
        headers: {
          authorization: `Bearer ${token}`,
        },
        params:{
          page:page,
          limit:limit,
          search:searchQuery
        }
      });

      if (response.status === 200) {
        setUserStoredData(response?.data?.data?.docs);
        setTotalPages(response?.data?.data?.totalPages)
            // toast.success(response?.data?.message || "Users loaded successfully ✅");
      } else {
//  toast.error(response?.data?.message || "Something went wrong ❌");
        setUserStoredData([]);
      }
    } catch (error) {
      console.log("error", error);
      setUserStoredData([]);
      // toast.error(error?.response?.data?.message || "Failed to fetch users ❌");
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
    userListing();
    },[page,limit,searchQuery])

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>

      <Box
        sx={{
          height: "100vh",
          marginTop: { xs: "0px", md: "0px" },
          background: "#F5F5F5",
            px: 2,
        py:0,
        }}
      >
        {/* Header + Search */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Typography
            variant="h4"
            sx={{  fontWeight: "700",}}
          >
            Account List
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
          />
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            background: "#fff",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr No.",
                  "Name",
                  "Account Name",
                  "Account Type",
                  "Amount",
                  "Status",
                  "Date",
                  "Action"
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
                  <TableCell colSpan={6} align="center">
                    <Box sx={{ py: 4 }}>
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : userStoredData?.length > 0 ? (
                userStoredData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      background: index % 2 === 0 ? "#f5f5f5" : "#fff",
                    }}
                  >
                    <TableCell> {(page - 1) * limit + index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {row.name}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {row.requestData?.name}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {row.requestData?.type}
                    </TableCell>
                    <TableCell>{row.requestData?.balance}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>  {moment(row.createdAt).format("YYYY-MM-DD")}</TableCell>
                    <TableCell>
                      <Tooltip title="View Policy">
                        <IconButton
                          onClick={() =>
                            navigate("/view-account", {
                              state: { userStoredData },
                            })
                          }
                        >
                          <IoEyeSharp />
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

        {/* Pagination */}
        {totalPages > 1 && userStoredData?.length > 0 && (
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
