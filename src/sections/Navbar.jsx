import { useState } from "react";
import { motion } from "motion/react";

function Navigation({ onExploreProjects, onOpenGallery }) {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a className="nav-link" href="#home">
          Home
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#about">
          About
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#work">
          Experience
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#projects">
          Projects
        </a>
      </li>
      <li className="nav-li">
        <button
          onClick={onOpenGallery}
          className="nav-link cursor-pointer hover:text-orange-400 transition-colors"
        >
          Gallery
        </button>
      </li>
      <li className="nav-li">
        <button
          onClick={onExploreProjects}
          className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 transition-all cursor-pointer"
        >
          Explore All 3D
        </button>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#achievements">
          Achievements
        </a>
      </li>
      <li className="nav-li">
        <a className="nav-link" href="#contact">
          Contact
        </a>
      </li>
    </ul>
  );
}

const Navbar = ({ onExploreProjects, onOpenGallery }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Shree Harish
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation
              onExploreProjects={onExploreProjects}
              onOpenGallery={onOpenGallery}
            />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation
              onExploreProjects={onExploreProjects}
              onOpenGallery={onOpenGallery}
            />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
