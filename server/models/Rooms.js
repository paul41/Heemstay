import mongoose from "mongoose";
const roomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
    },
    description: {
    type: String,
    required: true,
    trim: true
    },
    pricePerNight: {
    type: Number,
    required: true
    },
    address: {
    type: String,
    required: true,
    trim: true
    },
    images: {   
    type: [String],
    default: []
    }, 
    amenities: {
    type: [String],
    default: []
    },
    status: {
    type: String,  
    enum: ["available", "unavailable"],
    default: "available"
    },
    createdAt: {
    type: Date,
    default: Date.now
  }
});
const Room = mongoose.model("Room", roomSchema);
export default Room;