import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  useCreateExperience,
  useDeleteExperience,
  useExperiences,
  useUpdateExperience,
} from "../../hooks/useQueries";

const Experiences: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  });

  const { data: experiences, isLoading } = useExperiences();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();

  const handleOpen = (experience?: any) => {
    if (experience) {
      setEditingExperience(experience);
      setFormData({
        title: experience.title,
        organization: experience.organization,
        location: experience.location,
        startDate: experience.startDate,
        endDate: experience.endDate,
        description: experience.description,
        current: experience.current,
      });
    } else {
      setEditingExperience(null);
      setFormData({
        title: "",
        organization: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
        current: false,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingExperience(null);
    setFormData({
      title: "",
      organization: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingExperience) {
        await updateExperience.mutateAsync({
          id: editingExperience._id,
          data: formData,
        });
      } else {
        await createExperience.mutateAsync(formData);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving experience:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await deleteExperience.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Experiences</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Experience
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Organization</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences?.map((experience: any) => (
              <TableRow key={experience._id}>
                <TableCell>{experience.title}</TableCell>
                <TableCell>{experience.organization}</TableCell>
                <TableCell>{experience.location}</TableCell>
                <TableCell>
                  {experience.startDate} -{" "}
                  {experience.current ? "Present" : experience.endDate}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(experience)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(experience._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingExperience ? "Edit Experience" : "Add New Experience"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Organization"
              fullWidth
              value={formData.organization}
              onChange={(e) =>
                setFormData({ ...formData, organization: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Location"
              fullWidth
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              disabled={formData.current}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingExperience ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Experiences;
