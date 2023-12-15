import React, { useState, useEffect } from "react";
import axios from "axios";
import FlashCardItem from "../../components/FlashCardItem/index";
import Navbar from "../../components/Navbar/index";
import CreateCardModal from "../../components/CreateCardModal/index";
import UpdateCardModal from "../../components/UpdateCardModal/index";
import "./cards.css";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateCard, setUpdateCard] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All status");

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                let apiUrl = "http://localhost:3001/cards";

                if (selectedStatus !== "All status") {
                    apiUrl += `?status=${selectedStatus}`;
                }

                const response = await axios.get(apiUrl);

                const sortedCards = response.data.sort((a, b) => {
                    return (
                        new Date(b.lastModificationDateTime) -
                        new Date(a.lastModificationDateTime)
                    );
                });

                setCards(sortedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, [selectedStatus]);

    const handleDelete = async (id) => {
        try {
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));

            await axios.delete(`http://localhost:3001/cards/${id}`);
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    const handleUpdate = (card) => {
        setUpdateCard(card);
        setIsUpdateModalOpen(true);
    };

    const handleCreate = async (newCard) => {
        try {
            // Define currentDateTime here
            const currentDateTime = new Date().toLocaleString();

            // Add lastModificationDateTime and status to the new card
            newCard.lastModificationDateTime = currentDateTime;
            newCard.status = "Want to Learn"; // Set a default value

            setCards((prevCards) => [...prevCards, newCard]);

            await axios.post("http://localhost:3001/cards", newCard);

            setIsCreateModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    const handleUpdateCard = async (updatedCard) => {
        try {
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === updatedCard.id ? updatedCard : card
                )
            );

            await axios.put(
                `http://localhost:3001/cards/${updatedCard.id}`,
                updatedCard
            );

            setIsUpdateModalOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Error updating card:", error);
        }
    };

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const filteredCards = cards.filter((card) =>
        card.frontText.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="cards-location">
                <div className="creating">
                    <h1>Flash Cards</h1>
                    <form id="operations">
                        <select
                            id="filterstatus"
                            name="category"
                            value={selectedStatus}
                            onChange={handleStatusChange}
                        >
                            <option>All status</option>
                            <option>Want to Learn</option>
                            <option>Mark as Noted</option>
                        </select>
                        <input
                            className="search"
                            placeholder="Enter front Text..."
                            value={searchInput}
                            onChange={handleSearchInputChange}
                        ></input>
                    </form>
                    <button className="create-btn btn btn" onClick={openCreateModal}>
                        Create
                    </button>
                </div>
                <div className="flashcard-list">
                    {filteredCards.map((card) => (
                        <FlashCardItem
                            key={card.id}
                            card={card}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            </div>
            {isCreateModalOpen && (
                <CreateCardModal onCreate={handleCreate} onClose={closeCreateModal} />
            )}

            {isUpdateModalOpen && (
                <UpdateCardModal
                    card={updateCard}
                    onUpdate={handleUpdateCard}
                    onClose={closeUpdateModal}
                />
            )}
        </div>
    );
};

export default Cards;
