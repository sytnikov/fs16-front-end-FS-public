import { useLocation, useNavigate } from "react-router-dom";
import { useState, MouseEvent, useContext } from "react";
import {
  Badge,
  Fab,
  useTheme,
  Link,
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
import AddIcon from "@mui/icons-material/Add";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/authReducer";
import CreateProductInput from "../types/CreateProductInput";
import { createProductAsync } from "../redux/reducers/productsReducer";
import AddProductModal from "./AddProductModal";
import { ColorModeContext } from "../context/ColorModeContext";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
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
  const showMenu = !["/login", "/signup"].includes(location.pathname);
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const cartSize = useAppSelector(
    (state) => state.cartReducer.cartItems.length
  );

  const onToggleAuth = () => {
    navigate("login");
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

  const onAddProductClick = () => {
    setIsAddProductOpen(true);
  };

  const onAddProduct = (newProduct: CreateProductInput) => {
    dispatch(createProductAsync(newProduct));
    setIsAddProductOpen(false);
  };

  return (
    <AppBar sx={{ position: "static" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 40 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ECO
          </Typography>

          {showMenu && (
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
                    href="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography textAlign="center">Store</Typography>
                  </Link>
                </MenuItem>
                {currentUser && currentUser.role === "admin" && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      href="dashboard"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography textAlign="center">Dashboard</Typography>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}

          <StoreRoundedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, fontSize: 40 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ECO
          </Typography>
          {showMenu && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "inherit", display: "block" }}
                >
                  Store
                </Button>
              </Link>
              {currentUser && currentUser.role === "admin" && (
                <Link
                  href="dashboard"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "inherit", display: "block" }}
                  >
                    Dashboard
                  </Button>{" "}
                </Link>
              )}
            </Box>
          )}
          {!showMenu && (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}
          {!currentUser && (
            <Box>
              <Button
                variant="contained"
                onClick={onToggleAuth}
                sx={{ color: "white" }}
              >
                Log In
              </Button>
            </Box>
          )}
          {currentUser && currentUser.role === "admin" && (
            <Box
              sx={{ display: { xs: "none", md: "flex" }, paddingRight: "16px" }}
            >
              <Tooltip title="Create a new product">
                <Button
                  variant="contained"
                  onClick={onAddProductClick}
                  sx={{ color: "inherit" }}
                >
                  Add product
                </Button>
              </Tooltip>
              <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onAddProduct={onAddProduct}
              />
            </Box>
          )}
          {currentUser && currentUser.role === "admin" && (
            <Box
              sx={{ display: { xs: "flex", md: "none" }, paddingRight: "16px" }}
            >
              <Tooltip title="Create a new product">
                <Box sx={{ "& > :not(style)": { m: 1 } }}>
                  <Fab
                    color="primary"
                    aria-label="add"
                    onClick={onAddProductClick}
                    sx={{
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Tooltip>
              <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onAddProduct={onAddProduct}
              />
            </Box>
          )}

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
          <Link href="/cart" color="inherit">
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
