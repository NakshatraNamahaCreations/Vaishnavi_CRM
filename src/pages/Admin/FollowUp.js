import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  Typography,
  useMediaQuery,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  EyeIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/CalendarStyles.css"; // Ensure this CSS file exists
import debounce from "lodash.debounce"; // 🏆 Import debounce to optimize API calls
import { Link, useNavigate } from "react-router-dom";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const FollowUp = () => {
  const [data, setData] = useState([]); // Daily follow-ups
  const [monthlyData, setMonthlyData] = useState([]); // Monthly data for calendar
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeMonth, setActiveMonth] = useState(moment().format("MM-YYYY")); // Tracks the current month being displayed
  const isMobile = useMediaQuery("(max-width:600px)");

  // ✅ Fetch daily follow-ups
  const fetchDailyFollowUps = useCallback(
    debounce(async (date) => {
      try {
        const formattedDate = moment(date).format("DD-MM-YYYY");
        const res = await axios.get(
          `http://localhost:8005/api/followup/Datewisefollowup/${formattedDate}`
        );
        if (res.status === 200) {
          console.log("res.data.data", res.data.data);
          setData(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching daily data:", error);
      }
    }, 300), // Debounce to prevent excessive API calls
    []
  );

  // ✅ Fetch monthly follow-ups
  const fetchMonthlyFollowUps = useCallback(async (monthYear) => {
    try {
      console.log(`Fetching data for: ${monthYear}`); // Debugging

      const res = await axios.get(
        `http://localhost:8005/api/followup/MonthlyFollowUps/${monthYear}`
      );
      if (res.status === 200) {
        console.log("Monthly Data:", res.data.data);
        setMonthlyData(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching monthly data:", error);
    }
  }, []);

  // ✅ Fetch data for today’s date and current month when the component mounts
  useEffect(() => {
    fetchDailyFollowUps(new Date());
    fetchMonthlyFollowUps(activeMonth); // Use the active month
  }, [fetchDailyFollowUps, fetchMonthlyFollowUps, activeMonth]);

  // ✅ Fetch daily data when selectedDate changes
  useEffect(() => {
    fetchDailyFollowUps(selectedDate);
  }, [selectedDate, fetchDailyFollowUps]);

  // ✅ Handle Calendar Month Change
  const handleMonthChange = ({ activeStartDate }) => {
    const newMonthYear = moment(activeStartDate).format("MM-YYYY");

    // Only fetch data if the month actually changes
    if (newMonthYear !== activeMonth) {
      setActiveMonth(newMonthYear); // Update active month state
      fetchMonthlyFollowUps(newMonthYear);
    }
  };

  // ✅ Compute scheduled follow-up counts for the calendar
  const scheduledDatesCount = useMemo(() => {
    return monthlyData.reduce((acc, item) => {
      const formattedDate = moment(item.date, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {});
  }, [monthlyData]);

  // ✅ Function to count events for a specific date
  const getEventCount = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    return scheduledDatesCount[formattedDate] || 0;
  };
  const navigate = useNavigate();
  // ✅ Optimize follow-up data filtering
  const filteredRows = useMemo(() => {
    return data
      .map((row, index) => ({
        id: row._id,
        slNo: index + 1, // Add Sl No
        createdAt: moment(row.createdAt).format("DD-MM-YYYY HH:mm A"),
        customername: row.leadId?.fullName || "N/A",
        email: row.leadId?.email || "N/A",
        date: row.date || "N/A",
        followupStatus: row.followupStatus || "N/A",
        leadId: row.leadId._id || "N/A",
      }))
      .filter((row) => {
        const matchesSearch =
          row.customername.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.email.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
      });
  }, [data, searchTerm]);

  console.log(":filteredRows", filteredRows);

  // ✅ Define Table Columns (with Serial Number)
  const columns = [
    { field: "slNo", headerName: "Sl No", flex: 0.5 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    { field: "customername", headerName: "Customer Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "date", headerName: "Follow date", flex: 1 },
    { field: "followupStatus", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        const handleNavigate = () => {
          if (params.row?.leadId) {
            navigate(`/leadenquiry-views/${params.row.leadId}`);
          } else {
            console.error("leadId is missing:", params.row);
          }
        };

        return (
          <EyeIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#2563eb",
              cursor: "pointer",
            }}
            title="View"
            onClick={handleNavigate}
          />
        );
      },
      sortable: false,
    },
  ];

  return (
    <Box sx={{ fontFamily: "Poppins", padding: "15px" }}>
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "15px" }}
      >
        Follow-Up's List
      </Typography>

      <Grid container spacing={2}>
        {/* Follow-Ups Table */}
        <Grid item xs={12} md={8}>
          <TextField
            placeholder="Search Customer name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: isMobile ? "100%" : "300px", marginBottom: "20px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MagnifyingGlassIcon
                    style={{ width: "20px", height: "20px", color: "#7366FF" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
        </Grid>

        {/* React Calendar */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h6">
              {moment(activeMonth, "MM-YYYY").format("MMMM YYYY")}
            </Typography>
          </Box>
          <div className="calendar-wrapper">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              onActiveStartDateChange={handleMonthChange} // ✅ Fixed month change detection
              tileContent={({ date }) => {
                const eventCount = getEventCount(date);
                return eventCount > 0 ? (
                  <div className="event-badge">{eventCount}</div>
                ) : null;
              }}
              tileClassName={({ date }) => {
                return getEventCount(date) > 0 ? "highlighted-date" : "";
              }}
            />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FollowUp;
