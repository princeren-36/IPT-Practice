import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:1337/fetchstudents');
        setStudents(response.data);  // Set the fetched data to the state
      } catch (err) {
        setError('Error fetching data: ' + err.message);  // Display error message
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);  // Set loading to false once the request completes
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading message
  }

  if (error) {
    return <div>{error}</div>;  // Show error message
  }

  return (
    <>
    <Sidebar></Sidebar>
    <div>
      <h2>Student Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Course</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5">No students available.</td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td>{student.idNo}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Dashboard;
