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
  useCreateEducation,
  useDeleteEducation,
  useEducations,
  useUpdateEducation,
} from "../../hooks/useQueries";

const Education: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    current: false,
  });

  const { data: educations, isLoading } = useEducations();
  const createEducation = useCreateEducation();
  const updateEducation = useUpdateEducation();
  const deleteEducation = useDeleteEducation();

  const handleOpen = (education?: any) => {
    if (education) {
      setEditingEducation(education);
      setFormData({
        title: education.title,
        institution: education.institution,
        location: education.location,
        startDate: education.startDate,
        endDate: education.endDate,
        description: education.description,
        current: education.current,
      });
    } else {
      setEditingEducation(null);
      setFormData({
        title: "",
        institution: "",
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
    setEditingEducation(null);
    setFormData({
      title: "",
      institution: "",
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
      if (editingEducation) {
        await updateEducation.mutateAsync({
          id: editingEducation._id,
          data: formData,
        });
      } else {
        await createEducation.mutateAsync(formData);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving education:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this education?")) {
      try {
        await deleteEducation.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting education:", error);
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Education</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Education
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Institution</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {educations?.map((education: any) => (
              <TableRow key={education._id}>
                <TableCell>{education.title}</TableCell>
                <TableCell>{education.institution}</TableCell>
                <TableCell>{education.location}</TableCell>
                <TableCell>
                  {education.startDate} -{" "}
                  {education.current ? "Present" : education.endDate}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(education)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(education._id)}>
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
          {editingEducation ? "Edit Education" : "Add New Education"}
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
              label="Institution"
              fullWidth
              value={formData.institution}
              onChange={(e) =>
                setFormData({ ...formData, institution: e.target.value })
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
              {editingEducation ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Education;
