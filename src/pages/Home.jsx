import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import ProjectsSection from "../components/Projects.jsx";
import "../assets/style/pages/home.css";

const Home = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3001/projects");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <section className="intro-section">
                    <h1>Welcome to Flashcard App</h1>
                    <p>
                        Hello, I am Musa Afandiyev, 20 years old. I am studying at ADA University in BSIT.
                    </p>
                </section>
                <ProjectsSection projects={projects} />
            </div>
        </div>
    );
};

export default Home;
