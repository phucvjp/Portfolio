import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";

const NotFound: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h1"
          component="h1"
          color="primary"
          sx={{
            fontSize: { xs: "6rem", md: "8rem" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 5,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            size="large"
            sx={{ px: 4, py: 1 }}
          >
            Back to Home
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default NotFound;
