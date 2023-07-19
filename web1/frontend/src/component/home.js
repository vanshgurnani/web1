import React from 'react';
import '../component/home.css';
import Navbar from './navbar';
import Carousel from './carousel';
import Footer from './footer';
import Team from './teams';

function Home() {
  return (
    <>
    <div>
    <Navbar />
    <Carousel />
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card categories-card">
            <ul className="list-group list-group-flush">
              <h1>Categories</h1>
              <li className="list-group-item" onclick="showCategory('tech')">Tech</li>
              <li className="list-group-item" onclick="showCategory('fashion')">Fashion</li>
              <li className="list-group-item" onclick="showCategory('accessories')">Accessories</li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-6">
              <div className="card category-card" id="techContent">
                <div className="card-body">
                  <h5 className="card-title">Tech Item 1</h5>
                  <img src="images/headphone.jpg" alt="" className="w-100" /> 
                  <p className="card-text">Description of Tech Item 1</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card category-card" id="techContent2">
                <div className="card-body">
                  <h5 className="card-title">Tech Item 2</h5>
                  <img src="images/headphone.jpg" alt="" className="w-100" /> 
                  <p className="card-text">Description of Tech Item 2</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card category-card" id="fashionContent">
                <div className="card-body">
                  <h5 className="card-title">Fashion Item 1</h5>
                  <p className="card-text">Description of Fashion Item 1</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card category-card" id="fashionContent2">
                <div className="card-body">
                  <h5 className="card-title">Fashion Item 2</h5>
                  <p className="card-text">Description of Fashion Item 2</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card category-card" id="accessoriesContent">
                <div className="card-body">
                  <h5 className="card-title">Accessories Item 1</h5>
                  <p className="card-text">Description of Accessories Item 1</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card category-card" id="accessoriesContent2">
                <div className="card-body">
                  <h5 className="card-title">Accessories Item 2</h5>
                  <p className="card-text">Description of Accessories Item 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Team />
    <Footer />
  </div>
    </>
  );
}

export default Home;
