import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { photosList } from "../constants/photos";

const GalleryPage = ({ onBack }) => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);

  // Reverse image array order: newest photos come first at the top!
  const reversedPhotos = [...photosList].reverse();

  // Scroll Progress with Spring Physics for Buttery Smooth 60fps Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 90,
    mass: 0.5,
  });

  // Smooth Parallax Transforms for Hero Background Photo & Title Text
  const titleScale = useTransform(smoothProgress, [0, 0.22], [1, 1.8]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.18], [1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.22], ["0px", "-80px"]);
  
  const bgPhotoScale = useTransform(smoothProgress, [0, 0.25], [1, 1.2]);
  const bgPhotoOpacity = useTransform(smoothProgress, [0, 0.22], [0.65, 0.1]);
  
  const photosY = useTransform(smoothProgress, [0.08, 0.3], ["80px", "0px"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#020309] text-white relative selection:bg-orange-500 selection:text-white overflow-x-hidden"
    >
      {/* Top Fixed Navigation Bar */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-xl bg-black/60 border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Portfolio
          </button>

          <span
            style={{ fontFamily: "Orbitron, sans-serif" }}
            className="text-xs sm:text-sm font-extrabold tracking-widest text-neutral-300 uppercase"
          >
            LIFE OF HARISH • GALLERY
          </span>

          <a
            href="https://github.com/000Shreeharish000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* FULL PAGE HERO (100vh) WITH BACKGROUND PHOTO: 20250731_164738.jpg */}
      <section
        ref={heroRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center relative z-10 overflow-hidden"
      >
        {/* Full-bleed background hero photo requested by user */}
        <motion.div
          style={{ scale: bgPhotoScale, opacity: bgPhotoOpacity }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <img
            src="/photos/20250731_164738.jpg"
            alt="Life of Harish Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark cinematic gradient vignette overlay so text pops */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020309] via-[#020309]/60 to-black/70" />
        </motion.div>

        {/* Ambient glow accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-orange-600/20 via-amber-500/15 to-purple-600/20 blur-[140px] pointer-events-none" />

        {/* Hero Title & Subtitle */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
          className="flex flex-col items-center justify-center pointer-events-none relative z-10 px-4"
        >
          <span
            style={{ fontFamily: "Orbitron, sans-serif" }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-orange-400 mb-6 px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/25 shadow-2xl backdrop-blur-md"
          >
            MEMORIES & MOMENTS
          </span>

          <h1
            style={{ fontFamily: "Orbitron, sans-serif" }}
            className="text-4xl sm:text-7xl md:text-9xl font-black uppercase tracking-tight text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)] leading-none"
          >
            LIFE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">HARISH</span>
          </h1>

          <h2
            style={{ fontFamily: "Audiowide, sans-serif" }}
            className="text-3xl sm:text-6xl md:text-8xl font-extrabold uppercase tracking-[0.25em] text-neutral-200 mt-4 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          >
            GALLERY
          </h2>

          <div className="mt-12 flex flex-col items-center gap-2 text-neutral-300 text-xs sm:text-sm font-medium animate-bounce drop-shadow-md">
            <span>Scroll down to reveal photos</span>
            <span className="text-orange-400 text-lg">↓</span>
          </div>
        </motion.div>
      </section>

      {/* FULL-PAGE GAPLESS PHOTO CANVAS (NO SEPARATE BOXES, FULL-WIDTH REVERSED ORDER) */}
      <motion.section style={{ y: photosY }} className="w-full relative z-20 pb-32">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 bg-black">
          {reversedPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: (index % 6) * 0.04,
              }}
              whileHover={{ scale: 1.04, zIndex: 30 }}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-60 sm:h-72 md:h-80 w-full overflow-hidden bg-neutral-950 cursor-pointer shadow-lg"
            >
              <img
                src={photo.src}
                alt={`Harish Memory ${photo.id}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                <span className="px-4 py-1.5 text-xs font-semibold text-white bg-orange-600/90 backdrop-blur-md rounded-full shadow-xl">
                  Expand Photo 🔍
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-neutral-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-neutral-800 text-white transition-colors border border-white/20"
                aria-label="Close"
              >
                <img src="/assets/close.svg" className="w-5 h-5" alt="close" />
              </button>

              <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden min-h-[60vh]">
                <img
                  src={activePhoto.src}
                  alt={`Photo ${activePhoto.id}`}
                  className="max-h-[80vh] w-auto max-w-full object-contain p-2"
                />
              </div>

              <div className="p-5 bg-neutral-900/90 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">
                  Photo {activePhoto.id} of {reversedPhotos.length}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const currentIndex = reversedPhotos.findIndex((p) => p.id === activePhoto.id);
                      const prevIndex = (currentIndex - 1 + reversedPhotos.length) % reversedPhotos.length;
                      setActivePhoto(reversedPhotos[prevIndex]);
                    }}
                    className="px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 cursor-pointer"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = reversedPhotos.findIndex((p) => p.id === activePhoto.id);
                      const nextIndex = (currentIndex + 1) % reversedPhotos.length;
                      setActivePhoto(reversedPhotos[nextIndex]);
                    }}
                    className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
