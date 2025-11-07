import React, { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import "../styles/RoomList.css";
const baseURL = process.env.REACT_APP_DEV_LOCAL

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get(`${baseURL}api/user/rooms`);
        console.log(data);

        setRooms(data.data);
      } catch (err) {
        setError("Failed to load rooms.");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="room-list">
      <h2>Available Homestays</h2>
      {loading ? (
        <p>Loading rooms...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : rooms.length === 0 ? (
        <p>No rooms available at the moment.</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
