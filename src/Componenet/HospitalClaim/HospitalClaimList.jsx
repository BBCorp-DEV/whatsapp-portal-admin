import React from "react";
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
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const rows = [
  {
    transactionId: "4863514160",

    status: "complete",
    purchase: "Rahul",
  },
  {
    transactionId: "4863514160",
    purchase: "Vikash",

    status: "complete",
  },
];

export default function HospitalClaimList() {
  const location = useLocation();
  const isAdminPayment = location.pathname === "/payments";
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ fontSize: "30px", fontWeight: "500", fontFamily: "rubik" }}
      >Claim List</Typography>
      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ height: "100vh", background: "#fff", borderRadius: "10px",marginTop:"20px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {["Date", "Name", "Raised By", "Status", "Amount"].map(
                (heading, i) => (
                  <TableCell key={i} sx={{ fontWeight: "bold" }}>
                    {heading}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& td": { border: "none" }, // Remove borders from all cells
                  }}
                >
                  <TableCell colSpan={9} sx={{ p: 0, border: "none" }}>
                    <Box
                      sx={{
                        display: "flex",
                        background: index % 2 === 0 ? "#f5f5f5" : "#fff",
                        borderRadius: "10px",
                        px: 2,
                        py: 2,
                        marginX: 2,
                        marginTop: "10px",
                      }}
                    >
                      {[
                        <Typography>21-06-2024</Typography>,

                        <Typography align="right" sx={{marginLeft:"5rem"}}>{row.purchase}</Typography>,
                        <Typography></Typography>,
                        
                        <Typography align="right" sx={{marginLeft:"5rem"}}>{row.purchase}</Typography>,
                        <Typography>{row.id}</Typography>,
                        
                        <Typography>{row.method}</Typography>,
                        <Typography></Typography>,
                        <Typography align="left" sx={{marginLeft:"-4rem"}}>{row.status}</Typography>,
                        <Typography></Typography>,
                        <Typography align="left">522</Typography>,
                        <Typography></Typography>,
                      ].map((content, i) => (
                        <Box key={i} sx={{ flex: 1 }}>
                          {content}
                        </Box>
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
