import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useMediaQuery,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/system";
import follower from "../../assets/image/follower.png";
import info from "../../assets/image/info.png";
import schedule from "../../assets/image/schedule.png";
import planning from "../../assets/image/planning.png";
import lightbulb from "../../assets/image/lightbulb.png";
import registation from "../../assets/image/registration.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";

ChartJS.register(
  BarElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    const getAllFollowUps = async () => {
      try {
        const res = await axios.get("/api/appointment/");
        if (res.status === 200) {
          setData(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllFollowUps();
  }, []);

  useEffect(() => {
    const getAllFollowUps = async () => {
      try {
        const res = await axios.get("/api/followup/");
        if (res.status === 200) {
          setData1(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllFollowUps();
  }, []);
  const [lead, setLead] = useState([]);
  useEffect(() => {
    const getAllLeads = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("/api/lead/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setLead(res.data.data || []); // Update the `data` state with fetched data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllLeads();
  }, []);

  // total ragistrations
  const [totalRegistrations, setTotalRegistrations] = useState([]);

  useEffect(() => {
    const getRagistrations = async () => {
      try {
        const res = await axios.get("/api/admin/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (res.status === 200) {
          setTotalRegistrations(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getRagistrations();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [timePeriod, setTimePeriod] = useState("Weekly");
  const navigate = useNavigate();

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("/api/properties/");
        if (res.status === 200) {
          setProperties(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const dropedData = lead.filter((item) => item.status === "Not Interested");
  const bookedData = lead.filter((item) => item.confirmBook === true);

  const dataCards = [
    {
      title: "Total Registrations",
      value: totalRegistrations?.length,
      icon: registation,
      link: "/usermanagement",
    },
    {
      title: "Total Inquiries",
      value: lead?.length,
      icon: info,
      link: "/Enquiries",
    },
    {
      title: "Follow-Ups",
      value: data1.length,
      icon: follower,
      link: "/followsup",
    },
    {
      title: "Total Scheduled",
      value: data.length,
      icon: schedule,
      link: "/appointment",
    },
    {
      title: "Droped",
      value: dropedData.length,
      icon: follower,
      link: "/Dropped",
    },
    {
      title: "Poject",
      value: properties?.length,
      icon: planning,
      link: "/Projects",
    },
    {
      title: "Booked",
      value: bookedData.length,
      icon: lightbulb,
      link: "/converted",
    },
  ];

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: dataCards[activeIndex].title,
        data: dataCards[activeIndex].chartData,
        backgroundColor: "#038f05",
        borderColor: "#2196F3",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#757575",
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          color: "#757575",
        },
      },
    },
  };

  const StatusChip = styled(Chip)(({ status }) => ({
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    color: "white",
    backgroundColor: status === "Active" ? "#4CAF50" : "#F44336",
    padding: "0 8px",
    fontSize: "12px",
    height: "24px",
    borderRadius: "12px",
  }));

  const paymentRows = [
    {
      id: 1,
      name: "John Doe",
      instituteName: "Greenfield High",
      email: "john.doe@example.com",
      paymentDate: "2024-12-01",
      plan: "Premium",
      amount: 2999,
      status: "Success",
    },
    {
      id: 2,
      name: "Jane Smith",
      instituteName: "Harmony Academy",
      email: "jane.smith@example.com",
      paymentDate: "2024-12-02",
      plan: "Basic",
      amount: 1499,
      status: "Failed",
    },
    {
      id: 3,
      name: "Alice Johnson",
      instituteName: "Bright Future Institute",
      email: "alice.j@example.com",
      paymentDate: "2024-12-03",
      plan: "Standard",
      amount: 1999,
      status: "Success",
    },
  ];

  const StatusChip1 = styled(Box)(({ status }) => ({
    display: "inline-block",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "500",
    color: "white",
    backgroundColor: status === "Success" ? "#4CAF50" : "#F44336",
    padding: "5px 10px",
    fontSize: "12px",
    borderRadius: "12px",
    textAlign: "center",
  }));
  const [reported, setReported] = useState([]);
  useEffect(() => {
    const getAllLeads = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("/api/lead/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setReported(res.data.data || []); // Update the `data` state with fetched data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getAllLeads();
  }, []);

  const columns = [
    {
      field: "slNo",
      headerName: "Sl No",
      flex: 0.5,
      renderCell: (params) =>
        params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
      renderCell: (params) =>
        params.value ? moment(params.value).format("YYYY-MM-DD") : "N/A",
    },
    { field: "fullName", headerName: "Customer Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "interestedProperty", headerName: "Interested Property", flex: 1 },
    {
      field: "salesperson",
      headerName: "Sales Person",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
    },
    { field: "sourceFrom", headerName: "Source", flex: 1 },
  ];

  return (
    <Box
      sx={{
        padding: 3,
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#F5F5F5",
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={3}>
        {/* Dashboard (70%) */}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              padding: 3,
            }}
          >
            {/* Overview Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Overview
              </Typography>
            </Box>

            {/* Cards Section */}
            <Grid
              container
              // spacing={3}
              sx={{
                marginBottom: 3,
                backgroundColor: "#F5F5F5",
                padding: 2,
                marginTop: 2,
                borderRadius: 5,
              }}
            >
              {dataCards.map((card, index) => (
                <Grid item xs={12} md={3} key={index} sx={{}}>
                  <Card
                    onClick={() => {
                      setActiveIndex(index);
                      navigate(card.link);
                    }}
                    sx={{
                      // padding: 1,
                      marginBottom: 3,
                      borderRadius: 2,
                      backgroundColor:
                        activeIndex === index ? "#E3F2FD" : "#fff", // Highlight active card
                      boxShadow:
                        activeIndex === index
                          ? "0px 4px 10px rgba(33, 150, 243, 0.2)"
                          : "",
                      cursor: "pointer",
                      border:
                        activeIndex === index ? "2px solid #038f05" : "none",
                      marginRight: 2,
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 2,
                        gap: 2,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "13px",
                          }}
                        >
                          {card.title}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            color: "#212121",
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {card.value}
                        </Typography>
                      </Box>
                      <img
                        src={card.icon}
                        style={{
                          backgroundColor: "#fff",
                          height: 36,
                          width: 36,
                          padding: 10,
                          borderRadius: 20,
                        }}
                      />
                      {/* <Avatar
                        sx={{
                          backgroundColor: "#F3F4F6",
                          height: 36,
                          width: 36,
                        }}
                      >
                        {card.icon}
                      </Avatar> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Chart Section */}
          </Box>
        </Grid>

        {/* Sidebar (30%) */}
      </Grid>
      <Card
        sx={{
          padding: 3,
          marginBottom: 3,
          borderRadius: 2,
          fontFamily: "'Poppins', sans-serif",
          marginTop: 2,
        }}
      >
        <Box
          sx={{
            padding: 2,
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Reports
            </Typography>
            <Typography>
              <Link to="/report">View All</Link>
            </Typography>
          </Box>

          <div style={{ width: "100%" }}>
            <DataGrid
              rows={reported.slice(0, 7)}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              getRowId={(row) => row?._id} // Map `row._id` to the row's ID
              loading={loading}
              components={{
                NoRowsOverlay: () => (
                  <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
                    No data available.
                  </Typography>
                ),
              }}
            />
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default Dashboard;
