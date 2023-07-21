import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by making an API call to the backend
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/check_login');
        if (response.data.message === 'Logged in') {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      // Make an API call to the Flask backend to logout
      await axios.get('http://127.0.0.1:5000/logout');
      setLoggedIn(false); // Clear the session and set loggedIn to false
      // Redirect the user to the homepage after logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="images/home.png" alt="Bootstrap" width={30} height={24} />
        </a>
        <a className="navbar-brand" href="#">
          Shopstore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Contact
              </a>
            </li>
          </ul>
          <form className="d-flex form-center" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success btn-sm me-2" type="submit" style={{ fontSize: '14px', padding: '6px 10px', width: '35px' }}>
              &#128269;
            </button>
          </form>
          <button type="button" className="btn btn-light me-2">
            <img src="images/cart.svg" alt="" />
          </button>
          {loggedIn ? (
            // If logged in, show the "Logout" button
            <button onClick={handleLogout} className="btn btn-warning me-2">
              Logout
            </button>
          ) : (
            // If not logged in, show the "Login" button
            <Link to="/login" className="btn btn-warning me-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
