import React, { useState } from "react";
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
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import {
  format,
  startOfMonth,
  endOfMonth,
  addDays,
  subMonths,
  addMonths,
  isSameDay,
  isSameMonth,
} from "date-fns";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const CalendarCell = styled("div")(({ isScheduled, isToday }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "5px",
  borderRadius: "8px",
  backgroundColor: isScheduled ? "#4CAF50" : isToday ? "#7366FF" : "#F5F5F5",
  color: isScheduled || isToday ? "white" : "#000",
  fontWeight: isScheduled || isToday ? "bold" : "normal",
  cursor: "pointer",
}));

const CalendarGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "5px",
});

const ScheduleVisite = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      taskname: "INQUIRY01011",
      customername: "John Doe",
      assignedemployee: "Nithin",
      scheduleTime: "2025-01-10",
    },
    {
      id: 2,
      taskname: "INQUIRY01012",
      customername: "Yogi",
      assignedemployee: "Anjana",
      scheduleTime: "2025-01-15",
    },
    {
      id: 3,
      taskname: "INQUIRY01013",
      customername: "Alice",
      assignedemployee: "Sam",
      scheduleTime: "2025-01-20",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMobile = useMediaQuery("(max-width:600px)");

  const scheduledDates = rows.map((row) => row.scheduleTime);

  // Filter Rows for Search
  const filteredRows = rows.filter(
    (row) =>
      row.taskname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.customername.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.assignedemployee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Generate Calendar Days
  const startOfCalendar = startOfMonth(currentDate);
  const endOfCalendar = endOfMonth(currentDate);
  const today = new Date();
  const calendarDays = [];
  let day = startOfCalendar;

  while (day <= endOfCalendar) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  // Handle Month Navigation
  const handlePreviousMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  // Delete Action
  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  // Table Columns
  const columns = [
    { field: "id", headerName: "SL", flex: 0.3 },
    { field: "taskname", headerName: "Task Name", flex: 1 },
    { field: "customername", headerName: "Customer Name", flex: 1 },
    { field: "assignedemployee", headerName: "Assigned Employee", flex: 1 },
    { field: "scheduleTime", headerName: "Schedule & Time", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to="/schedulevisite-details">
            <PencilIcon
              style={{ width: "18px", height: "18px", color: "#2563eb", cursor: "pointer" }}
              title="Edit"
            />
          </Link>
          <TrashIcon
            style={{ width: "20px", height: "20px", color: "#FF4D4F", cursor: "pointer" }}
            title="Delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
      sortable: false,
    },
  ];

  return (
    <Box sx={{ fontFamily: "Poppins", padding: "15px" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
        Scheduled Visits
      </Typography>
      <Grid container spacing={2}>
           {/* Scheduled Visit List Column */}
           <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
            <TextField
              placeholder="Search Customer name..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: isMobile ? "100%" : "300px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  backgroundColor: "#f5f5f5",
                  "&.Mui-focused": {
                    borderColor: "#7366FF",
                    boxShadow: "0px 0px 8px rgba(115, 102, 255, 0.5)",
                  },
                },
              }}
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
          </Box>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={isMobile ? columns.filter((col) => col.field !== "actions") : columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </Grid>
        {/* Calendar Column */}
        <Grid item xs={12} md={4}>
        
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <StyledButton onClick={handlePreviousMonth}>Previous</StyledButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {format(currentDate, "MMMM yyyy")}
            </Typography>
            <StyledButton onClick={handleNextMonth}>Next</StyledButton>
          </Box>
          <CalendarGrid>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <Typography key={index} sx={{ textAlign: "center", fontWeight: "bold" }}>
                {day}
              </Typography>
            ))}
            {calendarDays.map((date, index) => {
              const isScheduled = scheduledDates.includes(format(date, "yyyy-MM-dd"));
              const isToday = isSameDay(date, today);
              const inMonth = isSameMonth(date, currentDate);

              return (
                <CalendarCell
                  key={index}
                  isScheduled={isScheduled}
                  isToday={inMonth && isToday}
                  onClick={() => alert(`Clicked on ${format(date, "yyyy-MM-dd")}`)}
                >
                  {inMonth ? format(date, "d") : ""}
                </CalendarCell>
              );
            })}
          </CalendarGrid>
        </Grid>

     
      </Grid>
    </Box>
  );
};

export default ScheduleVisite;
