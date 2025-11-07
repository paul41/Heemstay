import express from "express";
import Contact from "../models/Contact.js";
const router = express.Router();
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1️⃣ Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, email, message) are required.",
            });
        }
        const newContact = new Contact({
            name,
            email,
            message,
        });
        await newContact.save();

        // Respond with success
        res.status(201).json({
            success: true,
            message: "Thank you for reaching out! We'll get back to you soon.",
            data: newContact,
        });
    } catch (error) {
        console.error("Error saving contact form:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Unable to save your message.",
        });
    }
});
router.get("/user-queries", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        console.error("Error fetching contact queries:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Unable to fetch user queries.",
        });
    }
});
export default router;