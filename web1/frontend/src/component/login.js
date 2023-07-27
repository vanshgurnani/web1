import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setMessage(response.data.message); // Always set the message from the response
      
      if (response.status === 200) {
        // Save the token to local storage
        localStorage.setItem('token', response.data.token);
  
        // Redirect to the home page upon successful login
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.container}>
          <h2 className={styles['login-head']}>Login</h2>
          <form id="registration-form" onSubmit={handleLogin}>
            <div className={styles['form-group']}>
              <input
                className={styles['input-login']}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <input
                className={styles['input-login']}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles['form-group']}>
              <button type="submit" className={styles.btn}>
                Login
              </button>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
          {message && <p className={styles.message}>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;
