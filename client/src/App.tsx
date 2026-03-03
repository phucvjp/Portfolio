import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, alpha } from "@mui/material";
import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { AuthProvider } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#6366f1",
            light: "#818cf8",
            dark: "#4f46e5",
          },
          secondary: {
            main: "#a855f7",
            light: "#c084fc",
            dark: "#7c3aed",
          },
          ...(mode === "dark"
            ? {
                background: {
                  default: "#0a0a1a",
                  paper: "#111128",
                },
                text: {
                  primary: "#e2e8f0",
                  secondary: "#94a3b8",
                },
              }
            : {
                background: {
                  default: "#f8fafc",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1e293b",
                  secondary: "#64748b",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
          h1: { fontWeight: 800, letterSpacing: "-0.025em" },
          h2: { fontWeight: 700, letterSpacing: "-0.025em" },
          h3: { fontWeight: 700, letterSpacing: "-0.02em" },
          h4: { fontWeight: 700, letterSpacing: "-0.01em" },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          button: { fontWeight: 600, textTransform: "none" as const },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                padding: "10px 24px",
                fontSize: "0.9rem",
                transition: "all 0.2s ease-in-out",
              },
              contained: ({ theme: t }) => ({
                background: `linear-gradient(135deg, ${t.palette.primary.main} 0%, ${t.palette.secondary.main} 100%)`,
                boxShadow: `0 4px 14px 0 ${alpha(t.palette.primary.main, 0.4)}`,
                "&:hover": {
                  background: `linear-gradient(135deg, ${t.palette.primary.dark} 0%, ${t.palette.secondary.dark} 100%)`,
                  boxShadow: `0 6px 20px 0 ${alpha(t.palette.primary.main, 0.5)}`,
                  transform: "translateY(-1px)",
                },
              }),
              outlined: ({ theme: t }) => ({
                borderColor: alpha(t.palette.primary.main, 0.5),
                "&:hover": {
                  borderColor: t.palette.primary.main,
                  background: alpha(t.palette.primary.main, 0.08),
                  transform: "translateY(-1px)",
                },
              }),
            },
          },
          MuiCard: {
            styleOverrides: {
              root: ({ theme: t }) => ({
                borderRadius: 16,
                border: `1px solid ${alpha(
                  t.palette.mode === "dark" ? "#fff" : "#000",
                  t.palette.mode === "dark" ? 0.08 : 0.06
                )}`,
                background:
                  t.palette.mode === "dark"
                    ? alpha("#1e1e3f", 0.6)
                    : t.palette.background.paper,
                backdropFilter: t.palette.mode === "dark" ? "blur(20px)" : "none",
                boxShadow:
                  t.palette.mode === "dark"
                    ? `0 4px 30px ${alpha("#000", 0.3)}`
                    : `0 4px 20px ${alpha("#000", 0.06)}`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }),
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: ({ theme: t }) => ({
                backgroundImage: "none",
                ...(t.palette.mode === "dark" && {
                  background: alpha("#1e1e3f", 0.6),
                  backdropFilter: "blur(20px)",
                }),
              }),
            },
          },
          MuiChip: {
            styleOverrides: {
              root: ({ theme: t }) => ({
                borderRadius: 8,
                fontWeight: 500,
                fontSize: "0.8rem",
              }),
              outlined: ({ theme: t }) => ({
                borderColor: alpha(t.palette.primary.main, 0.3),
                "&:hover": {
                  background: alpha(t.palette.primary.main, 0.1),
                },
              }),
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: ({ theme: t }) => ({
                "& .MuiOutlinedInput-root": {
                  borderRadius: 10,
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: t.palette.primary.main,
                  },
                },
              }),
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: "rgba(99,102,241,0.3) transparent",
                scrollbarWidth: "thin",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Router>
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Header />
                <main style={{ flex: 1 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
