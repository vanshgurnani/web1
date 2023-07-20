import React from 'react';
import '../component/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './navbar';
import Carousel from './carousel';
import Footer from './footer';
import Team from './teams';
import Items from './items';

function Home() {
  return (
    <>
    <div>
    <Navbar />
    <Carousel />
    <Items />
    <Team />
    <Footer />
  </div>
    </>
  );
}

export default Home;
