import React, { useState, useEffect } from 'react';
import './checkout.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import jwt_decode from 'jwt-decode';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios'; // Import Axios

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    adr: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // const {totalAmount} = props.location.state || {};

  

  const handleSubmit = async (e, totalAmount) => {

    e.preventDefault();
    console.log("form submitted")
    if (!stripe || !elements) {
      // Stripe or Elements not initialized yet, do not proceed with the payment
      return;
    }
    console.log(totalAmount);
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      // Handle the error (e.g., display error message to the user)
      console.error('Stripe Error:', error.message);
    } else {
      // Process the payment with the token on your backend
      console.log('Stripe Token:', token);

      // Use Axios to make the POST request to the backend
      try {
        const response = await axios.post('http://localhost:5000/api/process-payment', {
          token: token,
          formData: formData,
          totalAmount: totalAmount,
        });
        
    
        // Check the response from the backend and handle success or failure accordingly
        if (response.data.success) {
          // Payment successful
          try {
            const token = localStorage.getItem('token');
      
            await axios.delete('http://localhost:5000/api/emptycart', {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
      
            // After successful removal, reload the page to refresh the cart items
            window.location.reload();
          } catch (error) {
            console.error('Error removing item from cart:', error);
          }
          
          console.log('Payment successful!');
          // navigate('/paymentsuccessful'); //uncomment it when you turned on payment successful page
          // Add any further actions you want to perform after successful payment
        } else {
          // Payment failed
          console.log('Payment failed:', response.data.message);
          alert("Payment Failed! Kindly Try Again")
          // Add any further actions you want to perform after failed payment
        }
      } catch (error) {
        // Handle any errors that occurred during the POST request
        console.error('Error processing payment:', error);
        // Add any further actions you want to perform in case of an error
      }
  };
}

  

  useEffect(() => {

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
  
    // Check if the user is logged in by verifying the token
    checkLoginStatus();
    fetchCartItems();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="body">
        <h2>Checkout Form</h2>
        <div className="row">
          <div className="column-75">
            <div className="cotain">
              <form onSubmit={(e) => handleSubmit(e, calculateTotal(cartItems))}>
                <div className="row">
                  <div className="column-50">
                    <h3>Billing Address</h3>
                    <label htmlFor="fname">
                      <i className="fa fa-user"></i> Full Name
                    </label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Your name here"
                      value={formData.fname}
                      onChange={handleChange}
                    />
                    <label htmlFor="email">
                      <i className="fa fa-envelope"></i> Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="xyz@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="adr">
                      <i className="fa fa-address-card-o"></i> Address
                    </label>
                    <input
                      type="text"
                      id="adr"
                      name="adr"
                      placeholder="your address here"
                      value={formData.adr}
                      onChange={handleChange}
                    />
                    <label htmlFor="city">
                      <i className="fa fa-institution"></i> City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="enter your city"
                      value={formData.city}
                      onChange={handleChange}
                    />

                    <div className="row">
                      <div className="column-50">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="Write Full State Name"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="column-50">
                        <label htmlFor="zip">Zip</label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="Enter Pin code"
                          value={formData.zip}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column-50">
                    <h3>Payment</h3>
                    {/* Stripe CardElement component for card details input */}
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#aab7c4',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.sameadr}
                    name="sameadr"
                    onChange={() =>
                      setFormData((prevFormData) => ({
                        ...prevFormData,
                        sameadr: !prevFormData.sameadr,
                      }))
                    }
                  />{' '}
                  Shipping address same as billing
                </label>
                <input type="submit" value="Continue to checkout" className="button" />
              </form>
            </div>
          </div>
          <div className="column-25">
            <div className="cotain">
              <h4>
               Cart{' '}
                      <span className="price" style={{ color: 'black' }}>
                        <i className="fa fa-shopping-cart"></i> <b>{cartItems.length}</b>
                      </span>
              </h4>
              {cartItems.map((item) => (
                      <p key={item.ProductID}>
                        <a className="anchor" href="#">
                          {item.ProductName}
                        </a>{' '}
                        <span className="price">Rs.{item.NewPrice}</span>
                      </p>
                    ))}
                    <hr className="horizontal-line" />
                    <p>
                      Total{' '}
                      <span className="price" style={{ color: 'black' }}>
                        <b>₹{calculateTotal(cartItems)}</b>
                      </span>
              </p>
            </div>
          </div>
        </div>
      </div>
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


export default CheckoutForm;
