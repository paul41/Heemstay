import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address:"",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validatePhone = (phone) => {
    return /^[6-9]\d{9}$/.test(phone); // Indian mobile format
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, phone, password, address } = formData;
    if (!username || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Enter a valid Indian phone number.");
      return;
    }

    try { 
      await axios.post(`${baseURL}api/user/auth/register`, formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
