import React from "react";
import "./messageitem.css";

const MessageItem = ({ message }) => {
    return (
        <div className="message-item">
            <h3>{message.subject || message.name}</h3>
            <p>Email: {message.email}</p>
            <p>Content: {message.content || message.message}</p>
            <p>Date: {new Date(message.date).toLocaleString()}</p>
        </div>
    );
};

export default MessageItem;
