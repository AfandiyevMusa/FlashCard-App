import React from "react";
import "./messageitem.css";

const MessageItem = ({ message, onDelete }) => {
    const formattedDate = message.createdDate
        ? new Date(message.createdDate).toLocaleString()
        : new Date(message.date).toLocaleString();

    const handleDelete = () => {
        onDelete(message.id);
    };

    return (
        <div className="message-item">
            <div className="left-part">
                <h3>{message.subject || message.name}</h3>
                <p>Email: {message.email}</p>
                <p>Content: {message.content || message.message}</p>
                <p>Date: {formattedDate}</p>
            </div>
            <div className="right-part">
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default MessageItem;
