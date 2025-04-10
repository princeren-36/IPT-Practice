import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/> } />
          <Route path='/AddStudent' element={<AddStudent/> } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
