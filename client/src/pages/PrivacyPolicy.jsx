import React from "react";
import "../styles/PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1>Privacy Policy for Pedong Homestay App</h1>
      <p className="effective-date">
        <strong>Effective Date:</strong> November 7, 2025
      </p>
      <p>
        Welcome to <strong>HangHeem, Pedong Homestay App</strong> (“we”, “our”, or “us”).
        Your privacy is very important to us. This Privacy Policy explains how
        we collect, use, store, and protect your personal information when you
        use our platform, mobile app, or website (collectively, the “Service”).
      </p>

      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information to provide and improve our services:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Full name, email, phone number,
          payment details, or government ID (if required for booking).
        </li>
        <li>
          <strong>Booking Details:</strong> Check-in/check-out dates, room
          preferences, number of guests, and transaction details.
        </li>
        <li>
          <strong>Automatically Collected Information:</strong> IP address,
          browser type, device identifiers, and usage data (pages visited,
          clicks, session duration, and approximate location).
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and confirm bookings</li>
        <li>To send updates and confirmations</li>
        <li>To respond to support or inquiries</li>
        <li>To personalize user experience</li>
        <li>To improve our platform and comply with legal requirements</li>
      </ul>
      <p>We <strong>do not sell</strong> your personal information to any third party.</p>

      <h2>3. Sharing of Information</h2>
      <p>We may share information only in the following cases:</p>
      <ul>
        <li>With service providers (e.g., payment gateways, analytics tools)</li>
        <li>With property owners or hosts to manage your stay</li>
        <li>When required by law or government authorities</li>
      </ul>

      <h2>4. Data Storage and Security</h2>
      <p>
        We use HTTPS encryption and secure servers to protect your data.
        Authorized personnel may access your information for legitimate
        business use. However, no system is 100% secure, and you acknowledge
        this risk by using our services.
      </p>

      {/* <h2>5. Payments and Third-Party Services</h2>
      <p>
        Payments are processed securely through trusted third parties like
        Razorpay, Stripe, or PayPal. We do not store or access your full payment
        information.
      </p> */}

      <h2>5. Data Retention</h2>
      <p>
        We retain your data only as long as necessary for bookings, support,
        legal, or accounting reasons. You may request account deletion anytime
        via email.
      </p>

      <h2>6. Your Rights</h2>
      <ul>
        <li>Access, correct, or delete your data</li>
        <li>Withdraw consent at any time</li>
        <li>Request how your data is used</li>
      </ul>
      <p>Contact us to exercise these rights.</p>

      <h2>7. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies and analytics tools to improve performance, remember your
        preferences, and personalize offers. You can disable cookies in your
        browser settings.
      </p>

      <h2>8. Children’s Privacy</h2>
      <p>
        Our services are not intended for children under 18. We do not knowingly
        collect information from minors.
      </p>

      <h2>9. International Data Transfers</h2>
      <p>
        If you access our app from outside India, your data may be processed in
        India or other jurisdictions where our servers or partners operate.
      </p>

      {/* <h2>11. Contact Us</h2>
      <p>
        For any privacy-related questions, contact:
        <br />
        <strong>Pedong Homestay Support Team</strong>
        <br />
        📧 Email: <a href="mailto:support@pedonghomestay.com">support@pedonghomestay.com</a>
        <br />
        📍 Address: Pedong, Kalimpong District, West Bengal, India
      </p> */}

      <h2>10. Updates to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. Changes will be posted
        here with an updated “Effective Date.”
      </p>

      <p className="last-updated">
        <em>Last Updated: November 7, 2025</em>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
