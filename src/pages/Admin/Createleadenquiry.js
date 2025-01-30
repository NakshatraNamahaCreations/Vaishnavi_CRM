import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, Button, Chip } from "@mui/material";
import axios from "axios";

const Createleadenquiry = () => {
  // const handleInputChange = (field, value) => {
  //   setFormData((prev) => ({ ...prev, [field]: value }));
  // };

  // const handleChipToggle = (field, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [field]: prev[field].includes(value)
  //       ? prev[field].filter((item) => item !== value)
  //       : [...prev[field], value],
  //   }));
  // };

  const handleSubmit = () => {
    alert("Form submitted");
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(data);
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [status, setStatus] = useState("");
  const [sourceForm, setSourceForm] = useState("");
  const [appointedEmployee, setAppointedEmployee] = useState("");
  const [interestedProperty, setInterestedProperty] = useState("");
  const [budget, setBudget] = useState("");
  const [userid, setUserid] = useState({});
  const createLead = async () => {
    if (
      !name ||
      !email ||
      !phoneNumber ||
      !status ||
      !sourceForm ||
      !appointedEmployee ||
      interestedProperty.length === 0 ||
      !budget
    ) {
      return alert("Please fill in all required fields.");
    }

    const payload = {
      fullName: name,
      email,
      phoneNumber,
      alternatePhoneNumber: alternateNumber,
      customerNotes,
      status,
      sourceForm,
      appointedEmployee,
      interestedProperty,
      budget,
      assignedTo: userid,
    };

    try {
      const res = await axios.post("/api/lead/create", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 201) {
        alert("Lead enquiry created successfully!");
        // Reset Form
        setName("");
        setEmail("");
        setPhoneNumber("");
        setAlternateNumber("");
        setCustomerNotes("");
        setStatus("");
        setSourceForm("");
        setAppointedEmployee("");
        setInterestedProperty([]);
        setBudget("");
      } else {
        alert("Failed to create lead enquiry.");
      }
    } catch (error) {
      console.error("Error submitting lead enquiry:", error);
      alert("An error occurred. Please try again.");
    }
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email *"
              fullWidth
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Phone Number *"
              fullWidth
              variant="outlined"
              margin="normal"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              label="Alternate Phone Number"
              fullWidth
              variant="outlined"
              margin="normal"
              value={alternateNumber}
              onChange={(e) => setAlternateNumber(e.target.value)}
            />
            <TextField
              label="Customer Notes"
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              Details
            </Typography>

            {/* Status */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
              Status *
            </Typography>
            {["Follow-Up", "Appointment", "New Enquiry", "Converted"].map(
              (s) => (
                <Chip
                  key={s}
                  label={s}
                  onClick={() => setStatus(s)}
                  sx={{
                    marginRight: "10px",
                    backgroundColor: status === s ? "#4CAF50" : "#f5f5f5",
                    color: status === s ? "white" : "black",
                  }}
                />
              )
            )}

            {/* Source From */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
              Source From *
            </Typography>
            {["Website", "Referral", "Agent"].map((source) => (
              <Chip
                key={source}
                label={source}
                onClick={() => setSourceForm(source)}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    sourceForm === source ? "#4CAF50" : "#f5f5f5",
                  color: sourceForm === source ? "white" : "black",
                }}
              />
            ))}

            {/* Appointed Employee */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
              Appointed Employee *
            </Typography>
            {data.map((employee) => (
              <Chip
                key={employee?._id}
                label={employee?.name}
                onClick={() => {
                  setAppointedEmployee(employee.name);
                  setUserid(employee?._id);
                }}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    appointedEmployee === employee.name ? "#4CAF50" : "#f5f5f5",
                  color:
                    appointedEmployee === employee.name ? "white" : "black",
                }}
              />
            ))}

            {/* Interested Property */}
            <Typography sx={{ fontWeight: "bold", marginTop: "20px" }}>
              Interested Property *
            </Typography>
            {["villa", "apartment", "layout"].map((property) => (
              <Chip
                key={property}
                label={property}
                onClick={() => setInterestedProperty(property)} // Set the selected property
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    interestedProperty === property ? "#4CAF50" : "#f5f5f5",
                  color: interestedProperty === property ? "white" : "black",
                }}
              />
            ))}

            <TextField
              label="Budget *"
              fullWidth
              variant="outlined"
              margin="normal"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
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
              LIVE DISPLAY
            </Typography>
            <Typography>
              <strong>Full Name:</strong> {name || "-"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {email || "-"}
            </Typography>
            <Typography>
              <strong>Phone Number:</strong> {phoneNumber || "-"}
            </Typography>
            <Typography>
              <strong>Alternate Phone Number:</strong> {alternateNumber || "-"}
            </Typography>
            <Typography>
              <strong>Customer Notes:</strong> {customerNotes || "-"}
            </Typography>
            <Typography>
              <strong>Status:</strong> {status || "-"}
            </Typography>
            <Typography>
              <strong>Source From:</strong> {sourceForm || "-"}
            </Typography>
            <Typography>
              <strong>Appointed Employee:</strong> {appointedEmployee || "-"}
            </Typography>
            <Typography>
              <strong>Interested Property:</strong> {interestedProperty || "-"}
            </Typography>
            <Typography>
              <strong>Budget:</strong> {budget || "-"}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={createLead}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Createleadenquiry;
