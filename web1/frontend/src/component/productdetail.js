import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './productdetail.module.css';
import Navbar from './navbar';
import Footer from './footer';

const Details = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

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

  // const PD = {
  //   mainImage: process.env.PUBLIC_URL + {MainImage},
  //   imageItem1: process.env.PUBLIC_URL + {ImageItem1},
  //   imageItem2: process.env.PUBLIC_URL + {ImageItem2},
  //   imageItem3: process.env.PUBLIC_URL + {ImageItem3},
  //   imageItem4: process.env.PUBLIC_URL + {ImageItem4},
  // };

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
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Details;
