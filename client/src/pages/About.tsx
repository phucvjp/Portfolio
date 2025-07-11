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

// React Query hooks
import {
  useUserProfile,
  useSkills,
  useExperiences,
  useEducations,
  useHonors,
} from "../hooks/useQueries";

// Types
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

  // Use React Query for data fetching
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();

  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();

  const { data: experiences = [], isLoading: isLoadingExperiences } =
    useExperiences();

  const { data: education = [], isLoading: isLoadingEducation } =
    useEducations();

  const { data: honors = [], isLoading: isLoadingHonors } = useHonors();

  // Overall loading state
  const isLoading =
    isLoadingProfile ||
    isLoadingSkills ||
    isLoadingExperiences ||
    isLoadingEducation ||
    isLoadingHonors;

  // Group skills by category
  const skillsByCategory = (skills as Skill[]).reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Format date
  const formatDate = (dateString?: string | null, current?: boolean) => {
    if (current) return "Present";
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
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
      {/* About Me Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: "center" }}>
              <Avatar
                alt={userProfile?.name || "Profile"}
                src={userProfile?.profileImage || "/placeholder-avatar.jpg"}
                sx={{
                  width: { xs: 200, md: 250 },
                  height: { xs: 200, md: 250 },
                  mx: "auto",
                  mb: 3,
                  boxShadow: 4,
                  border: `4px solid ${theme.palette.primary.main}`,
                }}
              />
              <Typography variant="h4" component="h1" gutterBottom>
                {userProfile?.name || "Loading..."}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                Full Stack Developer
              </Typography>

              {userProfile?.socialLinks && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                  }}
                >
                  {userProfile.socialLinks.linkedin && (
                    <Link
                      href={userProfile.socialLinks.linkedin}
                      target="_blank"
                      color="inherit"
                    >
                      <LinkedInIcon fontSize="large" />
                    </Link>
                  )}
                  {userProfile.socialLinks.github && (
                    <Link
                      href={userProfile.socialLinks.github}
                      target="_blank"
                      color="inherit"
                    >
                      <GitHubIcon fontSize="large" />
                    </Link>
                  )}
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h2" gutterBottom>
              About Me
            </Typography>
            <Typography variant="body1" paragraph>
              {userProfile?.bio || "Loading..."}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card
                    elevation={0}
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <EmailIcon sx={{ mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Email
                        </Typography>
                        <Typography variant="body2">
                          {userProfile?.email || "Loading..."}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                {userProfile?.contact?.phone && (
                  <Grid item xs={12} sm={6}>
                    <Card
                      elevation={0}
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <PhoneIcon sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Phone
                          </Typography>
                          <Typography variant="body2">
                            {userProfile.contact.phone}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
                {userProfile?.contact?.address && (
                  <Grid item xs={12}>
                    <Card
                      elevation={0}
                      sx={{
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }}
                    >
                      <CardContent
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <LocationOnIcon sx={{ mr: 1 }} />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Address
                          </Typography>
                          <Typography variant="body2">
                            {userProfile.contact.address}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </motion.div>

      <Divider sx={{ my: 6 }} />

      {/* Skills Section */}
      <Box sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Technical Skills
          </Typography>
        </motion.div>

        {isLoading ? (
          <LinearProgress />
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={4}>
              {Object.entries(skillsByCategory)
                .sort(([, a], [, b]) => b.length - a.length) // Sort by the length of skill arrays
                .map(([category, categorySkills]) => (
                  <Grid item xs={12} md={4} key={category}>
                    <motion.div variants={itemVariants}>
                      <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 3 }}
                        >
                          <CodeIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6">{category}</Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                          }}
                        >
                          {categorySkills.map((skill) => (
                            <React.Fragment key={skill._id}>
                              <Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    mb: 0.5,
                                  }}
                                >
                                  <Avatar
                                    variant="rounded"
                                    sx={{
                                      width: 24,
                                      height: 24,
                                      backgroundColor: alpha(
                                        theme.palette.primary.main,
                                        0.1
                                      ),
                                      color: theme.palette.primary.main,
                                      mr: 1,
                                    }}
                                    src={skill.icon}
                                  >
                                    {skill.icon ? null : skill.name.charAt(0)}
                                  </Avatar>
                                  <Typography variant="body2">
                                    {skill.name}
                                  </Typography>
                                  {skill?.proficiency && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{
                                        fontWeight: "medium",
                                        display: "inline-block",
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 1,
                                        backgroundColor: alpha(
                                          theme.palette.primary.main,
                                          0.1
                                        ),
                                      }}
                                    >
                                      {skill.proficiency === 1 && "Beginner"}
                                      {skill.proficiency === 2 &&
                                        "Intermediate"}
                                      {skill.proficiency === 3 && "Advanced"}
                                      {skill.proficiency === 4 &&
                                        "Professional"}
                                      {skill.proficiency === 5 && "Master"}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                              <Divider />
                            </React.Fragment>
                          ))}
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
            </Grid>
          </motion.div>
        )}
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Honors Section */}
      {honors && honors.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              align="center"
              sx={{ mb: 6 }}
            >
              Honors & Awards
            </Typography>
          </motion.div>

          {isLoading ? (
            <LinearProgress />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={3}>
                {honors.map((honor: Honor) => (
                  <Grid item xs={12} md={6} key={honor._id}>
                    <motion.div variants={itemVariants}>
                      <Card
                        elevation={2}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s ease-in-out",
                          "&:hover": {
                            transform: "translateY(-5px)",
                            boxShadow: 6,
                          },
                        }}
                      >
                        <CardContent>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: theme.palette.primary.main,
                                mr: 2,
                              }}
                            >
                              <EmojiEventsIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" component="h3">
                                {honor.title}
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                {honor.issuer} • {honor.date}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2" paragraph>
                            {honor.description}
                          </Typography>
                          {honor.url && (
                            <Link
                              href={honor.url}
                              target="_blank"
                              rel="noopener noreferrer"
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

      <Divider sx={{ my: 6 }} />

      {/* Experience and Education Section */}
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            align="center"
            sx={{ mb: 6 }}
          >
            Experience & Education
          </Typography>
        </motion.div>

        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={6}>
            {/* Experience */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  Work Experience
                </Typography>

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
                          <WorkIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div variants={itemVariants}>
                          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6" component="h4">
                              {exp.title}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                              {exp.organization}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: { xs: "block", sm: "none" },
                                mt: 1,
                              }}
                            >
                              {formatDate(exp.startDate)} -{" "}
                              {formatDate(exp.endDate, exp.current)}
                            </Typography>
                            {exp.location && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                {exp.location}
                              </Typography>
                            )}
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {exp.description}
                            </Typography>
                          </Paper>
                        </motion.div>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </motion.div>
            </Grid>

            {/* Education */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  Education
                </Typography>

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
                          <SchoolIcon />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <motion.div variants={itemVariants}>
                          <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6" component="h4">
                              {edu.title}
                            </Typography>
                            <Typography variant="subtitle1" color="secondary">
                              {edu.institution}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: { xs: "block", sm: "none" },
                                mt: 1,
                              }}
                            >
                              {formatDate(edu.startDate)} -{" "}
                              {formatDate(edu.endDate, edu.current)}
                            </Typography>
                            {edu.location && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                              >
                                {edu.location}
                              </Typography>
                            )}
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {edu.description}
                            </Typography>
                          </Paper>
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
