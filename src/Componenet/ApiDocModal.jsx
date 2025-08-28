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
  Paper
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
  flexDirection: "column"
};

const ApiDocModal = ({ open, onClose }) => {
  console.log("asdgasdgds", open);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            Details
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#555" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ overflowY: "auto", pr: 1 }}>
          {/* Endpoint */}
          <Typography mt={1} mb={1} fontWeight={600}>
            {open?.name}
          </Typography>


          {/* Authentication */}
          <Typography mt={3} mb={1} fontWeight={600}>
            Authentication
          </Typography>
          <Typography variant="body2" color="gray">
            All requests require API key authentication passed in the request body:
          </Typography>

          {/* Request Parameters */}
                    {open?.responseData && (

          <Box>

          <Typography mt={3} mb={2} fontWeight={600}>
            Request Parameters
          </Typography>
          <Paper sx={{ p: 2, bgcolor: "#f9f9f9", mt: 1, fontFamily: "monospace" }}>
            <pre>{JSON.stringify(open.requestData, null, 2)}</pre>
          </Paper>
          </Box>
                    )}
          {open?.responseData && (
            <Box>
              <Typography mt={3} mb={2} fontWeight={600}>
                Response Parameters
              </Typography>

              <Paper sx={{ p: 2, bgcolor: "#f9f9f9", mt: 1, fontFamily: "monospace" }}>
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
