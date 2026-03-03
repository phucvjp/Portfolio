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
  Chip,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import CodeIcon from "@mui/icons-material/Code";
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

  const formattedSkills = React.useMemo(() => {
    const groupedSkills = (skills as any[]).reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill.name);
      return acc;
    }, {});
    return Object.entries(groupedSkills).map(([category, items], id) => ({
      id,
      category,
      items,
    }));
  }, [skills]);

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
      <Container
        sx={{ display: "flex", justifyContent: "center", py: 12 }}
      >
        <CircularProgress
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </Container>
    );
  }

  const SectionTitle: React.FC<{
    icon: React.ReactNode;
    title: string;
  }> = ({ icon, title }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        mb: 3,
        pb: 1.5,
        borderBottom: `2px solid transparent`,
        borderImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.secondary.main, 0.3)}, transparent) 1`,
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: "8px",
          background: alpha(theme.palette.primary.main, 0.1),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: theme.palette.primary.main,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontSize: "1.2rem" }}>
        {title}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="CV"
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
            Resume
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A summary of my professional journey
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
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
                mb: 1.5,
              }}
            >
              Full Stack Developer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userProfile?.contact?.address &&
                `${userProfile.contact.address} \u00B7 `}
              {userProfile?.contact?.phone &&
                `${userProfile.contact.phone} \u00B7 `}
              {userProfile?.email || "Loading..."}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1.5,
                mt: 2,
              }}
            >
              {userProfile?.socialLinks?.github && (
                <Box
                  component="a"
                  href={userProfile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    border: `1px solid ${alpha(isDark ? "#fff" : "#000", 0.1)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                    },
                  }}
                >
                  <GitHubIcon sx={{ fontSize: 18 }} />
                </Box>
              )}
              {userProfile?.socialLinks?.linkedin && (
                <Box
                  component="a"
                  href={userProfile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    border: `1px solid ${alpha(isDark ? "#fff" : "#000", 0.1)}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      borderColor: alpha(theme.palette.primary.main, 0.4),
                    },
                  }}
                >
                  <LinkedInIcon sx={{ fontSize: 18 }} />
                </Box>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.3 }} />

          {/* Professional Summary */}
          <Box sx={{ mb: 4 }}>
            <SectionTitle
              icon={<CodeIcon sx={{ fontSize: 18 }} />}
              title="Professional Summary"
            />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              {userProfile?.bio || "Loading..."}
            </Typography>
          </Box>

          {/* Work Experience */}
          {experiences.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <SectionTitle
                icon={<WorkIcon sx={{ fontSize: 18 }} />}
                title="Work Experience"
              />
              {experiences.map((exp: any) => (
                <Box
                  key={exp._id}
                  sx={{
                    mb: 3,
                    pl: 2,
                    borderLeft: `2px solid ${alpha(
                      theme.palette.primary.main,
                      0.2
                    )}`,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, lineHeight: 1.7 }}
                  >
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <SectionTitle
                icon={<SchoolIcon sx={{ fontSize: 18 }} />}
                title="Education"
              />
              {education.map((edu: any) => (
                <Box
                  key={edu._id}
                  sx={{
                    mb: 3,
                    pl: 2,
                    borderLeft: `2px solid ${alpha(
                      theme.palette.secondary.main,
                      0.2
                    )}`,
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, lineHeight: 1.7 }}
                  >
                    {edu.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Honors & Awards */}
          {honors.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <SectionTitle
                icon={<EmojiEventsIcon sx={{ fontSize: 18 }} />}
                title="Honors & Awards"
              />
              <List sx={{ p: 0 }}>
                {honors.map((honor: Honor) => (
                  <ListItem
                    key={honor._id}
                    sx={{
                      pl: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      borderLeft: `2px solid ${alpha(
                        "#f59e0b",
                        0.3
                      )}`,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontSize: "1rem" }}>
                        {honor.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ flexShrink: 0, ml: 2 }}
                      >
                        {honor.date}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "#f59e0b", fontWeight: 500 }}
                    >
                      {honor.issuer}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5, lineHeight: 1.7 }}
                    >
                      {honor.description}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Box>
              <SectionTitle
                icon={<CodeIcon sx={{ fontSize: 18 }} />}
                title="Skills"
              />
              <Grid container spacing={3}>
                {formattedSkills.map((skillGroup) => (
                  <Grid item xs={12} sm={6} key={skillGroup.id}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {skillGroup.category}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                      {Array.isArray(skillGroup.items) ? (
                        skillGroup.items.map((item: string) => (
                          <Chip
                            key={item}
                            label={item}
                            size="small"
                            variant="outlined"
                          />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No skills available
                        </Typography>
                      )}
                    </Box>
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
