import React from "react";
import "./messageitem.css";

const MessageItem = ({ message }) => {
    const formattedDate = message.createdDate
        ? new Date(message.createdDate).toLocaleString()
        : new Date(message.date).toLocaleString();

    return (
        <div className="message-item">
            <h3>{message.subject || message.name}</h3>
            <p>Email: {message.email}</p>
            <p>Content: {message.content || message.message}</p>
            <p>Date: {formattedDate}</p>
        </div>
    );
};

export default MessageItem;
