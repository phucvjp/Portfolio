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
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";
import { useUserProfile, useSendContactMessage } from "../hooks/useQueries";

const Contact: React.FC = () => {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: userProfileData, isLoading: isLoadingUserProfile } =
    useUserProfile();
  const { mutate: sendContactMessageMutate, isPending: isSendingMessage } =
    useSendContactMessage();

  useEffect(() => {
    setLoading(isLoadingUserProfile || isSendingMessage);
  }, [isLoadingUserProfile, isSendingMessage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: fieldName, value } = e.target;
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(email),
      message: message.trim() === "",
    };
    setTouched(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      await sendContactMessageMutate({ name, email, message });
      setSuccess(true);
      setOpenSnackbar(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <EmailIcon />,
      label: "Email",
      value: userProfileData?.email,
    },
    {
      icon: <PhoneIcon />,
      label: "Phone",
      value: userProfileData?.contact?.phone,
    },
    {
      icon: <LocationOnIcon />,
      label: "Location",
      value: userProfileData?.contact?.address,
    },
  ].filter((item) => item.value);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Chip
            label="Contact"
            size="small"
            sx={{
              mb: 2,
              background: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              fontWeight: 500,
            }}
          />
          <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
            Get in Touch
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 500, mx: "auto" }}
          >
            Have a question or want to work together? I'd love to hear from you.
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={7}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 4 },
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Send a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Fill out the form below and I'll get back to you soon.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                        error={touched.name}
                        helperText={touched.name ? "Name is required" : ""}
                        disabled={loading}
                      />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        label="Your Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                        error={touched.email}
                        helperText={touched.email ? "Enter a valid email" : ""}
                        disabled={loading}
                      />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        value={message}
                        onChange={handleChange}
                        required
                        multiline
                        rows={6}
                        error={touched.message}
                        helperText={
                          touched.message ? "Message is required" : ""
                        }
                        disabled={loading}
                      />
                    </motion.div>
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <SendIcon />
                      )
                    }
                    disabled={loading}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Box>
              </form>
            </Paper>
          </motion.div>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={5}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Box
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.dark})`,
                color: "#fff",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.08)",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: -60,
                  left: -20,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.05)",
                  pointerEvents: "none",
                }}
              />

              <Typography variant="h5" sx={{ mb: 1, position: "relative" }}>
                Contact Information
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 4, opacity: 0.8, position: "relative" }}
              >
                Feel free to reach out through any of these channels.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  position: "relative",
                }}
              >
                {contactItems.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ opacity: 0.7, display: "block" }}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 5, position: "relative" }}>
                <Typography
                  variant="body2"
                  sx={{ opacity: 0.8, lineHeight: 1.7 }}
                >
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {success
            ? "Message sent successfully! I'll get back to you soon."
            : error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
