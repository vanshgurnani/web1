import React from 'react';
import styles from './productdetail.module.css'; // Import your custom CSS file or module here if needed

const Details = () => {
  return (
    <div className={styles['card-wrapper']}>
      <div className={styles.card}>
        <div className={styles['product-imgs']}>
          <div className={styles['img-display']}>
            <div className={styles['img-showcase']}>
              <img src="linkHere" alt="image1" />
              <img src="linkHere" alt="image1" />
              <img src="linkHere" alt="image2" />
              <img src="linkHere" alt="image3" />
              <img src="linkHere" alt="image4" />
            </div>
          </div>
          <div className={styles['img-select']}>
            <div className={styles['img-item']}>
              <a href="#" data-id="1">
                <img src="linkHere" alt="image1" />
              </a>
            </div>
            <div className={styles['img-item']}>
              <a href="#" data-id="2">
                <img src="linkHere" alt="image2" />
              </a>
            </div>
            <div className={styles['img-item']}>
              <a href="#" data-id="3">
                <img src="linkHere" alt="image3" />
              </a>
            </div>
            <div className={styles['img-item']}>
              <a href="#" data-id="4">
                <img src="linkHere" alt="image4" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles['product-content']}>
          <h2 className={styles['product-title']}>Product Name</h2>
          <a href="#" className={styles['product-link']}>visit product store</a>
          <div className={styles['product-rating']}>
            {/* Font Awesome icons for star rating */}
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>
          <div className={styles['product-price']}>
            <p className={styles['last-price']}>Old Price: <span>Rs.4000</span></p>
            <p className={styles['new-price']}>New Price: <span>Rs.3800 (5%)</span></p>
          </div>
          <div className={styles['product-detail']}>
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
          <div className={styles['purchase-info']}>
            <input type="number" min="0" defaultValue="1" />
            <button type="button" className="btn">
              Add to Cart <i className="fas fa-shopping-cart"></i>
            </button>
            <button type="button" className="btn">Compare</button>
          </div>
          <div className={styles['social-links']}>
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
  );
};

export default Details;
