import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Flashcard App</Link>
            </div>
            <div className="options">
                <Link to="/cards">Cards</Link>
                <Link to="/contactpage">Contact Me</Link>
                <Link to="/messages">Messages</Link>
            </div>
        </nav>
    );
}

export default Navbar;
