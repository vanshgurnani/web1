import React, { useState } from 'react';
import './checkout.css';
import { useEffect} from 'react';
import Navbar from './navbar';
import Footer from './footer';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    email: '',
    adr: '',
    city: '',
    state: '',
    zip: '',
    cname: '',
    ccnum: '',
    expmonth: '',
    expyear: '',
    cvv: '',
    sameadr: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission here using formData object
    console.log('Form data:', formData);
  };

  const navigate = useNavigate();

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
  }, [navigate]);
  
  return (
    <><Navbar /><div className="body">
      <h2>Checkout Form</h2>
      <div className="row">
        <div className="column-75">
          <div className="cotain">
            <form onSubmit={handleSubmit}>
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
                    onChange={handleChange} />
                  <label htmlFor="email">
                    <i className="fa fa-envelope"></i> Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    value={formData.email}
                    onChange={handleChange} />
                  <label htmlFor="adr">
                    <i className="fa fa-address-card-o"></i> Address
                  </label>
                  <input
                    type="text"
                    id="adr"
                    name="adr"
                    placeholder="your address here"
                    value={formData.adr}
                    onChange={handleChange} />
                  <label htmlFor="city">
                    <i className="fa fa-institution"></i> City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="enter your city"
                    value={formData.city}
                    onChange={handleChange} />

                  <div className="row">
                    <div className="column-50">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Write Full State Name"
                        value={formData.state}
                        onChange={handleChange} />
                    </div>
                    <div className="column-50">
                      <label htmlFor="zip">Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        placeholder="Enter Pin code"
                        value={formData.zip}
                        onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="column-50">
                  <h3>Payment</h3>
                  <label htmlFor="fname">Accepted Cards</label>
                  <div className="icon-cotain">
                    <i className="fa fa-cc-visa" style={{ color: 'navy' }}></i>
                    <i className="fa fa-cc-amex" style={{ color: 'blue' }}></i>
                    <i
                      className="fa fa-cc-mastercard"
                      style={{ columnor: 'red' }}
                    ></i>
                    <i
                      className="fa fa-cc-discover"
                      style={{ columnor: 'orange' }}
                    ></i>
                  </div>
                  <label htmlFor="cname">Name on Card</label>
                  <input
                    type="text"
                    id="cname"
                    name="cname"
                    placeholder="ENTER CARD NAME"
                    value={formData.cname}
                    onChange={handleChange} />
                  <label htmlFor="ccnum">Credit card number</label>
                  <input
                    type="text"
                    id="ccnum"
                    name="ccnum"
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    value={formData.ccnum}
                    onChange={handleChange}
                    maxLength="19"
                    required />
                  <label htmlFor="expmonth">Expiry Month</label>
                  <input
                    type="text"
                    id="expmonth"
                    name="expmonth"
                    placeholder="December"
                    value={formData.expmonth}
                    onChange={handleChange} />
                  <div className="row">
                    <div className="column-50">
                      <label htmlFor="expyear">Exp Year</label>
                      <input
                        type="text"
                        id="expyear"
                        name="expyear"
                        placeholder="2027"
                        value={formData.expyear}
                        onChange={handleChange} />
                    </div>
                    <div className="column-50">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <label>
                <input
                  type="checkbox"
                  checked={formData.sameadr}
                  name="sameadr"
                  onChange={() => setFormData((prevFormData) => ({
                    ...prevFormData,
                    sameadr: !prevFormData.sameadr,
                  }))} />{' '}
                Shipping address same as billing
              </label>
              <input type="submit" value="Continue to checkout" className="button" />
            </form>
          </div>
        </div>
        <div className="column-25">
          <div className="cotain">
            <h4>
              Cart <span className="price" style={{ columnor: 'black' }}>
                <i className="fa fa-shopping-cart"></i> <b>4</b>
              </span>
            </h4>
            <p>
              <a className='anchor' href="#">Item 1 Name</a> <span className="price">Rs.123</span>
            </p>
            <p>
              <a className='anchor' href="#">Item 2 Name</a> <span className="price">Rs.95</span>
            </p>
            <p>
              <a className='anchor' href="#">Item 3 Name</a> <span className="price">Rs.100</span>
            </p>
            <p>
              <a className='anchor' href="#">Item 4 Name</a> <span className="price">Rs.50</span>
            </p>
            <hr className='horizontal-line' />
            <p>
              Total{' '}
              <span className="price" style={{ columnor: 'black' }}>
                <b>Rs.1000</b>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div><Footer /></>
  );
};

export default CheckoutForm;
