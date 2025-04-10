import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from '@mui/icons-material/Info';
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="Navigator">
        <Link to="/" className="nav-link">
            <HomeIcon className="icon" />
            <span>HOME</span>
        </Link>
        <Link to="/AddStudent" className="nav-link">
            <InfoIcon className="icon" />
            <span>STUDENTS</span>
        </Link>
        </div>
    );
}

export default Sidebar;
