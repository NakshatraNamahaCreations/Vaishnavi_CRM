import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { ArrowDropDown, Notifications } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationEl, setNotificationEl] = useState(null);
  const navigate = useNavigate();

  // User Menu Handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Notification Menu Handlers
  const handleNotificationOpen = (event) => {
    setNotificationEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationEl(null);
  };

  const [admin, setAdmin] = useState({});

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Convert string back to object
        setAdmin(parsedUser); // Update the state
        console.log(parsedUser, "decoded user details");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");

    console.log("User logged out successfully");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 20px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Logo */}
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#2563eb", fontSize: "22px" }}
      ></Typography>

      {/* Actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Notification Icon */}

        {/* User Avatar and Dropdown */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleMenuOpen}
        >
          <Box sx={{ ml: 1 }}>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins",
                color: "#1e293b",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              {admin?.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography
                variant="caption"
                sx={{
                  fontSize: "12px",
                  color: "#64748b",
                  fontFamily: "Poppins",
                }}
              >
                {admin?.roles}
              </Typography>
              <ArrowDropDown sx={{ color: "#64748b", fontSize: "20px" }} />
            </Box>
          </Box>
        </Box>

        {/* User Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 150,
              borderRadius: 2,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        >
          <MenuItem onClick={handleLogout} sx={{ fontSize: "14px" }}>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
