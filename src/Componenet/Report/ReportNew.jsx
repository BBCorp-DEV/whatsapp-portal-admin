import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ApiConfig from "../../Auth/ApiConfig";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function ReportNew() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(1); // 0: Top Claim, 1: Report, 2: Top Revenue
  const [loading, setLoading] = useState(false);
  const [reportStored, setReportStored] = useState([]);
  const [reportStored1, setReportStored1] = useState([]);
  console.log("Adsfasdfads", reportStored);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    // Removed auto-setting of endDate
  };
  
  const token = localStorage.getItem("adminToken");

  const fetchReportList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ApiConfig.reportList, {
        headers: { authorization: `Bearer ${token}` },
        params: {
            startDate: startDate,
            endDate: endDate,
            // period: "monthly",
            format: "json",
            page:page,
        },
      });
      if (response?.data?.success === true) {
        setReportStored(response?.data?.data);
      } else {
        setReportStored([]);
      }
    } catch (error) {
      console.error("Error fetching report list:", error);
      setReportStored([]);
    } finally {
      setLoading(false);
    }
  };



  const exportToExcel = (data, fileName = "Report_list") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, `${fileName}.xlsx`);
  };

  useEffect(() => {
    fetchReportList();
   
  }, [selectedTab,startDate, endDate,page]);

  const handleDownloadPDF = () => {
    // You can use jsPDF or other libraries here
    console.log("Download PDF logic goes here");
  };

  const handleExport = () => {
    // You can use xlsx or export-to-csv here
    console.log("Export file logic goes here");
  };

 
  return (
    <Box sx={{ height: "100vh", background: "#F5F5F5", mt: { xs: 0, md: 6 } }}>
      {/* Tab Bar */}
    

      {/* Header + Search + Actions */}
      <Box
        pt={3}
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
          {selectedTab === 0
            ? "Top Claim"
            : selectedTab === 1
            ? "Report List"
            : "Premium Revenue"}
        </Typography>
        <Grid container spacing={2}  sx={{ mt: { xs: 2, md: 0 } }}>
          {/* Start Date */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography style={{color:'transparent'}}>Start Date</Typography>
            <TextField
            fullWidth
              variant="outlined"
              size="small"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              sx={{
                borderRadius: "8px",
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  paddingRight: 0,
                  padding: "2.5px 0px",
                  borderRadius: "10px",
                  width: "100%",
                },
              }}
            />
          </Grid>

          {/* End Date */}
          <Grid  item xs={12} sm={4} md={3}>
            <Typography style={{color:'transparent'}}>End Date</Typography>
            <TextField
              variant="outlined"
              size="small"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              sx={{
                borderRadius: "8px",
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  paddingRight: 0,
                  padding: "2.5px 0px",
                  borderRadius: "10px",
                },
              }}
            />
          </Grid>

          {/* Search */}
        
          {/* <Grid item xs={12} sm={4} md={3}>
            <Typography style={{color:'transparent'}}>Search</Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  paddingRight: 0,
                  padding: "2.5px 0px",
                  borderRadius: "10px",
                },
              }}
            />
          </Grid> */}
          <Grid item xs={12} sm={4} md={3}>
          <Typography style={{color:'transparent'}}>Search</Typography>

            <Button
              variant="contained"
              startIcon={<FileDownloadOutlinedIcon />}
              onClick={() => exportToExcel(reportStored)}
              sx={{
                textTransform: "none",
                width: "100%",
                padding: "10px 20px",
              }}
            >
              Export
            </Button>
          </Grid>

          {/* Export Button */}
       
        </Grid>
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
                "Serial Number",
                "Provider Id",
                "Provider name",
                "Claim Count",
                "time period",
                "Status",
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.provider_id}</TableCell>
                  <TableCell>{row.provider_name}</TableCell>
                  <TableCell>{row.claim_count}</TableCell>
                  <TableCell>{row.time_period}</TableCell>
                  <TableCell>{row.claim_status}</TableCell>
                  <TableCell>{row.total_amount}</TableCell>
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
      {/* {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Pagination
            page={page}
            onChange={(e, value) => setPage(value)}
            count={totalPages}
          />
        </Box>
      )} */}
    </Box>
  );
}
