import React, { useState, useEffect } from 'react';

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    'images/deal1.jpg',
    'images/deal2.jpg',
    'images/deal3.jpg'
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Set the interval to 3000ms (3 seconds)
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {items.map((item, index) => (
            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
              <img src={item} className="d-block w-100 img-content" alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" onClick={prevSlide}>
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" onClick={nextSlide}>
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Carousel;
