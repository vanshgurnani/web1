import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './productdetail.module.css';
import Navbar from './navbar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Details = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${productId}`)
      .then(response => {
        setProductData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [productId]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(isNaN(value) ? 1 : value); // Set quantity to 1 if the value is not a valid number
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user is not logged in, redirect to the login page
      // navigate('/login');
      alert('Kindly Login First');
      return;
    }

    const decodedToken = jwt_decode(token);
    const userEmail = decodedToken.Email;

    // Prepare the cart item data to be stored in the database
    const cartItem = {
      EmailID: userEmail,
      ProductID: productData.ProductID,
      ProductName: productData.ProductName,
      NewPrice: productData.NewPrice,
      ShippingFee: productData.ShippingFee,
      Quantity: quantity, // Assuming the default quantity is 1 when the user clicks "Add to Cart"
    };

    console.log(cartItem.Quantity)

    // Make an API request to store the cart item in the CartInfo database
    axios.post('http://localhost:5000/api/cart', cartItem)
      .then(response => {
        // Cart item successfully added to the database
        console.log('Item added to cart:', response.data);
        alert(JSON.stringify(response.data['message']))
        // Optionally, you can show a success message to the user
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
        // Optionally, you can show an error message to the user
      });
  };

  // ... Rest of the code ...
    const {
    ProductName,
    MainImage,
    ImageItem1,
    ImageItem2,
    ImageItem3,
    ImageItem4,
    Description,
    AboutThisItem,
    Ratings,
    NoOfReviews,
    OldPrice,
    NewPrice,
    Color,
    Available,
    Category,
    ShippingArea,
    ShippingFee,
  } = productData;

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className={styles['card-wrapper']}>
        <div className={styles.card}>
          <div className={styles['product-imgs']}>
            <div className={styles['img-display']}>
              <div className={styles['img-showcase']}>
                <img src={MainImage} alt="image1" />
                <img src={MainImage} alt="image1" />
                <img src={MainImage} alt="image2" />
                <img src={MainImage} alt="image3" />
                <img src={MainImage} alt="image4" />
              </div>
            </div>  
            <div className={styles['img-select']}>
              <div className={styles['img-item']}>
                <a href="#" data-id="1">
                  <img src={ImageItem1} alt="image1" />
                </a>
              </div>
              <div className={styles['img-item']}>
                <a href="#" data-id="2">
                  <img src={ImageItem2} alt="image2" />
                </a>
              </div>
              <div className={styles['img-item']}>
                <a href="#" data-id="3">
                  <img src={ImageItem3} alt="image3" />
                </a>
              </div>
              <div className={styles['img-item']}>
                <a href="#" data-id="4">
                  <img src={ImageItem4} alt="image4" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles['product-content']}>
            <h2 className={styles['product-title']}>{ProductName}</h2>
            <a href="#" className={styles['product-link']}>visit product store</a>
            <div className={styles['product-rating']}>
              {/* Font Awesome icons for star rating */}
              {/* Calculate the number of full and half stars based on Ratings */}
              {Array.from({ length: Math.floor(Ratings) }, (_, index) => (
                <i key={index} className="fas fa-star"></i>
              ))}
              {Ratings % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
              {Array.from({ length: 5 - Math.ceil(Ratings) }, (_, index) => (
                <i key={index + Math.floor(Ratings)} className="far fa-star"></i>
              ))}
              <span>{Ratings}</span>
              <span>({NoOfReviews})</span>
            </div>
            <div className={styles['product-price']}>
              <p className={styles['last-price']}>Old Price: <span>Rs.{OldPrice}</span></p>
              <p className={styles['new-price']}>New Price: <span>Rs.{NewPrice}</span></p>
            </div>
            <div className={styles['product-detail']}>
              <h2>About This Item: </h2>
              <p>{AboutThisItem}</p>
              <ul>
                <i className="fa-solid fa-circle-check fa-beat" style={{ color: '#668943' }}></i>
                <li>Color: <span>{Color}</span></li>
                <li>Available: <span>{Available}</span></li>
                <li>Category: <span>{Category}</span></li>
                <li>Shipping Area: <span>{ShippingArea}</span></li>
                <li>Shipping Fee: <span>{ShippingFee}</span></li>
              </ul>
            </div>
      {/* ... */}
      <div className={styles['purchase-info']}>
        <input type="number" min="0" value={quantity} onChange={handleQuantityChange}/>
        <button type="button" className="btn" onClick={handleAddToCart}>
          Add to Cart <i className="fas fa-shopping-cart"></i>
        </button>
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
      <br />
      <br />
      <Footer />
      {/* ... */}
    </>
  );
};

export default Details;
