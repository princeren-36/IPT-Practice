const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 1337;
const studentsFile = "students.json";  // Store students data in this file

// Middleware
app.use(cors());
app.use(express.json());

// Read data from file
const readData = (file) => {
    try {
        if (!fs.existsSync(file)) return [];  // Return empty array if the file doesn't exist
        const data = fs.readFileSync(file);
        return JSON.parse(data);  // Parse JSON data from the file
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return [];
    }
};

// Write data to file
const writeData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));  // Write data back to the file in a readable format
    } catch (error) {
        console.error(`Error writing to ${file}:`, error);
    }
};

// ========================
// Add Student API
// ========================
app.post("/addstudents", (req, res) => {
    const newStudent = req.body;  // Get new student data from request body
    let students = readData(studentsFile);  // Read existing students data

    // Add new student to the list
    students.push(newStudent);
    writeData(studentsFile, students);  // Save the updated list to the file

    res.status(201).json(newStudent);  // Respond with the new student data
    console.log("New student added:", newStudent);
});

// ========================
// Default Route
// ========================
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.get("/fetchstudents", (req, res) => {
    res.json(readData(studentsFile));  // This sends the student data back
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
