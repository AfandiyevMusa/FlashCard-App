import React, { useState } from "react";
import "../assets/style/components/flashcarditem.css";

const FlashCardItem = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragStart = (e) => {
        const draggedCardId = e.currentTarget.getAttribute("data-card-id");
        e.dataTransfer.setData("text/plain", draggedCardId);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const dropTargetCardId = e.currentTarget.getAttribute("data-card-id");
        const draggedCardId = e.dataTransfer.getData("text/plain");

    
        // Access the 'cards' prop to find the order
        
    
        const dropTargetFrontText = props.cards.find((card) => card.id === Number(dropTargetCardId)).frontText;
        const draggedFrontText = props.cards.find((card) => card.id === Number(draggedCardId)).frontText;

        const dropTargetBackAnswer = props.cards.find((card) => card.id === Number(dropTargetCardId)).backAnswer;
        const draggedBackAnswer = props.cards.find((card) => card.id === Number(draggedCardId)).backAnswer;

        const dropTargetStatus = props.cards.find((card) => card.id === Number(dropTargetCardId)).status;
        const draggedStatus = props.cards.find((card) => card.id === Number(draggedCardId)).status;

        const dropTargetModifiedTime = props.cards.find((card) => card.id === Number(dropTargetCardId)).lastModificationDateTime;
        const draggedModifiedTime = props.cards.find((card) => card.id === Number(draggedCardId)).lastModificationDateTime;

        const dropTargetImage = props.cards.find((card) => card.id === Number(dropTargetCardId)).image;
        const draggedImage = props.cards.find((card) => card.id === Number(draggedCardId)).image;
        
        const dropTargetOrder = props.cards.find((card) => card.id === Number(dropTargetCardId)).order;
        const draggedOrder = props.cards.find((card) => card.id === Number(draggedCardId)).order;

        // Call onRearrange with the order information
        props.onRearrange(draggedCardId, draggedOrder, draggedFrontText, draggedBackAnswer, draggedStatus, 
            draggedModifiedTime, draggedImage, dropTargetCardId, dropTargetOrder, dropTargetFrontText, 
            dropTargetBackAnswer, dropTargetStatus, dropTargetModifiedTime, dropTargetImage);
    };
    
    

    return (
        <div
            className={`flashcard-item ${isFlipped ? "flipped" : ""}`}
            onClick={handleFlip}
            draggable="true"
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-card-id={props.card.id}
        >
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={props.isSelected}
                    onChange={() => props.onSelect(props.card.id)}
                />
                <div className="checkbox-icon">&#10003;</div>
            </div>
            <div className="flipper">
                <div className="front">
                    {props.card.image ? (
                        <img src={props.card.image} alt="Card" className="card-image" />
                    ) : (
                        <h3 className="frontTxt">{props.card.frontText}</h3>
                    )}
                    <div className="buttons">
                        <button className="update-button" onClick={() => props.onUpdate(props.card)}>
                            Update
                        </button>
                        <button className="delete-button" onClick={() => props.onDelete(props.card.id)}>
                            Delete
                        </button>
                    </div>
                    <p className="status">Status: {props.card.status}</p>
                    <span className="hidden" data-last-modification={props.card.lastModificationDateTime}></span>
                    <p className="last-modification">
                        Last Modified: {new Date(props.card.lastModificationDateTime).toLocaleDateString()}
                    </p>
                </div>
                <div className="back">
                    <p className="backTxt">{props.card.backAnswer}</p>
                </div>
            </div>
        </div>
    );
};

export default FlashCardItem;
