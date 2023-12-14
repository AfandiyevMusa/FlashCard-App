import React from "react";
import Navbar from "../../components/Navbar/index";
import ContactForm from "../../components/ContactForm/index";
import "./contactpage.css";

const ContactPage = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <section className="contact-section">
                    <h1>Contact Me</h1>
                    <p>
                        Feel free to reach out to me using the contact form below. I'll get back to
                        you as soon as possible.
                    </p>
                    <ContactForm />
                </section>
            </div>
        </div>
    );
};

export default ContactPage;
