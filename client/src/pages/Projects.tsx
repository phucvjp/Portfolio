import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { motion } from "framer-motion";
import { useProjects } from "../hooks/useQueries";

// Types
interface Project {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  featured: boolean;
}

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("All");
  const [availableTechs, setAvailableTechs] = useState<string[]>([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useProjects();

  // Extract all unique technologies for the filter
  React.useEffect(() => {
    const allTechs = new Set<string>();
    projects.forEach((project: Project) => {
      project.technologies.forEach((tech) => allTechs.add(tech));
    });
    setAvailableTechs(Array.from(allTechs).sort());
  }, [projects]);

  // Filter projects when search or filter changes
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project: Project) => {
      // Apply technology filter
      const techMatch =
        techFilter === "All" || project.technologies.includes(techFilter);

      // Apply search term filter (case insensitive)
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = project.title.toLowerCase().includes(searchLower);
      const descMatch = project.description.toLowerCase().includes(searchLower);
      const techsMatch = project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchLower)
      );

      return techMatch && (titleMatch || descMatch || techsMatch);
    });
  }, [searchTerm, techFilter, projects]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle tech filter change
  const handleTechFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechFilter(e.target.value);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          mb={2}
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2rem", md: "2.5rem" },
            letterSpacing: "-0.01em",
          }}
        >
          My Projects
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: "600px", mx: "auto" }}
        >
          Explore my portfolio of web applications, tools, and creative solutions
        </Typography>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box
          sx={{
            mb: 6,
            p: 3,
            borderRadius: 2,
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)"
              : "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)",
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search projects by title, description, or technology..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.8)
                      : "white",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                variant="outlined"
                value={techFilter}
                onChange={handleTechFilterChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FilterListIcon sx={{ color: theme.palette.primary.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.mode === "dark"
                      ? alpha(theme.palette.background.paper, 0.8)
                      : "white",
                  },
                }}
              >
                <MenuItem value="All">All Technologies</MenuItem>
                {availableTechs.map((tech) => (
                  <MenuItem key={tech} value={tech}>
                    {tech}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Projects */}
      {isLoading ? (
        <LinearProgress />
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.length > 0 ? (
            <Grid container spacing={4}>
              {filteredProjects.map((project: Project) => (
                <Grid item xs={12} sm={6} md={4} key={project._id}>
                  <motion.div variants={itemVariants}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        position: "relative",
                        transition: "all 0.4s cubic-bezier(0.23, 1, 0.320, 1)",
                        "&:hover": {
                          transform: "translateY(-12px)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          height: 220,
                          overflow: "hidden",
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        }}
                      >
                        {project.images && project.images.length > 0 ? (
                          <CardMedia
                            component="img"
                            height="220"
                            image={project.images[0]}
                            alt={project.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              transition: "transform 0.4s ease",
                              "&:hover": {
                                transform: "scale(1.05)",
                              },
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: `linear-gradient(135deg, ${alpha(
                                theme.palette.primary.main,
                                0.15
                              )} 0%, ${alpha(theme.palette.secondary.main, 0.15)} 100%)`,
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              align="center"
                              sx={{ fontWeight: 500 }}
                            >
                              No images available
                            </Typography>
                          </Box>
                        )}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)`,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        />
                        {project.featured && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              zIndex: 10,
                            }}
                          >
                            <Chip
                              label="Featured"
                              size="small"
                              color="primary"
                              sx={{
                                fontWeight: 700,
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                              }}
                            />
                          </Box>
                        )}
                      </Box>

                      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          sx={{ fontWeight: 700 }}
                        >
                          {project.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                          sx={{
                            minHeight: "3em",
                            overflow: "hidden",
                            lineHeight: 1.5,
                            mb: 2,
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              project.description.length > 100
                                ? `${project.description.substring(0, 100)}...`
                                : project.description,
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.75,
                          }}
                        >
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Chip
                              key={`${project._id}-${tech}`}
                              label={tech}
                              size="small"
                              variant="filled"
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.15
                                ),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                cursor: "pointer",
                                height: 28,
                                "& .MuiChip-label": {
                                  padding: "0 8px",
                                  fontSize: "0.75rem",
                                },
                                transition: "all 0.2s ease",
                                "&:hover": {
                                  backgroundColor: alpha(
                                    theme.palette.primary.main,
                                    0.25
                                  ),
                                  transform: "scale(1.05)",
                                },
                              }}
                              onClick={() => setTechFilter(tech)}
                            />
                          ))}
                          {project.technologies.length > 4 && (
                            <Chip
                              label={`+${project.technologies.length - 4}`}
                              size="small"
                              sx={{
                                backgroundColor: alpha(
                                  theme.palette.secondary.main,
                                  0.1
                                ),
                                color: theme.palette.secondary.main,
                                fontWeight: 600,
                                height: 28,
                                "& .MuiChip-label": {
                                  padding: "0 8px",
                                  fontSize: "0.75rem",
                                },
                              }}
                            />
                          )}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/projects/${project._id}`)}
                          sx={{
                            fontWeight: 600,
                            "&:hover": {
                              backgroundColor: alpha(
                                theme.palette.primary.main,
                                0.1
                              ),
                            },
                          }}
                        >
                          Details →
                        </Button>
                        {project.demoLink && (
                          <Button
                            size="small"
                            color="secondary"
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontWeight: 600,
                              "&:hover": {
                                backgroundColor: alpha(
                                  theme.palette.secondary.main,
                                  0.1
                                ),
                              },
                            }}
                          >
                            Live
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button
                            size="small"
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              fontWeight: 600,
                              color: theme.palette.text.primary,
                              "&:hover": {
                                backgroundColor: alpha(
                                  theme.palette.action.active,
                                  0.1
                                ),
                              },
                            }}
                          >
                            Code
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                p: 6,
                background: theme.palette.mode === "dark"
                  ? `linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)`
                  : `linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)`,
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }} color="text.secondary">
                No projects found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Try adjusting your search or filters to find what you're looking for.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setSearchTerm("");
                  setTechFilter("All");
                }}
                sx={{
                  fontWeight: 600,
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </motion.div>
      )}
    </Container>
  );
};

export default Projects;
