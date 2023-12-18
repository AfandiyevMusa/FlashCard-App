import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx"
import MessageItem from "../components/MessageItem.jsx";
import "../assets/style/pages/messages.css";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get("http://localhost:3001/messages");
                setMessages(response.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/messages/${id}`);

            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1>Messages</h1>
                <div className="messages-list">
                    {messages.map((message) => (
                        <MessageItem key={message.id} message={message} onDelete={handleDelete} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
