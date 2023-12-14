import React, { useState } from "react";
import './updatecardmodal.css';

const UpdateCardModal = ({ card, onUpdate, onClose }) => {
    const [frontText, setFrontText] = useState(card.frontText);
    const [backAnswer, setBackAnswer] = useState(card.backAnswer);

    const handleUpdate = () => {
        const updatedCard = {
            ...card,
            frontText,
            backAnswer,
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
