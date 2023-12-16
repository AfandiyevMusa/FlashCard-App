// updatecardmodal.jsx

import React, { useState } from "react";
import './updatecardmodal.css';

const UpdateCardModal = ({ card, onUpdate, onClose }) => {
    const [frontText, setFrontText] = useState(card.frontText);
    const [backAnswer, setBackAnswer] = useState(card.backAnswer);
    const [status, setStatus] = useState(card.status);

    const handleUpdate = () => {
        const updatedCard = {
            ...card,
            frontText,
            backAnswer,
            status,
            lastModificationDateTime: new Date().toLocaleString(),
        };

        onUpdate(updatedCard);
        onClose(); // Close the modal after updating
    };

    return (
        <div className="modal-overlay">
            <div className="update-card-modal">
                <div className="modal-content">
                    <label htmlFor="frontText">Front Text:</label>
                    <input
                        type="textarea"
                        id="frontText"
                        value={frontText}
                        onChange={(e) => setFrontText(e.target.value)}
                    />

                    <label htmlFor="backAnswer">Back Text:</label>
                    <input
                        type="textarea"
                        id="backAnswer"
                        value={backAnswer}
                        onChange={(e) => setBackAnswer(e.target.value)}
                    />

                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Want to Learn">Want to Learn</option>
                        <option value="Mark as Noted">Mark as Noted</option>
                    </select>
                </div>
                <div className="modal-footer">
                    <button className="submit-button" onClick={handleUpdate}>
                        Update
                    </button>
                    <button className="back-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateCardModal;
