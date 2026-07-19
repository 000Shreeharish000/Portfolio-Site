import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { myProjects } from "../constants";
import ProjectDetails from "../components/ProjectDetails";
import Project3DOrb from "../components/Project3DOrb";

const ProjectsPage = ({ onBack }) => {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ["All", "AI & Security", "ERP & Systems", "Java & Utilities"];

  const filteredProjects = myProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTag === "All") return matchesSearch;
    if (selectedTag === "AI & Security")
      return matchesSearch && (project.title.includes("Governance") || project.title.includes("Twin") || project.title.includes("AI"));
    if (selectedTag === "ERP & Systems")
      return matchesSearch && (project.title.includes("ERP") || project.title.includes("Hospital"));
    if (selectedTag === "Java & Utilities")
      return matchesSearch && (project.title.includes("Java") || project.title.includes("Attendance"));

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-midnight text-white py-12 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Back Button */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back to Portfolio
        </button>

        <a
          href="https://github.com/000Shreeharish000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
        >
          <img src="/assets/logos/github.svg" className="w-4 h-4 invert" alt="GitHub" />
          GitHub Profile
        </a>
      </div>

      {/* 3D Hero Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 bg-white/[0.02] border border-white/10 p-8 rounded-3xl relative overflow-hidden">
        <div>
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full inline-block mb-3">
            Interactive Showcase
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent mb-4 leading-tight">
            Explore All Engineering Projects
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Deep dive into production-grade systems, AI agent orchestration pipelines, graph intelligence engines, and full-stack enterprise solutions built by Shree Harish.
          </p>
        </div>

        <div className="relative">
          <Project3DOrb className="w-full h-80" />
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                selectedTag === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72 relative">
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Projects Showcase Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all flex flex-col group shadow-xl"
            >
              <div className="relative h-48 overflow-hidden bg-neutral-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-bold text-amber-300 bg-black/60 backdrop-blur-md rounded-full border border-amber-500/30">
                  Featured
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="px-2 py-0.5 text-[11px] text-neutral-300 bg-white/5 border border-white/10 rounded-md"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20"
                    >
                      Explore Repo
                      <img src="/assets/arrow-up.svg" className="w-3.5 h-3.5" alt="arrow" />
                    </a>

                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Details Modal */}
      {activeModalProject && (
        <ProjectDetails
          title={activeModalProject.title}
          description={activeModalProject.description}
          subDescription={activeModalProject.subDescription}
          image={activeModalProject.image}
          tags={activeModalProject.tags}
          href={activeModalProject.href}
          closeModal={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
