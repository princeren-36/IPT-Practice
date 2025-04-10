const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const port = 1337;
const studentsFile = "students.json";

app.use(cors());
app.use(express.json());

const readData = (file) => {
    try {
        if (!fs.existsSync(file)) return []; 
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return [];
    }
};

const writeData = (file, data) => {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2)); 
    } catch (error) {
        console.error(`Error writing to ${file}:`, error);
    }
};

app.post("/addstudents", (req, res) => {
    const newStudent = req.body; 
    let students = readData(studentsFile); 

    students.push(newStudent);
    writeData(studentsFile, students);

    res.status(201).json(newStudent); 
    console.log("New student added:", newStudent);
});

app.get("/fetchstudents", (req, res) => {
    res.json(readData(studentsFile));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
