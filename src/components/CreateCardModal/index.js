import React, { useState } from "react";
import './modal.css';

const CreateCardModal = ({ onCreate, onClose }) => {
    const [frontText, setFrontText] = useState("");
    const [backAnswer, setBackAnswer] = useState("");
    const [status, setStatus] = useState("Want to Learn");
    const [lastModificationDateTime, setDateTime] = useState("");
    const currentDateTime = new Date().toLocaleString();

    const handleCreate = () => {
        const newCard = {
            frontText,
            backAnswer,
        };

        onCreate(newCard);
    };

    return (
        <div className="modal-overlay">
            <div className="create-card-modal">
                <div className="modal-header">
                    <h2>Create New Card</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    <label htmlFor="frontText">Front Text:</label>
                    <input
                        type="text"
                        id="frontText"
                        value={frontText}
                        onChange={(e) => setFrontText(e.target.value)}
                    />

                    <label htmlFor="backAnswer">Back Text:</label>
                    <input
                        type="text"
                        id="backAnswer"
                        value={backAnswer}
                        onChange={(e) => setBackAnswer(e.target.value)}
                    />
                    <input
                        type="hidden"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                    <input
                        type="hidden"
                        id="lastModificationDateTime"
                        value={lastModificationDateTime}
                        onChange={(e) => setDateTime(currentDateTime)}
                    />
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleCreate}>
                        Submit
                    </button>
                    <button className="back-button" onClick={onClose}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCardModal;