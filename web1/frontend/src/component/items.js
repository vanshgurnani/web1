import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './items.module.css';

const Items = () => {
  const [categoriesData, setCategoriesData] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

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
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(selected => selected !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filterItemsBySelectedCategories = () => {
    if (selectedCategories.length === 0) {
      return Object.values(categoriesData).flat();
    } else {
      return Object.entries(categoriesData)
        .filter(([category]) => selectedCategories.includes(category))
        .map(([, items]) => items)
        .flat();
    }
  };

  const filteredItems = filterItemsBySelectedCategories();

  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <h2>Categories</h2>
        <ul>
          {Object.keys(categoriesData).map((category) => (
            <li
              key={category}
              className={selectedCategories.includes(category) ? styles.active : ''}
              onClick={() => handleCategoryClick(category)}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryClick(category)}
              />
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* <Link to="/detail">
      <div className={styles['main-content']}>
        {filteredItems.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.imageSrc} alt={item.title} className={styles.productImage} />
            <div className={styles.productName}>{item.title}</div>
            <div className={styles.productDescription}>{item.description}</div>
            <button type="button" className="btn btn-success m-2">Buy</button>
            <button type="button" className="btn btn-danger m-2">Danger</button>
          </div>
        ))}
      </div>
      </Link> */}

<div className={styles['main-content']}>
        {filteredItems.map((product, index) => (
          <div key={index} className={styles.card}>
            <img src={product.imageSrc} alt={product.title} className={styles.productImage} />
            <div className={styles.productName}>{product.title}</div>
            <div className={styles.productDescription}>{product.description}</div>
            <Link to={`/detail/${product.product_id}`} className="btn btn-success m-2">Buy</Link>
            {/* <button type="button" className="btn btn-danger m-2">Danger</button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
