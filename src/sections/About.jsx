import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const About = () => {
  const containerRef = useRef(null);
  
  const highlights = [
    "Winner of Smart India Hackathon (SIH), India's largest innovation competition.",
    "Winner of 1 International, 3 National, and 3 State-Level Hackathons.",
    "Selected among only 100 students across India for the prestigious Singapore–India Hackathon.",
    "Invited to South Korea for an International Sustainability & Innovation Session.",
    "Inventor of India's First LEO PNT (Positioning, Navigation & Timing) Receiver System.",
    "Contributed to Multi-Agent AI Frameworks as a Remote Engineering Contributor at Lemon.io.",
    "Led the development of an Enterprise Hospital ERP for SRM Trichy Global Hospital, deployed in production and used by 10,000+ users."
  ];

  return (
    <section 
      ref={containerRef} 
      className="c-space section-spacing relative w-full min-h-screen" 
      id="about"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start w-full relative">
        
        {/* Sticky Left Column (Title & 3D Interactive Perspective Elements) */}
        <div className="w-full lg:w-2/5 lg:sticky lg:top-32 lg:h-[70vh] flex flex-col justify-between py-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-heading text-neutral-400 uppercase tracking-widest text-sm font-semibold">About Me</h2>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-white leading-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent"
            >
              Shree Harish <br /> Vijayaprakash
            </motion.h1>
            <p className="subtext text-neutral-400 mt-4 leading-relaxed text-pretty">
              B.Tech Computer Science student specializing in Big Data Analytics at SRM Institute of Science and Technology. Here are the core highlights of my technical achievements and engineering journey.
            </p>
          </div>

          {/* Glowing 3D Orb/Lines visual mockup */}
          <div className="hidden lg:flex items-center justify-center relative w-full h-[200px] mt-8 overflow-hidden rounded-3xl border border-white/5 bg-radial from-indigo/10 to-transparent">
            {/* Pulsing glow behind */}
            <div className="absolute w-40 h-40 rounded-full bg-lavender/10 blur-3xl animate-pulse" />
            
            {/* Spinning vector rings */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-36 h-36 border border-dashed border-lavender/30 rounded-full flex items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border border-dotted border-sand/40 rounded-full flex items-center justify-center"
              />
            </motion.div>
            
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold relative z-10">
              Technical Milestones
            </span>
          </div>
        </div>

        {/* Scrollable Right Column with Faded Background Image */}
        <div className="w-full lg:w-3/5 relative min-h-screen">
          {/* Faded Background Image sticky behind scrolling text */}
          <div className="lg:sticky top-32 h-[70vh] w-full rounded-3xl overflow-hidden pointer-events-none border border-white/10 shadow-2xl mb-[-70vh] relative z-0">
            <img
              src="/photos/20250731_164738.jpg"
              alt="Shree Harish - IIT Madras Research"
              className="w-full h-full object-cover object-center opacity-25 filter brightness-90 saturate-110"
            />
            {/* Dark gradient overlay & vignette to ensure 100% text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#06060e] via-[#06060e]/70 to-[#06060e]/85" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#06060e]/40 to-[#06060e]" />
          </div>

          {/* Highlights scrolling on top */}
          <div className="relative z-10 flex flex-col gap-24 py-12">
            {highlights.map((text, idx) => (
              <ParallaxHighlightItem 
                key={idx} 
                text={text} 
                index={idx + 1} 
                containerRef={containerRef} 
              />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

const ParallaxHighlightItem = ({ text, index, containerRef }) => {
  const itemRef = useRef(null);

  // Set up scroll triggers for individual highlights to create depth parallax offsets
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  // Calculate separate transform speeds for text vs background giant number
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yNumber = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [15, 0, 0, -15]);

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
      className="relative flex flex-col justify-center min-h-[140px] pl-6 md:pl-10 pr-6 py-6 border-l-2 border-white/15 hover:border-lavender/50 bg-black/30 backdrop-blur-xs rounded-r-2xl transition-all duration-300 select-none group"
    >
      {/* Background Floating Giant Number (drifts at a different rate for depth parallax) */}
      <motion.div
        style={{
          y: yNumber,
          transform: "translateZ(-50px)"
        }}
        className="absolute -top-14 -left-6 md:-left-12 text-[7rem] md:text-[9rem] font-black text-white/[0.03] group-hover:text-lavender/[0.05] transition-colors duration-500 pointer-events-none select-none"
      >
        {String(index).padStart(2, "0")}
      </motion.div>

      {/* Foreground Highlight Text */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 text-lg md:text-xl font-bold leading-relaxed text-neutral-300 group-hover:text-white transition-colors duration-300 text-pretty"
      >
        {text}
      </div>
    </motion.div>
  );
};

export default About;
