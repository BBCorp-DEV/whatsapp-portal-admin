import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Pagination,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const MainBox = styled(Box)(({ theme }) => ({
  background: "#f5f7fa",
  minHeight: "100vh",
  padding: theme.spacing(4),
}));

const CardBox = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: 12,
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const PermissionLabel = styled("span")(({ theme }) => ({
  fontWeight: 500,
  marginRight: theme.spacing(1),
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: 24,
  padding: "10px 28px",
  fontWeight: 600,
  fontSize: 16,
  background: theme.palette.primary.main,
  color: "#fff",
  boxShadow: "0 2px 8px rgba(36,107,253,0.15)",
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

const permissionsList = [
  "Home",
  "User Management",
  "Investing",
  "Card",
  "Savings",
  "Money Transfer",
  "Support",
  "Referral Program",
  "Subscription And Fee Management",
  "Analytic And Finance",
  "Sales And Marketing",
  "Waiting List",
  "Push Notification",
  "Daily Data",
  "International Transaction",
  "Loans",
  "USDT",
  "Admin Management",
];

const initialAdmins = [
  {
    id: 1,
    email: "admin1@example.com",
    permissions: {
      Home: true,
      "User Management": true,
      Investing: false,
      Card: true,
      Savings: false,
      "Money Transfer": true,
      Support: true,
      "Referral Program": false,
      "Subscription And Fee Management": true,
      "Analytic And Finance": false,
      "Sales And Marketing": true,
      "Waiting List": false,
      "Push Notification": true,
      "Daily Data": true,
      "International Transaction": false,
      Loans: true,
      USDT: false,
      "Admin Management": true,
    },
  },
  // Add more sample admins as needed
];

export default function SubadminManagement() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: "", permissions: {} });

  const limit = 5;
  const totalPages = Math.ceil(admins.length / limit);
  const paginatedAdmins = admins.slice((page - 1) * limit, page * limit);

  const handlePageChange = (_, value) => setPage(value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAdmin({ email: "", permissions: {} });
  };

  const handlePermissionChange = (perm) => {
    setNewAdmin((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm],
      },
    }));
  };

  const handleAddAdmin = () => {
    if (newAdmin.email) {
      setAdmins((prev) => [...prev, { id: prev.length + 1, ...newAdmin }]);
      handleClose();
    }
  };

  return (
    <MainBox>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight={700} color="primary">
          SubAdmin Management
        </Typography>
        <AddButton onClick={handleOpen}>Add New SubAdmin</AddButton>
      </Box>

      {paginatedAdmins.length === 0 ? (
        <CardBox textAlign="center">
          <Typography variant="h6" color="textSecondary">
            No Sub Admin found
          </Typography>
        </CardBox>
      ) : (
        paginatedAdmins.map((admin) => (
          <CardBox key={admin.id}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight={600}>
                {admin.email}
              </Typography>
              <Button variant="outlined" color="error">
                Delete
              </Button>
            </Box>
            <Grid container spacing={2}>
              {permissionsList.map((perm) => (
                <Grid item xs={12} sm={6} md={4} key={perm}>
                  <Box display="flex" alignItems="center">
                    <PermissionLabel>{perm}</PermissionLabel>
                    <Checkbox checked={!!admin.permissions[perm]} disabled />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardBox>
        ))
      )}

      <Grid container justifyContent="center" mt={2}>
        {totalPages > 1 && (
          <Pagination
            page={page}
            onChange={handlePageChange}
            count={totalPages}
            color="primary"
          />
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New SubAdmin</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
          />
          <Box mt={2}>
            <Typography variant="subtitle1" fontWeight={600}>
              Permissions
            </Typography>
            <Grid container spacing={2}>
              {permissionsList.map((perm) => (
                <Grid item xs={12} sm={6} md={4} key={perm}>
                  <Box display="flex" alignItems="center">
                    <PermissionLabel>{perm}</PermissionLabel>
                    <Checkbox
                      checked={!!newAdmin.permissions[perm]}
                      onChange={() => handlePermissionChange(perm)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAdmin} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </MainBox>
  );
}
