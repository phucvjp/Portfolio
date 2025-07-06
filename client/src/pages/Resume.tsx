import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import {
  useUserProfile,
  useSkills,
  useExperiences,
  useEducations,
  useHonors,
} from "../hooks/useQueries";

interface Honor {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  url?: string;
}

const Resume: React.FC = () => {
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
  const formattedSkills = React.useMemo(() => {
    // Group skills by category
    const groupedSkills = (skills as any[]).reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill.name);
      return acc;
    }, {});

    // Convert to array format
    return Object.entries(groupedSkills).map(([category, items], id) => ({
      id,
      category,
      items,
    }));
  }, [skills]);

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

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
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
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Resume
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            View my professional resume
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            mt: 4,
            maxWidth: 900,
            mx: "auto",
            bgcolor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.8)
                : "#fff",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {userProfile?.name || "Loading..."}
            </Typography>
            <Typography variant="h6" color="primary">
              Full Stack Developer
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {userProfile?.contact?.address &&
                `${userProfile.contact.address} • `}
              {userProfile?.contact?.phone && `${userProfile.contact.phone} • `}
              {userProfile?.email || "Loading..."}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1 }}
            >
              {userProfile?.socialLinks?.github && (
                <a
                  href={userProfile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  <GitHubIcon />
                </a>
              )}
              {userProfile?.socialLinks?.linkedin && (
                <a
                  href={userProfile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "inherit" }}
                >
                  <LinkedInIcon />
                </a>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Professional Summary */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{
                borderBottom: `2px solid ${theme.palette.primary.main}`,
                pb: 1,
                mb: 2,
              }}
            >
              Professional Summary
            </Typography>
            <Typography variant="body1" paragraph>
              {userProfile?.bio ||
                "As a Backend Developer Intern specializing in Java, I'm excited to apply my skills in the Spring Framework within a dynamic development environment. I have hands-on experience in building robust RESTful APIs and a foundational understanding of Node.js and MongoDB, expanding my versatility as a developer. Eager to continuously learn and adapt, I'm enthusiastic about exploring new technologies and contributing creatively to real-world projects. I look forward to taking on meaningful challenges and growing through practical experience in a fast-paced, collaborative team setting."}
            </Typography>
          </Box>

          {/* Work Experience */}
          {experiences.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  mb: 2,
                }}
              >
                Work Experience
              </Typography>

              {experiences.map((exp: any) => (
                <Box key={exp._id} sx={{ mb: 3 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6" component="h4">
                        {exp.title}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {exp.organization}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{ textAlign: { sm: "right" } }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {exp.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(exp.startDate)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.endDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  mb: 2,
                }}
              >
                Education
              </Typography>

              {education.map((edu: any) => (
                <Box key={edu._id} sx={{ mb: 2 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6" component="h4">
                        {edu.title}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        {edu.institution}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{ textAlign: { sm: "right" } }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {edu.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(edu.from)} -{" "}
                        {edu.current ? "Present" : formatDate(edu.to)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {edu.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Honors & Awards */}
          {honors.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmojiEventsIcon sx={{ mr: 1 }} />
                  Honors & Awards
                </Box>
              </Typography>

              <List>
                {honors.map((honor: Honor) => (
                  <ListItem
                    key={honor._id}
                    sx={{
                      pl: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {honor.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {honor.date}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      color="primary"
                      gutterBottom
                    >
                      {honor.issuer}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {honor.description}
                    </Typography>
                    <Divider sx={{ my: 2, width: "100%" }} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Box>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  pb: 1,
                  mb: 2,
                }}
              >
                Skills
              </Typography>

              <Grid container spacing={2}>
                {formattedSkills.map((skillGroup) => (
                  <Grid item xs={12} sm={6} key={skillGroup.id}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                    >
                      {skillGroup.category}
                    </Typography>
                    <Typography variant="body2">
                      {Array.isArray(skillGroup.items)
                        ? skillGroup.items.join(", ")
                        : "No skills available"}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Resume;
