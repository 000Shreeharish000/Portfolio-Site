import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { myProjects } from "../constants";

const ProjectItem = ({ project, index }) => {
  const containerRef = useRef(null);

  // Track scroll of this specific project block
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate parallax offsets
  const numberY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const isEven = index % 2 === 1;

  // Unique ambient glow combinations
  const glowGradients = [
    "from-blue-600/10 to-indigo-600/5",
    "from-purple-600/10 to-pink-600/5",
    "from-emerald-600/10 to-teal-600/5"
  ];
  const glowGradient = glowGradients[index % glowGradients.length];

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-[60vh] py-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background glow parallax accent */}
      <motion.div
        style={{ y: glowY }}
        className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none -z-10 bg-gradient-to-br ${glowGradient} ${
          isEven ? "left-1/4" : "right-1/4"
        }`}
      />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Text/Content Column */}
          <div
            className={`lg:col-span-7 flex flex-col justify-center ${
              isEven ? "lg:order-2 lg:col-start-6" : "lg:order-1 lg:col-start-1"
            }`}
          >
            <motion.div
              style={{ y: textY }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Main project title */}
              <h3 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent leading-tight transition-colors">
                {project.title}
              </h3>

              {/* Main project description */}
              <p className="text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                {project.description}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3.5 py-1 text-xs font-medium text-neutral-300 bg-white/[0.04] border border-white/10 rounded-full hover:border-blue-500/30 transition-colors"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 py-2.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all shadow-xl shadow-blue-500/10 hover:scale-[1.02] border border-white/10 group"
                >
                  Explore Repository
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-white fill-none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Parallax Decorative Number Column (Desktop) */}
          <div
            className={`hidden lg:flex lg:col-span-5 items-center justify-center relative select-none ${
              isEven ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.div
              style={{ y: numberY }}
              className="text-[12rem] xl:text-[16rem] font-black font-mono tracking-tighter text-transparent bg-gradient-to-b from-white/10 to-transparent bg-clip-text leading-none opacity-40 select-none pointer-events-none"
            >
              {`0${index + 1}`}
            </motion.div>
          </div>

          {/* Background Number (Mobile only) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden opacity-[0.03] select-none pointer-events-none -z-10">
            <span className="text-[10rem] font-black font-mono tracking-tighter text-transparent bg-gradient-to-b from-white/20 to-transparent bg-clip-text">
              {`0${index + 1}`}
            </span>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity }}
      className="relative c-space section-spacing py-20"
      id="projects"
    >
      {/* Title block */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-12 sm:mb-20">
        <h2 className="text-4xl sm:text-6xl font-black bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent leading-tight">
          Selected Projects
        </h2>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-12 sm:gap-24">
        {myProjects.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;
