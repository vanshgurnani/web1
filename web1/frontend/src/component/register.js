import React from 'react';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      success: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    // You can use this.state to access the form values
    // and make API calls or perform any necessary actions
    // Once the registration is successful, set `success` to true
    this.setState({ success: true });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { success } = this.state;

    return (
      <div className="container">
        {success && <small>✅ User Registered Successfully, Login to Proceed</small>}
        <h2>Registration</h2>
        <form id="registration-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" id="first-name" name="firstName" placeholder="First Name" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="text" id="last-name" name="lastName" placeholder="Last Name" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" placeholder="Email" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="tel" id="phone" name="phone" placeholder="Phone Number" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="password" id="password" name="password" placeholder="Create Password" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm Password" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn">Register</button>
          </div>
        </form>
        <p>Already have an account? <a href="/login">Login here</a>.</p>
      </div>
    );
  }
}

export default RegistrationForm;
