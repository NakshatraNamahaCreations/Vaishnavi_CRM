import React, { useState } from "react";
import { Box, Grid, TextField, Typography, Button, Chip } from "@mui/material";

const PropertyEdit = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    customerNotes: "",
    status: "",
    sourceForm: "",
    appointedEmployee: "",
    interestedProperty: [],
    budget: "",
    constructionStatus: "",
    sellingStatus: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChipToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    alert("Form submitted");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Input Section */}
        <Grid item xs={12} md={4}>
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
              Property Details
            </Typography>
            <TextField
              label="Property Name *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
            <TextField
              label="Property Type *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Property Type"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <TextField
              label="Location *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Location"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Address"
              multiline
              rows={2}
              value={formData.alternatePhoneNumber}
              onChange={(e) =>
                handleInputChange("alternatePhoneNumber", e.target.value)
              }
            />
          </Box>
        </Grid>

        {/* Additional Details Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Additional Details
          </Typography>
          <TextField
            label="Amenities *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Amenities"
            value={formData.customerNotes}
            onChange={(e) => handleInputChange("customerNotes", e.target.value)}
          />
          <TextField
            label="Availability Date *"
            fullWidth
            variant="outlined"
            type="date"
            margin="normal"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          />
          <TextField
            label="Size(sq ft) *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Size(sq ft)"
            value={formData.sourceForm}
            onChange={(e) => handleInputChange("sourceForm", e.target.value)}
          />
          <TextField
            label="Min. Price *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Min. Price"
            value={formData.budget}
            onChange={(e) => handleInputChange("budget", e.target.value)}
          />
          <TextField
            label="Max. Price *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Max. Price"
            value={formData.interestedProperty}
            onChange={(e) => handleInputChange("interestedProperty", e.target.value)}
          />
          <TextField
            label="Number of Floors *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Number of Floors"
          />

          <Box sx={{ marginBottom: "10px" }}>
            <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
              Construction Status *
            </Typography>
            {["Completed", "Under Construction"].map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => handleChipToggle("constructionStatus", status)}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    formData.constructionStatus === status ? "#4CAF50" : "#f5f5f5",
                  color: formData.constructionStatus === status ? "white" : "black",
                }}
              />
            ))}
          </Box>

          <Box sx={{ marginBottom: "10px" }}>
            <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
              Selling Status *
            </Typography>
            {["For Sale", "Sold"].map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => handleChipToggle("sellingStatus", status)}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    formData.sellingStatus === status ? "#4CAF50" : "#f5f5f5",
                  color: formData.sellingStatus === status ? "white" : "black",
                }}
              />
            ))}
          </Box>
        </Grid>

        {/* Live Display Section */}
        <Grid item xs={12} md={4}>
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
           PREVIEW
            </Typography>
            <Typography>
              <strong>Property Name:</strong> {formData.fullName || "-"}
            </Typography>
            <Typography>
              <strong>Property Type:</strong> {formData.email || "-"}
            </Typography>
            <Typography>
              <strong>Location:</strong> {formData.phoneNumber || "-"}
            </Typography>
            <Typography>
              <strong>Address:</strong> {formData.alternatePhoneNumber || "-"}
            </Typography>
            <Typography>
              <strong>Amenities:</strong> {formData.customerNotes || "-"}
            </Typography>
            <Typography>
              <strong>Availability Date:</strong> {formData.status || "-"}
            </Typography>
            <Typography>
              <strong>Size (sq ft):</strong> {formData.sourceForm || "-"}
            </Typography>
            <Typography>
              <strong>Min. Price:</strong> {formData.budget || "-"}
            </Typography>
            <Typography>
              <strong>Max. Price:</strong> {formData.interestedProperty || "-"}
            </Typography>
            <Typography>
              <strong>Number of Floors:</strong> {formData.numberOfFloors || "-"}
            </Typography>
            <Typography>
              <strong>Construction Status:</strong> {formData.constructionStatus || "-"}
            </Typography>
            <Typography>
              <strong>Selling Status:</strong> {formData.sellingStatus || "-"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyEdit;
