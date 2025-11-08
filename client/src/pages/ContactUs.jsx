import React, { useState } from "react";
import "../styles/ContactUs.css";
import axios from "axios";

const ContactUs = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL;
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post(`${baseURL}api/user/contacts`, form);
            console.log(response);
            
            alert(`${response.data.message}`);
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send your message. Please try again later.");
        }
    };

    return (
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p className="intro">
                Have questions or need help with your booking? We’re here for you.
            </p>

            <div className="contact-content">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your Message"
                        rows="5"
                        required
                    ></textarea>
                    <button type="submit">Send Message</button>
                </form>

                <div className="contact-info">
                    <h3>Get in Touch</h3>
                    <p>📧 Email: <a href="mailto:cuskire537@gmail.com">support@pedonghomestay.com</a></p>
                    <p>📞 Phone: +91 9832485602</p>
                    <p>📍 Address: 20th Mile Sakyong, Pedong - 734311, Dist. Kalimpong, West Bengal, India</p>
                    <p>🕒 Open: 9:00 AM – 7:00 PM (Mon–Sat)</p>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;