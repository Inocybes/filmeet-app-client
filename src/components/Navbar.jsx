import * as React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { searchMovieService } from "../services/movie.services";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Image } from "@mui/icons-material";

function Navbar(props) {
  const [typingText, setTypingText] = useState("");
  const [movies, setMovies] = useState([]);

  const { isLoggedIn, setIsLoggedIn } = props;

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  // const handleSignIn = () => {
  //   setIsLoggedIn(false);
  // };
  // const handleLogIn = () => {
  //   setIsLoggedIn(false);
  // };
  // const handleMeetUp = () => {
  //   setIsLoggedIn(true);
  // };

  useEffect(() => {}, []);

  const getTypingText = async () => {
    try {
      const response = await searchMovieService(typingText);
      setTypingText(response.data);
    } catch (error) {}
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
   
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleInputText = async (e) => {
    setTypingText(e.target.value);
    const response = await searchMovieService(e.target.value);
    setMovies(response.data);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <MenuItem onClick={handleProfileMenuClose} >
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/profile">Profile</Link>
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem onClick={handleProfileMenuClose} >
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/" onClick={handleLogOut}>
            Log Out
          </Link>
        </MenuItem>
      )}

      {!isLoggedIn && (
        <MenuItem onClick={handleProfileMenuClose}>
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">Log In</Link>
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem onClick={handleProfileMenuClose} >
          <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signin">Sing In</Link>
        </MenuItem>
      )}
      <MenuItem onClick={handleMenuClose} >
        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/">Home</Link>
      </MenuItem>

      <MenuItem onClick={handleMenuClose} >
        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/meet-up-list">Meet up</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ background: "black" }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleProfileMenuOpen}
              sx={{ mr: 2 }}
            />
          </IconButton> */}
          
          {/* <Image src={"../public/Logo.png"}></Image> */}

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleInputText}
              value={typingText}
              id="searchInput"
            />

          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Navbar;
