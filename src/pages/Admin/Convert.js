// import React, { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   Button,
//   TextField,
//   InputAdornment,
//   useMediaQuery,
//   Typography,
//   Box,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import axios from "axios";

// const Convert = () => {
//   const [rows, setRows] = useState([]);
//   const [Loading, setLoading] = useState(false);

//   useEffect(() => {
//     const getAllLeads = async () => {
//       const token = localStorage.getItem("authToken");
//       try {
//         const res = await axios.get(
//           "http://localhost:8005/api/lead/getstautswiseData/Converted",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (res.status === 200) {
//           // ✅ Transform rows to include `id` field for MUI DataGrid
//           const formattedRows = res.data.data.map((row) => ({
//             ...row,
//             id: row._id, // Assign `_id` to `id` so MUI DataGrid recognizes it
//           }));
//           setRows(formattedRows);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getAllLeads();
//   }, []);

//   const [searchTerm, setSearchTerm] = useState("");

//   // Media Query for Mobile Screens
//   const isMobile = useMediaQuery("(max-width:600px)");

//   const columns = [
//     {
//       field: "slNo",
//       headerName: "Sl No",
//       flex: 0.5,
//       renderCell: (params) =>
//         params.api.getRowIndexRelativeToVisibleRows(params.id) + 1,
//     },
//     // { field: "_id", headerName: "Enquiry Id", flex: 1 },
//     { field: "fullName", headerName: "Customer Name", flex: 1 },
//     { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
//     { field: "status", headerName: "Customer Status", flex: 1 },
//     { field: "interestedProperty", headerName: "Interested Property", flex: 1 },
//     // { field: "assignedEmployee", headerName: "Assigned Employee", flex: 1 },
//   ];

//   return (
//     <div
//       style={{
//         fontFamily: "Poppins",
//         padding: isMobile ? "10px" : "15px",
//       }}
//     >
//       {/* Header and Search */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           flexDirection: { xs: "column", sm: "row" },
//           gap: "10px",
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: "bold",
//             color: "#2b3674",
//           }}
//         >
//           All Booked List
//         </Typography>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <TextField
//             placeholder="Search by Customer Name or Employee..."
//             variant="outlined"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{
//               width: isMobile ? "100%" : 300,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "10px",
//                 backgroundColor: "#f5f5f5",
//                 "&.Mui-focused": {
//                   borderColor: "#7366FF",
//                   boxShadow: "0px 0px 8px rgba(115, 102, 255, 0.5)",
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <MagnifyingGlassIcon
//                     style={{ width: "20px", height: "20px", color: "#7366FF" }}
//                   />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </Box>

//       {/* DataGrid Table */}
//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={
//             // Hide phone number column on mobile if needed
//             isMobile ? columns.filter((col) => col.field !== "number") : columns
//           }
//           pageSize={5}
//           rowsPerPageOptions={[5]}
//           disableSelectionOnClick
//         />
//       </div>
//     </div>
//   );
// };

// export default Convert;
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

const Convert = () => {
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
      field: "uniteno",
      headerName: "Unite No",
      flex: 1,
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
    {
      field: "bookingtype",
      headerName: "Booking Type",
      flex: 1,
    },
    {
      field: "companyname",
      headerName: "Company Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Budget",
      flex: 1,
    },
    {
      field: "percentage",
      headerName: "Percentage",
      flex: 1,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
    },
    { field: "sourceFrom", headerName: "Source", flex: 1 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    //       <Link to={`/leadenquiry-view/${params.row?._id}`}>
    //         <EyeIcon
    //           style={{
    //             width: "20px",
    //             height: "20px",
    //             color: "#2563eb",
    //             cursor: "pointer",
    //           }}
    //           title="View"
    //         />
    //       </Link>
    //       {/* <Link to={`/leadenquiry-update/${params.row?._id}`}>
    //         <PencilIcon
    //           style={{
    //             width: "18px",
    //             height: "18px",
    //             color: "#2563eb",
    //             cursor: "pointer",
    //           }}
    //           title="Edit"
    //         />
    //       </Link> */}
    //     </div>
    //   ),
    // },
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
          All Book List
        </Typography>
      
      </Box>

      {/* DataGrid Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows.filter((item)=> item?.confirmBook === true)}
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

export default Convert;

