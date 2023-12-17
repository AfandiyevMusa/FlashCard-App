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
    const [selectedSortings, setSelectedSortings] = useState([]);
    const [page, setPage] = useState(1);
    const [currentSorting, setCurrentSorting] = useState("default");

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        setPage(1);
        setCards([]);
    };

    const handleSortingChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedSortings(selectedOptions);
    };
    
    useEffect(() => {
        const fetchCards = async () => {
            try {
                let apiUrl = "http://localhost:3001/cards";
                if (selectedStatus !== "All status") {
                    apiUrl += `?status=${selectedStatus}`;
                }

                const response = await axios.get(apiUrl);

                let sortedCards = response.data;

                // Sorting based on selected options
                selectedSortings.forEach((sortingOption) => {
                    switch (sortingOption) {
                        case "frontTextAZ":
                            sortedCards = sortedCards.sort((a, b) => a.frontText.localeCompare(b.frontText));
                            break;
                        case "frontTextZA":
                            sortedCards = sortedCards.sort((a, b) => b.frontText.localeCompare(a.frontText));
                            break;
                        case "backAnswerAZ":
                            sortedCards = sortedCards.sort((a, b) => a.backAnswer.localeCompare(b.backAnswer));
                            break;
                        case "backAnswerZA":
                            sortedCards = sortedCards.sort((a, b) => b.backAnswer.localeCompare(a.backAnswer));
                            break;
                        default:
                            break;
                    }
                });

                setCards(sortedCards);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };

        fetchCards();
    }, [selectedStatus, selectedSortings]);
    

    useEffect(() => {
        const fetchInitialCards = async () => {
            try {
                let apiUrl = `http://localhost:3001/cards?_page=1&_limit=50`; // Increase the limit
        
                if (selectedStatus !== "All status") {
                    apiUrl += `&status=${selectedStatus}`;
                }
        
                const response = await axios.get(apiUrl);
                const initialCards = response.data;
        
                initialCards.sort((a, b) => {
                    const dateA = new Date(a.lastModificationDateTime);
                    const dateB = new Date(b.lastModificationDateTime);
        
                    if (dateA.getFullYear() !== dateB.getFullYear()) {
                        return dateB.getFullYear() - dateA.getFullYear();
                    }
        
                    if (dateA.getMonth() !== dateB.getMonth()) {
                        return dateB.getMonth() - dateA.getMonth();
                    }
        
                    return dateB.getDate() - dateA.getDate();
                });
        
                setCards(initialCards);
            } catch (error) {
                console.error("Error fetching initial cards:", error);
            }
        };        
    
        fetchInitialCards();
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
            const currentDateTime = new Date().toLocaleDateString();
    
            newCard.lastModificationDateTime = currentDateTime;
            newCard.status = "Want to Learn";
    
            setCards((prevCards) => {
                const updatedCards = [...prevCards, newCard];
                
                const sortedCards = updatedCards.sort((a, b) => {
                    return new Date(b.lastModificationDateTime) - new Date(a.lastModificationDateTime);
                });
    
                return sortedCards;
            });
    
            await axios.post("http://localhost:3001/cards", newCard);
    
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error("Error creating card:", error);
        }
    };

    const handleUpdateCard = async (updatedCard) => {
        try {
            setCards((prevCards) =>
                prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
            );

            await axios.put(`http://localhost:3001/cards/${updatedCard.id}`, updatedCard);

            setIsUpdateModalOpen(false);
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
                        <select
                            id="sortOrder"
                            name="sortOrder"
                            value={selectedSortings}
                            onChange={handleSortingChange}
                            multiple
                        >
                            <option value="default">Choose sorting option...</option>
                            <option value="frontTextAZ">Sort frontText A-Z</option>
                            <option value="frontTextZA">Sort frontText Z-A</option>
                            <option value="backAnswerAZ">Sort backAnswer A-Z</option>
                            <option value="backAnswerZA">Sort backAnswer Z-A</option>
                        </select>
                    </form>
                    <button className="create-btn btn btn" onClick={openCreateModal}>
                        Create
                    </button>
                </div>
                <div className="flashcard-list">
                    {filteredCards.map((card, index) => (
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
