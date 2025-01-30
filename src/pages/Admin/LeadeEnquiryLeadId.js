import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Select,
  Button,
  MenuItem,
  FormControl,
  Chip,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const LeadeEnquiryLeadId = () => {
  const { leadId } = useParams();

  console.log(leadId, "id");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(data, "leade");
  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("/api/lead/", {
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

  const findData = data.find((item) => item?._id === leadId);
  console.log(findData, "findData");
  const [formData, setFormData] = useState({
    sourceForm: "",
    interestedProperty: [],
    appointedEmployee: [],
    budget: "",
  });

  const [activeTab, setActiveTab] = useState(""); // Track the active tab (Follow-Up or Appointment)
  const [showFollowUpFields, setShowFollowUpFields] = useState(false); // Show follow-up fields by default

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChipToggle = (value) => {
    setActiveTab(value); // Set the active tab (either "Follow-Up" or "Appointment")
    if (value === "Follow-Up") {
      setShowFollowUpFields("Follow-Up"); // Show follow-up fields
    } else {
      setShowFollowUpFields("Appointment"); // Show appointment fields
    }
    handleInputChange("status", value); // Update the status in form data
  };

  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [followupStatus, setFollowupStatus] = useState("");
  // const[user,setUser] = useState("")
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user); // Convert string back to object
        setAdmin(parsedUser); // Update the state
        console.log(parsedUser, "decoded user details");
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  const handleSubmitFollowUp = async () => {
    if (!date || !comment || !followupStatus) {
      return alert("Please fill all the fields");
    }

    const payload = {
      leadId: findData?._id,
      adminId: admin?.id,
      date: moment(date).format("DD-MM-YYYY"),
      comment: comment,
      followupStatus: followupStatus,
    };
    try {
      const res = await axios.post("/api/followup/", payload);

      if (res.status === 201) {
        alert("Follow-up created successfully!");
        // Optionally reset form or fetch updated data
        setDate("");
        setComment("");
        setFollowupStatus("");
      } else {
        alert("Failed to create follow-up");
      }
    } catch (error) {
      console.error("Error creating follow-up:", error);
      alert("An error occurred while submitting the follow-up");
    }
  };

  const [date1, setDate1] = useState("");
  const [time1, setTime1] = useState("");
  const [comment1, setComment1] = useState("");
  const [followupStatus1, setFollowupStatus1] = useState("");
  const handleSubmitApointment = async () => {
    if (!date1 || !comment1) {
      return alert("Please fill all the fields");
    }
    const payload = {
      leadId: findData?._id,
      adminId: admin?.id,
      date: moment(date1).format("DD-MM-YYYY"),
      comment: comment1,
      // followupStatus:followupStatus1,
    };
    try {
      const res = await axios.post("/api/appointment/", payload);

      if (res.status === 201) {
        alert("Follow-up created successfully!");
        // Optionally reset form or fetch updated data
        setDate1("");
        setComment1("");
        setFollowupStatus1("");
      } else {
        alert("Failed to create follow-up");
      }
    } catch (error) {
      console.error("Error creating follow-up:", error);
      alert("An error occurred while submitting the follow-up");
    }
  };

  const [followpData, setfollowpData] = useState([]);

  const [appointmentData, setAppointmentData] = useState([]);
  useEffect(() => {
    const getAllFollowUps = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8005/api/followup/lead/${leadId}`
        );
        if (res.status === 200) {
          setfollowpData(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllFollowUps();
  }, [leadId]);

  useEffect(() => {
    const getAllAppointment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8005/api/appointment/lead/${leadId}`
        );
        if (res.status === 200) {
          setAppointmentData(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllAppointment();
  }, []);

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
              label={findData?.fullName}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Name"
              value={findData?.fullName}
            />
            <TextField
              label={findData?.email}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Email"
              value={findData?.email}
            />
            <TextField
              label={findData?.phoneNumber}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Phone No."
              value={findData?.phoneNumber}
            />
            <TextField
              label={findData?.alternatePhoneNumber}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Other Ph. No."
              value={findData?.alternatePhoneNumber}
            />
            <TextField
              // label={findData.customerNotes}
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Add Notes"
              multiline
              rows={3}
              value={findData?.customerNotes}
            />
          </Box>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={12} md={6}>
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
                  Follow-Up
                </Typography>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Customer Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Schedule
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {followpData?.length > 0 ? (
                        followpData?.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {row?.leadId?.fullName || "N/A"}
                            </TableCell>
                            <TableCell>{row?.date || "N/A"}</TableCell>
                            <TableCell>
                              {row?.followupStatus || "N/A"}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No Follow-Ups Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                  Appointment
                </Typography>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Customer Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Schedule
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {appointmentData.length > 0 ? (
                        appointmentData.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{findData?.fullName || "N/A"}</TableCell>
                            <TableCell>{row.date || "N/A"}</TableCell>
                            <TableCell>{row.status || "N/A"}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            No Appointment Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Paper>
              </Box>
            </Grid>
          </Grid>
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
              <Chip
                label={findData?.status}
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              />
            </Box>

            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Source From *
              </Typography>
              <Chip
                label={findData?.sourceFrom}
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              />
            </Box>

            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Interested Property
              </Typography>

              <Chip
                label={findData?.interestedProperty}
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              />
            </Box>

            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Appointed Employee
              </Typography>
              {findData?.assignedTo ? (
                <Chip
                  label={findData.assignedTo.name} // Access the name property
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                  }}
                />
              ) : (
                <Typography>No assigned employee</Typography>
              )}
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                Budget
              </Typography>

              <Chip
                label={findData?.budget}
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#FF9800",
                  color: "white",
                }}
              />
            </Box>

            {/* Follow-Up and Appointment Chips */}
            <Box sx={{ marginBottom: "10px" }}>
              <Chip
                label="Follow-Up"
                onClick={() => handleChipToggle("Follow-Up")}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    activeTab === "Follow-Up" ? "#4CAF50" : "#f5f5f5",
                  color: activeTab === "Follow-Up" ? "white" : "black",
                  cursor: "pointer",
                }}
              />
              <Chip
                label="Appointment"
                onClick={() => handleChipToggle("Appointment")}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    activeTab === "Appointment" ? "#4CAF50" : "#f5f5f5",
                  color: activeTab === "Appointment" ? "white" : "black",
                  cursor: "pointer",
                }}
              />
            </Box>

            {/* Follow-Up Fields (visible only when "Follow-Up" is selected) */}
            {showFollowUpFields === "Follow-Up" && (
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                  label="Comment *"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter Comment"
                  multiline
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="followup-status-label">
                    Follow-Up Status *
                  </InputLabel>
                  <Select
                    labelId="followup-status-label"
                    id="followup-status"
                    value={followupStatus}
                    onChange={(e) => setFollowupStatus(e.target.value)}
                    label="Follow-Up Status *"
                  >
                    <MenuItem value="Interested">Interested</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "20px" }}
                  onClick={handleSubmitFollowUp}
                >
                  Submit
                </Button>
              </Box>
            )}

            {/* Appointment Fields (visible only when "Appointment" is selected) */}
            {showFollowUpFields === "Appointment" && (
              <Box
                sx={{
                  backgroundColor: "#fff",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  marginTop: "24px",
                }}
              >
                {/* Section Title */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "16px",
                    color: "#333",
                  }}
                >
                  Appointment Details
                </Typography>

                {/* Date & Time Row */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Follow-Up Date *"
                      fullWidth
                      type="date"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Follow-Up Time *"
                      fullWidth
                      type="time"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={time1}
                      onChange={(e) => setTime1(e.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* Comment Box */}
                <TextField
                  label="Comment *"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  placeholder="Enter Comment"
                  multiline
                  rows={3}
                  value={comment1}
                  onChange={(e) => setComment1(e.target.value)}
                  sx={{ marginTop: "16px" }}
                />

                {/* Submit Button */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    marginTop: "20px",
                    padding: "12px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "green",
                    "&:hover": { backgroundColor: "#0056b3" },
                  }}
                  onClick={handleSubmitApointment}
                >
                  Submit
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeadeEnquiryLeadId;
