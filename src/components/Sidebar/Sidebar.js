import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Drawer,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ChevronRight,
  ChevronLeft,
  Menu as MenuIcon,
} from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import EventAvailableIcon from "@mui/icons-material/EventAvailable"; // New icon for Follow-Ups
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import TaskIcon from "@mui/icons-material/Task";
import { useNavigate } from "react-router-dom";
import ScheduleIcon from '@mui/icons-material/Schedule';

const SidebarMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem("activeItem") || "/dashboard"
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleNavigation = (path) => {
    setActiveItem(path);
    if (isMobile) setIsDrawerOpen(false);

    navigate(path);
  };

  const menuItemStyle = {
    padding: "10px 12px",
    fontSize: "14px",
    color: "#1e293b",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const activeStyle = {
    color: "#038f05",
    fontWeight: "500",
    borderRight: "4px solid #7467FF",
    background: "#f3f4ff",
    transition: "all 0.3s ease",
  };

  const renderMenuItems = () => (
    <Menu>
      <MenuItem
        icon={<DashboardIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/dashboard"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/dashboard")}
      >
        {!collapsed && "Dashboard"}
      </MenuItem>

      <MenuItem
        icon={<PeopleIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/usermanagement"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/usermanagement")}
      >
        {!collapsed && "User Management"}
      </MenuItem>

      <MenuItem
        icon={<GroupIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/customer"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/customer")}
      >
        {!collapsed && "Customer"}
      </MenuItem>

      <MenuItem
        icon={<AssignmentIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/leadandinquires"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/leadandinquires")}
      >
        {!collapsed && "Lead & Inquiries"}
      </MenuItem>

      <MenuItem
        icon={<EventAvailableIcon style={{ color: "#038f05" }} />} // Changed icon for Follow-Ups
        style={
          activeItem === "/followsup"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/followsup")}
      >
        {!collapsed && "Follow-Ups"}
      </MenuItem>

      <MenuItem
        icon={<EventNoteIcon style={{ color: "#038f05" }} />} // Changed icon for Appointment
        style={
          activeItem === "/appointment"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/appointment")}
      >
        {!collapsed && "Appointment"}
      </MenuItem>

      <MenuItem
        icon={<ScheduleIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/schedulevisite"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/schedulevisite")}
      >
        {!collapsed && "Scheduled Visits"}
      </MenuItem>

      <MenuItem
        icon={<CheckCircleIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/converted"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/converted")}
      >
        {!collapsed && "Converted"}
      </MenuItem>

      <MenuItem
        icon={<BusinessIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/property"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/property")}
      >
        {!collapsed && "Property"}
      </MenuItem>

      <MenuItem
        icon={<TaskIcon style={{ color: "#038f05" }} />}
        style={
          activeItem === "/tasks"
            ? { ...menuItemStyle, ...activeStyle }
            : menuItemStyle
        }
        onClick={() => handleNavigation("/tasks")}
      >
        {!collapsed && "Tasks"}
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      {isMobile && (
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{
            color: "#038f05",
            position: "fixed",
            top: 10,
            left: 10,
            zIndex: 1000,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#ffffff",
            borderRight: "1px solid #e0e0e0",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            {!collapsed && (
              <img
                src="../vlogo.webp"
                alt="logo"
                style={{ height: "120px", marginBottom: "20px" }}
              />
            )}

            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              sx={{
                color: "#038f05",
                "&:hover": { color: "#7467FF" },
              }}
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>

          {renderMenuItems()}
        </Sidebar>
      )}

      {isMobile && (
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        >
          <Box
            sx={{
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <IconButton
              onClick={() => setIsDrawerOpen(false)}
              sx={{
                color: "#038f05",
                "&:hover": { color: "#7467FF" },
              }}
            >
              <ChevronLeft />
            </IconButton>
          </Box>

          {renderMenuItems()}
        </Drawer>
      )}
    </Box>
  );
};

export default SidebarMenu;
