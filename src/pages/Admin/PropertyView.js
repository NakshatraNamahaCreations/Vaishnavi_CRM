import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Typography, Chip } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

const PropertyView = () => {
  const { id } = useParams();
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get("/api/properties/");
        if (res.status === 200) {
          setProperty(res.data.data); // Assuming API response gives single property
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!property) return <Typography>No property found.</Typography>;

  const findData = property?.find((item) => item?._id === id);

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Property Details Section */}
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
              Property Details
            </Typography>
            <TextField
              label="Property Name"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.propertyName || "-"}
              disabled
            />
            <TextField
              label="Property Type"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.propertyType || "-"}
              disabled
            />
            <TextField
              label="Location"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.location || "-"}
              disabled
            />
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.address || "-"}
              disabled
            />
          </Box>
        </Grid>

        {/* Additional Details Section */}
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
              Additional Details
            </Typography>
            <TextField
              label="Amenities"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.amenities || "-"}
              disabled
            />
            <TextField
              label="Availability Date"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.availabilityDate || "-"}
              disabled
            />
            <TextField
              label="Size (sq ft)"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.size || "-"}
              disabled
            />
            <TextField
              label="Min Price"
              fullWidth
              variant="outlined"
              margin="normal"
              value={`₹${findData.minPrice || "-"}`}
              disabled
            />
            <TextField
              label="Max Price"
              fullWidth
              variant="outlined"
              margin="normal"
              value={`₹${findData.maxPrice || "-"}`}
              disabled
            />
            <TextField
              label="Number of Floors"
              fullWidth
              variant="outlined"
              margin="normal"
              value={findData.numberOfFloors || "-"}
              disabled
            />
          </Box>
        </Grid>

        {/* Status Section */}
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
              Status
            </Typography>
            <Chip
              label={findData.constructionStatus || "Unknown"}
              sx={{
                marginRight: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "5px",
              }}
            />
            <Chip
              label={findData.sellingStatus || "Unknown"}
              sx={{
                marginRight: "10px",
                backgroundColor: "#FF9800",
                color: "white",
                padding: "5px",
              }}
            />
          </Box>
        </Grid>

        {/* Image Display Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "10px" }}
            >
              Property Image
            </Typography>
            {findData.photos && findData.photos.length > 0 ? (
              <img
                src={`/${findData.photos[0]}`} // Assuming it's a valid image path
                alt="Property"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  borderRadius: "5px",
                }}
              />
            ) : (
              <Typography>No Image Available</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyView;
