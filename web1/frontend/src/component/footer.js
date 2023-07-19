import React from 'react';

function footer() {
  return (
    <>
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
    </>
  );
}

export default footer;
