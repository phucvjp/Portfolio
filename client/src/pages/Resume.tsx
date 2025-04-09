import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from "framer-motion";
import {
  useUserProfile,
  useSkills,
  useExperiences,
  useEducations,
} from "../hooks/useQueries";

const Resume: React.FC = () => {
  const theme = useTheme();

  // Use React Query for data fetching
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile();

  const { data: skills = [], isLoading: isLoadingSkills } = useSkills();

  const { data: experiences = [], isLoading: isLoadingExperiences } =
    useExperiences();

  const { data: education = [], isLoading: isLoadingEducation } =
    useEducations();

  // Overall loading state
  const isLoading =
    isLoadingProfile ||
    isLoadingSkills ||
    isLoadingExperiences ||
    isLoadingEducation;

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

  // Handle resume download - this is a placeholder function
  // In a real app, you would use an API call to get the resume file
  const handleDownload = () => {
    // Create a fake download link to a PDF
    const link = document.createElement("a");
    link.href = "/resume.pdf"; // This would be a real PDF file in your public folder
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            View and download my professional resume
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            sx={{ mt: 2 }}
          >
            Download PDF
          </Button>
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
                "Full Stack Developer with experience designing and developing web applications using React, Node.js, and TypeScript. Passionate about creating clean, efficient, and user-friendly applications with a focus on performance and scalability."}
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
                        {formatDate(exp.from)} -{" "}
                        {exp.current ? "Present" : formatDate(exp.to)}
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
                        {edu.organization}
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
