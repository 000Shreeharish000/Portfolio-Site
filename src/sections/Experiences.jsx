import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { experiences } from "../constants";

const Experiences = () => {
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef} 
      className="c-space section-spacing relative w-full min-h-screen" 
      id="work"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full relative">
        
        {/* Sticky Left Column (Work Experience Header & Technologies list) */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:h-[70vh] flex flex-col justify-between py-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-heading text-neutral-400 uppercase tracking-widest text-sm font-semibold">Work Experience</h2>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white leading-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent"
            >
              Professional <br /> Journey
            </motion.h1>
            <p className="subtext text-neutral-400 mt-4 leading-relaxed text-pretty">
              Collaborated with leading organizations like Lemon.io and IIT Madras. I specialize in building multi-agent AI frameworks, LLM orchestrations, and high-performance IoT pipelines.
            </p>

            {/* Sub-title displaying core technologies worked on */}
            <div className="mt-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-sand mb-3">Core Technologies utilized</h4>
              <div className="flex flex-wrap gap-2">
                {["React", "PostgreSQL", "Node.js", "Python", "FastAPI", "Multi-Agent AI", "LLM Orchestration", "IoT Systems", "NFC / Sensors"].map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs rounded-full bg-indigo/30 text-lavender border border-lavender/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Glowing Vector Ring / Visual placeholder matching the About page */}
          <div className="hidden lg:flex items-center justify-center relative w-full h-[150px] mt-8 overflow-hidden rounded-3xl border border-white/5 bg-radial from-lavender/5 to-transparent">
            <div className="absolute w-32 h-32 rounded-full bg-sand/5 blur-3xl animate-pulse" />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-28 h-28 border border-dashed border-sand/20 rounded-full flex items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border border-dotted border-lavender/30 rounded-full"
              />
            </motion.div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold relative z-10">
              Role Timelines
            </span>
          </div>
        </div>

        {/* Scrollable Right Column (3D Parallax Experience Details revealed on scroll) */}
        <div className="w-full lg:w-3/5 flex flex-col gap-24 lg:py-12">
          {experiences.map((exp, idx) => (
            <ParallaxExperienceItem 
              key={idx} 
              exp={exp} 
              index={idx + 1} 
              containerRef={containerRef} 
            />
          ))}
        </div>
        
      </div>
    </section>
  );
};

const ParallaxExperienceItem = ({ exp, index, containerRef }) => {
  const itemRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // Vertical drift transforms for elements to create depth parallax
  const yText = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yNumber = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [12, 0, 0, -12]);

  return (
    <motion.div
      ref={itemRef}
      style={{
        y: yText,
        opacity,
        rotateX,
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      className="relative flex flex-col justify-center p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo/20 via-midnight to-storm/20 hover:border-lavender/30 hover:bg-storm/30 transition-all duration-300 select-none group"
    >
      {/* Background Floating Giant Number */}
      <motion.div
        style={{
          y: yNumber,
          transform: "translateZ(-45px)"
        }}
        className="absolute -top-12 -left-6 text-[8rem] md:text-[10rem] font-black text-white/[0.03] group-hover:text-lavender/[0.05] transition-colors duration-500 pointer-events-none select-none"
      >
        {String(index).padStart(2, "0")}
      </motion.div>

      {/* Experience Header */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-lavender/20 text-lavender border border-lavender/30">
              {exp.date}
            </span>
            <h3 className="text-2xl font-black text-white mt-3 group-hover:text-lavender transition-colors duration-300">
              {exp.title}
            </h3>
          </div>
          <div className="text-left md:text-right mt-1 md:mt-0">
            <span className="text-sm font-bold text-sand uppercase tracking-wider">
              {exp.job}
            </span>
          </div>
        </div>
      </div>

      {/* Experience Bullet Points */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-20 flex flex-col gap-3.5"
      >
        {exp.contents.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-lavender mt-2 shrink-0 group-hover:scale-125 transition-transform" />
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed group-hover:text-white transition-colors duration-300">
              {bullet}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Experiences;
