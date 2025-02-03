import React, { useEffect, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  TextField,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { styled, useMediaQuery } from "@mui/system";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { DatePicker } from "@mui/x-date-pickers";

const StyledButton = styled(Button)({
  fontFamily: "Poppins",
  backgroundColor: "#038f05",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#5A52D6",
  },
});

const Reported = () => {
  // Media Query for Mobile Screens
  const isMobile = useMediaQuery("(max-width:600px)");

  const [data, setData] = useState([]); // Holds the fetched data
  console.log(data, "data");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [row, setRow] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
  //   const filteredRows = data.filter(
  //     (row) =>
  //       row?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       row?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const filteredRows = useMemo(() => {
    return data
      .map((row, index) => ({
        id: row._id,
        slNo: index + 1,
        createdAt: moment(row.createdAt).format("DD-MM-YYYY HH:mm A"),
        customername: row.fullName || "N/A",
        email: row.email || "N/A",
        phoneNumber: row.phoneNumber || "N/A",
        interestedProperty: row.interestedProperty || "N/A",
        salesperson: row.salesperson || "N/A",
        sourceFrom: row.sourceFrom || "N/A",
        status: row.status || "N/A",
        leadId: row._id || "N/A", // ✅ Assign `_id` as `leadId`

      }))
      .filter((row) => {
        console.log("Filtering Row with LeadId:", row.leadId); 
        const matchesSearch =
          row?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row?.email?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
      });
  }, [data, searchTerm]);

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
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
           <Link to={`/leadenquiry-views/${params.row._id}`}>
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

  //   Search functionallity
  const filteredleads = data.filter(
    (property) =>
      (property.fullName?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (property.salesperson?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      )
  );

  // ✅ Export to Excel Function
  const exportToExcel = () => {
    // Select only specific fields you want in the Excel file
    const formattedData = filteredRows.map((row) => ({
      Customer_Name: row.fullName || "", // Ensure empty string if undefined
      Email: row.email || "",
      Phone_Number: row.phoneNumber || "",
      Sales_Person: row.salesperson || "",
      Source_From: row.sourceFrom || "",
      Appointed_Employee: row.appointedEmployee || "",
      Interested_Property: row.interestedProperty || "",
      Created_At: row.createdAt
        ? moment(row.createdAt).format("YYYY-MM-DD")
        : "",
    }));

    // Ensure column headers are correctly set
    const worksheet = XLSX.utils.json_to_sheet(formattedData, {
      header: [
        "Customer_Name",
        "Email",
        "Phone_Number",
        "Sales_Person",
        "Source_From",
        "Appointed_Employee",
        "Interested_Property",
        "Created_At",
      ],
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "LeadsData");

    // Write the file and trigger download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(dataBlob, "Leads_Report.xlsx");
  };

  const handleFilter = async () => {
    try {
      const res = await axios.get("/api/lead/lead", {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });

      if (res.status === 200) {
        setData(res.data.data || []);
      }
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  };

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
          Reports List
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: "10px",
            }}
          >
            <TextField
              type="date"
              label="Start Date"
              variant="outlined"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {/* End Date Input */}
            <TextField
              type="date"
              label="End Date"
              variant="outlined"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <StyledButton onClick={handleFilter}>Filter</StyledButton>
            <StyledButton onClick={exportToExcel}>Export to Excel</StyledButton>
            <TextField
              placeholder="Search Customer,Sales..."
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
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7366FF",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={filteredleads}
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

export default Reported;
