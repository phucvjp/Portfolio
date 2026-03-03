import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const isDark = theme.palette.mode === "dark";

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Projects", path: "/projects" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        pt: 6,
        pb: 4,
        mt: "auto",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${alpha(
            theme.palette.primary.main,
            0.3
          )}, ${alpha(
            theme.palette.secondary.main,
            0.3
          )}, transparent)`,
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 4,
            mb: 4,
          }}
        >
          {/* Brand */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, justifyContent: { xs: "center", md: "flex-start" } }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}
                >
                  P
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Portfolio
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 280 }}
            >
              Building digital experiences with passion and precision.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Stack direction="row" spacing={3}>
            {navLinks.map((link) => (
              <Link
                key={link.title}
                component={RouterLink}
                to={link.path}
                underline="none"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {link.title}
              </Link>
            ))}
          </Stack>

          {/* Social */}
          <Stack direction="row" spacing={1}>
            <IconButton
              component={Link}
              href="https://github.com/phucvjp"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                border: `1px solid ${alpha(
                  isDark ? "#fff" : "#000",
                  0.1
                )}`,
                width: 40,
                height: 40,
                transition: "all 0.2s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  background: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              component={Link}
              href="https://linkedin.com/in/vo-xuan-phuc"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.text.secondary,
                border: `1px solid ${alpha(
                  isDark ? "#fff" : "#000",
                  0.1
                )}`,
                width: 40,
                height: 40,
                transition: "all 0.2s",
                "&:hover": {
                  color: theme.palette.primary.main,
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  background: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ opacity: 0.6, fontSize: "0.8rem" }}
        >
          &copy; {currentYear} Phuc's Portfolio. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
