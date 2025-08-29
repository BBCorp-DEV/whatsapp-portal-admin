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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ApiConfig from "../../Auth/ApiConfig";
import DownloadIcon from "@mui/icons-material/Download";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import TopClaim from "./TopClaim";
import ReportNew from "./ReportNew";
import Revenue from "./Revenue";

export default function Reporting() {
  const [selectedTab, setSelectedTab] = useState(0); // 0: Top Claim, 1: Report, 2: Top Revenue
  const [loading, setLoading] = useState(false);
  const [reportStored, setReportStored] = useState([]);
  const [reportStored1, setReportStored1] = useState([]);
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
          startDate: "2025-01-01",
          endDate: "2025-04-28",
          period: "monthly",
          format: "json",
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
    if (selectedTab === 0) {
      topClaimListingData();  // Call the API when tab is "Top Claim"
    }
  }, [selectedTab, startDate, endDate, page]);

  const handleDownloadPDF = () => {
    // You can use jsPDF or other libraries here
    console.log("Download PDF logic goes here");
  };

  const handleExport = () => {
    // You can use xlsx or export-to-csv here
    console.log("Export file logic goes here");
  };

  const topClaimListingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(ApiConfig.ClaimListing, {
        headers: { authorization: `Bearer ${token}` },
        params: {
          startDate: startDate,
          endDate: endDate,
          // period: "monthly",
          format: "json",
          page: page,
        },
      });
      console.log("bckjdbfibrig", response);
      if (response?.data?.success === true) {
        console.log("PDF Export Response:", response);
        setReportStored1(response?.data?.data);
        setLoading(false);
      } else {
        setReportStored1([]);
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
  return (
    <Box sx={{ height: "100vh", background: "#F5F5F5", mt: { xs: 0, md: 6 } }}>
      {/* Tab Bar */}
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 2 }}
      >
        <Tab label="Top Claim" />
        <Tab label="Report" />
        {/* <Tab label="Top Revenue" /> */}
      </Tabs>

      {/* Header + Search + Actions */}
      <Box
        // pt={3}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* <Typography
          variant="h4"
          sx={{ fontSize: "30px", fontWeight: "700", fontFamily: "rubik" }}
        >
          {selectedTab === 0
            ? "Top Claim"
            : selectedTab === 1
              ? "Report List"
              : "Premium Revenue"}
        </Typography> */}
   
   
      </Box>
      {selectedTab === 0 && (<>
        <TopClaim />
      </>)}
      {selectedTab === 1 && (<>
        <ReportNew />
      </>)}
      {/* {selectedTab === 2 && (<>
        <Revenue />
      </>)} */}
      {/* Table */}

    </Box>
  );
}
