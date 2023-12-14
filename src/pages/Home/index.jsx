import React from "react";
import Navbar from "../../components/Navbar/index";
import ProjectsSection from "../../components/Projects/index";
import "./home.css";

const Home = () => {
    const projects = [
        {
            title: "Project 1: CompanyApp",
            description: "It is a console application for some company that I have finished in C#.",
            link: "https://github.com/AfandiyevMusa/CompanyApp"
        },
        {
            title: "Project 2: MollaFront",
            description: "It is my first full front-end project. I have written evertything in detail, even wishlist and shop logic with the help of localstorage.",
            link: "https://github.com/AfandiyevMusa/Molla-Front-Layihe"
        },
        {
            title: "Project 3: Greeny_Backend",
            description: "It is my first backend project. It is written in MVC. And I have used ASP.NET, as a language C#.",
            link: "https://github.com/AfandiyevMusa/Greeny_Backend"
        },
        {
            title: "Project 4: Movflx-Backend",
            description: "It is my another backend project.",
            link: "https://github.com/AfandiyevMusa/Movflx-Backend"
        },
        {
            title: "Project 4: Bookstore",
            description: "It is bookstore console application. For backend I have used Java, as a database I have used PostgreSQL.",
            link: "https://github.com/AfandiyevMusa/Db_Assignment2"
        },
    ];

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
