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
            main: "#3f51b5",
          },
          secondary: {
            main: "#f50057",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 500,
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
