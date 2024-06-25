import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const MainHeader = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src='https://teamhood.com/wp-content/uploads/2023/10/trello-icon.png' alt="Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          Duplix
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/boards">Boards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">Users</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/projects">Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allocation">User-Project Allocation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/progress">Progress</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Meeting">Meeting</Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-light" onClick={(e) => handleLogout(e)}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MainHeader;
