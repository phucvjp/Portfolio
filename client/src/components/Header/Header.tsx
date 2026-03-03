import React, { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PersonIcon from "@mui/icons-material/Person";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

const pages = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Resume", path: "/resume" },
  { title: "Contact", path: "/contact" },
];

const Header: React.FC = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Responsive menu state
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Material UI theme
  const theme = useTheme();

  // Menu handlers
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate("/");
  };

  // Login handler
  const handleLogin = () => {
    navigate("/login");
    handleCloseUserMenu();
  };

  // Dashboard handler
  const handleDashboard = () => {
    navigate("/dashboard");
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="sticky"
      style={{ top: 0, zIndex: 1000 }}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: theme.palette.mode === "light"
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(15, 23, 42, 0.95)",
        backgroundImage: theme.palette.mode === "light"
          ? "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)"
          : "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)",
        boxShadow: `0 2px 12px ${theme.palette.mode === "light"
          ? "rgba(99, 102, 241, 0.08)"
          : "rgba(99, 102, 241, 0.15)"}`,
        borderBottom: `1px solid ${theme.palette.mode === "light"
          ? "rgba(99, 102, 241, 0.1)"
          : "rgba(99, 102, 241, 0.2)"}`,
        color: theme.palette.text.primary,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            py: 1.5,
          }}
        >
          {/* Logo - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 3,
              display: { xs: "none", md: "flex" },
              fontWeight: 800,
              fontSize: "1.35rem",
              letterSpacing: "0.05em",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            PHUC
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: theme.palette.primary.main,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  sx={{
                    fontWeight: 500,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "white",
                    },
                  }}
                >
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 800,
              fontSize: "1.25rem",
              letterSpacing: "0.05em",
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textDecoration: "none",
            }}
          >
            PHUC
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 1.5,
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transform: "scaleX(0)",
                    transition: "transform 0.3s ease",
                    transformOrigin: "right",
                  },
                  "&:hover::after": {
                    transform: "scaleX(1)",
                    transformOrigin: "left",
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Theme toggle */}
          <Box sx={{ mr: 2 }}>
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{
                color: theme.palette.primary.main,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  color: "white",
                },
              }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account options">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0.5,
                  border: `2px solid ${theme.palette.primary.main}`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}33`,
                    transform: "scale(1.05)",
                  },
                }}
              >
                {isLoggedIn && user?.profileImage ? (
                  <Avatar
                    alt={user.name}
                    src={user.profileImage}
                    sx={{
                      width: 36,
                      height: 36,
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: "white",
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                [
                  <MenuItem
                    key="dashboard"
                    onClick={handleDashboard}
                    sx={{
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: theme.palette.primary.light,
                        color: "white",
                      },
                    }}
                  >
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={handleLogout}
                    sx={{
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: theme.palette.error.main,
                        color: "white",
                      },
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>,
                ]
              ) : (
                <MenuItem
                  onClick={handleLogin}
                  sx={{
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: "white",
                    },
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
