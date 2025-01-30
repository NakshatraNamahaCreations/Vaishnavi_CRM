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
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  console.log(tasks, "tasks");
  const [users, setUsers] = useState([]); // User list for task assignment
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [taskdate, setTaskdate] = useState("");
  const [assignto, setAssignto] = useState();
  const [assignedUsers, setAssignedUsers] = useState(""); // Selected users for the task
  console.log(assignedUsers, "assignuser");
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/task/");
      if (res.status === 200) {
        setTasks(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users/");
      if (res.status === 200) {
        setUsers(res.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle opening the drawer
  const handleCreateTaskClick = () => {
    setSelectedTask(null);
    setTaskdate(null);
    setAssignedUsers(null);
    setIsDrawerOpen(true);
  };

  // Handle user selection
  const handleUserChange = (event) => {
    setAssignedUsers(event.target.value);
  };

  // ++++
  const [edit, setEdit] = useState({});
  console.log(edit?._id, "edit");
  // Handle Save Task
  const handleSaveTask = async () => {
    if (!selectedTask) {
      alert("Please enter a task name.");
      return;
    }

    const newTask = {
      taskName: selectedTask,
      assignName: assignedUsers,
      date: taskdate,
    };

    try {
      const res = await axios.post("/api/task/", newTask);
      if (res.status === 201) {
        alert("Task created successfully!");
        fetchTasks();
        setIsDrawerOpen(false);
      }
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Table Columns
  const columns = [
    { field: "taskName", headerName: "Task Name", flex: 1 },

    {
      field: "assignName",
      headerName: "Assigned Users",
      flex: 1,
    },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <PencilIcon
            style={{
              width: "18px",
              height: "18px",
              color: "#2563eb",
              cursor: "pointer",
            }}
            title="Edit"
            onClick={() => {
              handleEditClick(params.row);
              setEdit(params.row);
            }}
          />

          <TrashIcon
            style={{
              width: "20px",
              height: "20px",
              color: "#FF4D4F",
              cursor: "pointer",
            }}
            title="Delete"
            onClick={() => handleDeleteTask(params.row._id)}
          />
        </div>
      ),
    },
  ];
  const token = localStorage.getItem("authToken");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("/api/admin/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setData(res.data.data); // Update state with the response data
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setTaskdate(task.date);
    // setAssignedUser(task.assignName);
    setStatus(task.status);
    setIsEditModalOpen(true);
  };
  // updateing the task
  // Handle updating a task
  const handleUpdateTask = async () => {
    try {
      const res = await axios.put(`/api/task/${edit._id}`, {
        taskName: selectedTask.taskName,
        date: taskdate,
        status: status,
      });

      if (res.status === 200) {
        alert("Task updated successfully!");
        fetchTasks();
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // ✅ Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`/api/task/${taskId}`);
      if (res.status === 200) {
        alert("Task deleted successfully!");
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  return (
    <div style={{ fontFamily: "Poppins", padding: "15px" }}>
      {/* Search & Create Task */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Tasks List
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            placeholder="Search tasks..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: isMobile ? "100%" : "300px" }}
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
          <StyledButton onClick={handleCreateTaskClick}>
            Create Task
          </StyledButton>
        </Box>
      </Box>

      {/* DataGrid Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          pageSize={5}
          getRowId={(row) => row._id}
        />
      </div>

      {/* Drawer for Creating Task */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div style={{ width: 400, padding: "20px", fontFamily: "Poppins" }}>
          <Typography variant="h6">Create Task</Typography>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedTask || ""}
            onChange={(e) => setSelectedTask(e.target.value)}
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskdate || ""}
            onChange={(e) => setTaskdate(e.target.value)}
          />

          {/* Multi-Select for Assigned Users */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Assign User</InputLabel>
            <Select
              value={assignedUsers} // ✅ Store a single user, not an array
              onChange={(event) => setAssignedUsers(event.target.value)} // ✅ Set directly
              renderValue={(selected) => <Chip label={selected} />} // ✅ Show selected user
            >
              {data.map((user) => (
                <MenuItem key={user.id} value={user.name}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <StyledButton
            fullWidth
            onClick={handleSaveTask}
            sx={{ marginTop: "20px" }}
          >
            Save Task
          </StyledButton>
        </div>
      </Drawer>

      {/* Edit Task Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box
          sx={{
            width: 400,
            padding: "20px",
            backgroundColor: "#fff",
            margin: "50px auto",
          }}
        >
          <Typography variant="h6">Edit Task</Typography>
          <TextField
            label="Task Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedTask?.taskName || ""}
            onChange={(e) =>
              setSelectedTask((prev) => ({ ...prev, taskName: e.target.value }))
            }
          />
          <TextField
            label="Date"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={taskdate || ""}
            onChange={(e) => setTaskdate(e.target.value)}
          />

          {/* Select for Task Status */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>

            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <StyledButton
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleUpdateTask}
          >
            Update Task
          </StyledButton>
        </Box>
      </Modal>
    </div>
  );
};

export default Tasks;
