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
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          mb={6}
        >
          My Projects
        </Typography>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
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
                    <FilterListIcon />
                  </InputAdornment>
                ),
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
                        transition: "all 0.3s ease-in-out",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: 8,
                        },
                        overflow: "hidden",
                      }}
                    >
                      {project.images && project.images.length > 0 ? (
                        <CardMedia
                          component="img"
                          height="200"
                          image={project.images[0]}
                          alt={project.title}
                          sx={{
                            objectFit: "contain",
                          }}
                          style={{
                            marginBottom: "8px",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: "200px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "grey.200",
                          }}
                          style={{
                            marginBottom: "8px",
                          }}
                        >
                          <Typography variant="h6" color="text.secondary">
                            No images available
                          </Typography>
                        </Box>
                      )}

                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {project.title}
                          </Typography>
                          {project.featured && (
                            <Chip
                              label="Featured"
                              size="small"
                              color="primary"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="div"
                          sx={{ minHeight: "80px", overflow: "hidden" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              project.description.length > 120
                                ? `${project.description.substring(0, 120)}...`
                                : project.description,
                          }}
                        />
                        <Box
                          sx={{
                            mt: 2,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 0.5,
                          }}
                        >
                          {project.technologies.map((tech) => (
                            <Chip
                              key={`${project._id}-${tech}`}
                              label={tech}
                              size="small"
                              variant="outlined"
                              sx={{ mr: 0.5, mb: 0.5 }}
                              onClick={() => setTechFilter(tech)}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => navigate(`/projects/${project._id}`)}
                        >
                          View Details
                        </Button>
                        {project.demoLink && (
                          <Button
                            size="small"
                            color="secondary"
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </Button>
                        )}
                        {project.githubLink && (
                          <Button
                            size="small"
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub
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
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No projects found matching your criteria.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  setSearchTerm("");
                  setTechFilter("All");
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
