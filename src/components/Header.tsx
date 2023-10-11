import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, MouseEvent } from "react";
import { Link } from "@mui/material";

import useAppSelector from "../hooks/useAppSelector";
import useAppDispatch from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/authReducer";
import CreateProductInput from "../types/CreateProductInput";
import { createProductAsync } from "../redux/reducers/productsReducer";
import AddProductModal from "./AddProductModal";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isLoginPage, setIsLoginPage] = useState(true);
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

  // when going back to Home page bring back LogIn button
  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoginPage(false);
    }
  }, [location.pathname]);

  const onToggleAuth = () => {
    if (!isLoginPage) {
      navigate("login");
      setIsLoginPage(true);
    } else {
      navigate("signup");
      setIsLoginPage(false);
    }
  };

  const showMenu = !["/login", "/signup"].includes(location.pathname);
  const currentUser = useAppSelector((state) => state.authReducer.currentUser);

  const onProfileClick = () => {
    setAnchorElUser(null);
    navigate("/profile");
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
    setAnchorElUser(null);
    navigate("/");
  };

  // adding a new product

  const onAddProductClick = () => {
    setIsAddProductOpen(true);
  };
  const onAddProduct = (newProduct: CreateProductInput) => {
    dispatch(createProductAsync(newProduct));
    setIsAddProductOpen(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            E-COMM
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
                  <Typography textAlign="center">
                    <Link
                      href="/"
                      sx={{ textDecoration: "none", color: "black" }}
                    >
                      Products
                    </Link>
                  </Typography>
                </MenuItem>
                {currentUser && currentUser.role === "admin" && (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        href="users"
                        sx={{ textDecoration: "none", color: "black" }}
                      >
                        Users
                      </Link>
                    </Typography>
                  </MenuItem>
                )}
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      href="cart"
                      sx={{ textDecoration: "none", color: "black" }}
                    >
                      Cart
                    </Link>
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            E-COMM
          </Typography>
          {showMenu && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href="/" sx={{ textDecoration: "none", color: "white" }}>
                  Products
                </Link>
              </Button>
              {currentUser && currentUser.role === "admin" && (
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    href="users"
                    sx={{ textDecoration: "none", color: "white" }}
                  >
                    Users
                  </Link>
                </Button>
              )}
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  href="cart"
                  sx={{ textDecoration: "none", color: "white" }}
                >
                  Cart
                </Link>
              </Button>
            </Box>
          )}
          {!showMenu && (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}

          {!currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Log In">
                <Button
                  variant="outlined"
                  onClick={onToggleAuth}
                  sx={{ color: "white" }}
                >
                  {!isLoginPage ? "Log In" : "Sign Up"}
                </Button>
              </Tooltip>
            </Box>
          )}
          {currentUser && currentUser.role === "admin" && (
            <Box sx={{ flexGrow: 0, paddingRight: "16px" }}>
              <Tooltip title="Create a new product">
                <Button
                  variant="outlined"
                  onClick={onAddProductClick}
                  sx={{ color: "white" }}
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
          {currentUser && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Amy Sharp" src="/static/images/avatar/2.jpg" />
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
