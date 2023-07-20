import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './items.module.css';

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState('tech');
  const [categoriesData, setCategoriesData] = useState({});

  const fetchCategoriesData = () => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategoriesData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const currentCategoryData = categoriesData[selectedCategory];

  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categoriesData).map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? styles.active : ''}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['main-content']}>
        {currentCategoryData && currentCategoryData.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.imageSrc} alt={item.title} className={styles.productImage} />
            <div className={styles.productName}>{item.title}</div>
            <div className={styles.productDescription}>{item.description}</div>
            <button type="button" className="btn btn-success m-2">Buy</button>
            <button type="button" className="btn btn-danger m-2">Danger</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
