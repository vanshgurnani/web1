// PaymentSuccessful.js
import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './paymentsuccess.module.css'; 
const PaymentSuccessful = () => {
  return (
    <>
      <Navbar />
      <div className="payment-successful">
        <div className="content">
          <h1>Payment Successful!</h1>
          <p>Your payment has been successfully processed.</p>
          <p>Thank you for your order.</p>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccessful;
