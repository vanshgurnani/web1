import React, { useState } from 'react';
import styles from './items.module.css';

const categoriesData = {
  tech: [
    {
      title: 'Tech Item 1',
      imageSrc: 'images/headphone.jpg',
      description: 'Description of Tech Item 1',
    },
    {
      title: 'Tech Item 2',
      imageSrc: 'images/headphone.jpg',
      description: 'Description of Tech Item 2',
    },
    {
        title: 'Tech Item 3',
        imageSrc: 'images/headphone.jpg',
        description: 'Description of Tech Item 3',
    },
    {
        title: 'Tech Item 4',
        imageSrc: 'images/headphone.jpg',
        description: 'Description of Tech Item 4',
    },
    {
      title: 'Tech Item 5',
      imageSrc: 'images/headphone.jpg',
      description: 'Description of Tech Item 5',
  },{
    title: 'Tech Item 6',
    imageSrc: 'images/headphone.jpg',
    description: 'Description of Tech Item 6',
}
    // Add more tech items as needed
  ],
  fashion: [
    {
      title: 'Fashion Item 1',
      imageSrc: 'images/shirt.jpg',
      description: 'Description of Fashion Item 1',
    },
    {
      title: 'Fashion Item 2',
      imageSrc: 'images/shirt.jpg',
      description: 'Description of Fashion Item 2',
    },
    // Add more fashion items as needed
  ],
  accessories: [
    {
      title: 'Accessory 1',
      imageSrc: 'images/accessories.jpg',
      description: 'Description of Accessory 1',
    },
    {
      title: 'Accessory 2',
      imageSrc: 'images/accessories.jpg',
      description: 'Description of Accessory 2',
    },
    // Add more accessory items as needed
  ],
  // Add more categories as needed
};

const Items = () => {
  const [selectedCategory, setSelectedCategory] = useState('tech');

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
        {currentCategoryData.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.imageSrc} alt={item.title} className={styles.productImage} />
            <div className={styles.productName}>{item.title}</div>
            <div className={styles.productDescription}>{item.description}</div>
            <button type="button" class="btn btn-success m-2">Buy</button>
            <button type="button" class="btn btn-danger m-2">Danger</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
