import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './register.module.css'; // Import the CSS module

function RegistrationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      });
      console.log(response.data); // Handle the response as needed
      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setConfirmPassword('');

      setSuccess(true);
      setMessage(response.data.message); // Set the response message in state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.body2}>
      <div className={styles.container}>
        {success && <small>{message}</small>}
        <h2>Registration</h2>
        <form id="registration-form" onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <input
              type="text"
              id="first-name"
              name="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <input
              type="text"
              id="last-name"
              name="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
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
          <div className={styles['form-group']}>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <button type="submit" className={styles.btn}>
              Register
            </button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
