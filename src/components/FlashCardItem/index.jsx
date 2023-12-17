import React, { useState } from "react";
import "./flashcarditem.css";

const FlashCardItem = ({ card, onDelete, onUpdate, onSelect, isSelected }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`flashcard-item ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(card.id)}
                />
                <div className="checkbox-icon">&#10003;</div>
            </div>
            <div className="flipper">
                <div className="front">
                    <h3 className="frontTxt">{card.frontText}</h3>
                    <div className="buttons">
                        <button className="update-button" onClick={() => onUpdate(card)}>
                            Update
                        </button>
                        <button className="delete-button" onClick={() => onDelete(card.id)}>
                            Delete
                        </button>
                    </div>
                    <p className="status">Status: {card.status}</p>
                    <span className="hidden" data-last-modification={card.lastModificationDateTime}></span>
                </div>
                <div className="back">
                    <p className="backTxt">{card.backAnswer}</p>
                </div>
            </div>
        </div>
    );
};

export default FlashCardItem;
