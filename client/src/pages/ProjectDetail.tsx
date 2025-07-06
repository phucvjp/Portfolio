import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Chip,
  Button,
  Card,
  CardMedia,
  Skeleton,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";
import { useProjectById } from "../hooks/useQueries";

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const theme = useTheme();

  const { data: project, isLoading, error } = useProjectById(id || "");

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Box sx={{ mt: 4 }}>
          <Skeleton variant="text" height={60} width="70%" />
          <Skeleton variant="text" height={30} width="40%" sx={{ mt: 2 }} />
          <Box sx={{ mt: 4 }}>
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="100%" />
            <Skeleton variant="text" height={20} width="80%" />
          </Box>
          <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <Skeleton
                key={item}
                variant="rectangular"
                width={80}
                height={32}
              />
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color="error" gutterBottom>
            Error
          </Typography>
          <Typography variant="body1">
            Failed to load project details. Please try again later.
          </Typography>
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            sx={{ mt: 3 }}
            startIcon={<ArrowBackIcon />}
          >
            Back to Projects
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Project Not Found
          </Typography>
          <Typography variant="body1">
            The project you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            sx={{ mt: 3 }}
            startIcon={<ArrowBackIcon />}
          >
            Back to Projects
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          component={RouterLink}
          to="/projects"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 4 }}
        >
          Back to All Projects
        </Button>

        <Grid container spacing={4}>
          {/* Project Images */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                position: "relative",
                height: { xs: 300, md: 500 },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
              }}
            >
              {project.images && project.images.length > 0 ? (
                <CardMedia
                  component="img"
                  image={project.images[currentImageIndex]}
                  alt={project.title}
                  sx={{
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.200",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No images available
                  </Typography>
                </Box>
              )}

              {/* Image navigation (if multiple images) */}
              {project.images && project.images.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    p: 1,
                    bgcolor: "rgba(0,0,0,0.5)",
                  }}
                >
                  {project.images.map((_: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        mx: 0.5,
                        bgcolor:
                          index === currentImageIndex
                            ? "white"
                            : "rgba(255,255,255,0.5)",
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </Box>
              )}
            </Card>
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              {project.title}
            </Typography>

            {project.featured && (
              <Chip
                label="Featured Project"
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
            )}

            <Typography variant="body1" gutterBottom>
              {project.time}
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Technologies Used
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
              {project.technologies.map((tech: string) => (
                <Chip key={tech} label={tech} variant="outlined" size="small" />
              ))}
            </Box>

            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              {project.githubLink && (
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Code
                </Button>
              )}
              {project.demoLink && (
                <Button
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </Button>
              )}
            </Box>
          </Grid>

          {/* Project Description */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                mt: 3,
                borderRadius: 2,
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Project Description
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography
                variant="body1"
                component="div"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ProjectDetail;
