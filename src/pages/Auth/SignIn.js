import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AdminLogin = () => {


  // Styled Button with Material-UI's styled API
  const StyledButton = styled(Button)({
    fontFamily: "Poppins",
    backgroundColor: "#038f05",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor:"#707070"
    },
  });

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: "-100vh" },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } },
  };



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // To navigate to another page on successful login

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if(! email || !password) {
      return alert ("Please fill in all fields");
    }
    try {
      const response = await axios.post("/api/admin/login", { email, password });
      
      if (response.data.success) {
        // Store JWT token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          roles: response.data.roles,
        }));
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid container sx={{ height: "100vh" }}>
        {/* Left Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            background: "#0b0303",
            color: "#fff",
          }}
        >
          {/* Logo */}
          <img
            src="../vlogo.webp"
            alt="logo"
            style={{ height: "150px", marginBottom: "20px" }}
          />
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              color: "#fff",
              fontFamily: "Poppins",
              fontWeight: "bold",
            }}
          >
            Welcome to Admin Panel
          </Typography>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
              width: "400px",
              padding: "40px",
              borderRadius: "10px",
              boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#5A52D6",
                marginBottom: "20px",
                fontFamily: "Poppins",
              }}
            >
              Admin Login
            </Typography>

            {/* Email Field */}
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: "20px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: "20px" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Login Button */}
            <a href="/dashboard">
            <StyledButton
              variant="contained"
              fullWidth
              startIcon={<LoginIcon />}
              onClick={handleLogin}
              sx={{ fontSize: "16px", padding: "10px 0" }}
            >
              Login
            </StyledButton>
            </a>

            {/* Footer */}
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "gray",
                marginTop: "20px",
                fontFamily: "Poppins",
              }}
            >
              © {new Date().getFullYear()} Admin Panel
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLogin;
