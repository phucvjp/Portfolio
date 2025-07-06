import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
  useTheme,
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
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              &copy; {currentYear} Phuc's Portfolio. All rights reserved.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-end" },
            }}
          >
            <IconButton
              aria-label="github"
              component={Link}
              href="https://github.com/phucvjp"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              aria-label="linkedin"
              component={Link}
              href="https://linkedin.com/vo-xuan-phuc"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
