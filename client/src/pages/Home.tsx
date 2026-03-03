import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Chip,
  Stack,
  LinearProgress,
  useTheme,
  alpha,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

// React Query hooks
import { useProjects, useSkills } from "../hooks/useQueries";

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

interface Skill {
  _id: string;
  name: string;
  icon?: string;
  proficiency: number;
  category: string;
}

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Use React Query for data fetching
  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();

  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();

  // Filter featured projects
  const featuredProjects = (projects as Project[])
    .filter((project: Project) => project.featured)
    .slice(0, 3); // Show only 3 featured projects

  // Get top skills
  const topSkills = (skills as Skill[])
    .sort((a: Skill, b: Skill) => b.proficiency - a.proficiency)
    .slice(0, 6); // Show only top 6 skills

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
    <>
      {/* Hero Section */}
      <Box
        sx={{
          pt: { xs: 8, md: 14 },
          pb: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                mb: 3,
                fontSize: { xs: "2.75rem", md: "4rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Full-Stack Developer
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Typography
                variant="h5"
                component="p"
                sx={{
                  mb: 6,
                  opacity: 0.95,
                  maxWidth: "700px",
                  mx: "auto",
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                  fontWeight: 300,
                  lineHeight: 1.6,
                }}
              >
                Building beautiful, high-performance web applications with modern technologies. Turning ideas into elegant digital solutions.
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={3}
                justifyContent="center"
                mb={4}
                sx={{
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate("/projects")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    py: 1.75,
                    px: 4,
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    boxShadow: "0 8px 24px rgba(168, 85, 247, 0.4)",
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(168, 85, 247, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  View My Projects
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate("/contact")}
                  sx={{
                    py: 1.75,
                    px: 4,
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    borderColor: "rgba(255, 255, 255, 0.6)",
                    borderWidth: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.9)",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Get In Touch
                </Button>
              </Stack>
            </motion.div>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              align="center"
              mb={2}
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                letterSpacing: "-0.01em",
              }}
            >
              Featured Projects
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: "600px", mx: "auto" }}
            >
              Showcase of my most impactful work and creative solutions
            </Typography>
          </motion.div>
          {isLoadingProjects ? (
            <LinearProgress sx={{ mt: 4 }} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Grid container spacing={4}>
                {featuredProjects.map((project: Project) => (
                  <Grid item xs={12} md={4} key={project._id}>
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
                          <CardMedia
                            component="img"
                            height="220"
                            image={
                              project.images[0] || "/placeholder-project.jpg"
                            }
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
                        </Box>
                        <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="h3"
                            sx={{ fontWeight: 700 }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 3,
                              minHeight: "2.8em",
                              lineHeight: 1.4,
                            }}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  project.description.length > 85
                                    ? `${project.description.substring(
                                        0,
                                        85
                                      )}...`
                                    : project.description,
                              }}
                            ></div>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.75,
                              mb: 2,
                            }}
                          >
                            {project.technologies
                              .slice(0, 3)
                              .map((tech: string) => (
                                <Chip
                                  key={tech}
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
                                    height: 28,
                                    "& .MuiChip-label": {
                                      padding: "0 8px",
                                      fontSize: "0.75rem",
                                    },
                                  }}
                                />
                              ))}
                            {project.technologies.length > 3 && (
                              <Chip
                                label={`+${project.technologies.length - 3}`}
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
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button
                            size="medium"
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
                            View Project →
                          </Button>
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/projects")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 3.5,
                fontSize: "1rem",
              }}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          background: theme.palette.mode === "dark"
            ? `linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)`
            : `linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              align="center"
              mb={2}
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                letterSpacing: "-0.01em",
              }}
            >
              My Skills
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: "600px", mx: "auto" }}
            >
              Expertise across modern technologies and frameworks
            </Typography>
          </motion.div>
          {isLoadingSkills ? (
            <LinearProgress sx={{ mt: 4 }} />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Grid container spacing={3}>
                {topSkills.map((skill: Skill) => (
                  <Grid item xs={12} sm={6} md={4} key={skill._id}>
                    <motion.div variants={itemVariants}>
                      <Card
                        sx={{
                          p: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          {skill.icon && (
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              style={{
                                width: 48,
                                height: 48,
                                objectFit: "contain",
                                marginRight: 16,
                              }}
                            />
                          )}
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              {skill.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                                textTransform: "uppercase",
                              }}
                            >
                              {skill.proficiency === 1 && "Beginner"}
                              {skill.proficiency === 2 && "Intermediate"}
                              {skill.proficiency === 3 && "Advanced"}
                              {skill.proficiency === 4 && "Professional"}
                              {skill.proficiency === 5 && "Master"}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              Proficiency
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                            >
                              {(skill.proficiency * 20).toFixed(0)}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.proficiency * 20}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              "& .MuiLinearProgress-bar": {
                                borderRadius: 4,
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                              },
                            }}
                          />
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate("/about")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 3.5,
                fontSize: "1rem",
              }}
            >
              View Full Experience
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
