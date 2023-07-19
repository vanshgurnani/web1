import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../component/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

// ...

const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data); // Handle the response as needed
      setMessage(response.data.message); // Set the response message in state
    } catch (error) {
      console.error(error);
    }
  };
  
  // ...
  
  return (
    <>
      <div className="body1">
      <div className="container">
      <h2>Login</h2>
      <form id="registration-form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
      {message && <p className='message'>{message}</p>}
    </div>
    </div>
      
    </>
  );
}

export default Login;
