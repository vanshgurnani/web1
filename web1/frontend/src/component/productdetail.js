import React from 'react';
import './productdetail.css'; // Import your custom CSS file or module here if needed

const ShoppingCart = () => {
  return (
    <>
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src="linkHere" alt="image1" />
                <img src="linkHere" alt="image1" />
                <img src="linkHere" alt="image2" />
                <img src="linkHere" alt="image3" />
                <img src="linkHere" alt="image4" />
              </div>
            </div>
            <div className="img-select">
              <div className="img-item">
                <a href="#" data-id="1">
                  <img src="linkHere" alt="image1" />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="2">
                  <img src="linkHere" alt="image2" />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="3">
                  <img src="linkHere" alt="image3" />
                </a>
              </div>
              <div className="img-item">
                <a href="#" data-id="4">
                  <img src="linkHere" alt="image4" />
                </a>
              </div>
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">Product Name</h2>
            <a href="#" className="product-link">visit product store</a>
            <div className="product-rating">
              {/* Font Awesome icons for star rating */}
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <span>4.7(21)</span>
            </div>
            <div className="product-price">
              <p className="last-price">Old Price: <span>Rs.4000</span></p>
              <p className="new-price">New Price: <span>Rs.3800 (5%)</span></p>
            </div>
            <div className="product-detail">
              <h2>about this item: </h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
              <ul>
                <i className="fa-solid fa-circle-check fa-beat" style={{ color: '#668943' }}></i>
                <li>Color: <span>color</span></li>
                <li>Available: <span>in stock</span></li>
                <li>Category: <span>category</span></li>
                <li>Shipping Area: <span>All over the world</span></li>
                <li>Shipping Fee: <span>Free</span></li>
              </ul>
            </div>
            <div className="purchase-info">
              <input type="number" min="0" defaultValue="1" />
              <button type="button" className="btn">
                Add to Cart <i className="fas fa-shopping-cart"></i>
              </button>
              <button type="button" className="btn">Compare</button>
            </div>
            <div className="social-links">
              <p>Share At: </p>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
