import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#7366FF",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Property = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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



  // Filtered Rows for Search
  const filteredProperties = properties.filter(
    (property) =>
      property.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table Columns
  const columns = [
    // { field: "_id", headerName: "ID", flex: 0.3 },
    {
      field: "photos",
      headerName: "Property Image",
      flex: 0.7,
      renderCell: (params) =>
        params.row.photos?.length > 0 ? (
          <img
            src={`/${params.row.photos[0]}`}
            alt="Property"
            style={{ width: 50, height: 50, borderRadius: "5px" }}
          />
        ) : (
          "No Image"
        ),
    },
    { field: "propertyName", headerName: "Property Name", flex: 1 },
    { field: "propertyType", headerName: "Property Type", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    { field: "sellingStatus", headerName: "Status", flex: 1 },
    { field: "minPrice", headerName: "Min Price", flex: 1 },
    { field: "maxPrice", headerName: "Max Price", flex: 1 },
    { field: "numberOfFloors", headerName: "Floors", flex: 1 },
   
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to={`/property-view/${params.row._id}`}>
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
          <Link to={`/property-edit/${params.row._id}`}>
            <PencilIcon
              style={{
                width: "18px",
                height: "18px",
                color: "#2563eb",
                cursor: "pointer",
              }}
              title="Edit"
            />
          </Link>
          <TrashIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#FF4D4F",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() => handleDelete(params.row._id)}
          />
        </div>
      ),
    },
  ];

  // Handle Delete Property
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const res = await axios.delete(`/api/properties/${id}`);
        if (res.status === 200) {
          setProperties((prev) => prev.filter((property) => property._id !== id));
          alert("Property deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("Failed to delete property.");
      }
    }
  };

  return (
    <div style={{ fontFamily: "Poppins", padding: "15px" }}>
      {/* Search and Create Property Button */}
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
          All Property List
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            placeholder="Search property name..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: 300,
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
          <Link to="/create-property">
            <StyledButton>Create Property</StyledButton>
          </Link>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredProperties}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row._id} // Use _id as unique row identifier
          loading={loading}
          components={{
            NoRowsOverlay: () => (
              <Typography sx={{ textAlign: "center", marginTop: "20px" }}>
                No properties found.
              </Typography>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Property;
