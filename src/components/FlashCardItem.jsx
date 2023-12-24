import React, { useState } from "react";
import "../assets/style/components/flashcarditem.css";

const FlashCardItem = ({ card, onDelete, onUpdate, onSelect, isSelected, onRearrange }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [draggedCards, setDraggedCards] = useState([]);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        const draggedCardId = e.currentTarget.getAttribute("data-card-id");
        setDraggedCards([draggedCardId]);
    };
    
    const handleDrop = (e, dropTargetCardId) => {
        e.preventDefault();
    
        if (!draggedCards.length || draggedCards[0] === dropTargetCardId) {
            setDraggedCards([]);
            return;
        }
    
        onRearrange(draggedCards[0], dropTargetCardId);
    
        setDraggedCards([]);
    };

    return (
        <div
            className={`flashcard-item ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, card.id)}
            data-card-id={card.id}
        >
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
                    {card.image ? (
                        <img src={card.image} alt="Card" className="card-image" />
                    ) : (
                        <h3 className="frontTxt">{card.frontText}</h3>
                    )}
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
                    <p className="last-modification">
                        Last Modified: {new Date(card.lastModificationDateTime).toLocaleDateString()}
                    </p>
                </div>
                <div className="back">
                    <p className="backTxt">{card.backAnswer}</p>
                </div>
            </div>
        </div>
    );
};

export default FlashCardItem;