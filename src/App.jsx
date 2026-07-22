import React, { useState, useEffect } from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import GalleryPage from "./pages/GalleryPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleHashChange = () => {
      if (
        window.location.hash === "#all-projects" ||
        window.location.hash === "#projects-page" ||
        window.location.hash === "#projects"
      ) {
        setCurrentPage("home");
        // Wait a small bit for react to render home page before scrolling if hash is updated on init
        setTimeout(() => {
          const element = document.getElementById("projects");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else if (
        window.location.hash === "#gallery" ||
        window.location.hash === "#gallery-page"
      ) {
        setCurrentPage("gallery");
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleOpenGallery = () => {
    setCurrentPage("gallery");
    window.location.hash = "#gallery-page";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    window.location.hash = "#home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentPage === "gallery") {
    return <GalleryPage onBack={handleBackToHome} />;
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar
        onOpenGallery={handleOpenGallery}
      />
      <div id="home">
        <Hero />
      </div>
      <About />
      <Experiences />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
