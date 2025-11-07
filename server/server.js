import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoute from "./routes/contactRoute.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
if (!process.env.CLIENT_URL) {
  console.error("❌ CLIENT_URL is not defined in your .env file");
}

// Middleware
app.use(cors({ origin: process.env.LOCALHOST, credentials: true }));
app.use(express.json());
app.use(cookieParser());
//app.use("/uploads", express.static("uploads")); // Serve local images

// App Routes
app.use("/api/user/auth", authRoutes);
app.use("/api/user", roomRoutes);
app.use("/api/user/bookings", bookingRoutes);
app.use("/api/user/contacts", contactRoute);
// Health check
// app.get("/", (req, res) => {
//   res.send("Homestay API is running 🚀");
// });
// Admin Routes
app.use("/api/admin", adminRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
// DB + Server Init
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });
