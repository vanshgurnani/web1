import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cart.css'; // Import your custom CSS file or module here if needed
import Navbar from './navbar';
import Footer from './footer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Check if the user is logged in by verifying the token
    const checkLoginStatus = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // If the user is not logged in, redirect to the login page
          navigate(-1);
        } else {
          // Decode the token to get the user information
          const decodedToken = jwt_decode(token);
          if (!decodedToken || !decodedToken.Email) {
            // If the token is invalid or doesn't contain user information, redirect to the login page
            navigate(-1);
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();

    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const userEmail = decodedToken.Email;
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1>Your Shopping Cart</h1>
        <div className="project">
          <div className="shop">
            {cartItems.map((item) => (
              <div key={item.ProductID} className="box">
                <img src={item.Image} alt={item.ProductName} />
                <div className="content">
                  <h3>{item.ProductName}</h3>
                  <h4>Price: ₹{item.NewPrice}</h4>
                  <p className="unit">Quantity: <span>{item.Quantity}</span></p>
                  <p className="btn-area">
                    <i aria-hidden="true" className="fa fa-trash" />
                    <span className="btn2">Remove</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="right-bar" style={{ width: '300px' }}>
            <p>
              <span>Subtotal</span> <span>₹{calculateSubtotal(cartItems)}</span>
            </p>
            <hr />
            {/* <p><span>Tax (5%)</span> <span>₹6</span></p> */}
            {/* <hr /> */}
            <p>
              <span>Shipping</span> <span>₹15</span>
            </p>
            <hr />
            <p>
              <span>Total</span> <span>₹{calculateTotal(cartItems)}</span>
            </p>
            <a href="/checkout">
              <i className="fa fa-shopping-cart" />Checkout
            </a>
            <br />
            <br />
            <br />
            <br />
            <br />
            <a href="/home">
              <i className="fa fa-shopping-cart" />Continue Shopping
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

// Helper function to calculate the subtotal of cart items
const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.NewPrice * item.Quantity, 0);
};

// Helper function to calculate the total (subtotal + shipping, taxes, etc.)
const calculateTotal = (cartItems) => {
  const subtotal = calculateSubtotal(cartItems);
  const shippingFee = 15; // Assuming a fixed shipping fee of ₹15
  return subtotal + shippingFee;
};

export default ShoppingCart;
