import React, { useState } from "react";
import { Box, Grid, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const InstituteForget = () => {
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const navigate = useNavigate();

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
            background: "linear-gradient(to top right, #7366FF, #5A52D6)",
            color: "#fff", // Text color for contrast
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 4,
              color: "#fff", // Logo text color
              fontFamily: "Poppins",
            }}
          >
           Institute    
          </Typography>

          {/* Conditional Rendering Based on Form State */}
          {showNewPasswordForm ? (
            <>
              {/* New Password Form */}
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "30px",
                  color: "#f0f0f0",
                  textAlign: "center",
                }}
              >
                Set New Password
              </Typography>
              <Box component="form" sx={{ width: "100%", maxWidth: "400px" }}>
                <TextField
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    color: "#7366FF",
                    padding: "10px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "16px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#e6e6e6",
                    },
                  }}
                //   onClick={() => navigate("/dashboard")}
                >
                  Reset Password
                </Button>
              </Box>
            </>
          ) : (
            <>
              {/* Forgot Password Form */}
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "30px",
                  color: "#f0f0f0",
                  textAlign: "center",
                }}
              >
                Forgot Password
              </Typography>
              <Box component="form" sx={{ width: "100%", maxWidth: "400px" }}>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <TextField
                  label="OTP"
                  variant="outlined"
                  type="password"
                  fullWidth
                  sx={{
                    mb: 2,
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "8px",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    color: "#7366FF",
                    padding: "10px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "16px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#e6e6e6",
                    },
                  }}
                  onClick={() => setShowNewPasswordForm(true)}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundImage:
              "url('https://vityarthi.com/assets/frontend/default-new/image/loginbg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </Box>
  );
};

export default InstituteForget;
