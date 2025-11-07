import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UsrMsg.css";

const baseURL = process.env.REACT_APP_DEV_LOCAL;

const UserMsg = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all contact messages
    const fetchMessages = async () => {
        try {
            const { data } = await axios.get(`${baseURL}api/user/contacts/user-queries`);
            setMessages(data.data || []);
        } catch (err) {
            console.error("Error fetching messages:", err);
            setError("Failed to load messages. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    if (loading) return <p className="loading-text">Loading messages...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="admin-messages-container">
            <h1>📬 User Messages</h1>

            {messages.length === 0 ? (
                <p className="no-messages">No messages found.</p>
            ) : (
                <table className="messages-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg._id}>
                                <td>{msg.name}</td>
                                <td>{msg.email}</td>
                                <td>{msg.message}</td>
                                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserMsg;
