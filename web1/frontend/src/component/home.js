import React from 'react';
import '../component/home.css';

function Home() {
  return (
    <>
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="images/home.png" alt="Bootstrap" width={30} height={24} />
        </a>
        <a className="navbar-brand" href="#">Shopstore</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Contact</a>
            </li>
          </ul>
          <form className="d-flex form-center" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <div className="gap" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <br />
          <button type="button" className="btn btn-light"><img src="cart.svg" alt="" /></button>
        </div>
      </div>
    </nav>
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="images/deal1.jpg" className="d-block w-100 img-content" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/deal2.jpg" className="d-block w-100 img-content" alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/deal3.jpg" className="d-block w-100 img-content" alt="..." />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
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
    <div className="black-box">
      <div className="container">
        <div className="row">
          <div className="col">
            <center>
              <h1>Our Team</h1>
            </center>
            <div className="content-para">
              <p>Meet our team, a passionate bunch of Developers, Designers, and Managers! Our team works round the clock to deliver the best possible experiences for our community!</p>
            </div>
          </div>
        </div>
        <div className="row">
          {/* col start */}
          <div className="col">
            <img src="images/Rectangle 116.png" alt="" />
            <br /><br />
            <h5>Full Name</h5>
            <p>Member</p>
            <div className="row">
              <div className="col-sm-3"><p><u>Linkedln</u></p></div>
              <div className="col-sm-3"><p><u>mail</u></p></div>
            </div>
          </div>
          {/* col end */}
          {/* col start */}
          <div className="col">
            <img src="images/Rectangle 116.png" alt="" />
            <br /><br />
            <h5>Full Name</h5>
            <p>Member</p>
            <div className="row">
              <div className="col-sm-3"><p><u>Linkedln</u></p></div>
              <div className="col-sm-3"><p><u>mail</u></p></div>
            </div>
          </div>
          {/* col end */}
          {/* col start */}
          <div className="col">
            <img src="images/Rectangle 116.png" alt="" />
            <br /><br />
            <h5>Full Name</h5>
            <p>Member</p>
            <div className="row">
              <div className="col-sm-3"><p><u>Linkedln</u></p></div>
              <div className="col-sm-3"><p><u>mail</u></p></div>
            </div>
          </div>
          {/* col end */}
          {/* col start */}
          <div className="col">
            <img src="images/Rectangle 116.png" alt="" />
            <br /><br />
            <h5>Full Name</h5>
            <p>Member</p>
            <div className="row">
              <div className="col-sm-3"><p><u>Linkedln</u></p></div>
              <div className="col-sm-3"><p><u>mail</u></p></div>
            </div>
          </div>
          {/* col end */}
        </div>
      </div>
    </div>
    <hr id="horizontal-line" />
    <footer className="bg-body-dark text-center py-4">
      <div className="container">
        <div className="row footer-content">
          <div className="col">
            <h1 className="text-white">Shopstore</h1>
            <br /><br />
          </div>
          <div className="col">
            <h5 className="text-white">Email</h5>
            <p className="text-white">SHOPSTORE@GMAIL.COM</p>
          </div>
          <div className="col">
            <h5 className="text-white">Social</h5>
            <p className="text-white"><u>INSTAGRAM</u></p>
          </div>
          <div className="col">
            <br />
            <p className="text-white"><u>TWITTER</u></p>
          </div>
          <div className="col">
            <br />
            <p className="text-white"><u>LINKEDIN</u></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
    </>
  );
}

export default Home;
