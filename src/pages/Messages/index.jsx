import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/index";
import MessageItem from "../../components/MessageItem";
import "./messages.css";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages from the JSON server
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
            // Delete the message from the JSON server
            await axios.delete(`http://localhost:3001/messages/${id}`);

            // Remove the message from the UI
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
