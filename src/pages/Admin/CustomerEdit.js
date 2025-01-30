import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
} from "@mui/material";

const CustomerEdit = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    customerNotes: "",
    status: "",
    sourceForm: "",
    interestedProperty: [],
    appointedEmployee: [],
    budget: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChipToggle = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = () => {
    alert("Form submitted");
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Input Section */}
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
              Customer Basic Details
            </Typography>
            <TextField
              label="Full Name *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
            />
            <TextField
              label="Email *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <TextField
              label="Phone Number *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Phone No."
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />
            <TextField
              label="Alternate Phone Number"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Other Ph. No."
              value={formData.alternatePhoneNumber}
              onChange={(e) =>
                handleInputChange("alternatePhoneNumber", e.target.value)
              }
            />
            <TextField
              label="Customer Notes"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Add Notes"
              multiline
              rows={3}
              value={formData.customerNotes}
              onChange={(e) =>
                handleInputChange("customerNotes", e.target.value)
              }
            />
          </Box>
        </Grid>

        {/* Details Section */}
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
              Details
            </Typography>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Status *
              </Typography>
              {["Follow-Up", "Appointed", "New Enquiry"].map((status) => (
                <Chip
                  key={status}
                  label={status}
                  onClick={() => handleInputChange("status", status)}
                  sx={{
                    marginRight: "10px",
                    backgroundColor:
                      formData.status === status ? "#4CAF50" : "#f5f5f5",
                    color: formData.status === status ? "white" : "black",
                  }}
                />
              ))}
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Source From *
              </Typography>
              {["Website", "Referral", "Mobile App"].map((source) => (
                <Chip
                  key={source}
                  label={source}
                  onClick={() => handleInputChange("sourceForm", source)}
                  sx={{
                    marginRight: "10px",
                    backgroundColor:
                      formData.sourceForm === source ? "#4CAF50" : "#f5f5f5",
                    color: formData.sourceForm === source ? "white" : "black",
                  }}
                />
              ))}
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Interested Property
              </Typography>
              {["villa", "apartment", "layout"].map((property) => (
                <Chip
                  key={property}
                  label={property}
                  onClick={() =>
                    handleChipToggle("interestedProperty", property)
                  }
                  sx={{
                    marginRight: "10px",
                    backgroundColor: formData.interestedProperty.includes(
                      property
                    )
                      ? "#4CAF50"
                      : "#f5f5f5",
                    color: formData.interestedProperty.includes(property)
                      ? "white"
                      : "black",
                  }}
                />
              ))}
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Appointed Employee
              </Typography>
              {["naveen", "Nithin", "Anjana"].map((employee) => (
                <Chip
                  key={employee}
                  label={employee}
                  onClick={() =>
                    handleChipToggle("appointedEmployee", employee)
                  }
                  sx={{
                    marginRight: "10px",
                    backgroundColor: formData.appointedEmployee.includes(
                      employee
                    )
                      ? "#4CAF50"
                      : "#f5f5f5",
                    color: formData.appointedEmployee.includes(employee)
                      ? "white"
                      : "black",
                  }}
                />
              ))}
            </Box>
            <TextField
              label="Budget"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Maximum Price"
              value={formData.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
              InputProps={{
                startAdornment: (
                  <Typography sx={{ marginRight: "10px" }}>₹</Typography>
                ),
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerEdit;
