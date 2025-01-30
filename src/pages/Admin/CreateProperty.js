import React, { useState } from "react";
import { Box, Grid, TextField, Typography, Button, Chip } from "@mui/material";
import axios from "axios";
import moment from "moment/moment";

const CreateProperty = () => {
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [amenities, setAmenities] = useState("");
  const [constructionStatus, setConstructionStatus] = useState("Completed"); // Default value
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [sellingStatus, setSellingStatus] = useState("For Sale"); // Default value
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [numberOfFloors, setNumberOfFloors] = useState("");
  const [propertyImage, setPropertyImage] = useState([]); // Store actual files
  const [previewImage, setPreviewImage] = useState([]);
  console.log(propertyImage,"previewImage")
  /**
   * Handles image selection and previews the image
   */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    if (files.length > 0) {
      setPropertyImage(files); // Store actual file objects
      const imagePreviews = files.map((file) => URL.createObjectURL(file));
      setPreviewImage(imagePreviews); // Store preview URLs
    }
  };
  const handleChipToggle = (field, value) => {
    if (field === "constructionStatus") {
      setConstructionStatus(value);
    } else if (field === "sellingStatus") {
      setSellingStatus(value);
    }
  };
  /**
   * Handles Form Submission
   */
  const handleSubmit = async () => {
    if (
      !propertyName ||
      !propertyType ||
      !location ||
      !address ||
      !availabilityDate ||
      !size ||
      !minPrice ||
      !maxPrice ||
      !numberOfFloors
    ) {
      alert("Please fill all required fields.");
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("propertyName", propertyName);
    formData.append("propertyType", propertyType);
    formData.append("location", location);
    formData.append("address", address);
    formData.append("amenities", amenities);
    formData.append("constructionStatus", constructionStatus);
    formData.append("availabilityDate", moment(availabilityDate).format("YYYY-MM-DD")); // ✅ Fixed
    formData.append("sellingStatus", sellingStatus);
    formData.append("size", size);
    formData.append("minPrice", minPrice);
    formData.append("maxPrice", maxPrice);
    formData.append("numberOfFloors", numberOfFloors);
    propertyImage.forEach((image) => {
      formData.append("photos", image);
    });
    try {
      const res = await axios.post("/api/properties/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 201) {
     alert("Property Create Successfully");
      // Reset form fields
      setPropertyName("");
      setPropertyType("");
      setLocation("");
      setAddress("");
      setAmenities("");
      setConstructionStatus("Completed");
      setAvailabilityDate("");
      setSellingStatus("For Sale");
      setSize("");
      setMinPrice("");
      setMaxPrice("");
      setNumberOfFloors("");
      setPropertyImage(null);
      setPreviewImage("");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding property.");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Input Section */}
        <Grid item xs={12} md={4}>
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

            {/* Image Upload */}
            <Box sx={{ marginTop: "20px" }}>
              <Typography
                sx={{ fontWeight: "bold", marginBottom: "10px" }}
                variant="body1"
              >
                Property Image
              </Typography>
              <Typography
                variant="contained"
                component="label"
                sx={{
                  marginRight: 2,
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                />
              </Typography>
              {propertyImage && (
                <Typography
                  variant="caption"
                  sx={{ display: "block", marginTop: 1 }}
                >
                  Image uploaded
                </Typography>
              )}
            </Box>

            <TextField
              label="Property Name *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Name"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
            <TextField
              label="Property Type *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Property Type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            />
            <TextField
              label="Location *"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <TextField
              label="Address"
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Enter Address"
              multiline
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Box>
        </Grid>

        {/* Additional Details Section */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Additional Details
          </Typography>
          <TextField
            label="Amenities *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Amenities"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
          <TextField
            label="Availability Date *"
            fullWidth
            variant="outlined"
            type="date"
            margin="normal"
            value={availabilityDate}
            onChange={(e) => setAvailabilityDate(e.target.value)}
          />
          <TextField
            label="Size(sq ft) *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Size(sq ft)"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <TextField
            label="Min. Price *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Min. Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <TextField
            label="Max. Price *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Max. Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <TextField
            label="Number of Floors *"
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Enter Number of Floors"
            value={numberOfFloors}
            onChange={(e) => setNumberOfFloors(e.target.value)}
          />

          <Box sx={{ marginBottom: "10px" }}>
            <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
              Construction Status *
            </Typography>
            {["Completed", "Under Construction"].map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => handleChipToggle("constructionStatus", status)}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                   constructionStatus === status
                      ? "#4CAF50"
                      : "#f5f5f5",
                  color:
                   constructionStatus === status ? "white" : "black",
                }}
              />
            ))}
          </Box>

          <Box sx={{ marginBottom: "10px" }}>
            <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>
              Selling Status *
            </Typography>
            {["For Sale", "Sold"].map((status) => (
              <Chip
                key={status}
                label={status}
                onClick={() => handleChipToggle("sellingStatus", status)}
                sx={{
                  marginRight: "10px",
                  backgroundColor:
                    sellingStatus === status ? "#4CAF50" : "#f5f5f5",
                  color: sellingStatus === status ? "white" : "black",
                }}
              />
            ))}
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
              <strong>Property Name:</strong> {propertyName || "-"}
            </Typography>
            <Typography>
              <strong>Property Type:</strong> {propertyType || "-"}
            </Typography>
            <Typography>
              <strong>Location:</strong> {location || "-"}
            </Typography>
            <Typography>
              <strong>Address:</strong> {address|| "-"}
            </Typography>
            <Typography>
              <strong>Amenities:</strong> {amenities || "-"}
            </Typography>
            <Typography>
              <strong>Availability Date:</strong> {availabilityDate || "-"}
            </Typography>
            <Typography>
              <strong>Size (sq ft):</strong> {size || "-"}
            </Typography>
            <Typography>
              <strong>Min. Price:</strong> {minPrice || "-"}
            </Typography>
            <Typography>
              <strong>Max. Price:</strong> {maxPrice || "-"}
            </Typography>
            <Typography>
              <strong>Number of Floors:</strong>{" "}
              {numberOfFloors || "-"}
            </Typography>
            <Typography>
              <strong>Construction Status:</strong>{" "}
              {constructionStatus|| "-"}
            </Typography>
            <Typography>
              <strong>Selling Status:</strong> {sellingStatus|| "-"}
            </Typography>

            {/* Image Preview in LIVE DISPLAY */}
            <Box sx={{ marginTop: "20px" }}>
              <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>Property Image Preview:</Typography>
              {previewImage.length > 0 && (
            <Box sx={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {previewImage.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} style={{ width: "100px", height: "100px", borderRadius: "4px" }} />
              ))}
            </Box>
          )}
            </Box>
          
          </Box>
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateProperty;
