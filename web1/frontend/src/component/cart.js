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
        // const decodedToken = jwt_decode(token);
        // const userEmail = decodedToken.Email;
        const response = await axios.get('http://localhost:5000/api/cart/items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [navigate]);

  const handleRemoveItem = async (productId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.delete('http://localhost:5000/api/cart/items', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ProductID: productId,
        },
      });

      // After successful removal, reload the page to refresh the cart items
      window.location.reload();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async(calculateTotal) =>{
    try {

      if(calculateTotal>0){
        navigate('/checkout', { state: { totalAmount: calculateTotal} })
      }
      else{
        alert('You have nothing to checkout!')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1>Your Shopping Cart</h1>
        <div className="project">
        {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <i className="fa fa-shopping-cart" /> Your cart is empty.
            </div>
          ) : (
            <div className="shop">
              {cartItems.map((item) => (
                <div key={item.ProductID} className="box">
                  <img src={item.MainImage} alt={item.ProductName} />
                  <div className="content">
                    <h3>{item.ProductName}</h3>
                    <h4>Price: ₹{item.NewPrice}</h4>
                    <p className="unit">
                      Quantity: <span>{item.Quantity}</span>
                    </p>
                    <button className="btn-area" onClick={() => handleRemoveItem(item.ProductID)}>
                      <i aria-hidden="true" className="fa fa-trash" />
                      <span className="btn2">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="right-bar" style={{ width: '300px' }}>
            <p>
              <span>Subtotal</span> <span>₹{calculateSubtotal(cartItems)}</span>
            </p>
            <hr />
            {/* <p><span>Tax (5%)</span> <span>₹6</span></p> */}
            {/* <hr /> */}
            <p>
              <span>Shipping</span> <span>{calculateSubtotal(cartItems) > 999 ? 'Free' : `₹${calculateShippingFee(cartItems)}`}</span>
            </p>
            <hr />
            <p>
              <span>Total</span> <span>₹{calculateTotal(cartItems)}</span>
            </p>
            <a href="#" onClick={() => handleCheckout(calculateTotal(cartItems))}>
              <i className="fa fa-shopping-cart" />Checkout
            </a>
            <br />
            <br />
            <br />
            <br />
            <br />
            <a href="/">
              <i className="fa fa-shopping-cart" />Continue Shopping
            </a>
          </div>
        </div>
      </div>
      <br>
      </br>
      <br>
      </br>
      <Footer />
    </>
  );
};

// // Helper function to calculate the subtotal of cart items
const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.NewPrice * item.Quantity, 0);
};


// Function to calculate the sum of shipping fees
const calculateShippingFee = (cartItems) => {
  const shippingFeeSum = cartItems.reduce((total, item) => total + item.ShippingFee, 0);
  return shippingFeeSum;
};

// Function to calculate the total price (subtotal + shipping fee)
const calculateTotal= (cartItems) => {
  const subtotal = calculateSubtotal(cartItems);
  const shippingFee = calculateShippingFee(cartItems);
  const total = subtotal + (calculateSubtotal(cartItems) > 999 ? 0 : shippingFee);
  return total;
};

export default ShoppingCart;