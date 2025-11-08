import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/RoomDetails.css";
const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL;

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchRoom = async () => {
      setRoom({ title: "Pedong Guest house", images: "", address: "Hill cart", pricePerNight: "1500/-" });
      try {
        const res = await axios.get(`${baseURL}api/user/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        setError("Failed to load room details.");
      }
    };
    fetchRoom();

  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!room) return <p>Loading room details...</p>;

  return (
    <div className="room-details">
      <h2>{room.title}</h2>
      <img
        src={room.images?.[0] || "https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/547220272.jpg?k=5dfd2188ae395eca066156066ddd84baf5b620565e84286d2de19b87a17051a7&o=&s=1024x"}
        alt={room.title}
        className="room-image-details"
      />
      <p><strong>Location:</strong> {room.address}</p>
      <p><strong>Price:</strong> ₹{room.pricePerNight} per night</p>
      <p><strong>Description:</strong> {room.description}</p>
      <p><strong>Amenities:</strong> {room.amenities?.join(", ") || "N/A"} </p>
      <Link to={`/booking/${room._id}`} className="book-button">
        Book This Stay
      </Link>
    </div>
  );
};

export default RoomDetails;