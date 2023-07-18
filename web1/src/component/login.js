import React from 'react';
import '../component/login.css';

function Login() {
  return (
    <>
      <div className="container">
        <h2>Login</h2>
        <form id="registration-form" method="post" action="{{url_for('login')}}">
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
        <p>Don't have an account? <a href="{{url_for('register')}}">Register here</a>.</p>
      </div>
    </>
  );
}

export default Login;
