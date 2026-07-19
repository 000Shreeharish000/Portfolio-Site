import React, { useState, useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import ProjectsPage from "./pages/ProjectsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      if (
        window.location.hash === "#all-projects" ||
        window.location.hash === "#projects-page"
      ) {
        setCurrentPage("projects");
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenProjects = () => {
    setCurrentPage("projects");
    window.location.hash = "#projects-page";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    window.location.hash = "#projects";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "projects") {
    return <ProjectsPage onBack={handleBackToHome} />;
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar onExploreProjects={handleOpenProjects} />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Experiences />
      <Projects onExploreClick={handleOpenProjects} />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
