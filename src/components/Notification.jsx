import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
    return (
        <div>
            <ToastContainer autoClose={3000} />
        </div>
    );
};

export default Notification;
