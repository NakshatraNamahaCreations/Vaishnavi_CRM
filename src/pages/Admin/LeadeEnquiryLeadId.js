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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const LeadeEnquiryLeadId = () => {
  const { leadId } = useParams();

  console.log(leadId, "idd");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // console.log(data, "leade");
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
  // console.log(findData, "findData");
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

  console.log(findData, "findes");
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
      // new added
      followupname: findData?.salesperson,
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

  const handleUpdateLeadStatus = async (leadId) => {
    try {
      const response = await axios.put(
        `http://localhost:8005/api/lead/leads/status/${leadId}`,
        { status: "Converted" }, // Make sure this matches what your backend expects
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Update Success:", response.data);
    } catch (error) {
      console.error(
        "Error updating lead status:",
        error.response?.data || error.message
      );
    }
  };

  const [openModal, setOpenModal] = useState(false);
  // ✅ Open Modal with pre-filled data
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // ✅ Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const [edit, setEdit] = useState({});
  console.log(findData?.fullName, "edit");
  const [bookingType, setBookingType] = useState("");
  console.log(bookingType, "bookingType");
  const [uniteno, setUniteno] = useState("");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [price, setPrice] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [companyname, setCompanyname] = useState("");
  const [source, setSource] = useState("");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const calculatedTotal =
      parseFloat(price) + (parseFloat(price) * parseFloat(percentage)) / 100;
    setTotal(isNaN(calculatedTotal) ? 0 : calculatedTotal); // Avoid NaN
  }, [price, percentage]);

  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8005/api/lead/update-lead/${findData?._id}`, // Pass correct ID
        {
          uniteno,
          price,
          percentage,
          total,
          companyname,
          bookingtype: bookingType,
          total: total,
          confirmBook: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Success:", response.data);
      alert(response.data?.message || "Lead updated successfully!");
      handleCloseModal();
    } catch (error) {
      console.error(
        "Error updating lead status:",
        error.response?.data || error.message
      );
      alert("Failed to update lead. Please try again.");
    }
  };

  const [sales, setSales] = useState([]);
  console.log(sales, "sales");
  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await axios.get("/api/sales/");
        if (res.status === 200) {
          setSales(res.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getSales();
  }, []);

  const [editassign, setEditassign] = useState(null); // Ensure it's null initially
  const [acc, setAcc] = useState(true);
  const [selectedSalesperson, setSelectedSalesperson] = useState("");

  // Function to update salesperson
  const assignSalesperson = async (salesperson) => {
    try {
      const response = await axios.put(
        `http://localhost:8005/api/lead/lead/${editassign._id}`,
        { salesperson } // Send selected salesperson
      );

      alert(response.data?.message || "Salesperson updated successfully!");
      window.location.reload(); // Reload UI to reflect the update
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update salesperson.");
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
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Customer Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Schedule
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Status
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>
                         Created By
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {followpData?.length > 0 ? (
                        followpData?.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              {moment(row?.createdAt).format(
                                "DD-MM-YYYY hh:mm A"
                              ) || "N/A"}
                            </TableCell>
                            <TableCell>
                              {row?.leadId?.fullName || "N/A"}
                            </TableCell>
                            <TableCell>{row?.date || "N/A"}</TableCell>
                            <TableCell>
                              {row?.followupStatus || "N/A"}
                            </TableCell>
                            <TableCell>{row?.followupname || "N/A"}</TableCell>
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
                  Schedule visit
                </Typography>
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
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
                            <TableCell>
                              {moment(row?.createdAt).format(
                                "DD-MM-YYYY HM:a"
                              ) || "N/A"}
                            </TableCell>
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
                Assign Sales Person*
              </Typography>
              <Chip
                label={findData?.salesperson}
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              />
            </Box>
            <Box sx={{ marginBottom: "10px" }}>
              <Chip
                label="Reassign Sales Team"
                sx={{
                  marginRight: "10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
                onClick={() => {
                  setAcc(!acc);
                  setEditassign(findData); // Make sure `findData` is correctly set
                }}
              />
            </Box>

            {!acc && (
              <>
                {sales?.map((source) => (
                  <Chip
                    key={source?.name}
                    label={source?.name}
                    onClick={() => {
                      setSelectedSalesperson(source.name);
                      assignSalesperson(source.name); // Call API on selection
                    }}
                    sx={{
                      marginRight: "10px",
                      backgroundColor:
                        selectedSalesperson === source.name
                          ? "#4CAF50"
                          : "#f5f5f5",
                      color:
                        selectedSalesperson === source.name ? "white" : "black",
                    }}
                  />
                ))}
              </>
            )}
            {/* <Box sx={{ marginBottom: "10px" }}>
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
            </Box> */}
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

            {findData?.confirmBook === true ? (
              <>
                {" "}
                <Box sx={{ marginBottom: "10px" }}>
                  <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Booked
                  </Typography>
                  <Chip
                    label="Booked"
                    sx={{
                      marginRight: "10px",
                      backgroundColor: "#FF9800",
                      color: "white",
                    }}
                  />
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ marginBottom: "10px" }}>
                  <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
                    Booking Status
                  </Typography>

                  <Chip
                    label="Confirm Book"
                    sx={{
                      marginRight: "10px",
                      backgroundColor: "#FF9800",
                      color: "white",
                    }}
                    onClick={() => {
                      handleOpenModal();
                      setEdit(findData);
                    }}
                    // onClick={() => handleUpdateLeadStatus(leadId)}
                  />
                </Box>
              </>
            )}

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
                label="Schedule Visit"
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
                    <MenuItem value="RNR">RNR</MenuItem>
                    <MenuItem value="Call Later">Call Later</MenuItem>
                    <MenuItem value="Interested"> Interested</MenuItem>
                    <MenuItem value="Not Interested"> Not Interested</MenuItem>
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
                  Schedule Visit Details
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

          {/* ✅ Booking Modal */}
          <Dialog
            open={openModal}
            onClose={handleCloseModal}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>Confirm Booking</DialogTitle>
            <DialogContent>
              {/* Booking Details */}
              <TextField
                label="Unit No"
                name="unitNo"
                value={uniteno}
                onChange={(e) => setUniteno(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label={findData?.email}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label={findData?.fullName}
                name="name"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label={findData?.sourceFrom}
                name="source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                fullWidth
                disabled
                margin="normal"
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Percentage"
                name="percentage"
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Total"
                name="total"
                value={total}
                fullWidth
                margin="normal"
                disabled
              />
              {bookingType === "partner" && (
                <>
                  <TextField
                    label="Company Name"
                    name="companyname"
                    value={companyname}
                    onChange={(e) => setCompanyname(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </>
              )}
              {/* Booking Type Buttons */}

              <Box display="flex" gap={2} mt={2}>
                <Button
                  variant={bookingType === "direct" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setBookingType("direct")}
                >
                  Direct Book
                </Button>
                <Button
                  variant={bookingType === "partner" ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => setBookingType("partner")}
                >
                  Channel Partner
                </Button>
              </Box>

              {/* Fields for Channel Partner */}
            </DialogContent>

            {/* Modal Actions */}
            <DialogActions>
              <Button onClick={handleCloseModal} color="secondary">
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={handleUpdateBook}
              >
                Booked
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeadeEnquiryLeadId;
