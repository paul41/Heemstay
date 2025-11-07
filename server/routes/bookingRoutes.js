import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🏨 POST: Create a booking (JWT protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    
    const { roomId, roomTitle, checkInDate, checkOutDate, userName, userEmail,userPhone } = req.body;

    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ success: false, message: "Missing booking fields" });
    }
    const booking = new Booking({
      roomId,
      roomTitle,
      checkInDate,
      checkOutDate,
      userId: req.user.id, // pulled from verified token
      userName,
      userEmail,
      userPhone,
      timestamps: new Date(),
    });
    await booking.save();

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      bookingId: booking._id,
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/me/:userId", authMiddleware, async (req, res) => {
    try {
    const { userId } = req.params;;
    
    const bookings = await Booking.find({ userId }).populate("roomId");
    console.log("bookings: ",bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
});
  
export default router;