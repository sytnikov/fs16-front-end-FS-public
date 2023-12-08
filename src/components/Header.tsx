import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, MouseEvent, useContext } from "react";
import {
  Badge,
  useTheme,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/authReducer";
import { ColorModeContext } from "../context/ColorModeContext";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const showMenu = !["/login", "/register"].includes(location.pathname);
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const cartSize = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );

  const onLoginToggle = () => {
    navigate("login");
  };

  const onRegisterToggle = () => {
    navigate("register");
  };

  const onProfileClick = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
    setAnchorElUser(null);
    navigate("/");
  };

  return (
    <AppBar sx={{ position: "static" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 40 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography textAlign="center">Store</Typography>
                </Link>
              </MenuItem>
              {currentUser && currentUser.role === "ADMIN" && (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Dashboard</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Store
              </Button>
            </Link>
            {currentUser && currentUser.role === "ADMIN" && (
              <Link
                to="dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {!currentUser && (
              <Box>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  onClick={onLoginToggle}
                >
                  <LoginRoundedIcon />
                  Log In
                </Button>
                <Button
                  sx={{ ml: 1 }}
                  variant="contained"
                  onClick={onRegisterToggle}
                >
                  <PersonRoundedIcon />
                  Register
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            {!currentUser && (
              <Box>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={onLoginToggle}
                  color="inherit"
                >
                  <LoginRoundedIcon />
                </IconButton>
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={onRegisterToggle}
                  color="inherit"
                >
                  <PersonRoundedIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Amy Sharp" src={currentUser.avatar} />
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
                <MenuItem onClick={onProfileClick}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={onLogoutClick}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
          <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <Badge badgeContent={cartSize} color="info">
              <ShoppingCartRoundedIcon sx={{ ml: 1, fontSize: 24 }} />
            </Badge>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
