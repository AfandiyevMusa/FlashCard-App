// src/components/ProjectsSection/index.jsx

import React from "react";
import "./projects.css";

const ProjectsSection = ({ projects }) => {
    return (
        <section className="projects-section">
            <h2>Projects</h2>
            {projects.map((project, index) => (
                <div className="project" key={index}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project
                    </a>
                </div>
            ))}
        </section>
    );
};

export default ProjectsSection;
