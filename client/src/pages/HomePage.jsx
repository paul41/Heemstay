import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import "../styles/Home.css";

const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL

const HomePage = () => {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`${baseURL}api/user/rooms`)
        //TODO: axios.get("/api/rooms?featured=true");

        setFeaturedRooms(res.data.data);
        console.log(res);
      } catch (err) {
        console.error("Failed to load rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Homestay</h1>
          <p>
            Book cozy, affordable stays across the country — instantly.{" "}
            <span className="room-count">({featuredRooms.length} stays available)</span>
          </p>
          <Link to="/rooms" className="cta-button">
            Browse All Rooms
          </Link>
        </div>
      </section>


      <section className="featured">
        <h2>🌟 Featured Stays</h2>
        <div className="room-grid">
          {featuredRooms.length > 0 ? (
            featuredRooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))
          ) : (
            <p>No featured rooms available right now.</p>
          )}
        </div>
      </section>
      <section className="about-us">
        <h2>🏡 About HangHeem Homestay</h2>
        <p>
          A perfect serene place with Majestic views of Himalayas in the Eastern font and green layers of mountains.
          The Homestay is situated in the lap of 'Damsang' Valley it has it's own historical tale.
          Here we serve you with authentic local cuisines and provide you with a homely experience.
          {/* <Link to="/about">
            Learn More About Us
          </Link> */}
        </p>
      </section>
      {/* Food with Stay */}
      <section className="food-stay">
        <h2>🍽️ Food with Stay</h2>
        <div className="food-cards">
          <div className="food-card">
            <img
              src="/momo.jpg"
              alt="Kerala Cuisine - Appam and Stew"
              className="food-image momo"
            />
            <div className="food-info">
              <h3>Sikkim Delights</h3>
              <p>Savor local dishes like momo,siddu,thukpa and many more lovingly prepared by mountain hosts for a true Himachali experience.</p>
            </div>
          </div>

          <div className="food-card">
            <img
              src="/breakfast.jpg"
              alt="Himachal Cuisine - Siddu and Thukpa"
              className="food-image dal"
            />
            <div className="food-info">
              <h3>Himalaya Flavors</h3>
              <p>Here is an adjacent farm also where vegetables are grown organically and these form the ingredients of the meals you will get. </p>
            </div>
          </div>
        </div>

        <Link to="/food-packages" className="cta-button">
          Explore Food Options
        </Link>
      </section>


      {/* Additional Tour Packages */}
      <section className="tour-packages">
        <h2>🧭 Additional Tour Packages</h2>
        <div className="tour-cards">
          <div className="tour-card">
            <img
              src="/trekking.jpg"
              alt="Guided Trekking Tour"
              className="tour-image"
            />
            <div className="tour-info">
              <h3>Guided Treks</h3>
              <p>Explore scenic trails with expert guides and experience breathtaking mountain views.</p>
            </div>
          </div>

          <div className="tour-card">
            <img
              src="/sandakphu-trek.jpg"
              alt="Sandakphu trek"
              className="tour-image"
            />
            <div className="tour-info">
              <h3>Sandakphu Trek</h3>
              <p>Discover the rich cultural history of the region through curated local heritage tours.</p>
            </div>
          </div>

          <div className="tour-card">
            <img
              src="/attractions.jpg"
              alt="River Rafting Adventure"
              className="tour-image"
            />
            <div className="tour-info">
              <h3>Hiking</h3>
              <p>Feel the adrenaline rush as you navigate thrilling rapids surrounded by stunning landscapes.</p>
            </div>
          </div>
        </div>
        <Link to="/tours" className="cta-button">
          View Tour Packages
        </Link>
      </section>

    </div>
  );
};

export default HomePage;
