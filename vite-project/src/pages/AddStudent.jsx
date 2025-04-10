import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Modal, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "./Sidebar";

function AddStudent() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [studentData, setStudentData] = useState({
    idNo: "",
    firstName: "",
    lastName: "",
    middleName: "",
    course: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setStudentData({
      idNo: "",
      firstName: "",
      lastName: "",
      middleName: "",
      course: "",
      year: "",
    });
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:1337/addstudents", studentData);
      alert("Student added successfully!");
      handleCloseAddModal();
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student");
    }
  };

  return (
    <>
    <Sidebar></Sidebar>
    <div>
      <Button
        variant="contained"
        onClick={handleOpenAddModal}
        startIcon={<AddIcon />}
      >
        Add Student
      </Button>

      <Modal open={openAddModal} onClose={handleCloseAddModal}>
        <Box className="modal-box">
          <h1>ADD STUDENT</h1>
          <TextField
            label="ID Number"
            margin="normal"
            name="idNo"
            value={studentData.idNo}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="First Name"
            margin="normal"
            name="firstName"
            value={studentData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            margin="normal"
            name="lastName"
            value={studentData.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Middle Name"
            margin="normal"
            name="middleName"
            value={studentData.middleName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Course"
            margin="normal"
            name="course"
            value={studentData.course}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Year"
            margin="normal"
            name="year"
            value={studentData.year}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAdd}
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
    </>
  );
}

export default AddStudent;
