import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminPage.css";

const baseURL = process.env.REACT_APP_API_URL || process.env.REACT_APP_DEV_LOCAL;

const Admin = () => {
    const [message, setMessage] = useState("");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🟢 Fetch welcome message
    const fetchWelcome = async () => {
        try {
            const res = await axios.get(`${baseURL}api/admin/`);
            setMessage(res.data);
        } catch (err) {
            console.error("Error fetching welcome message:", err);
        }
    };

    // 🟢 Fetch dashboard bookings
    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${baseURL}api/admin/all-bookings`);
            setBookings(res.data.bookings || []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Activate booking
    const activateBooking = async (id) => {
        try {
            await axios.put(`${baseURL}api/admin/bookings/${id}/activate`);
            // update UI instantly without re-fetch
            setBookings((prev) =>
                prev.map((b) =>
                    b._id === id ? { ...b, status: "active" } : b
                )
            );
        } catch (err) {
            console.error("Error activating booking:", err);
        }
    };

    useEffect(() => {
        fetchWelcome();
        fetchBookings();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6" style={{ "position": "relative", top: 50 }}>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6">{message}</p>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Room</th>
                            <th className="border p-2">User</th>
                            <th className="border p-2">Check-in</th>
                            <th className="border p-2">Check-out</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b._id}>
                                <td className="border p-2">{b.roomTitle || "N/A"}</td>
                                <td className="border p-2">{b.userId?.username || "N/A"}</td>
                                <td className="border p-2">
                                    {b.checkInDate
                                        ? new Date(b.checkInDate).toLocaleString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "N/A"}
                                </td>

                                <td className="border p-2">
                                    {b.checkOutDate
                                        ? new Date(b.checkOutDate).toLocaleString("en-IN", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : "N/A"}
                                </td>

                                <td className="border p-2">{b.roomId?.price || "-"}</td>
                                <td className="border p-2">
                                    {b.status}
                                    {b.status === "active" && (
                                        <span style={{ color: "green", marginLeft: "5px" }}>✔️</span>
                                    )}
                                </td>
                                <td className="border p-2 text-center">
                                    {b.status !== "active" ? (
                                        <button
                                            onClick={() => activateBooking(b._id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        >
                                            Activate
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="bg-green-400 text-white px-3 py-1 rounded opacity-70 cursor-not-allowed"
                                        >
                                            Active
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Admin;
