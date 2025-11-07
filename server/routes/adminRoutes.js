import express from "express";
import Booking from "../models/Booking.js";
const router = express.Router();
router.get("/", async (req, res) => {
    res.send("Welcome to Admin's booking dashboard");
});
router.get("/all-bookings", async (req, res) => {
    try {
        //TODO
        // 1️⃣ Validate the user from JWT (set by authMiddleware)
        // const userId = req.user.id;
        // const user = await User.findById(userId);

        // if (!user) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Unauthorized access — user not found or not registered",
        //     });
        // }
        // 2️⃣ Fetch all bookings (can populate room & user info)
        const bookings = await Booking.find({})
            .populate("roomId", "name price") // optional: populate room details
            .populate("userId", "") // optional: populate user info
            .sort({ createdAt: -1 });

        if (!bookings.length) {
            return res.status(404).json({
                success: false,
                message: "No bookings found in the system",
            });
        }
        console.log(bookings);
        
        // 3️⃣ Return the booking list
        res.status(200).json({
            success: true,
            total: bookings.length,
            bookings,
        });
    } catch (error) {

        res.status(500).json({ message: "Failed to fetch bookings", error });
    }
});
// ✅ Update booking status to "active"
router.put("/bookings/:id/activate", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true } // returns the updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated to active",
      data: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating booking status",
    });
  }
});

export default router;