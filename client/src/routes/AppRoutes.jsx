import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RoomList from "../pages/RoomList";
import RoomDetails from "../pages/RoomDetails";
import BookingForm from "../pages/BookingForm";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Payment from "../pages/Payment";
import ProtectedRoute from "../components/ProtectedRoute";
import Admin from "../pages/AdminPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ContactUs from "../pages/ContactUs";
import UsrMsg from "../pages/UsrMsg";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/rooms" element={<RoomList />} />
      <Route path="/rooms/:id" element={<RoomDetails />} />
      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-bookings"
        element={
           <ProtectedRoute>
                <MyBookings />
           </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:bookingId"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin-ui/dashboard" element={<Admin />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/admin-ui/user-msg" element={<UsrMsg/>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
