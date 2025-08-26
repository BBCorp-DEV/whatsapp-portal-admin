import React, { useState } from "react";
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
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Subadmin() {
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
      },
    },
   
  ];

  const [admins, setAdmins] = useState(initialAdmins);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ email: "", permissions: {} });
  const [editIndex, setEditIndex] = useState(null);
  const [editAdmin, setEditAdmin] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);
  const limit = 7;
  const totalPages = Math.ceil(admins.length / limit);
  const paginatedAdmins = admins.slice((page - 1) * limit, page * limit);

  const handlePageChange = (_, value) => setPage(value);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewAdmin({ email: "", permissions: {} });
    setEditIndex(null);
    setEditAdmin(null);
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

  const handleEmailChange = (value) => {
    setNewAdmin((prev) => ({ ...prev, email: value }));
  };

  const handleAddAdmin = () => {
    if (newAdmin.email) {
      setAdmins((prev) => [...prev, { id: prev.length + 1, ...newAdmin }]);
      handleClose();
    }
  };

  // Open delete dialog and set admin to delete
  const handleDeleteDialogOpen = (admin) => {
    setAdminToDelete(admin);
    setDeleteDialogOpen(true);
  };

  // Cancel delete dialog
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAdminToDelete(null);
  };

  // Confirm delete
  const handleDeleteConfirm = () => {
    if (adminToDelete) {
      setAdmins((prev) => prev.filter((a) => a.id !== adminToDelete.id));
    }
    setDeleteDialogOpen(false);
    setAdminToDelete(null);
  };

  const handleEditOpen = (idx) => {
    setEditIndex(idx);
    setEditAdmin({ ...admins[idx] });
    setOpen(true);
  };

  const handleEditPermissionChange = (perm) => {
    setEditAdmin((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm],
      },
    }));
  };

  const handleEditEmailChange = (value) => {
    setEditAdmin((prev) => ({ ...prev, email: value }));
  };

  const handleEditSave = () => {
    setAdmins((prev) =>
      prev.map((a, idx) => (idx === editIndex ? editAdmin : a))
    );
    handleClose();
  };

  return (
    <MainBox>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        {/* <Typography variant="h4" fontWeight={700} color="#000">
          SubAdmin Management
        </Typography> */}
        <AddButton onClick={handleOpen}>Add Permission</AddButton>
      </Box>

      {paginatedAdmins.length === 0 ? (
        <CardBox textAlign="center">
          <Typography variant="h6" color="textSecondary">
            No Sub Admin found
          </Typography>
        </CardBox>
      ) : (
        paginatedAdmins.map((admin, idx) => (
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
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleEditOpen((page - 1) * limit + idx)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteDialogOpen(admin)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Grid container spacing={2}>
              {permissionsList.map((perm) => (
                <Grid item xs={12} sm={6} md={4} key={perm}>
                  <Box display="flex" alignItems="center">
                    <PermissionLabel>{perm}</PermissionLabel>
                    <Checkbox checked={!!admin.permissions[perm]} />
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

      {/* Add Dialog for single admin */}
      <Dialog
        open={open && editIndex === null}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, boxShadow: 6 }, // rounded + shadow
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            color: "primary.main",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          Add SubAdmin
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={newAdmin.email}
            onChange={(e) => handleEmailChange(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />

          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: "text.secondary", mb: 1 }}
            >
              Permissions
            </Typography>

            <Grid container spacing={2}>
              {permissionsList.map((perm) => (
                <Grid item xs={12} sm={6} key={perm}>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      "&:hover": { backgroundColor: "#fafafa" },
                    }}
                  >
                    <Checkbox
                      checked={!!newAdmin.permissions[perm]}
                      onChange={() => handlePermissionChange(perm)}
                      size="small"
                      color="primary"
                    />
                    <Typography sx={{ ml: 0.5, fontSize: "14px" }}>
                      {perm}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid #f0f0f0", p: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddAdmin}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog for single admin */}
      <Dialog
        open={open && editIndex !== null}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2, boxShadow: 6 }, // subtle rounded + shadow
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "18px",
            color: "primary.main",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          Edit SubAdmin
        </DialogTitle>

        <DialogContent sx={{ mt: 1 }}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={editAdmin?.email || ""}
            onChange={(e) => handleEditEmailChange(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Box mt={2}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: "text.secondary", mb: 1 }}
            >
              Permissions
            </Typography>

            <Grid container spacing={2}>
              {permissionsList.map((perm) => (
                <Grid item xs={12} sm={6} key={perm}>
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                      "&:hover": { backgroundColor: "#fafafa" },
                    }}
                  >
                    <Checkbox
                      checked={!!editAdmin?.permissions[perm]}
                      onChange={() => handleEditPermissionChange(perm)}
                      size="small"
                      color="primary"
                    />
                    <Typography sx={{ ml: 0.5, fontSize: "14px" }}>
                      {perm}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid #f0f0f0", p: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
            background: "#fff",
            overflow: "hidden",
          },
        }}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.35)" },
          timeout: 300,
        }}
        TransitionProps={{
          timeout: 300,
        }}
      >
        {/* Title */}
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1.5,
            color: "error.main",
            fontWeight: 700,
            fontSize: "20px",
            textAlign: "center",
            px: 3,
            py: 2,
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <DeleteIcon color="error" sx={{ fontSize: 28 }} />
          Delete SubAdmin
        </DialogTitle>

        {/* Content */}
        <DialogContent
          sx={{
            px: 4,
            py: 2,
            mt:3,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              color: "#212121",
              lineHeight: 1.6,
              fontSize: "15px",
            }}
          >
            Are you sure you want to remove{" "}
            <b style={{ color: "#d32f2f" }}>{adminToDelete?.email}</b>?
          </Typography>
        
        </DialogContent>

        {/* Actions */}
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            borderTop: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "center", // 👈 Centered buttons
            gap: 2,
          }}
        >
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              boxShadow: "0px 3px 6px rgba(211,47,47,0.3)",
              "&:hover": { boxShadow: "0px 4px 10px rgba(211,47,47,0.4)" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainBox>
  );
}
