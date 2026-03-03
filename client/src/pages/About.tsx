import React from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  LinearProgress,
  Paper,
  Chip,
  useTheme,
  alpha,
  Link,
} from "@mui/material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from "@mui/lab";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";

import {
  useUserProfile,
  useSkills,
  useExperiences,
  useEducations,
  useHonors,
} from "../hooks/useQueries";

interface Skill {
  _id: string;
  name: string;
  icon?: string;
  proficiency: number;
  category: string;
}

interface Honor {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

const About: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();
  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();
  const { data: experiences = [], isLoading: isLoadingExperiences } =
    useExperiences();
  const { data: education = [], isLoading: isLoadingEducation } =
    useEducations();
  const { data: honors = [], isLoading: isLoadingHonors } = useHonors();

  const isLoading =
    isLoadingProfile ||
    isLoadingSkills ||
    isLoadingExperiences ||
    isLoadingEducation ||
    isLoadingHonors;

  const skillsByCategory = (skills as Skill[]).reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const formatDate = (dateString?: string | null, current?: boolean) => {
    if (current) return "Present";
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const sectionHeader = (label: string, title: string) => (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Chip
        label={label}
        size="small"
        sx={{
          mb: 2,
          background: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          fontWeight: 500,
        }}
      />
      <Typography variant="h4">{title}</Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      {/* About Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={6} sx={{ mb: 10 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center", position: "sticky", top: 100 }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: -6,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    opacity: 0.2,
                    animation: "pulse-glow 3s ease-in-out infinite",
                  }}
                />
                <Avatar
                  alt={userProfile?.name || "Profile"}
                  src={userProfile?.profileImage || "/placeholder-avatar.jpg"}
                  sx={{
                    width: { xs: 180, md: 220 },
                    height: { xs: 180, md: 220 },
                    border: `3px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    position: "relative",
                  }}
                />
              </Box>
              <Typography variant="h4" gutterBottom>
                {userProfile?.name || "Loading..."}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Full Stack Developer
              </Typography>

              {userProfile?.socialLinks && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 1.5,
                    mt: 2,
                  }}
                >
                  {userProfile.socialLinks.linkedin && (
                    <Link
                      href={userProfile.socialLinks.linkedin}
                      target="_blank"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        border: `1px solid ${alpha(
                          isDark ? "#fff" : "#000",
                          0.1
                        )}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme.palette.text.secondary,
                        transition: "all 0.2s",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          borderColor: alpha(theme.palette.primary.main, 0.4),
                          background: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      <LinkedInIcon fontSize="small" />
                    </Link>
                  )}
                  {userProfile.socialLinks.github && (
                    <Link
                      href={userProfile.socialLinks.github}
                      target="_blank"
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        border: `1px solid ${alpha(
                          isDark ? "#fff" : "#000",
                          0.1
                        )}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: theme.palette.text.secondary,
                        transition: "all 0.2s",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          borderColor: alpha(theme.palette.primary.main, 0.4),
                          background: alpha(theme.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      <GitHubIcon fontSize="small" />
                    </Link>
                  )}
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Chip
              label="About"
              size="small"
              sx={{
                mb: 2,
                background: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                fontWeight: 500,
              }}
            />
            <Typography variant="h4" sx={{ mb: 3 }}>
              About Me
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8, mb: 4 }}
            >
              {userProfile?.bio || "Loading..."}
            </Typography>

            <Grid container spacing={2}>
              {[
                {
                  icon: <EmailIcon />,
                  title: "Email",
                  value: userProfile?.email,
                },
                {
                  icon: <PhoneIcon />,
                  title: "Phone",
                  value: userProfile?.contact?.phone,
                },
                {
                  icon: <LocationOnIcon />,
                  title: "Address",
                  value: userProfile?.contact?.address,
                },
              ]
                .filter((item) => item.value)
                .map((item, idx) => (
                  <Grid item xs={12} sm={6} key={idx}>
                    <Card
                      elevation={0}
                      sx={{
                        p: 0,
                        "&:hover": {
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                        },
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: "10px",
                            background: alpha(theme.palette.primary.main, 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: theme.palette.primary.main,
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block" }}
                          >
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {item.value}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </motion.div>

      {/* Skills Section */}
      <Box sx={{ mb: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {sectionHeader("Expertise", "Technical Skills")}
        </motion.div>

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Grid container spacing={4}>
              {Object.entries(skillsByCategory)
                .sort(([, a], [, b]) => b.length - a.length)
                .map(([category, categorySkills]) => (
                  <Grid item xs={12} md={4} key={category}>
                    <motion.div variants={itemVariants}>
                      <Card sx={{ p: 3, height: "100%" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 3,
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "10px",
                              background: alpha(
                                theme.palette.primary.main,
                                0.1
                              ),
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CodeIcon
                              sx={{
                                color: theme.palette.primary.main,
                                fontSize: 20,
                              }}
                            />
                          </Box>
                          <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                            {category}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {categorySkills.map((skill) => (
                            <Box
                              key={skill._id}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                pb: 1.5,
                                borderBottom: `1px solid ${alpha(
                                  isDark ? "#fff" : "#000",
                                  0.06
                                )}`,
                                "&:last-child": { borderBottom: "none", pb: 0 },
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                {skill.icon ? (
                                  <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    style={{
                                      width: 22,
                                      height: 22,
                                      objectFit: "contain",
                                    }}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "6px",
                                      background: alpha(
                                        proficiencyColor(skill.proficiency),
                                        0.15
                                      ),
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "0.65rem",
                                        fontWeight: 700,
                                        color: proficiencyColor(
                                          skill.proficiency
                                        ),
                                      }}
                                    >
                                      {skill.name.charAt(0)}
                                    </Typography>
                                  </Box>
                                )}
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 500 }}
                                >
                                  {skill.name}
                                </Typography>
                              </Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 600,
                                  color: proficiencyColor(skill.proficiency),
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 1,
                                  background: alpha(
                                    proficiencyColor(skill.proficiency),
                                    0.08
                                  ),
                                }}
                              >
                                {proficiencyLabel(skill.proficiency)}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
            </Grid>
          </motion.div>
        )}
      </Box>

      {/* Honors Section */}
      {honors && honors.length > 0 && (
        <Box sx={{ mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {sectionHeader("Recognition", "Honors & Awards")}
          </motion.div>

          {isLoading ? (
            <LinearProgress />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Grid container spacing={3}>
                {honors.map((honor: Honor) => (
                  <Grid item xs={12} md={6} key={honor._id}>
                    <motion.div variants={itemVariants}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: `0 12px 24px ${alpha(
                              theme.palette.primary.main,
                              isDark ? 0.12 : 0.08
                            )}`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "12px",
                                background: `linear-gradient(135deg, ${alpha(
                                  theme.palette.primary.main,
                                  0.15
                                )}, ${alpha(
                                  theme.palette.secondary.main,
                                  0.15
                                )})`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <EmojiEventsIcon
                                sx={{
                                  color: theme.palette.primary.main,
                                  fontSize: 22,
                                }}
                              />
                            </Box>
                            <Box>
                              <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                                {honor.title}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {honor.issuer} &middot; {honor.date}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ lineHeight: 1.6 }}
                          >
                            {honor.description}
                          </Typography>
                          {honor.url && (
                            <Link
                              href={honor.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                display: "inline-block",
                                mt: 1.5,
                                fontWeight: 500,
                                fontSize: "0.85rem",
                              }}
                            >
                              View Certificate
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </Box>
      )}

      {/* Experience & Education Section */}
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {sectionHeader("Journey", "Experience & Education")}
        </motion.div>

        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <WorkIcon
                      sx={{
                        color: theme.palette.primary.main,
                        fontSize: 20,
                      }}
                    />
                  </Box>
                  <Typography variant="h5">Work Experience</Typography>
                </Box>

                <Timeline position="right">
                  {experiences.map((exp: any) => (
                    <TimelineItem key={exp._id}>
                      <TimelineOppositeContent className="timeline-opposite-content">
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(exp.startDate)} -{" "}
                          {formatDate(exp.endDate, exp.current)}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          <WorkIcon sx={{ fontSize: 16 }} />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div variants={itemVariants}>
                          <Card sx={{ p: 2.5, mb: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                              {exp.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.primary.main,
                                fontWeight: 500,
                              }}
                            >
                              {exp.organization}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: { xs: "block", sm: "none" },
                                mt: 0.5,
                              }}
                            >
                              {formatDate(exp.startDate)} -{" "}
                              {formatDate(exp.endDate, exp.current)}
                            </Typography>
                            {exp.location && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {exp.location}
                              </Typography>
                            )}
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1, lineHeight: 1.6 }}
                            >
                              {exp.description}
                            </Typography>
                          </Card>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: alpha(theme.palette.secondary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SchoolIcon
                      sx={{
                        color: theme.palette.secondary.main,
                        fontSize: 20,
                      }}
                    />
                  </Box>
                  <Typography variant="h5">Education</Typography>
                </Box>

                <Timeline position="right">
                  {education.map((edu: any) => (
                    <TimelineItem key={edu._id}>
                      <TimelineOppositeContent className="timeline-opposite-content">
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(edu.startDate)} -{" "}
                          {formatDate(edu.endDate, edu.current)}
                        </Typography>
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot color="secondary">
                          <SchoolIcon sx={{ fontSize: 16 }} />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div variants={itemVariants}>
                          <Card sx={{ p: 2.5, mb: 2 }}>
                            <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                              {edu.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.secondary.main,
                                fontWeight: 500,
                              }}
                            >
                              {edu.institution}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: { xs: "block", sm: "none" },
                                mt: 0.5,
                              }}
                            >
                              {formatDate(edu.startDate)} -{" "}
                              {formatDate(edu.endDate, edu.current)}
                            </Typography>
                            {edu.location && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {edu.location}
                              </Typography>
                            )}
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1, lineHeight: 1.6 }}
                            >
                              {edu.description}
                            </Typography>
                          </Card>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </motion.div>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default About;
