import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  InputAdornment,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Convert = () => {
  const [rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllLeads = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get(
          "http://localhost:8005/api/lead/getstautswiseData/Converted",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          // ✅ Transform rows to include `id` field for MUI DataGrid
          const formattedRows = res.data.data.map((row) => ({
            ...row,
            id: row._id, // Assign `_id` to `id` so MUI DataGrid recognizes it
          }));
          setRows(formattedRows);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAllLeads();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  // Media Query for Mobile Screens
  const isMobile = useMediaQuery("(max-width:600px)");

  const columns = [
    { field: "_id", headerName: "Enquiry Id", flex: 1 },
    { field: "fullName", headerName: "Customer Name", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Customer Status", flex: 1 },
    { field: "interestedProperty", headerName: "Interested Property", flex: 1 },
    // { field: "assignedEmployee", headerName: "Assigned Employee", flex: 1 },
  ];

  return (
    <div
      style={{
        fontFamily: "Poppins",
        padding: isMobile ? "10px" : "15px",
      }}
    >
      {/* Header and Search */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: { xs: "column", sm: "row" },
          gap: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2b3674",
          }}
        >
          All Converted List
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: "10px",
          }}
        >
          <TextField
            placeholder="Search by Customer Name or Employee..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: isMobile ? "100%" : 300,
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
      </Box>

      {/* DataGrid Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={
            // Hide phone number column on mobile if needed
            isMobile ? columns.filter((col) => col.field !== "number") : columns
          }
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Convert;
