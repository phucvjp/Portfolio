import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
  useTheme,
  Divider,
  alpha,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        background: theme.palette.mode === "light"
          ? `linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)`
          : `linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)`,
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Grid
            container
            spacing={4}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  letterSpacing: "0.05em",
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                PHUC
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: "250px",
                  lineHeight: 1.6,
                }}
              >
                Building beautiful web experiences with modern technologies and creative problem-solving.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: "1rem",
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Projects", href: "/projects" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    sx={{
                      color: theme.palette.text.secondary,
                      textDecoration: "none",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                      position: "relative",
                      width: "fit-content",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        width: 0,
                        height: 2,
                        background: theme.palette.primary.main,
                        transition: "width 0.3s ease",
                      },
                      "&:hover": {
                        color: theme.palette.primary.main,
                        "&::after": {
                          width: "100%",
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: "1rem",
                }}
              >
                Follow Me
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <IconButton
                  aria-label="github"
                  component={Link}
                  href="https://github.com/phucvjp"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.primary.main,
                      transform: "translateY(-4px)",
                      boxShadow: `0 4px 12px ${theme.palette.primary.main}33`,
                    },
                  }}
                >
                  <GitHubIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label="linkedin"
                  component={Link}
                  href="https://linkedin.com/in/vo-xuan-phuc"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: theme.palette.secondary.main,
                      transform: "translateY(-4px)",
                      boxShadow: `0 4px 12px ${theme.palette.secondary.main}33`,
                    },
                  }}
                >
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider
          sx={{
            my: 3,
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}
        />

        <Box
          sx={{
            py: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} Phuc's Portfolio. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "0.85rem",
            }}
          >
            Crafted with precision and creativity
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
