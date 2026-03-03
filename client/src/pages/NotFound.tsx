import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFound: React.FC = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="sm"
      sx={{ textAlign: "center", py: { xs: 10, md: 16 } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "7rem", md: "10rem" },
            fontWeight: 900,
            lineHeight: 1,
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>

        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 400, mx: "auto", lineHeight: 1.7 }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Back to Home
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Go Back
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NotFound;
