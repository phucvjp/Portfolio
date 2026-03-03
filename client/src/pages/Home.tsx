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
  Chip,
  Stack,
  LinearProgress,
  useTheme,
  alpha,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import { useProjects, useSkills } from "../hooks/useQueries";

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

const FloatingShape: React.FC<{
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  gradient: string;
}> = ({ size, top, left, delay, duration, gradient }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: "easeOut" }}
    style={{
      position: "absolute",
      top,
      left,
      width: size,
      height: size,
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      background: gradient,
      filter: "blur(40px)",
      pointerEvents: "none",
    }}
  >
    <motion.div
      animate={{
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -10, 5, 0],
        rotate: [0, 5, -5, 3, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ width: "100%", height: "100%" }}
    />
  </motion.div>
);

const Home: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDark = theme.palette.mode === "dark";

  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();
  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();

  const featuredProjects = (projects as Project[])
    .filter((p) => p.featured)
    .slice(0, 3);

  const topSkills = (skills as Skill[])
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 8);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const proficiencyLabel = (level: number) => {
    const labels: Record<number, string> = {
      1: "Beginner",
      2: "Intermediate",
      3: "Advanced",
      4: "Professional",
      5: "Master",
    };
    return labels[level] || "";
  };

  const proficiencyColor = (level: number) => {
    const colors: Record<number, string> = {
      1: "#94a3b8",
      2: "#38bdf8",
      3: "#6366f1",
      4: "#a855f7",
      5: "#f59e0b",
    };
    return colors[level] || theme.palette.primary.main;
  };

  return (
    <>
      {/* ---- HERO ---- */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "85vh", md: "90vh" },
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          pt: { xs: 4, md: 0 },
          pb: { xs: 8, md: 0 },
        }}
      >
        {/* Animated background shapes */}
        <FloatingShape
          size={400}
          top="-10%"
          left="-5%"
          delay={0}
          duration={20}
          gradient={`linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.1)})`}
        />
        <FloatingShape
          size={300}
          top="50%"
          left="70%"
          delay={0.3}
          duration={25}
          gradient={`linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.08)})`}
        />
        <FloatingShape
          size={200}
          top="20%"
          left="50%"
          delay={0.6}
          duration={18}
          gradient={`linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.06)})`}
        />

        {/* Grid pattern overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(${alpha(
              theme.palette.primary.main,
              isDark ? 0.08 : 0.04,
            )} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Chip
                  label="Available for opportunities"
                  size="small"
                  sx={{
                    mb: 3,
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    fontWeight: 500,
                    "& .MuiChip-label": { px: 2 },
                  }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.2rem" },
                    lineHeight: 1.1,
                    mb: 3,
                    color: theme.palette.text.primary,
                  }}
                >
                  Building digital
                  <br />
                  experiences that{" "}
                  <Box
                    component="span"
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    inspire
                  </Box>
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 5,
                    color: theme.palette.text.secondary,
                    fontWeight: 400,
                    maxWidth: 560,
                    lineHeight: 1.7,
                    fontSize: { xs: "1rem", md: "1.15rem" },
                  }}
                >
                  Full-Stack Developer crafting elegant, high-performance web
                  applications with modern technologies and clean code.
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/projects")}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ py: 1.5, px: 4, fontSize: "1rem" }}
                  >
                    View Projects
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/contact")}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: "1rem",
                    }}
                  >
                    Get in Touch
                  </Button>
                </Stack>
              </motion.div>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              >
                <Box
                  sx={{
                    width: 280,
                    height: 280,
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    animation: "float 6s ease-in-out infinite",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "6rem",
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 800,
                    }}
                  >
                    {"</>"}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ---- FEATURED PROJECTS ---- */}
      <Box sx={{ py: { xs: 8, md: 12 }, position: "relative" }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              <Typography variant="h3" sx={{ mb: 2 }}>
                Featured Projects
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500, mx: "auto" }}
              >
                A selection of my recent work, showcasing creativity and
                technical expertise.
              </Typography>
            </Box>
          </motion.div>

          {isLoadingProjects ? (
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Grid container spacing={4}>
                {featuredProjects.map((project) => (
                  <Grid item xs={12} md={4} key={project._id}>
                    <motion.div variants={itemVariants}>
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
                              isDark ? 0.15 : 0.1,
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
                          <CardMedia
                            className="project-image"
                            component="img"
                            height="220"
                            image={
                              project.images[0] || "/placeholder-project.jpg"
                            }
                            alt={project.title}
                            sx={{
                              transition: "transform 0.4s ease",
                              objectFit: "cover",
                            }}
                          />
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
                                  width: 36,
                                  height: 36,
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
                                <OpenInNewIcon sx={{ fontSize: 18 }} />
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
                                  width: 36,
                                  height: 36,
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
                                <GitHubIcon sx={{ fontSize: 18 }} />
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
                            sx={{
                              mb: 2,
                              lineHeight: 1.6,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            <span
                              dangerouslySetInnerHTML={{
                                __html:
                                  project.description.length > 100
                                    ? `${project.description.substring(
                                        0,
                                        100,
                                      )}...`
                                    : project.description,
                              }}
                            />
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 0.75,
                            }}
                          >
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Chip
                                key={tech}
                                label={tech}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                            {project.technologies.length > 3 && (
                              <Chip
                                label={`+${project.technologies.length - 3}`}
                                size="small"
                                sx={{
                                  background: alpha(
                                    theme.palette.primary.main,
                                    0.1,
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
            </motion.div>
          )}

          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/projects")}
              endIcon={<ArrowForwardIcon />}
            >
              View All Projects
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ---- SKILLS ---- */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          position: "relative",
          background: isDark
            ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.04)} 0%, transparent 100%)`
            : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, transparent 100%)`,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: "center", mb: 8 }}>
              <Chip
                label="Expertise"
                size="small"
                sx={{
                  mb: 2,
                  background: alpha(theme.palette.secondary.main, 0.1),
                  color: theme.palette.secondary.main,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                  fontWeight: 500,
                }}
              />
              <Typography variant="h3" sx={{ mb: 2 }}>
                Skills & Technologies
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500, mx: "auto" }}
              >
                The tools and technologies I use to bring products to life.
              </Typography>
            </Box>
          </motion.div>

          {isLoadingSkills ? (
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Grid container spacing={3}>
                {topSkills.map((skill) => (
                  <Grid item xs={6} sm={4} md={3} key={skill._id}>
                    <motion.div variants={itemVariants}>
                      <Card
                        sx={{
                          p: 3,
                          textAlign: "center",
                          "&:hover": {
                            transform: "translateY(-6px)",
                            boxShadow: `0 12px 24px ${alpha(
                              proficiencyColor(skill.proficiency),
                              0.15,
                            )}`,
                            borderColor: alpha(
                              proficiencyColor(skill.proficiency),
                              0.3,
                            ),
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: "14px",
                            background: alpha(
                              proficiencyColor(skill.proficiency),
                              0.1,
                            ),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: "auto",
                            mb: 2,
                          }}
                        >
                          {skill.icon ? (
                            <img
                              src={skill.icon}
                              alt={skill.name}
                              style={{
                                width: 32,
                                height: 32,
                                objectFit: "contain",
                              }}
                            />
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "1.4rem",
                                fontWeight: 700,
                                color: proficiencyColor(skill.proficiency),
                              }}
                            >
                              {skill.name.charAt(0)}
                            </Typography>
                          )}
                        </Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {skill.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: proficiencyColor(skill.proficiency),
                            fontWeight: 600,
                            display: "inline-block",
                            px: 1.5,
                            py: 0.25,
                            borderRadius: 1,
                            background: alpha(
                              proficiencyColor(skill.proficiency),
                              0.08,
                            ),
                          }}
                        >
                          {proficiencyLabel(skill.proficiency)}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}

          <Box sx={{ textAlign: "center", mt: 8 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/about")}
              endIcon={<ArrowForwardIcon />}
            >
              More About Me
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ---- CTA ---- */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                textAlign: "center",
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.main,
                  isDark ? 0.12 : 0.06,
                )}, ${alpha(
                  theme.palette.secondary.main,
                  isDark ? 0.08 : 0.04,
                )})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -60,
                  right: -60,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${alpha(
                    theme.palette.primary.main,
                    0.1,
                  )}, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <Typography variant="h4" sx={{ mb: 2 }}>
                Let's Work Together
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: 450, mx: "auto", lineHeight: 1.7 }}
              >
                Have a project in mind? I'd love to hear about it. Let's
                collaborate and create something amazing.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/contact")}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ py: 1.5, px: 4 }}
                >
                  Start a Conversation
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/resume")}
                  sx={{ py: 1.5, px: 4 }}
                >
                  View Resume
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Home;
