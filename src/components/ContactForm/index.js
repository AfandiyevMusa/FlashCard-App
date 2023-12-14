import React, { useState } from "react";
import axios from "axios";
import "./contactform.css";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentDateTime = new Date().toLocaleString();
    
            // Send the form data to the json-server
            await axios.post("http://localhost:3001/messages", {
                ...formData,
                createdDate: currentDateTime,
            });
    
            // Reset the form after submission
            setFormData({
                name: "",
                email: "",
                message: "",
            });
    
            alert("Message sent successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label htmlFor="message">Message:</label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;
