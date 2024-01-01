import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import FlashCardItem from "../components/FlashCardItem.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../components/Navbar.jsx";
import CreateCardModal from "../components/CreateCardModal.jsx";
import UpdateCardModal from "../components/UpdateCardModal.jsx";
import Notification from "../components/Notification.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/style/pages/cards.css";

const Cards = () => {
    const [cards, setCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [updateCard, setUpdateCard] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("All status");
    const [selectedSortings, setSelectedSortings] = useState(["newestToOldest"])
    const notify = useCallback((message) => toast.success(message), []);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchInitialCards = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:3001/cards?_page=${page}&_limit=6&_sort=order`);
            const initialCards = response.data;

            if (initialCards.length === 0) {
                setHasMore(false);
                return;
            }

            setPage(page + 1);
            setCards(initialCards);
        } catch (error) {
            console.error("Error fetching initial cards:", error);
        }
    }, [page]);


    const loadMore = useCallback(async () => {
        try {
            setIsLoadingMore(true);
            const response = await axios.get(`http://localhost:3001/cards?_page=${page}&_limit=6`);
            const newCards = response.data;

            if (newCards.length === 0) {
                setHasMore(false);
                return;
            }

            setTimeout(() => {
                setPage(page + 1);
                setCards((prevCards) => [...prevCards, ...newCards]);
            }, 750);
        } catch (error) {
            console.error("Error fetching more cards:", error);
        } finally {
            setIsLoadingMore(false);
        }
    }, [page]);

    useEffect(() => {
        fetchInitialCards();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 10 && !isLoadingMore && hasMore) {
                loadMore();
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isLoadingMore, hasMore, loadMore]);

    const handleSelectCard = (cardId) => {
        setSelectedCards((prevSelected) =>
            prevSelected.includes(cardId)
                ? prevSelected.filter((id) => id !== cardId)
                : [...prevSelected, cardId]
        );
    };

    const handleShare = () => {
        const selectedCardDetails = cards
            .filter((card) => selectedCards.includes(card.id))
            .map(({ id, frontText, backAnswer, image }) => ({ id, frontText, backAnswer, image }));

        const jsonData = JSON.stringify(selectedCardDetails, null, 2);

        const mailtoLink = `mailto:?subject=Flash Cards&body=${encodeURIComponent(jsonData)}`;
        window.location.href = mailtoLink;
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setSelectedStatus(newStatus);
        setCards([]);
    };

    const handleSortingChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedSortings(selectedOptions);
    };

    const handleRearrangeCards = async (
        draggedCardId,
        draggedOrder,
        draggedFrontText,
        draggedBackAnswer,
        draggedStatus,
        draggedModifiedTime,
        draggedImage,
        dropTargetCardId,
        dropTargetOrder,
        dropTargetFrontText,
        dropTargetBackAnswer,
        dropTargetStatus,
        dropTargetModifiedTime,
        dropTargetImage
    ) => {
        try {
            // Update the order of the dragged card on the client side
            const draggedIndex = cards.findIndex((card) => card.id === Number(draggedCardId));
            const dropTargetIndex = cards.findIndex((card) => card.id === Number(dropTargetCardId));

            const newCards = [...cards];
            [newCards[draggedIndex], newCards[dropTargetIndex]] = [newCards[dropTargetIndex], newCards[draggedIndex]];

            newCards[draggedIndex].order = dropTargetOrder;
            newCards[dropTargetIndex].order = draggedOrder;

            newCards[draggedIndex].frontText = dropTargetFrontText;
            newCards[dropTargetIndex].frontText = draggedFrontText;

            newCards[draggedIndex].backAnswer = dropTargetBackAnswer;
            newCards[dropTargetIndex].backAnswer = draggedBackAnswer;

            newCards[draggedIndex].status = dropTargetStatus;
            newCards[dropTargetIndex].status = draggedStatus;

            newCards[draggedIndex].lastModificationDateTime = draggedModifiedTime;
            newCards[dropTargetIndex].lastModificationDateTime = dropTargetModifiedTime;

            newCards[draggedIndex].id = draggedModifiedTime;
            newCards[dropTargetIndex].id = dropTargetModifiedTime;            

            // Update the order of the dragged card on the server
            await axios.put(`http://localhost:3001/cards/${draggedCardId}`, {
                order: dropTargetOrder,
                frontText: dropTargetFrontText,
                backAnswer: dropTargetBackAnswer,
                status: dropTargetStatus,
                lastModificationDateTime: draggedModifiedTime,
                image: dropTargetImage,
            });

            // Update the order of the drop target card on the server
            await axios.put(`http://localhost:3001/cards/${dropTargetCardId}`, {
                order: draggedOrder,
                frontText: draggedFrontText,
                backAnswer: draggedBackAnswer,
                status: draggedStatus,
                lastModificationDateTime: dropTargetModifiedTime,
                image: draggedImage,
            });

            // Update the local state
            setCards(newCards);
        } catch (error) {
            console.error("Error rearranging cards:", error);
        }
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
                        case "idDescending":
                            sortedCards = sortedCards.sort((a, b) => b.id - a.id);
                            break;
                        case "newestToOldest":
                            sortedCards = sortedCards.sort((a, b) => new Date(b.lastModificationDateTime) - new Date(a.lastModificationDateTime));
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

    const handleDelete = async (id) => {
        try {
            setCards((prevCards) => prevCards.filter((card) => card.id !== id));

            notify("Card deleted successfully!");
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
    
            // Fetch existing cards to determine the next order
            const response = await axios.get("http://localhost:3001/cards");
            const existingCards = response.data;
    
            // Determine the next order by incrementing the maximum existing order by 1
            const maxOrder = existingCards.reduce((maxOrder, card) => Math.max(maxOrder, card.order || 0), 0);
            const nextOrder = Math.max(maxOrder + 1, 100); // Start from 100 or increment if necessary
    
            newCard.lastModificationDateTime = currentDateTime;
            newCard.status = "Want to Learn";
            newCard.order = nextOrder; // Assign the next order
    
            setCards((prevCards) => {
                const updatedCards = [...prevCards, newCard];
    
                const sortedCards = updatedCards.sort((a, b) => {
                    return new Date(b.lastModificationDateTime) - new Date(a.lastModificationDateTime);
                });
    
                return sortedCards;
            });
    
            await axios.post("http://localhost:3001/cards", newCard);
    
            notify("Card created successfully!");
    
            setIsCreateModalOpen(false);
            window.location.reload();
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

            notify("Card updated successfully!");
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
        card.frontText.toLowerCase().includes(searchInput.toLowerCase()) ||
        card.backAnswer.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <Notification notify={notify} />
            <div className="cards-location">
                <div className="share-section">
                    <button className="share-btn btn btn" onClick={handleShare}>
                        Share Selected Cards
                    </button>
                </div>
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
                            <option>Learned</option>
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
                        >
                            <option value="newestToOldest">Choose sorting option...</option>
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
                <InfiniteScroll
                    dataLength={cards.length}
                    next={loadMore}
                    hasMore={hasMore}
                    loader={<h4 className="loading">Loading More...</h4>}
                    endMessage={<p className="finished-loading">No more cards to load.</p>}
                >
                    <div className="flashcard-list">
                        {filteredCards.map((card, index) => (
                            <FlashCardItem
                                key={card.id}
                                card={card}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                onSelect={handleSelectCard}
                                isSelected={selectedCards.includes(card.id)}
                                onRearrange={handleRearrangeCards}
                                cards={cards}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
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