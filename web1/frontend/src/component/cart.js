import React from 'react';
import './cart.css'; // Import your custom CSS file or module here if needed

const ShoppingCart = () => {
  return (
    <div className="wrapper">
      <h1>Your Shopping Cart</h1>
      <div className="project">
        <div className="shop">
          <div className="box">
            <img src="1.jpg" alt="Product 1" />
            <div className="content">
              <h3>Man's Watches</h3>
              <h4>Price: ₹40</h4>
              <p className="unit">Quantity: <input name="" value="2" /></p>
              <p className="btn-area"><i aria-hidden="true" className="fa fa-trash" /> <span className="btn2">Remove</span></p>
            </div>
          </div>
          <div className="box">
            <img src="2.jpg" alt="Product 2" />
            <div className="content">
              <h3>Man's Watches</h3>
              <h4>Price: ₹40</h4>
              <p className="unit">Quantity: <input name="" value="1" /></p>
              <p className="btn-area"><i aria-hidden="true" className="fa fa-trash" /> <span className="btn2">Remove</span></p>
            </div>
          </div>
          <div className="box">
            <img src="3.jpg" alt="Product 3" />
            <div className="content">
              <h3>Man's Watches</h3>
              <h4>Price: ₹250</h4>
              <p className="unit">Quantity: <input name="" value="0" /></p>
              <p className="btn-area"><i aria-hidden="true" className="fa fa-trash" /> <span className="btn2">Remove</span></p>
            </div>
          </div>
        </div>
        <div className="right-bar" style={{ width: '200px' }}>
          <p><span>Subtotal</span> <span>₹120</span></p>
          <hr />
          <p><span>Tax (5%)</span> <span>₹6</span></p>
          <hr />
          <p><span>Shipping</span> <span>₹15</span></p>
          <hr />
          <p><span>Total</span> <span>₹141</span></p>
          <a href="#"><i className="fa fa-shopping-cart" />Checkout</a><br /><br /><br /><br /><br />
          <a href="#"><i className="fa fa-shopping-cart" />Continue Shopping</a>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
