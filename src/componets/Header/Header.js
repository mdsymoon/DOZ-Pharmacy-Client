import React from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { FiMoreVertical } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";
import { getLoggedInUser, isLogged } from "../../redux/loginSlice/loginSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const loggedIn = useSelector(getLoggedInUser);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
      <button className="bg-pink-400 text-white font-medium px-2 py-1 m-3 rounded-md flex">
        <h3>ADD CONTACT</h3>
      </button>

      <button className="bg-gray-100 text-black  px-3 py-1 rounded-md m-3 flex">
        <BsFilter />
      </button>

      <button className="bg-blue-700 text-white font-semibold px-3 m-3 py-1 rounded-md flex">
        <AiOutlineSearch />
      </button>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <h1 className="text-black" onClick={() => navigate("/")}>
              {" "}
              DOZ Pharmacy - Contacts
            </h1>
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: 40,
                alignItems: "center",
              },
            }}
          >
            <button
              className="bg-pink-400 hover:bg-pink-500  text-white font-medium px-2 py-1  rounded-md flex"
              onClick={() => navigate("/add-contact")}
            >
              ADD CONTACT
            </button>
            {!loggedIn.email  &&
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white font-medium px-2 py-1  rounded-md flex"
                onClick={() => navigate("/login")}
              >
                login
              </button>
            }

            <button className="bg-gray-100 text-black  px-3 py-1 rounded-md flex">
              <BsFilter />
            </button>

            <button className="bg-blue-700 text-white font-semibold px-3 py-1 rounded-md flex">
              <AiOutlineSearch />
            </button>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
            >
              <FiMoreVertical />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
