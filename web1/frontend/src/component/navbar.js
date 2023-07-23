import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if the user is already logged in by verifying the token
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Decode the token to get the user information
          const decodedToken = jwt_decode(token);
          if (decodedToken && decodedToken.Email) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
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
      // Clear the token from local storage
      localStorage.removeItem('token');
      setLoggedIn(false);
      // navigate('/'); //redirecting user to homepage
      // navigate(-1); //redirecting user to previous page
      // window.location.href = window.location.pathname;
      navigate('/')
      window.location.reload();
      // Redirect the user to the homepage after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCartClick = () => {
    if (loggedIn) {
      // If logged in, redirect to the cart page
      navigate('/cart');
    } else {
      // If not logged in, show an alert message and prevent the redirection
      alert('Kindly Login First');
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        <img src="/images/home.png" alt="Bootstrap" width={30} height={24} />
      </a>
      <a className="navbar-brand" href="/">
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
            <a className="nav-link active" aria-current="page" href="/">
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
        <button onClick={handleCartClick} type="button" className="btn btn-light me-2">
          <img src="/images/cart.svg" alt="" />
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
