import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Userdetails = () => {
  const [formData, setFormData] = useState({
    userType: "Admin",
    fullName: "Anjana",
    email: "info@nakshatranamahacreations.com",
    phoneNumber: "9108703981",
    alternatePhoneNumber: "9900566466",
    userLoginId: "Anjana",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [isEditing, setIsEditing] = useState(true); // Toggle between view and edit modes

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const { id } = useParams(); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(data,"data")
  
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("/api/admin/", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        
        if (res.status === 200) {
          setData(res.data.data); // Update state with the response data
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    getUser();
  }, []);


  const findData = data.find((item) => item?._id === id); 
// console.log(findData,"findData")
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Form Section */}
        {isEditing && (
          <>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  Basic Details
                </Typography>
                <TextField
                  label="User ID"
                  fullWidth
                             variant="outlined"
                             margin="normal"
                             value={findData?._id || "-"}
                             disabled
                />
                
               
                  <TextField
                             label="User Name"
                             fullWidth
                             variant="outlined"
                             margin="normal"
                             value={findData?.name || "-"}
                             disabled
                           />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "20px",
                    marginBottom: "10px",
                  }}
                >
                  Contact Details
                </Typography>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={findData?.email || "-"}
                  disabled
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={findData?.phonenumber || "-"}
                  disabled
                />
                <TextField
                  label="Role"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  value={findData?.roles || "-"}
                  disabled
                />
              </Box>
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: "10px" }}
                >
                  Login Details
                </Typography>
                <TextField
                  label="User Login ID *"
                  fullWidth
                  variant="outlined"
                  value={formData.userLoginId}
                  onChange={(e) =>
                    handleInputChange("userLoginId", e.target.value)
                  }
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Password *"
                  type="password"
                  fullWidth
                  variant="outlined"
                  placeholder="Leave blank to keep current password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Confirm Password *"
                  type="password"
                  fullWidth
                  variant="outlined"
                  placeholder="Re-Enter Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  sx={{ marginBottom: "16px" }}
                />
               
              </Box>
            </Grid> */}
          </>
        )}

     
      </Grid>

    </Box>
  );
};

export default Userdetails;
