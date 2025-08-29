import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ApiConfig from "../../Auth/ApiConfig";

export default function TopClaim() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reportStored1, setReportStored1] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const token = localStorage.getItem("adminToken");

  const exportToExcel = (data, fileName = "Top_claim_list") => {
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
    topClaimListingData();
  }, [selectedTab, startDate, endDate]);

  const topClaimListingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ApiConfig.ClaimListing, {
        headers: { authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate,
          format: "json",
        },
      });
      if (response?.data?.success === true) {
        setReportStored1(response?.data?.data);
        setLoading(false);
      } else {
        setReportStored1([]);
        setLoading(false);
      }
    } catch (error) {
      setReportStored1([]);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: "100vh", background: "#F5F5F5", mt: { xs: 0, md: 6 } }}>
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

        {/* Grid for Date, Search, and Export */}
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
          <Grid item xs={12} sm={4} md={3}>
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
              onClick={() => exportToExcel(reportStored1)}
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
                "Claim Type",
                "Avg Amount",
                "Rank",
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
                <TableCell colSpan={5} align="center">
                  <Box sx={{ py: 4 }}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : reportStored1?.length > 0 ? (
              reportStored1?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.claim_type}</TableCell>
                  <TableCell>{parseFloat(row.avg_amount).toFixed(2)}</TableCell>
                  <TableCell>{row.rank}</TableCell>
                  <TableCell>{row.total_amount}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: "15px" }}>
                    No Data Found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
