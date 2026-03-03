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
  Paper,
  useTheme,
  alpha,
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
  const isDark = theme.palette.mode === "dark";

  const { data: project, isLoading, error } = useProjectById(id || "");

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height={400}
          sx={{ borderRadius: 3 }}
        />
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
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container maxWidth="md" sx={{ py: 12 }}>
        <Box
          sx={{
            textAlign: "center",
            p: 6,
            borderRadius: 3,
            background: alpha(theme.palette.primary.main, 0.03),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {error ? "Error Loading Project" : "Project Not Found"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {error
              ? "Failed to load project details. Please try again later."
              : "The project you're looking for doesn't exist or has been removed."}
          </Typography>
          <Button
            component={RouterLink}
            to="/projects"
            variant="contained"
            startIcon={<ArrowBackIcon />}
            sx={{ px: 4 }}
          >
            Back to Projects
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          component={RouterLink}
          to="/projects"
          startIcon={<ArrowBackIcon />}
          sx={{
            mb: 4,
            color: theme.palette.text.secondary,
            "&:hover": { color: theme.palette.primary.main },
          }}
        >
          Back to Projects
        </Button>

        <Grid container spacing={4}>
          {/* Project Images */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                position: "relative",
                height: { xs: 280, md: 480 },
                overflow: "hidden",
                "&:hover .image-overlay": {
                  opacity: 1,
                },
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
                    background: isDark
                      ? alpha("#000", 0.3)
                      : alpha("#f8fafc", 0.5),
                  }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${alpha(
                      theme.palette.primary.main,
                      0.08
                    )}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No images available
                  </Typography>
                </Box>
              )}

              {project.images && project.images.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 1,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    background: alpha("#000", 0.4),
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {project.images.map((_: string, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        width: index === currentImageIndex ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor:
                          index === currentImageIndex
                            ? "#fff"
                            : "rgba(255,255,255,0.4)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </Box>
              )}
            </Card>

            {/* Thumbnail strip */}
            {project.images && project.images.length > 1 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  mt: 2,
                  overflowX: "auto",
                  pb: 1,
                  "&::-webkit-scrollbar": { height: 4 },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: 2,
                    background: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                {project.images.map((img: string, index: number) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    sx={{
                      width: 80,
                      height: 56,
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: `2px solid ${
                        index === currentImageIndex
                          ? theme.palette.primary.main
                          : "transparent"
                      }`,
                      opacity: index === currentImageIndex ? 1 : 0.6,
                      transition: "all 0.2s",
                      flexShrink: 0,
                      "&:hover": { opacity: 1 },
                    }}
                  >
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
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
          </Grid>

          {/* Project Details */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 100 }}>
              {project.featured && (
                <Chip
                  label="Featured Project"
                  size="small"
                  sx={{
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    color: "#fff",
                    fontWeight: 600,
                  }}
                />
              )}

              <Typography variant="h4" sx={{ mb: 1 }}>
                {project.title}
              </Typography>

              {project.time && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  {project.time}
                </Typography>
              )}

              <Typography
                variant="subtitle2"
                sx={{
                  mb: 1.5,
                  color: theme.palette.text.secondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontSize: "0.75rem",
                }}
              >
                Technologies
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 4,
                }}
              >
                {project.technologies.map((tech: string) => (
                  <Chip
                    key={tech}
                    label={tech}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                {project.demoLink && (
                  <Button
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Live Demo
                  </Button>
                )}
                {project.githubLink && (
                  <Button
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    View Source
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>

          {/* Project Description */}
          <Grid item xs={12}>
            <Card sx={{ p: { xs: 3, md: 4 }, mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                About This Project
              </Typography>
              <Typography
                variant="body1"
                component="div"
                sx={{
                  lineHeight: 1.8,
                  color: theme.palette.text.secondary,
                  "& p": { mb: 2 },
                  "& ul, & ol": { pl: 3, mb: 2 },
                  "& li": { mb: 0.5 },
                  "& a": {
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  },
                }}
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ProjectDetail;
