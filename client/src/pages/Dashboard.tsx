import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Chip,
  Snackbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Close as CloseIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  convertToBase64,
  getUserProfile,
  updateUserProfile,
  getSkills,
  getExperiences,
  getEducations,
} from "../utils/api";

// Context
import { AuthContext } from "../context/AuthContext";
import Skills from "../components/dashboard/Skills";
import Experiences from "../components/dashboard/Experiences";
import Education from "../components/dashboard/Education";
import Messages from "../components/dashboard/Messages";
import Honors from "../components/dashboard/Honors";

interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
  order: number;
  time: string;
}

interface Skill {
  _id: string;
  name: string;
  icon?: string;
  proficiency: number;
  category: string;
  featured?: boolean;
}

interface ExpTimelineEntry {
  _id: string;
  title: string;
  organization: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description: string;
}

interface EduTimelineEntry {
  _id: string;
  title: string;
  institution: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description: string;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  contact?: {
    phone?: string;
    address?: string;
  };
}

// Dashboard functional components
const DashboardHome = () => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Welcome to the Admin Dashboard
    </Typography>
    <Typography variant="body1">
      Use the navigation to manage your portfolio content.
    </Typography>
  </Box>
);

// ProjectsManager Component
const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    images: [],
    technologies: [],
    githubLink: "",
    demoLink: "",
    featured: false,
    order: 0,
  });
  const [technology, setTechnology] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedFilesPreviews, setSelectedFilesPreviews] = useState<string[]>(
    []
  );
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      showNotification("Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEdit(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      images: [],
      technologies: [],
      githubLink: "",
      demoLink: "",
      featured: false,
      order: 0,
    });
    setSelectedFiles([]);
    setSelectedFilesPreviews([]);
    setTechnology("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentProject({
      ...currentProject,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);

      // Generate previews
      const previewsPromises = filesArray.map((file) => convertToBase64(file));
      const previews = await Promise.all(previewsPromises);
      setSelectedFilesPreviews([...selectedFilesPreviews, ...previews]);
    }
  };

  const removeImage = (index: number) => {
    // Remove from previews
    const updatedPreviews = [...selectedFilesPreviews];
    updatedPreviews.splice(index, 1);
    setSelectedFilesPreviews(updatedPreviews);

    // Remove from selectedFiles
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const removeExistingImage = (index: number) => {
    if (currentProject.images) {
      const updatedImages = [...currentProject.images];
      updatedImages.splice(index, 1);
      setCurrentProject({
        ...currentProject,
        images: updatedImages,
      });
    }
  };

  const addTechnology = () => {
    if (technology.trim() && currentProject.technologies) {
      if (!currentProject.technologies.includes(technology.trim())) {
        setCurrentProject({
          ...currentProject,
          technologies: [...currentProject.technologies, technology.trim()],
        });
      }
      setTechnology("");
    }
  };

  const removeTechnology = (index: number) => {
    if (currentProject.technologies) {
      const updatedTechnologies = [...currentProject.technologies];
      updatedTechnologies.splice(index, 1);
      setCurrentProject({
        ...currentProject,
        technologies: updatedTechnologies,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      // Prepare the project data
      const projectData = { ...currentProject };

      // Add base64 images from selected files
      if (selectedFilesPreviews.length > 0) {
        projectData.images = [
          ...(projectData.images || []),
          ...selectedFilesPreviews,
        ];
      }

      // Create or update the project
      if (isEdit && currentProject._id) {
        await updateProject(currentProject._id, projectData);
        showNotification("Project updated successfully!", "success");
      } else {
        await createProject(projectData);
        showNotification("Project created successfully!", "success");
      }

      // Refresh projects and close dialog
      fetchProjects();
      handleClose();
    } catch (error) {
      console.error("Error saving project:", error);
      showNotification("Failed to save project", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        setLoading(true);
        await deleteProject(id);
        showNotification("Project deleted successfully!", "success");
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        showNotification("Failed to delete project", "error");
      } finally {
        setLoading(false);
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
    setNotification({
      ...notification,
      open: false,
    });
  };

  if (loading && projects.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Project
        </Button>
      </Box>

      {projects.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", py: 3 }}>
          No projects found. Click on "Add Project" to create your first
          project.
        </Typography>
      ) : (
        <List>
          {projects.map((project) => (
            <ListItem
              key={project._id}
              divider
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => handleEdit(project)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDelete(project._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h6">{project.title}</Typography>
                    {project.featured && (
                      <Chip
                        label="Featured"
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Box sx={{ my: 1 }}>
                      {project.technologies.map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            project.description.length > 100
                              ? `${project.description.substring(0, 100)}...`
                              : project.description,
                        }}
                      ></div>
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  label="Project Title"
                  fullWidth
                  required
                  value={currentProject.title}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="time"
                  label="Project Time"
                  fullWidth
                  required
                  value={currentProject.time}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  required
                  multiline
                  rows={4}
                  value={currentProject.description}
                  onChange={handleChange}
                  helperText="HTML is supported for formatting (use with caution)"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="githubLink"
                  label="GitHub Link"
                  fullWidth
                  value={currentProject.githubLink}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="demoLink"
                  label="Demo Link"
                  fullWidth
                  value={currentProject.demoLink}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="order"
                  label="Display Order"
                  type="number"
                  fullWidth
                  value={currentProject.order}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="featured"
                      checked={currentProject.featured}
                      onChange={handleChange}
                    />
                  }
                  label="Featured Project"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Technologies
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", mb: 1 }}>
                  {currentProject.technologies?.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => removeTechnology(index)}
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <TextField
                  label="Add Technology"
                  fullWidth
                  value={technology}
                  onChange={(e) => setTechnology(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={addTechnology}>Add</Button>
                      </InputAdornment>
                    ),
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Images
                </Typography>

                {/* Existing images */}
                {currentProject.images && currentProject.images.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                    {currentProject.images.map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          width: 100,
                          height: 100,
                          m: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.7)",
                            },
                          }}
                          onClick={() => removeExistingImage(index)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                        <img
                          src={image}
                          alt={`Project ${index}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                {/* New image previews */}
                {selectedFilesPreviews.length > 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
                    {selectedFilesPreviews.map((preview, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          width: 100,
                          height: 100,
                          m: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.7)",
                            },
                          }}
                          onClick={() => removeImage(index)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                        <img
                          src={preview}
                          alt={`Preview ${index}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<ImageIcon />}
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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

// SkillsManager Component
const SkillsManager = () => {
  return <Skills />;
  // The Skills component is already implemented and handles its own state and API calls.
};

// ExperienceManager Component
const ExperienceManager = () => {
  return <Experiences />;
};

// EducationManager Component
const EducationManager = () => {
  return <Education />;
};

// ProfileManager Component
const ProfileManager = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    fetchProfile();
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile();
      setProfile(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      showNotification("Failed to load profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested objects
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setProfile((prev) => {
        if (!prev) return prev;

        const sectionObj = prev[section as keyof UserProfile];
        if (typeof sectionObj === "object" && sectionObj !== null) {
          return {
            ...prev,
            [section]: {
              ...sectionObj,
              [field]: value,
            },
          };
        }
        return prev;
      });
    } else {
      setProfile((prev) => {
        if (!prev) return prev;
        return { ...prev, [name]: value };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      setSaving(true);
      await updateUserProfile(profile);
      showNotification("Profile updated successfully!", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Failed to update profile", "error");
    } finally {
      setSaving(false);
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
    setNotification({
      ...notification,
      open: false,
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography>Profile not found</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Profile Manager
      </Typography>

      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                margin="normal"
                disabled // Email is usually not changed easily
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={profile.bio || ""}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="contact.phone"
                value={profile.contact?.phone || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="contact.address"
                value={profile.contact?.address || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Social Links
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                name="socialLinks.linkedin"
                value={profile.socialLinks?.linkedin || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GitHub"
                name="socialLinks.github"
                value={profile.socialLinks?.github || ""}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
          </Grid>
        </Paper>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            Save Changes
          </Button>
        </Box>
      </form>

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

// Placeholder components for remaining sections
const MessagesManager = () => {
  return <Messages />;
};

const ResumeManager = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<ExpTimelineEntry[]>([]);
  const [education, setEducation] = useState<EduTimelineEntry[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [skillsData, experiencesData, educationData, profileData] =
          await Promise.all([
            getSkills(),
            getExperiences(),
            getEducations(),
            getUserProfile(),
          ]);

        setSkills(skillsData);
        setExperiences(experiencesData);
        setEducation(educationData);
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching resume data:", error);
        setNotification({
          open: true,
          message: "Failed to load resume data",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleGeneratePDF = () => {
    // This would be implemented with a PDF generation library
    setNotification({
      open: true,
      message: "PDF generation will be available soon!",
      severity: "success",
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Resume Manager
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<InsertDriveFileIcon />}
          onClick={handleGeneratePDF}
        >
          Generate PDF
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        {profile ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Name:</strong> {profile.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1">
                <strong>Email:</strong> {profile.email}
              </Typography>
            </Grid>
            {profile.contact?.phone && (
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Phone:</strong> {profile.contact.phone}
                </Typography>
              </Grid>
            )}
            {profile.contact?.address && (
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Address:</strong> {profile.contact.address}
                </Typography>
              </Grid>
            )}
            {profile.bio && (
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Bio:</strong> {profile.bio}
                </Typography>
              </Grid>
            )}
          </Grid>
        ) : (
          <Typography>No profile information available</Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <Chip
                key={skill._id}
                label={skill.name}
                color={skill.featured ? "primary" : "default"}
              />
            ))
          ) : (
            <Typography>No skills added yet</Typography>
          )}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Experience
        </Typography>
        {experiences.length > 0 ? (
          <List>
            {experiences.map((exp) => (
              <ListItem key={exp._id} sx={{ pl: 0, display: "block" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.title} at {exp.organization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(exp.from).toLocaleDateString()} -
                  {exp.current
                    ? " Present"
                    : ` ${new Date(exp.to!).toLocaleDateString()}`}
                  {exp.location ? ` | ${exp.location}` : ""}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {exp.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No experience entries added yet</Typography>
        )}
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        {education.length > 0 ? (
          <List>
            {education.map((edu) => (
              <ListItem key={edu._id} sx={{ pl: 0, display: "block" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.title} at {edu.institution}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(edu.from).toLocaleDateString()} -
                  {edu.current
                    ? " Present"
                    : ` ${new Date(edu.to!).toLocaleDateString()}`}
                  {edu.location ? ` | ${edu.location}` : ""}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {edu.description}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No education entries added yet</Typography>
        )}
      </Paper>

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

// HonorsManager Component
const HonorsManager = () => {
  return <Honors />;
};

const Dashboard: React.FC = () => {
  const { user, isLoggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedTab, setSelectedTab] = useState(0);

  // Navigation items
  const navItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "" },
    { name: "Projects", icon: <WorkIcon />, path: "projects" },
    { name: "Skills", icon: <CodeIcon />, path: "skills" },
    { name: "Experience", icon: <WorkIcon />, path: "experience" },
    { name: "Education", icon: <SchoolIcon />, path: "education" },
    { name: "Honors", icon: <EmojiEventsIcon />, path: "honors" },
    { name: "Profile", icon: <PersonIcon />, path: "profile" },
    { name: "Messages", icon: <EmailIcon />, path: "messages" },
    { name: "Resume", icon: <InsertDriveFileIcon />, path: "resume" },
  ];

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    navigate(`/dashboard/${navItems[newValue].path}`);
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect due to the useEffect
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Logged in as: {user?.name} ({user?.email})
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Paper sx={{ mb: 3 }}>
        {isMobile ? (
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            {navItems.map((item, index) => (
              <Tab key={item.name} icon={item.icon} label={item.name} />
            ))}
          </Tabs>
        ) : null}
      </Paper>

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* Desktop navigation */}
        {!isMobile && (
          <Paper sx={{ width: 240, flexShrink: 0 }}>
            <List component="nav">
              {navItems.map((item, index) => (
                <ListItem
                  button
                  key={item.name}
                  selected={selectedTab === index}
                  onClick={() => {
                    setSelectedTab(index);
                    navigate(`/dashboard/${item.path}`);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* Main content area */}
        <Paper sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/projects" element={<ProjectsManager />} />
            <Route path="/skills" element={<SkillsManager />} />
            <Route path="/experience" element={<ExperienceManager />} />
            <Route path="/education" element={<EducationManager />} />
            <Route path="/honors" element={<HonorsManager />} />
            <Route path="/profile" element={<ProfileManager />} />
            <Route path="/messages" element={<MessagesManager />} />
            <Route path="/resume" element={<ResumeManager />} />
          </Routes>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
