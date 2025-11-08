import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomDatePicker from "../components/DatePicker";
import "../styles/BookingForm.css";
import { AuthContext } from "../context/AuthContext";

const BookingForm = () => {
  const { id } = useParams(); // room ID from URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL;
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${baseURL}api/user/rooms/${id}`);
        const roomList = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data)
            ? data
            : [data.data || data]; // Always wrap in array if not already
            
        setRooms(roomList); // Wrap single room in array
        if (id) {

          const found = roomList.find((r) => r._id === id);
          setSelectedRoom(found);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms.");
      }
    };
    fetchRooms();
  }, [id]);

  /** Ensure we always have Date objects */
  const parseDate = (value) => {
    if (!value) return null;
    return value instanceof Date ? value : new Date(value);
  };

  const calculateNights = () => {
    const checkIn = parseDate(checkInDate);
    const checkOut = parseDate(checkOutDate);
    if (!checkIn || !checkOut) return 0;

    const diff = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    const checkIn = parseDate(checkInDate);
    const checkOut = parseDate(checkOutDate);

    if (!selectedRoom) {
      setError("Please select a room to book.");
      return;
    }

    if (!checkIn || !checkOut || calculateNights() <= 0) {
      setError("Please select valid check-in and check-out dates.");
      return;
    }

    try {
      await axios.post(`${baseURL}api/user/bookings`, {
        roomId: selectedRoom._id,
        roomTitle: selectedRoom.title,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhone: user.phone,
      }).then((response) => {
        console.log("booking response: ", response);

        alert(
          `✅ Booking confirmed for ${selectedRoom.title}!\nFrom ${checkIn.toDateString()} to ${checkOut.toDateString()}`
        );
      }).catch((error) => {
        alert(
          `✅ Booking Failed for ${selectedRoom.title}!\nFrom ${checkIn.toDateString()} to ${checkOut.toDateString()} ${error.response.data.message}`
        );
      });
      navigate(`/my-bookings/`);
    } catch (err) {
      console.error(err);
      setError("Booking failed. Please try again.");
    }
  };

  const nights = calculateNights();
  const total = selectedRoom ? nights * selectedRoom.pricePerNight : 0;

  return (
    <div className="booking-page">
      <h2>Book Your Stay</h2>

      {/* Grid of Rooms */}
      <div className="room-grid">
        {rooms.map((room) => (
          <div
            key={room._id}
            className={`room-card ${selectedRoom?._id === room._id ? "selected" : ""} ${room.status === "unavailable" ? "disabled" : ""
              }`}
            onClick={() => room.status === "available" && setSelectedRoom(room)}
          >
            <img src={room.images} alt={room.title} className="room-image" />
            <div className="room-info">
              <h3>{room.title}</h3>
              <p>₹{room.pricePerNight} / night</p>
              <p
                className={`status ${room.status === "available" ? "available" : "unavailable"
                  }`}
              >
                {room.status === "available" ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      {selectedRoom && (
        <form className="booking-form" onSubmit={handleBooking}>
          <h3>Selected Room: {selectedRoom.title}</h3>
          <CustomDatePicker
            label="Check-in"
            selectedDate={checkInDate}
            onChange={(date) => setCheckInDate(parseDate(date))}
          />
          <CustomDatePicker
            label="Check-out"
            selectedDate={checkOutDate}
            onChange={(date) => setCheckOutDate(parseDate(date))}
            minDate={parseDate(checkInDate)}
          />
          {nights > 0 && (
            <p className="price-summary">
              <strong>Total:</strong> ₹{total} for {nights} night
              {nights > 1 ? "s" : ""}
            </p>
          )}
          {error && <p className="error">{error}</p>}
          <button type="submit">Confirm Booking</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
