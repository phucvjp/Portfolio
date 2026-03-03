import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Context
import { AuthProvider } from "./context/AuthContext";
import { ThemeContext } from "./context/ThemeContext";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  // Toggle theme
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Create theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#6366F1",
            light: "#818CF8",
            dark: "#4F46E5",
          },
          secondary: {
            main: "#a855f7",
            light: "#d8b4fe",
            dark: "#9333ea",
          },
          success: {
            main: "#10b981",
          },
          warning: {
            main: "#f59e0b",
          },
          error: {
            main: "#ef4444",
          },
          info: {
            main: "#06b6d4",
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
            fontSize: "3.5rem",
            letterSpacing: "-0.02em",
          },
          h2: {
            fontWeight: 700,
            fontSize: "2.25rem",
            letterSpacing: "-0.01em",
          },
          h3: {
            fontWeight: 600,
            fontSize: "1.875rem",
          },
          h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
          },
          h5: {
            fontWeight: 500,
            fontSize: "1.25rem",
          },
          body1: {
            fontSize: "1rem",
            lineHeight: 1.6,
          },
          body2: {
            fontSize: "0.875rem",
            lineHeight: 1.6,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
              },
              contained: {
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                "&:hover": {
                  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backdropFilter: "blur(4px)",
                border: `1px solid ${mode === "light" ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.2)"}`,
                transition: "all 0.3s cubic-bezier(0.23, 1, 0.320, 1)",
                "&:hover": {
                  boxShadow: mode === "light"
                    ? "0 20px 40px rgba(99, 102, 241, 0.12)"
                    : "0 20px 40px rgba(99, 102, 241, 0.3)",
                  transform: "translateY(-4px)",
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
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
              <div>
                <Header />
                <main style={{ minHeight: "calc(100vh - 160px)" }}>
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
