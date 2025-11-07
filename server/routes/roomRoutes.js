import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Room from "../models/Rooms.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/rooms", /*authMiddleware*/ async(req, res) => {
  try {
    const fetchRooms = await Room.find();
    res.status(201).json({ message: "Rooms returned successfully", data: fetchRooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Failed to fetch rooms", error });
  }
});
router.get("/rooms/:id", /*authMiddleware*/ async(req, res) => {
  try {
    const roomId = req.params.id;
    const fetchRoom = await Room.findById(roomId);
    if (!fetchRoom) {
      return res.status(404).json({ message: "Room not found" });
    }   
    res.status(201).json(fetchRoom);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Failed to fetch room", error });
  }
});
export default router;