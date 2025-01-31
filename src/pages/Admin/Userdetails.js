import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Userdetails = () => {
  const { id } = useParams(); // Get user ID from URL
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState({}); // Fix: Ensure roles are correctly set
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const menuItems = [
    { id: "inquiries", label: "Inquiries" },
    { id: "follow_ups", label: "Follow-Ups" },
    { id: "appointment", label: "Appointment" },
    { id: "scheduled_visits", label: "Scheduled Visits" },
    { id: "converted", label: "Converted" },
    { id: "property", label: "Property" },
    { id: "droped", label: "Droped" },
  ];

  // ✅ Fetch user data
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get(`/api/admin/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 200) {
          setData(res.data.data); // ✅ Store user data
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

  // ✅ Find user by ID
  const findData = data.find((item) => item?._id === id);

  // ✅ Fix: Initialize `roles` only when `findData.roles` is available
  useEffect(() => {
    if (findData?.roles) {
      setRoles(findData.roles); // ✅ Set roles correctly
    }
  }, [findData]); // ✅ Runs only when `findData` changes

  // ✅ Handle checkbox toggle
  const handleRoleChange = (roleId) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [roleId]: !prevRoles[roleId], // ✅ Toggle role
    }));
  };

  // ✅ API call to update admin roles
  const updateRoles = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.put(
        `/api/admin/${id}`,
        { roles },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200) {
        alert("Roles updated successfully!");
      }
    } catch (error) {
      console.error("Error updating roles:", error);
      alert("Failed to update roles. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
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
            <Typography variant="h6" sx={{ fontWeight: "bold", mt: 3, mb: 2 }}>
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
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box className="p-4 w-64 bg-white border rounded-lg shadow-md">
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Set Access Permissions
            </Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {menuItems.map((item) => (
                <li key={item.id} style={{ padding: "4px 0" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!roles[item.id]} // ✅ Ensure only true values are checked
                        onChange={() => handleRoleChange(item.id)}
                        color="primary"
                      />
                    }
                    label={item.label}
                  />
                </li>
              ))}
            </ul>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "150px" }}
              sx={{ mt: 2 }}
              onClick={updateRoles}
            >
              Update Roles
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Userdetails;
