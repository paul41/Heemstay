import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/MyBookings.css";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${baseURL}api/user/bookings/me/${user.id}`);
        setBookings(res.data);
      } catch (err) {
        setError("Failed to load your bookings.");
      }
    };
    fetchBookings();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!bookings.length) return <p>You have no bookings yet.</p>;

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking._id} className="booking-card">
            <h3>{booking.roomId?.title || "Room"}</h3>
            <p><strong>Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
            <p><strong>Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              {booking.status}
              {booking.status?.toLowerCase() === "active" && (
                <span style={{ color: "green", marginLeft: "5px" }}>✅</span>
              )}
            </p>
            <p><strong>Total:</strong> ₹{booking?.roomId?.pricePerNight}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
