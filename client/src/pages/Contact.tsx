import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useUserProfile, useSendContactMessage } from "../hooks/useQueries";

const Contact: React.FC = () => {
  const theme = useTheme();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use React Query hook to fetch user profile data
  const { data: userProfileData, isLoading: isLoadingUserProfile } =
    useUserProfile();

  // Get the mutation function from React Query
  const { mutate: sendContactMessageMutate, isPending: isSendingMessage } =
    useSendContactMessage();

  // Set loading state based on React Query loading states
  useEffect(() => {
    setLoading(isLoadingUserProfile || isSendingMessage);
  }, [isLoadingUserProfile, isSendingMessage]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {
      name: name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(email),
      message: message.trim() === "",
    };

    setTouched(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await sendContactMessageMutate({ name, email, message });
      setSuccess(true);
      setOpenSnackbar(true);

      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again."
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  // Handle snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          mb={6}
        >
          Get In Touch
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom mb={3}>
                Send Me a Message
              </Typography>

              <form onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={touched.name}
                    helperText={touched.name ? "Name is required" : ""}
                    disabled={loading}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    margin="normal"
                    required
                    error={touched.email}
                    helperText={
                      touched.email ? "Enter a valid email address" : ""
                    }
                    disabled={loading}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    margin="normal"
                    required
                    multiline
                    rows={6}
                    error={touched.message}
                    helperText={touched.message ? "Message is required" : ""}
                    disabled={loading}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Box
                    sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SendIcon />
                        )
                      }
                      disabled={loading}
                      sx={{ py: 1.5, px: 3 }}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </Box>
                </motion.div>
              </form>
            </Paper>
          </motion.div>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={4}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                height: "100%",
                bgcolor: theme.palette.primary.main,
                color: "#fff",
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom mb={4}>
                Contact Information
              </Typography>

              <Box sx={{ mb: 4 }}>
                {userProfileData?.contact?.phone && (
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <PhoneIcon sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        {userProfileData.contact.phone}
                      </Typography>
                    </Box>
                  </motion.div>
                )}

                {userProfileData?.email && (
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <EmailIcon sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        {userProfileData.email}
                      </Typography>
                    </Box>
                  </motion.div>
                )}

                {userProfileData?.contact?.address && (
                  <motion.div variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationOnIcon sx={{ mr: 2 }} />
                      <Typography variant="body1">
                        {userProfileData.contact.address}
                      </Typography>
                    </Box>
                  </motion.div>
                )}
              </Box>

              <motion.div variants={itemVariants}>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Feel free to reach out for collaborations, questions, or just
                  to say hello!
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  I'll get back to you as soon as possible.
                </Typography>
              </motion.div>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success
            ? "Message sent successfully! I will get back to you soon."
            : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
