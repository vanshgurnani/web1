import React from 'react';

function team() {
  return (
    <>
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
          <img className='h-70' src="images/vansh.jpeg" alt="" />
          <br /><br />
          <h5>Vansh Gurnani <br />Full Stack Developer</h5>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col">
          <img className='h-70' src="images/ankit.jpeg" alt="" />
          <br /><br />
          <h5>Ankit Ghosal<br />Frontend Developer</h5>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col">
          <img className='h-70' src="images/arun.jpg" alt="" />
          <br /><br />
          <h5>Arun Chandra <br />Backend Developer</h5>
        </div>
        {/* col end */}
        {/* col start */}
        <div className="col">
          <img className='h-70' src="images/gayatri.jpeg" alt="" />
          <br /><br />
          <h5>Gayatri Swain <br />Frontend Developer</h5>
        </div>
        {/* col end */}
      </div>
    </div>
  </div>
    </>
  );
}

export default team;
