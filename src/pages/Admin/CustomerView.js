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



 const [activeTab, setActiveTab] = useState("Follow-Up"); // Track the active tab (Follow-Up or Appointment)
  const [showFollowUpFields, setShowFollowUpFields] = useState(true); // Show follow-up fields by default

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChipToggle = (value) => {
    setActiveTab(value); // Set the active tab (either "Follow-Up" or "Appointment")
    if (value === "Follow-Up") {
      setShowFollowUpFields(true); // Show follow-up fields
    } else {
      setShowFollowUpFields(false); // Show appointment fields
    }
    handleInputChange("status", value); // Update the status in form data
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
               {/* Follow-Up and Appointment Chips */}
                        <Box sx={{ marginBottom: "10px" }}>
                          <Chip
                            label="Follow-Up"
                            onClick={() => handleChipToggle("Follow-Up")}
                            sx={{
                              marginRight: "10px",
                              backgroundColor: activeTab === "Follow-Up" ? "#4CAF50" : "#f5f5f5",
                              color: activeTab === "Follow-Up" ? "white" : "black",
                              cursor: "pointer",
                            }}
                          />
                          <Chip
                            label="Appointment"
                            onClick={() => handleChipToggle("Appointment")}
                            sx={{
                              marginRight: "10px",
                              backgroundColor: activeTab === "Appointment" ? "#4CAF50" : "#f5f5f5",
                              color: activeTab === "Appointment" ? "white" : "black",
                              cursor: "pointer",
                            }}
                          />
                        </Box>
            
                        {/* Follow-Up Fields (visible only when "Follow-Up" is selected) */}
                        {showFollowUpFields && (
                          <Box
                            sx={{
                              backgroundColor: "#fff",
                              padding: "20px",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                              marginTop: "20px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", marginBottom: "10px" }}
                            >
                              Follow-Up Details
                            </Typography>
                            <TextField
                              label="Follow-Up Date *"
                              fullWidth
                              type="date"
                              variant="outlined"
                              margin="normal"
                              placeholder="DD/MM/YYYY"
                              value={formData.date}
                              onChange={(e) => handleInputChange("date", e.target.value)}
                            />
                            <TextField
                              label="Comment *"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Comment"
                              multiline
                              rows={3}
                              value={formData.comment}
                              onChange={(e) => handleInputChange("comment", e.target.value)}
                            />
                            <TextField
                              label="Follow-Up Status *"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Status"
                              value={formData.followupStatus}
                              onChange={(e) =>
                                handleInputChange("followupStatus", e.target.value)
                              }
                            />
                          </Box>
                        )}
            
                        {/* Appointment Fields (visible only when "Appointment" is selected) */}
                        {!showFollowUpFields && (
                          <Box
                            sx={{
                              backgroundColor: "#fff",
                              padding: "20px",
                              borderRadius: "8px",
                              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
                              marginTop: "20px",
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", marginBottom: "10px" }}
                            >
                              Appointment Details
                            </Typography>
                            <TextField
                              label="Appointment Date *"
                              fullWidth
                              type="date"
                              variant="outlined"
                              margin="normal"
                              placeholder="DD/MM/YYYY"
                              value={formData.date}
                              onChange={(e) => handleInputChange("date", e.target.value)}
                            />
                            <TextField
                              label="Comment *"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Comment"
                              multiline
                              rows={3}
                              value={formData.comment}
                              onChange={(e) => handleInputChange("comment", e.target.value)}
                            />
                            <TextField
                              label="Follow-Up Status *"
                              fullWidth
                              variant="outlined"
                              margin="normal"
                              placeholder="Enter Status"
                              value={formData.followupStatus}
                              onChange={(e) =>
                                handleInputChange("followupStatus", e.target.value)
                              }
                            />
                          </Box>
                        )}
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
        
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerEdit;
