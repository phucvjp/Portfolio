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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Use React Query for data fetching
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    error: projectsError,
  } = useProjects();

  const {
    data: skills = [],
    isLoading: isLoadingSkills,
    error: skillsError,
  } = useSkills();

  // Filter featured projects
  const featuredProjects = (projects as Project[])
    .filter((project: Project) => project.featured)
    .slice(0, 3); // Show only 3 featured projects

  // Get top skills
  const topSkills = (skills as Skill[]).slice(0, 6); // Show only top 6 skills

  // Loading state
  const isLoading = isLoadingProjects || isLoadingSkills;

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
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 10 },
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{ mb: 3, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
            >
              Full-Stack Developer
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                mb: 5,
                opacity: 0.8,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              I create elegant, high-performance web applications with modern
              technologies.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              mb={4}
            >
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate("/projects")}
                endIcon={<ArrowForwardIcon />}
                sx={{ py: 1.5, px: 3 }}
              >
                View Projects
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate("/contact")}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.8)",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Contact Me
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Featured Projects Section */}
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            align="center"
            mb={6}
          >
            Featured Projects
          </Typography>
          {isLoadingProjects ? (
            <LinearProgress />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
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
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: 8,
                          },
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={
                            project.images[0] || "/placeholder-project.jpg"
                          }
                          alt={project.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="h3">
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  project.description.length > 100
                                    ? `${project.description.substring(
                                        0,
                                        100
                                      )}...`
                                    : project.description,
                              }}
                            ></div>
                          </Typography>
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.5,
                            }}
                          >
                            {project.technologies
                              .slice(0, 3)
                              .map((tech: string) => (
                                <Chip
                                  key={tech}
                                  label={tech}
                                  size="small"
                                  variant="outlined"
                                  sx={{ mr: 0.5, mb: 0.5 }}
                                />
                              ))}
                            {project.technologies.length > 3 && (
                              <Chip
                                label={`+${project.technologies.length - 3}`}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            )}
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
                        </CardActions>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/projects")}
              endIcon={<ArrowForwardIcon />}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Skills Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.primary.main, 0.1)
              : alpha(theme.palette.primary.light, 0.1),
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            gutterBottom
            align="center"
            mb={6}
          >
            My Skills
          </Typography>
          {isLoadingSkills ? (
            <LinearProgress />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Grid container spacing={3}>
                {topSkills.map((skill: Skill) => (
                  <Grid item xs={12} sm={6} md={4} key={skill._id}>
                    <motion.div variants={itemVariants}>
                      <Card sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          {skill.name}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ width: "100%", mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={skill.proficiency * 20}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: alpha(
                                  theme.palette.primary.main,
                                  0.2
                                ),
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 5,
                                },
                              }}
                            />
                          </Box>
                          <Box minWidth={35}>
                            <Typography variant="body2" color="text.secondary">
                              {skill.proficiency}/5
                            </Typography>
                          </Box>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate("/about")}
              endIcon={<ArrowForwardIcon />}
            >
              More About Me
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
