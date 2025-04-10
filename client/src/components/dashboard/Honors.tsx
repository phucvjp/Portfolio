import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  useHonors,
  useCreateHonor,
  useUpdateHonor,
  useDeleteHonor,
} from "../../hooks/useQueries";

interface Honor {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

const Honors: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingHonor, setEditingHonor] = useState<Honor | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    url: "",
  });
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // React Query hooks
  const { data: honors = [], isLoading } = useHonors();
  const createHonorMutation = useCreateHonor();
  const updateHonorMutation = useUpdateHonor();
  const deleteHonorMutation = useDeleteHonor();

  const handleOpen = () => {
    setFormData({
      title: "",
      issuer: "",
      date: "",
      description: "",
      url: "",
    });
    setEditingHonor(null);
    setOpen(true);
  };

  const handleEdit = (honor: Honor) => {
    setFormData({
      title: honor.title,
      issuer: honor.issuer,
      date: honor.date,
      description: honor.description,
      url: honor.url || "",
    });
    setEditingHonor(honor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHonor) {
        await updateHonorMutation.mutateAsync({
          id: editingHonor._id,
          data: formData,
        });
        showNotification("Honor updated successfully!", "success");
      } else {
        await createHonorMutation.mutateAsync(formData);
        showNotification("Honor created successfully!", "success");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving honor:", error);
      showNotification("Failed to save honor", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this honor?")) {
      try {
        await deleteHonorMutation.mutateAsync(id);
        showNotification("Honor deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting honor:", error);
        showNotification("Failed to delete honor", "error");
      }
    }
  };

  const showNotification = (message: string, severity: "success" | "error") => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" component="h2">
          Honors & Awards
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Honor
        </Button>
      </Box>

      {honors.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography>
            No honors or awards yet. Click "Add Honor" to create one.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Issuer</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {honors.map((honor: Honor) => (
                <TableRow key={honor._id}>
                  <TableCell>{honor.title}</TableCell>
                  <TableCell>{honor.issuer}</TableCell>
                  <TableCell>{honor.date}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(honor)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(honor._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog for adding/editing honors */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{editingHonor ? "Edit Honor" : "Add Honor"}</DialogTitle>
          <DialogContent>
            <TextField
              name="title"
              label="Title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="issuer"
              label="Issuer"
              fullWidth
              required
              value={formData.issuer}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="date"
              label="Date"
              fullWidth
              required
              value={formData.date}
              onChange={handleChange}
              margin="normal"
              helperText="e.g., May 2021 or 2020-2021"
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              name="url"
              label="URL (Optional)"
              fullWidth
              value={formData.url}
              onChange={handleChange}
              margin="normal"
              helperText="Link to certificate or award page"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={
                createHonorMutation.isPending || updateHonorMutation.isPending
              }
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Honors;
