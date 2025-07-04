import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">TodoApp</div>
      <div className="navbar-links">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/todo">Todo List</Link>
      </div>
    </nav>
  );
};

export default Navbar;
