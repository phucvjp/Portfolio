import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Box,
  TextField,
  InputAdornment,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "../hooks/useQueries";

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

const COLLAPSED_CHIP_COUNT = 8;

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [techFilter, setTechFilter] = useState("All");
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const { data: projects = [], isLoading } = useProjects();

  const allTechs = React.useMemo(() => {
    const techs = new Set<string>();
    projects.forEach((p: Project) =>
      p.technologies.forEach((t) => techs.add(t))
    );
    return shuffleArray(Array.from(techs));
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter((project: Project) => {
      const techMatch =
        techFilter === "All" || project.technologies.includes(techFilter);
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = project.title.toLowerCase().includes(searchLower);
      const descMatch = project.description.toLowerCase().includes(searchLower);
      const techsMatch = project.technologies.some((t) =>
        t.toLowerCase().includes(searchLower)
      );
      return techMatch && (titleMatch || descMatch || techsMatch);
    });
  }, [searchTerm, techFilter, projects]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="Portfolio"
            size="small"
            sx={{
              mb: 2,
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              fontWeight: 500,
            }}
          />
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            My Projects
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, mx: "auto" }}
          >
            Explore my work spanning web applications, APIs, and more.
          </Typography>
        </Box>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              border: `1px solid ${alpha(
                isDark ? "#fff" : "#000",
                0.08
              )}`,
              background: isDark
                ? alpha("#1e1e3f", 0.4)
                : alpha("#f8fafc", 0.6),
            }}
          >
            {/* Filter header with toggle */}
            <Box
              onClick={() => setFiltersExpanded((prev) => !prev)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                userSelect: "none",
                mb: filtersExpanded || allTechs.length <= COLLAPSED_CHIP_COUNT ? 0 : 0,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <FilterListIcon
                  sx={{
                    fontSize: 20,
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, color: theme.palette.text.secondary }}
                >
                  Filter by Technology
                </Typography>
                {techFilter !== "All" && (
                  <Chip
                    label={techFilter}
                    size="small"
                    onDelete={() => setTechFilter("All")}
                    sx={{
                      height: 24,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: "#fff",
                      "& .MuiChip-deleteIcon": {
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 16,
                        "&:hover": { color: "#fff" },
                      },
                    }}
                  />
                )}
              </Box>
              {allTechs.length > COLLAPSED_CHIP_COUNT && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: theme.palette.text.secondary,
                    fontSize: "0.8rem",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 500 }}>
                    {filtersExpanded
                      ? "Show less"
                      : `+${allTechs.length - COLLAPSED_CHIP_COUNT} more`}
                  </Typography>
                  {filtersExpanded ? (
                    <ExpandLessIcon sx={{ fontSize: 18 }} />
                  ) : (
                    <ExpandMoreIcon sx={{ fontSize: 18 }} />
                  )}
                </Box>
              )}
            </Box>

            {/* Chips */}
            <AnimatePresence initial={false}>
              <motion.div
                key={filtersExpanded ? "expanded" : "collapsed"}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.75,
                    pt: 1.5,
                  }}
                >
                  <Chip
                    label="All"
                    onClick={() => setTechFilter("All")}
                    variant={techFilter === "All" ? "filled" : "outlined"}
                    size="small"
                    sx={{
                      ...(techFilter === "All" && {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        color: "#fff",
                        "&:hover": {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                      }),
                    }}
                  />
                  {(filtersExpanded
                    ? allTechs
                    : allTechs.slice(0, COLLAPSED_CHIP_COUNT)
                  ).map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      onClick={() => setTechFilter(tech)}
                      variant={techFilter === tech ? "filled" : "outlined"}
                      size="small"
                      sx={{
                        ...(techFilter === tech && {
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          color: "#fff",
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                          },
                        }),
                      }}
                    />
                  ))}
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </motion.div>

      {/* Projects Grid */}
      {isLoading ? (
        <LinearProgress
          sx={{
            borderRadius: 2,
            background: alpha(theme.palette.primary.main, 0.1),
            "& .MuiLinearProgress-bar": {
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={techFilter + searchTerm}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.length > 0 ? (
              <Grid container spacing={4}>
                {filteredProjects.map((project: Project) => (
                  <Grid item xs={12} sm={6} md={4} key={project._id}>
                    <motion.div variants={itemVariants} layout>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: `0 20px 40px ${alpha(
                              theme.palette.primary.main,
                              isDark ? 0.15 : 0.1
                            )}`,
                            "& .project-image": {
                              transform: "scale(1.05)",
                            },
                          },
                          overflow: "hidden",
                        }}
                        onClick={() => navigate(`/projects/${project._id}`)}
                      >
                        <Box sx={{ overflow: "hidden", position: "relative" }}>
                          {project.images && project.images.length > 0 ? (
                            <CardMedia
                              className="project-image"
                              component="img"
                              height="220"
                              image={project.images[0]}
                              alt={project.title}
                              sx={{
                                transition: "transform 0.4s ease",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                height: 220,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `linear-gradient(135deg, ${alpha(
                                  theme.palette.primary.main,
                                  0.08
                                )}, ${alpha(
                                  theme.palette.secondary.main,
                                  0.08
                                )})`,
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                No preview
                              </Typography>
                            </Box>
                          )}

                          {/* Featured badge */}
                          {project.featured && (
                            <Chip
                              label="Featured"
                              size="small"
                              sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "0.7rem",
                              }}
                            />
                          )}

                          {/* Action icons */}
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              right: 12,
                              display: "flex",
                              gap: 1,
                            }}
                          >
                            {project.demoLink && (
                              <Box
                                component="a"
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e: React.MouseEvent) =>
                                  e.stopPropagation()
                                }
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  background: alpha("#000", 0.5),
                                  backdropFilter: "blur(10px)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#fff",
                                  transition: "all 0.2s",
                                  "&:hover": {
                                    background: theme.palette.primary.main,
                                  },
                                }}
                              >
                                <OpenInNewIcon sx={{ fontSize: 16 }} />
                              </Box>
                            )}
                            {project.githubLink && (
                              <Box
                                component="a"
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e: React.MouseEvent) =>
                                  e.stopPropagation()
                                }
                                sx={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: "50%",
                                  background: alpha("#000", 0.5),
                                  backdropFilter: "blur(10px)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#fff",
                                  transition: "all 0.2s",
                                  "&:hover": {
                                    background: theme.palette.primary.main,
                                  },
                                }}
                              >
                                <GitHubIcon sx={{ fontSize: 16 }} />
                              </Box>
                            )}
                          </Box>
                        </Box>

                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography
                            variant="h6"
                            sx={{ mb: 1, fontWeight: 600 }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="div"
                            sx={{
                              mb: 2,
                              lineHeight: 1.6,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                            dangerouslySetInnerHTML={{
                              __html:
                                project.description.length > 120
                                  ? `${project.description.substring(0, 120)}...`
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
                                variant="outlined"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTechFilter(tech);
                                }}
                              />
                            ))}
                            {project.technologies.length > 4 && (
                              <Chip
                                label={`+${project.technologies.length - 4}`}
                                size="small"
                                sx={{
                                  background: alpha(
                                    theme.palette.primary.main,
                                    0.1
                                  ),
                                  color: theme.palette.primary.main,
                                }}
                              />
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  textAlign: "center",
                  p: 8,
                  borderRadius: 3,
                  background: alpha(theme.palette.primary.main, 0.03),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  No projects found
                </Typography>
                <Button
                  variant="outlined"
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
        </AnimatePresence>
      )}
    </Container>
  );
};

export default Projects;
