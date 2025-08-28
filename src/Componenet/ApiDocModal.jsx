import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 700,
  bgcolor: "#fff",
  color: "#000",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
};

const ApiDocModal = ({ open, onClose }) => {
  console.log("asdgasdgds", open);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="bold" color="#0077CC">
            Details
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#555" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ overflowY: "auto", pr: 1 }}>
          <Box
            // key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 1,
              p: 1.5,
              borderRadius: "8px",
              bgcolor: "#f1f5f9",
            }}
          >
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}
            >
              Name
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "text.secondary",
                wordBreak: "break-word",
              }}
            >
              {open?.name}
            </Typography>
          </Box>
          <br />
             <Box
            // key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 1,
              p: 1.5,
              borderRadius: "8px",
              bgcolor: "#f1f5f9",
            }}
          >
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}
            >
              Email
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "text.secondary",
                wordBreak: "break-word",
              }}
            >
              {open?.email}
            </Typography>
          </Box>
          <br />
             <Box
            // key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 1,
              p: 1.5,
              borderRadius: "8px",
              bgcolor: "#f1f5f9",
            }}
          >
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}
            >
              Phone
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color: "text.secondary",
                wordBreak: "break-word",
              }}
            >
              {open?.whatsappPhone}
            </Typography>
          </Box>
          <br />
                <Box
            // key={index}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              gap: 1,
              p: 1.5,
              borderRadius: "8px",
              bgcolor: "#f1f5f9",
            }}
          >
            <Typography
              sx={{ fontSize: "1rem", fontWeight: 600, color: "#334155" }}
            >
              Status
            </Typography>
            <Typography
              sx={{
                fontSize: "1rem",
                color:open?.status=== "error" ? "red" :"green",
                wordBreak: "break-word",

              }}
            >
              {open?.status}
            </Typography>
          </Box>
          {/* Endpoint */}
          {/* <Typography mt={1} mb={1} fontWeight={600}>
           <spam>Name:</spam> {open?.name}
          </Typography>
               <Typography mt={1} mb={1} fontWeight={600}>
           <spam>Email id:</spam> {open?.email}
          </Typography>
               <Typography mt={1} mb={1} fontWeight={600}>
             <spam>Phone:</spam> {open?.whatsappPhone}
          </Typography>
               <Typography mt={1} mb={1} fontWeight={600}>
             <spam>Status Code:</spam> {open?.statusCode}
          </Typography>
               <Typography mt={1} mb={1} fontWeight={600}>
             <spam>Status:</spam> {open?.status}
          </Typography> */}

          {/* Authentication */}

          {/* Request Parameters */}
          {open?.responseData && (
            <Box>
              <Typography mt={3} mb={2} fontWeight={600}>
                Request Parameters
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#f9f9f9",
                  mt: 1,
                  fontFamily: "monospace",
                }}
              >
                <pre>{JSON.stringify(open.requestData, null, 2)}</pre>
              </Paper>
            </Box>
          )}
          {open?.responseData && (
            <Box>
              <Typography mt={3} mb={2} fontWeight={600}>
                Response Parameters
              </Typography>

              <Paper
                sx={{
                  p: 2,
                  bgcolor: "#f9f9f9",
                  mt: 1,
                  fontFamily: "monospace",
                }}
              >
                <pre>{JSON.stringify(open.responseData, null, 2)}</pre>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default ApiDocModal;
