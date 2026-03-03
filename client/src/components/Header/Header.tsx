import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
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
  useTheme,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
  const location = useLocation();
  const theme = useTheme();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: 1100,
        background: scrolled
          ? alpha(theme.palette.background.default, 0.8)
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled
          ? `1px solid ${alpha(
              theme.palette.mode === "dark" ? "#fff" : "#000",
              0.08
            )}`
          : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          {/* Logo - Desktop */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              textDecoration: "none",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.4)}`,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  lineHeight: 1,
                }}
              >
                P
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: theme.palette.text.primary,
                fontSize: "1.15rem",
              }}
            >
              Portfolio
            </Typography>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: theme.palette.text.primary }}
            >
              {anchorElNav ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 200,
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.title}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  selected={location.pathname === page.path}
                  sx={{ py: 1.5 }}
                >
                  <Typography>{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              alignItems: "center",
              textDecoration: "none",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}
              >
                P
              </Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                fontSize: "1.05rem",
              }}
            >
              Portfolio
            </Typography>
          </Box>

          {/* Desktop menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              gap: 0.5,
            }}
          >
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <Button
                  key={page.title}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    py: 1,
                    px: 2,
                    color: isActive
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9rem",
                    borderRadius: 2,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 4,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: isActive ? "60%" : "0%",
                      height: 2,
                      borderRadius: 1,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      transition: "width 0.3s ease",
                    },
                    "&:hover": {
                      color: theme.palette.primary.main,
                      background: alpha(theme.palette.primary.main, 0.06),
                      "&::after": {
                        width: "60%",
                      },
                    },
                  }}
                >
                  {page.title}
                </Button>
              );
            })}
          </Box>

          {/* Theme toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              mr: 1,
              color: theme.palette.text.secondary,
              transition: "all 0.2s ease",
              "&:hover": {
                color: theme.palette.primary.main,
                background: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {mode === "dark" ? (
              <Brightness7Icon fontSize="small" />
            ) : (
              <Brightness4Icon fontSize="small" />
            )}
          </IconButton>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {isLoggedIn && user?.profileImage ? (
                  <Avatar
                    alt={user.name}
                    src={user.profileImage}
                    sx={{
                      width: 36,
                      height: 36,
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": { borderRadius: 2, minWidth: 160 },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                [
                  <MenuItem
                    key="dashboard"
                    onClick={() => {
                      navigate("/dashboard");
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography>Dashboard</Typography>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <Typography>Logout</Typography>
                  </MenuItem>,
                ]
              ) : (
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography>Login</Typography>
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
