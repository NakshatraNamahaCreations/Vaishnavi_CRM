import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Leadenquiry = () => {
  const [data, setData] = useState([]); // Holds the fetched data
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [row, setRow] = useState([]);
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
          setData(res.data.data || []); // Update the `data` state with fetched data
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

  // Filtered Rows for Search
  const filteredRows = data.filter(
    (row) =>
      row?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table Columns
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
        params.value
          ? moment(params.value).format("YYYY-MM-DD hh:mm A")
          : "N/A",
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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to={`/leadenquiry-view/${params.row?._id}`}>
            <EyeIcon
              style={{
                width: "20px",
                height: "20px",
                color: "#2563eb",
                cursor: "pointer",
              }}
              title="View"
            />
          </Link>
          {/* <Link to={`/leadenquiry-update/${params.row?._id}`}>
            <PencilIcon
              style={{
                width: "18px",
                height: "18px",
                color: "#2563eb",
                cursor: "pointer",
              }}
              title="Edit"
            />
          </Link> */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ fontFamily: "Poppins", padding: "15px" }}>
      {/* Search and Create Customer Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#2b3674" }}>
          All Enquiries List
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Link to="/create-leadenquiry">
            <StyledButton>Create Enquiry</StyledButton>
          </Link>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <div style={{  width: "100%" }}>
        <DataGrid
          rows={filteredRows}
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
    </div>
  );
};

export default Leadenquiry;
