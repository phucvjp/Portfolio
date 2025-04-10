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
  useCreateSkill,
  useDeleteSkill,
  useSkills,
  useUpdateSkill,
} from "../../hooks/useQueries";

const Skills: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    proficiency: "",
    category: "",
    icon: "",
  });

  const { data: skills, isLoading } = useSkills();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const handleOpen = (skill?: any) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        proficiency: skill.proficiency,
        category: skill.category,
        icon: skill.icon,
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: "",
        proficiency: "",
        category: "",
        icon: "",
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSkill(null);
    setFormData({
      name: "",
      proficiency: "",
      category: "",
      icon: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await updateSkill.mutateAsync({ id: editingSkill._id, data: formData });
      } else {
        await createSkill.mutateAsync(formData);
      }
      handleClose();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill.mutateAsync(id);
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Skills</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Proficiency</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills?.map((skill: any) => (
              <TableRow key={skill._id}>
                <TableCell>
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    style={{ width: 24, height: 24 }}
                  />
                </TableCell>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.proficiency}</TableCell>
                <TableCell>{skill.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(skill)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(skill._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingSkill ? "Edit Skill" : "Add New Skill"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="Icon URL"
              fullWidth
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              required
            />
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Level"
              fullWidth
              value={formData.proficiency}
              onChange={(e) =>
                setFormData({ ...formData, proficiency: e.target.value })
              }
              required
            />
            <TextField
              margin="dense"
              label="Category"
              fullWidth
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingSkill ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Skills;
