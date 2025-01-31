import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Drawer,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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

const Sales = () => {
  const [rows, setRows] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Media Query for Mobile Screens
  const isMobile = useMediaQuery("(max-width:600px)");

  // Filtered Rows for Search
  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Edit Row
  const handleEditRow = (row) => {
    setSelectedRow(row); // Set the selected row for editing
    setIsDrawerOpen(true); // Open the drawer
  };

  // Handle Save Changes (Edit or Add New)
  const handleSaveChanges = () => {
    if (selectedRow.id) {
      // Update existing row
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === selectedRow.id ? selectedRow : row))
      );
    } else {
      // Add new row
      const newId = rows.length + 1;
      setRows([
        ...rows,
        {
          ...selectedRow,
          id: newId,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setSelectedRow(null); // Clear selected row
    setIsDrawerOpen(false); // Close the drawer
  };

  // Handle Input Change in Drawer
  const handleInputChange = (field, value) => {
    setSelectedRow((prevRow) => ({
      ...prevRow,
      [field]: value,
    }));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const createSales = async () => {
    if (!name || !email || !phonenumber || !password || !confirmpassword) {
      return alert("Please fill all the fields");
    }
    try {
      let config = {
        url: "/api/sales/register",
        method: "POST",
        headers: { "content-type": "application/json" },
        data: {
          name: name,
          email: email,
          password: password,
          phonenumber: phonenumber,
        },
      };
      let res = await axios(config);
      if (res.status === 201) {
        alert("Sales created successfully!");
        setName("");
        setEmail("");
        setphonenumber("");
        setPassword("");
        setconfirmpassword("");
        setIsDrawerOpen(false);
      } else {
        alert(`Error: ${res.status}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const token = localStorage.getItem("authToken");

  const [sales, setSales] = useState([]);
  console.log(sales, "sales");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await axios.get("/api/sales/");

        if (res.status === 200) {
          setSales(res.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getSales();
  }, []);

  const handleCreateUserClick = () => {
    // setSelectedRow(null); // Set selectedRow to null for new user
    setName("");
    setEmail("");
    setphonenumber("");

    setPassword("");
    setconfirmpassword("");

    setIsDrawerOpen(true);
  };

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
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phonenumber", headerName: "Phone Number", flex: 1 },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Link
            to={{
              // pathname: `/userdetails/${params?.row._id}`,
              state: { user: params.row },
            }}
          >
            <EyeIcon
              style={{
                width: "20px",
                height: "20px",
                color: "#2563eb",
                cursor: "pointer",
                marginTop: "20px",
              }}
              title="view"
            />
          </Link>
          {/* Edit Icon */}
          <PencilIcon
            style={{
              width: "18px",
              height: "18px",
              color: "#2563eb",
              cursor: "pointer",
            }}
            title="Edit"
            // onClick={() => handleEditRow(params.row)}
          />
          {/* Delete Icon */}
          {/* <TrashIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#FF4D4F",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() =>
              setRows((prevRows) =>
                prevRows.filter((row) => row.id !== params.row.id)
              )
            }
          /> */}
        </div>
      ),
      sortable: false,
    },
  ];

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  const handleUpload = () => {
    if (file) {
      alert(`File selected: ${file.name}`);
      // Perform your upload logic here
    } else {
      alert("No file selected.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Poppins",
        padding: isMobile ? "10px" : "15px",
      }}
    >
      {/* Search and Create User Button */}
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
          Sales List
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
            placeholder="Search User name..."
            variant="outlined"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
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
          <StyledButton
            onClick={handleCreateUserClick}
            sx={{ width: isMobile ? "100%" : "auto" }}
          >
            Create Sales
          </StyledButton>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={sales}
          columns={
            isMobile ? columns.filter((col) => col.field !== "number") : columns
          }
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row._id} // Use _id or any other unique field
        />
      </div>

      {/* Drawer for Editing or Adding User */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div
          style={{
            width: isMobile ? "100vw" : 400,
            padding: "20px",
            fontFamily: "Poppins",
          }}
        >
          {/* <h2>{selectedRow?.id ? "Edit User" : "Add New User"}</h2> */}
          <Box>
            {/* <TextField
        label="Profile"
        variant="outlined"
        type="file"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true, // Ensures the label stays visible
        }}
        onChange={handleFileChange}
      /> */}
          </Box>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            type="number"
            fullWidth
            margin="normal"
            value={phonenumber}
            onChange={(e) => setphonenumber(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
          />

          <StyledButton
            fullWidth
            onClick={createSales}
            sx={{ marginTop: "20px" }}
          >
            Save
          </StyledButton>
        </div>
      </Drawer>
    </div>
  );
};

export default Sales;
