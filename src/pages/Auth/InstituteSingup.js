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

const InstituteSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
            Institute Sign Up
          </Typography>

          {/* Welcome Message */}
          


       
              <Box sx={{ width: 400, padding: "20px" }}>
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
         
          </Typography>
          <TextField
            label="Logo"
            fullWidth
            margin="normal"
             type="file"
             sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.instituteName || ""}
            // onChange={(e) => handleInputChange("instituteName", e.target.value)}
          />
          <TextField
            label="Institute Name"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.instituteName || ""}
            // onChange={(e) => handleInputChange("instituteName", e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.email || ""}
            // onChange={(e) => handleInputChange("email", e.target.value)}
          />
          <TextField
            label="Number"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.number || ""}
            // onChange={(e) => handleInputChange("number", e.target.value)}
          />
          <TextField
            label="Contact Person"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.number || ""}
            // onChange={(e) => handleInputChange("number", e.target.value)}
          />
         
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.address || ""}
            // onChange={(e) => handleInputChange("address", e.target.value)}
          />
            <TextField
            label="Pin Code"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.number || ""}
            // onChange={(e) => handleInputChange("number", e.target.value)}
          />
           <TextField
            label="City"
            fullWidth 
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.number || ""}
            // onChange={(e) => handleInputChange("number", e.target.value)}
          />
            <TextField
            label="GST Number"
            fullWidth 
            margin="normal"
            sx={{
              backgroundColor: "#f0f0f0", 
              borderRadius: "8px", 
              borderColor: "#5A52D6",
              
            }}
            // value={selectedRow?.number || ""}
            // onChange={(e) => handleInputChange("number", e.target.value)}
          />
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
                  marginTop:"30px"
              }}
           
            >
              Submit
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

export default InstituteSignup;
