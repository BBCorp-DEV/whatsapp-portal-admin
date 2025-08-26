import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Pagination,
  IconButton,
  Button,
  Grid,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ApiConfig from "../../Auth/ApiConfig";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { MdOutlineCloudUpload } from "react-icons/md";
import moment from "moment";
import toast from "react-hot-toast";
import { MdAutoDelete } from "react-icons/md";

export default function Medicines() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedTab, setSelectedTab] = useState(1); // 0: Top Claim, 1: Report, 2: Top Revenue
  const [loading, setLoading] = useState(false);
  const [reportStored, setReportStored] = useState([]);
  console.log("Adsfasdfads", reportStored);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const token = localStorage.getItem("adminToken");

  const [importedData, setImportedData] = useState([]);
  console.log("asdfasdfasd", importedData);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const isAllSelected =
    reportStored.length > 0 && selectedIds.length === reportStored.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = reportStored.map((item) => item.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (event, id) => {
    if (event.target.checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log("Imported Excel Data:", jsonData);
      setImportedData(jsonData); // Optional: still store in state if you want to view or debug

      await ImportHandlerFunction(jsonData); // Pass data directly to the function
    };
    reader.readAsArrayBuffer(file);
  };
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const topClaimListingData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(ApiConfig.preceptions, {
        headers: { authorization: `Bearer ${token}` },
        params: {
          q: searchQuery,
          page: page,
          limit: limit,
        },
      });
      if (response?.data?.success === true) {
        console.log("PDF Export Response:", response?.data?.data?.total);
        setReportStored(response?.data?.data?.data);
        setTotalPages(response?.data?.data?.total);

        setLoading(false);
      } else {
        setReportStored([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching report list:", error);
      setReportStored([]);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const ImportHandlerFunction = async (dataToImport) => {
    const token = window.localStorage.getItem("adminToken");

    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.preceptionsbulkCreate,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: dataToImport,
      });
      console.log("successsuccess", response?.data?.success);
      if (response?.data?.success === true) {
        toast.success(response.data.message);
        setLoading(false);
        topClaimListingData();
        console.log("responseresponse", response);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error?.response.data.message);
      console.log("errorerror", error);
      return error?.response;
    }
  };

  const DeleteHandlers = async () => {
    const token = window.localStorage.getItem("adminToken");

    setLoading(true);
    try {
      const response = await axios({
        method: "POST",
        url: ApiConfig.preceptionsbulk,
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: { ids: selectedIds },
      });
      console.log("successsuccess", response?.data?.success);
      if (response?.data?.success === true) {
        toast.success(response.data.message);
        setLoading(false);
        topClaimListingData();
        console.log("responseresponse", response);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      toast.error(error?.response.data.message);
      console.log("errorerror", error);
      return error?.response;
    }
  };

  useEffect(() => {
    topClaimListingData(); // Call the API when tab is "Top Claim"
  }, [page, limit, searchQuery]);

  return (
    <Box sx={{ height: "100vh", background: "#F5F5F5" }}>
      {/* Tab Bar */}

      {/* Header + Search + Actions */}
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
            Medicine List
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
              height: "43px",
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
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button
            variant="contained"
            startIcon={<MdOutlineCloudUpload />}
            onClick={handleButtonClick}
            sx={{
              textTransform: "none",
              width: "100%",
              padding: "10px 20px",
              height: "40px",
            }}
          >
            Import
          </Button>
        </Box>
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
              <TableCell style={{ paddingLeft: "10px" }} padding="checkbox">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  style={{
                    width: "18px",
                    height: "18px",
                  }}
                />
              </TableCell>
              <TableCell style={{ paddingLeft: "10px" }} padding="checkbox">
                {selectedIds.length === 0 ? null : (
                  <Tooltip title="Delete">
                    <IconButton onClick={DeleteHandlers}>
                      <MdAutoDelete color="red" />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>

              {[
                "Serial Number",
                "Medicine Id",
                "Unit of Pricing",
                "Level of Prescribing",
                "Medicine name",
                "Description",
                "Date",
                "Amount",
              ].map((heading, i) => (
                <TableCell
                  key={i}
                  sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Box sx={{ py: 4 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : reportStored?.length > 0 ? (
              reportStored?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <TableCell style={{ paddingLeft: "10px" }} padding="checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row?.id)}
                      onChange={(e) => handleSelectOne(e, row?.id)}
                      style={{
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    style={{ paddingLeft: "10px" }}
                    padding="checkbox"
                  ></TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>{row.id}</TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>{row.med_type}</TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>{row.pre_type}</TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>
                    {row.name}
                  </TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>
                    {row.description}
                  </TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>
                    {moment(row.created_at).format("lll")}
                  </TableCell>
                  <TableCell style={{ textWrap: "nowrap" }}>
                    {row.amount}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
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

      {/* Pagination */}
      {totalPages > 1 && reportStored?.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            // marginTop: "10px",
            padding: "20px",
            "& .Mui-selected": {
              backgroundColor: "#0077cc !important",
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
  );
}
