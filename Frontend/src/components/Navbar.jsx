import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS files/Sidebar.css"
import icon from "../assets/icon.svg"; 
import { BsHouse, BsSearch, BsBell, BsEnvelope, BsPerson, BsMoon, BsSun } from "react-icons/bs";

const Sidebar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("bg-dark");
        document.body.classList.toggle("text-white");
    };

    return (
        <div className={`d-flex flex-column vh-100 p-3 border-end ${darkMode ? "bg-dark text-white" : "bg-light"}`} style={{ width: "450px" }}>
            <Link to="/">
            <h4 className="mb-4 text-center">
                <img src={icon} alt="Twisper Logo" style={{ width: "150px", height: "auto" }} />
            </h4>
            </Link>


            <ul className="nav flex-column sidebar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link d-flex align-items-center">
                        <BsHouse className="me-2" size={24} /> <span>Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/explore" className="nav-link d-flex align-items-center">
                        <BsSearch className="me-2" size={24} /> <span>Explore</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/notifications" className="nav-link d-flex align-items-center">
                        <BsBell className="me-2" size={24} /> <span>Notifications</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/messages" className="nav-link d-flex align-items-center">
                        <BsEnvelope className="me-2" size={24} /> <span>Messages</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/profile" className="nav-link d-flex align-items-center">
                        <BsPerson className="me-2" size={24} /> <span>Profile</span>
                    </Link>
                </li>
            </ul>


            <button className="btn btn-primary w-100 mt-4">Post</button>

            <div className="mt-auto text-center">
                <button className="btn btn-outline-secondary" onClick={toggleTheme}>
                    {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
