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
  TextField,
  Button,
  CircularProgress,
  Pagination,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import ApiConfig, { API_BASE_URL } from "../../Auth/ApiConfig";
import toast from "react-hot-toast";
import { AuthContext } from "../../Auth/context/Auth";
import moment from "moment";
export default function Faq() {
  const navigate = useNavigate();
  const location = useLocation();
  const [totalPages, setTotalPages] = useState("");
  const auth = useContext(AuthContext);
  const userDatas = auth.userData;
  const [searchQuery, setSearchQuery] = useState("");
  const [userStoredData, setUserStoredData] = useState([]);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  console.log("655454456546456", userStoredData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [idd1, setidd1] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [idd2, setidd2] = React.useState("");
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const isUsersPage = location.pathname === "/users";
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const userListing = async () => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.AllContent,
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          type: "faqs",
          page: page,
          limit: limit,
          q: searchQuery,
        },
      });
      console.log("asfgadsgsdagfads", response);
      if (response.data?.success === true) {
        console.log("adsfsdafgadsf", response?.data?.data);
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

  const OpenModal1 = (data, status) => {
    setidd1(status); // Store only the company ID
    setOpen1(data);
  };
  const handleClose1 = () => {
    setOpen1(false); //closes modal
  };

  const OpenModal2 = (data, status) => {
    setidd2(status); // Store only the company ID
    setOpen2(data);
  };
  const handleClose2 = () => {
    setOpen2(false); //closes modal
  };

  const StatusActiveBlock = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "DELETE",
        url: `${API_BASE_URL}api/v1/content/${id}`,
        // url: `http://3.144.242.180/api/v1/users/${id}/status`,

        headers: {
          authorization: `Bearer ${token}`,
        },

        // data: {
        //   status: idd1,
        // },
      });
      console.log("b565bvifbifu", response.data.error);
      if (response.data.success === true) {
        console.log("sdsadfsasssss", response.data);
        userListing();
        toast.success(response?.data?.message);
        setOpen1(false);
        // setClassStoredData(response?.data?.data.reverse());
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.log("error", error);
    }
  };

  const PasswordUpdateHandler = async (id) => {
    const token = window.localStorage.getItem("adminToken");
    setLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: `${API_BASE_URL}api/v1/users/${id}/password`,
        headers: {
          authorization: `Bearer ${token}`,
        },

        data: {
          new_password: password,
        },
      });
      console.log("b565bvifbifu", response.data.error);
      if (response.data.success === true) {
        console.log("sdsadfsasssss", response.data);
        setPassword("");
        userListing();
        toast.success(response?.data?.message);
        setOpen2(false);
        // setClassStoredData(response?.data?.data.reverse());
        setLoading(false);
      } else {
        setLoading(false);
        setOpen2(false);
        toast.error(response?.data?.message ?? "Please try again");
      }
    } catch (error) {
      setLoading(false);
      setOpen2(false);
      toast.error(error?.response?.data?.message ?? "Please try again");
      console.log("error", error);
    }
  };

  useEffect(() => {
    userListing();
  }, [page, limit, searchQuery]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHideOnScroll(true);
      } else {
        setHideOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          backgroundColor: "#F5F5F5",
          // height: isUsersPage ? (hideOnScroll ? 0 : "100vh") : 0,
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            alignItems: "center",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" }, // Stack on extra small screens
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
              FAQS List
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/addFaq")}
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
                  backgroundColor: "#0090cc",
                },
              }}
            >
              Add Faq
            </Button>

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
                minWidth: { xs: "100%", sm: 200 },
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
        </Box>

        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            height: "auto",
            background: "#fff",
            borderRadius: "10px",
            marginTop: "20px",
            overflowX: { xs: "auto", md: "hidden" },
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "Sr.No",
                  "Title",
                  "Type",
                  "Description",
                  "Date",
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
                    <TableCell>
                     {index + 1}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.title}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.type}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: (() => {
                            const div = document.createElement("div");
                            div.innerHTML = row?.description || "";
                            const plainText =
                              div.textContent || div.innerText || "";
                            const trimmed =
                              plainText.length > 30
                                ? plainText.slice(0, 30) + "..."
                                : plainText;
                            return trimmed;
                          })(),
                        }}
                      />
                      {/* {row?.description?.length > 20
                          ? `${row?.description?.slice(0, 20)}...`
                          : row?.description} */}
                    </TableCell>
                    <TableCell>
                      {moment(row.created_at).format("LLL")}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit Faq">
                        <IconButton>
                          <MdModeEditOutline
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigate("/editFaqs", {
                                state: { userData: row },
                              })
                            }
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Faq">
                        <IconButton>
                          <MdDelete
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              OpenModal1(row);
                            }}
                            // OpenModal1
                            // onClick={() =>
                            //   navigate("/deleteAbout", {
                            //     state: { userData: row },
                            //   })
                            // }
                          />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
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
        {totalPages > 1 && userStoredData?.[0]?.rows?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              // marginTop: "10px",
              padding: "20px",
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
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            padding: "1rem",
            width: "500px",
            maxWidth: "90%",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center", color: "#000" }}
        >
          {/* {open1?.status === "active" ? "Block user" : "Activate user"} */}
          Delete Faq
        </DialogTitle>

        <DialogContent style={{ padding: "20px", textAlign: "center" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: "14px", color: "#000" }}
          >
            Are you sure you want to Delete faq{" "}
            {/* {open1?.status === "active"
              ? "block the user"
              : "activate the user"}
            ? */}
          </DialogContentText>
        </DialogContent>

        <DialogActions
          style={{
            justifyContent: "center",
            padding: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <Button
            onClick={handleClose1}
            color="primary"
            autoFocus
            sx={{
              fontSize: "15px",
              textTransform: "capitalize",
              fontWeight: "500",
              width: "30%",
              borderRadius: "10px",
              border: "1px solid #0077cc",
              color: "#0077cc",
              "&:hover": {
                backgroundColor: "#0077cc",
                boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                color: "#fff",
              },
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              StatusActiveBlock(open1?.content_id);
            }}
            color="primary"
            sx={{
              fontSize: "15px",
              textTransform: "capitalize",
              fontWeight: "500",
              width: "30%",
              borderRadius: "10px",
              border: "1px solid #0077cc",
              color: "#0077cc",
              "&:hover": {
                backgroundColor: "#0077cc",
                boxShadow: "0px 15px 30px rgba(0, 178, 255, 0.4)",
                color: "#fff",
              },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* update password */}
    </>
  );
}
