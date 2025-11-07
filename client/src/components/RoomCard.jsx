import React from "react";
import { Link } from "react-router-dom";
import "../styles/RoomCard.css";

const RoomCard = ({ room }) => {
  const { _id, title, pricePerNight, images, address } = room;

  return (
    <div className="room-card">
      <Link to={`/rooms/${_id}`}>
        <img
          src={images?.[0] || "/default-room.jpg"}
          alt={title}
          className="room-image"
        />
      </Link>
      <div className="room-info">
        <h3>{title}</h3>
        <p className="room-address">{address}</p>
        <p className="room-price">₹{pricePerNight} / night</p>
        <Link to={`/rooms/${_id}`} className="details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
