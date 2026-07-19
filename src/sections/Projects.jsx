import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Project3DOrb from "../components/Project3DOrb";

const Projects = ({ onExploreClick }) => {
  const sectionRef = useRef(null);

  // Parallax Scroll Transforms across the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], ["-20px", "40px"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.7]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative c-space section-spacing overflow-hidden py-20"
      id="projects"
    >
      {/* Background glowing parallax accents */}
      <motion.div
        style={{ y: orbY }}
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: headerY }}
        className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      {/* Parallax Section with 3D Canvas Orb & Explore CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-gradient-to-r from-white/[0.03] via-white/[0.01] to-white/[0.03] border border-white/10 p-8 sm:p-12 rounded-3xl backdrop-blur-xl shadow-2xl">
        <motion.div style={{ y: headerY }} className="lg:col-span-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full inline-block mb-4">
            Interactive Project Portal
          </span>
          <h2 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent leading-tight mb-4">
            My Selected Projects
          </h2>
          <p className="text-neutral-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-6">
            Dive into full production-grade systems—featuring our featured <span className="text-blue-400 font-semibold">Digital Governance Ecosystem Audit System</span>, graph intelligence engines, 5-agent AI pipelines, hospital ERPs, and core DSA systems.
          </p>

          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 py-3.5 px-8 text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all shadow-xl shadow-blue-500/30 hover:scale-[1.02] cursor-pointer border border-white/20 group"
          >
            Explore Projects Showcase
            <img src="assets/arrow-right.svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" alt="arrow" />
          </button>
        </motion.div>

        {/* 3D Interactive Canvas Box */}
        <motion.div
          style={{ y: orbY }}
          className="flex flex-col items-center justify-center p-6 bg-black/40 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl relative group hover:border-blue-500/40 transition-all"
        >
          <Project3DOrb className="w-full h-56" />
          <p className="text-xs text-neutral-400 mt-2 text-center">
            Interactive 3D Workspace • Click button to view all repositories
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Projects;
