import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { Card, CardHeader, CardContent,  Table, TableBody, TableCell, TableHead, TableRow, } from '@mui/material';

const ScheduleVisitedetails = () => {
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

  const customerData = {
    fullName: 'first lead',
    email: 'nithincgowdabeliver@outlook.com',
    phoneNumber: '06360744684',
    alternatePhoneNumber: '06360744684',
    rescheduleDate: '0000-00-00',
    time: '04:03:00',
    sourceFrom: 'Website',
    followUpStatus: 'Pending',
    priority: 'cold',
    appointedEmployee: 'naveen',
    outcome: 'Successful',
    interestedProperty: 'apartment',
    budget: '0.00'
  };

  const customerNotes = [
    { timestamp: '2025-01-09 10:25:47', comment: 'in schedule visit added comment' },
    { timestamp: '2025-01-09 10:23:25', comment: 'in followup added comment' },
    { timestamp: '2025-01-09 10:22:02', comment: 'naveen added comment' },
    { timestamp: '2025-01-09 10:09:11', comment: 'followup added to this customer' },
    { timestamp: '2025-01-09 10:00:28', comment: 'hello' }
  ];

  const InfoRow = ({ label, value }) => (
    <div style={{ display: 'flex', padding: '8px 16px', backgroundColor: '#f5f5f5', marginBottom: '8px' }}>
      <div style={{ width: '30%', fontWeight: 'bold' }}>{label}</div>
      <div style={{ width: '70%' }}>{value}</div>
    </div>
  );


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
              label="Reschedule Date "
              fullWidth
              variant="outlined"
              type="date"
              margin="normal"
          
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
            </Typography>
            <Box sx={{ marginBottom: "10px" }}>
                
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
               Follow-Up Status *
              </Typography>
              {["Rescheduled", "Pending", "Completed"].map((status) => (
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
                Priority *
                </Typography>
                {["Hot", "Cold", "Warm"].map((status) => (
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
              Outcome *
                </Typography>
                {["Successful", "Unuccessful",].map((status) => (
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
          
        </Grid>
        
        {/* View */}
        <Grid item xs={12} md={4}>
        <Card sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <CardHeader title="PREVIEW" />
      <CardContent>
        <div>
          {Object.entries(customerData).map(([key, value]) => (
            <InfoRow
              key={key}
              label={key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}
              value={value}
            />
          ))}
        </div>

        <div style={{ marginTop: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Customer Notes
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerNotes.map((note, index) => (
                <TableRow key={index}>
                  <TableCell>{note.timestamp}</TableCell>
                  <TableCell>{note.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'right' }}>
          <Button variant="contained" color="success">
            UPDATE
          </Button>
        </div>
      </CardContent>
    </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ScheduleVisitedetails;
