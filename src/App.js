import React, { useState } from "react";
import { Box, useMediaQuery, IconButton, Drawer } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SidebarMenu from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard/Dashboard";
import Usermanagement from "./pages/Admin/Usermanagement";
// import NotFound from "./pages/NotFound/NotFound";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Userdetails from "./pages/Admin/Userdetails";
import MenuIcon from "@mui/icons-material/Menu";

import InstituteLogin from "./pages/Auth/InstituteLogin";
import InstituteSignup from "./pages/Auth/InstituteSingup";
import InstituteForget from "./pages/Auth/InstituteForget";
import Customer from "./pages/Admin/Customer";
import CreateCustomer from "./pages/Admin/CreateCustomer";
import CustomerView from "./pages/Admin/CustomerView";
import CustomerEdit from "./pages/Admin/CustomerEdit";
import Leadenquiry from "./pages/Admin/Leadenquiry";
import Createleadenquiry from "./pages/Admin/Createleadenquiry";
import LeadenquiryView from "./pages/Admin/LeadenquiryView";
import EnquiryEdit from "./pages/Admin/EnquiryEdit";
import ScheduleVisite from "./pages/Admin/ScheduleVisite";
import ScheduleVisitedetails from "./pages/Admin/ScheduleVisitedetails";
import Property from "./pages/Admin/Property";
import CreateProperty from "./pages/Admin/CreateProperty";
import PropertyEdit from "./pages/Admin/PropertyEdit";
import PropertyView from "./pages/Admin/PropertyView";
import Convert from "./pages/Admin/Convert";
import FollowUp from "./pages/Admin/FollowUp";
import Appointment from "./pages/Admin/Appointment";
import LeadeEnquiryLeadId from "./pages/Admin/LeadeEnquiryLeadId";
import Tasks from "./pages/Admin/Tasks";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Custom Layout Component
  const MainLayout = ({ children }) => {
    const location = useLocation();
    const hideSidebarRoutes = ["/", "/signup", "/institute-forget"];
    const isSidebarVisible = !hideSidebarRoutes.includes(
      location.pathname.toLowerCase()
    );

    return (
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        {/* Sidebar for Desktop */}
        {!isMobile && isSidebarVisible && <SidebarMenu />}

        {/* Sidebar as Drawer for Mobile */}
        {isMobile && isSidebarVisible && (
          <Drawer
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "240px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              },
            }}
          >
            <SidebarMenu />
          </Drawer>
        )}

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          {isSidebarVisible && (
            <Header>
              {isMobile && (
                <IconButton
                  onClick={() => setIsDrawerOpen(true)}
                  sx={{ color: "#2563eb", position: "absolute", left: "16px" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Header>
          )}

          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              padding: isMobile ? "8px" : "16px",
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/institutelogin" element={<InstituteLogin />} />
          <Route path="/institutesignup" element={<InstituteSignup />} />
          <Route path="/institute-forget" element={<InstituteForget />} />
          {/* Private Routes  new*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usermanagement" element={<Usermanagement />} />
          <Route path="/userdetails/:id" element={<Userdetails />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/create-customer" element={<CreateCustomer />} />
          <Route path="/customer-view" element={<CustomerView />} />
          <Route path="/customer-update" element={<CustomerEdit />} />
          <Route path="/leadandinquires" element={<Leadenquiry />} />
          <Route path="/create-leadenquiry" element={<Createleadenquiry />} />
          <Route path="/leadenquiry-view/:id" element={<LeadenquiryView />} />
          <Route path="/leadenquiry-update/:id" element={<EnquiryEdit />} />
          <Route path="/schedulevisite" element={<ScheduleVisite />} />
          <Route
            path="/schedulevisite-details"
            element={<ScheduleVisitedetails />}
          />
          <Route path="/property" element={<Property />} />
          <Route path="/create-property" element={<CreateProperty />} />
          <Route path="/property-edit" element={<PropertyEdit />} />
          <Route path="/property-view/:id" element={<PropertyView />} />
          <Route path="/converted" element={<Convert />} />
          <Route path="/followsup" element={<FollowUp />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route
            path="/leadenquiry-views/:leadId"
            element={<LeadeEnquiryLeadId />}
          />
          <Route path="/tasks" element={<Tasks />} />
          {/* +++++ */}

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
