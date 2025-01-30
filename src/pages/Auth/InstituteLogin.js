import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@mui/material";
import { globalColor } from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";

const InstituteLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("admin"); 
  const navigate = useNavigate();

  const handlenavigate=()=>{
    navigate('/InstituteSignup')
  }

  const StyledButton = styled(Button)({
    fontFamily: "Poppins",
    backgroundColor: "#7366FF",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#5A52D6",
    },
  });
  const [selectedRow, setSelectedRow] = useState(null);
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
          Institute Login
          </Typography>

          


          {/* Sign-In Form */}
          <Box component="form" sx={{ width: "100%", maxWidth: "400px" }}>
            <TextField
              label="Email"
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
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      color: "#fff",
                      "&.Mui-checked": { color: "#fff" },
                    }}
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#f0f0f0",
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                Show
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fff",
                color: globalColor.mainColor,
                padding: "10px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#e6e6e6",
                },
              }}
              
            >
              Login
            </Button>
       

            {/* Links */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                color: "#fff",
              }}
            >
              {/* <Link
              onClick={handlenavigate}
                href="#"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >Institute SignUp</Link> */}
              <Link
          
          href="#"
          sx={{
            color: "#fff",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        ></Link>
              <Link
                href="institute-forget"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Forgot password?
              </Link>
            </Box>
            <Button
            onClick={handlenavigate}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#fff",
                color: globalColor.mainColor,
                padding: "10px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "8px",
                marginTop:"20px",
                "&:hover": {
                  backgroundColor: "#e6e6e6",
                },
              }}

            >
              Register
            </Button>
          </Box>
           
   
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

export default InstituteLogin;
