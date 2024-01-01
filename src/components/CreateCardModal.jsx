import React, { useState } from "react";
import "../assets/style/components/createcardmodal.css";

const CreateCardModal = ({ onCreate, onClose }) => {
    const [frontText, setFrontText] = useState("");
    const [backAnswer, setBackAnswer] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [status, setStatus] = useState("Want to Learn");
    const [lastModificationDateTime, setDateTime] = useState("");
    const currentDateTime = new Date().toLocaleString();
    const [createType, setCreateType] = useState("text");

    const handleCreate = () => {
        const newCard = {
            frontText: createType === "image" ? "" : frontText,
            backAnswer,
            image: createType === "image" ? imagePath : "",
            status,
            lastModificationDateTime: currentDateTime,
        };

        onCreate(newCard);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImagePath(URL.createObjectURL(selectedImage));
    };

    return (
        <div className="modal-overlay">
            <div className="create-card-modal">
                <div className="modal-header">
                    <h2>Choose type of card</h2>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-content">
                    <div className="options">
                        <label>
                            <input
                                className="choice-btn"
                                type="radio"
                                name="createType"
                                value="text"
                                checked={createType === "text"}
                                onChange={() => setCreateType("text")}
                            />
                            <span className="option-name">Text</span>
                        </label>
                        <label>
                            <input
                                className="choice-btn"
                                type="radio"
                                name="createType"
                                value="image"
                                checked={createType === "image"}
                                onChange={() => setCreateType("image")}
                            />
                            <span className="option-name">Image</span>
                        </label>
                    </div>

                    {createType === "text" && (
                        <>
                            <label htmlFor="frontText" className="frontText">Front Text:</label>
                            <input
                                type="text"
                                id="frontText"
                                value={frontText}
                                onChange={(e) => setFrontText(e.target.value)}
                                placeholder="Enter your front text"
                            />
                        </>
                    )}

                    {createType === "image" && (
                        <>
                            <label htmlFor="image" className="image">Upload Image:</label>
                            <input type="file" id="image" onChange={handleImageChange} accept="image/*" />
                        </>
                    )}

                    <label htmlFor="backAnswer" className="backAnswer">Back Answer:</label>
                    <input
                        type="text"
                        id="backAnswer"
                        value={backAnswer}
                        onChange={(e) => setBackAnswer(e.target.value)}
                        placeholder="Enter your back answer"
                    />

                    <input type="hidden" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
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
