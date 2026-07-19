import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { photosList } from "../constants/photos";

const GalleryPage = ({ onBack }) => {
  const containerRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(null);

  // Scroll animations for Header Fade & Staggered PPT Photo Reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Header Title Scales Up and Fades Away as user scrolls
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], ["0px", "-60px"]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#03040c] text-white relative overflow-x-hidden selection:bg-orange-500 selection:text-white"
    >
      {/* Background ambient lighting spotlight (Reference Screenshot 2 style) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-600/15 via-orange-600/5 to-transparent blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[160px] pointer-events-none z-0" />

      {/* Top Fixed Bar / Navigation */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/40 border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Portfolio
          </button>

          <span
            style={{ fontFamily: "Orbitron, sans-serif" }}
            className="text-xs sm:text-sm font-extrabold tracking-widest text-neutral-400 uppercase"
          >
            Harish • Gallery
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

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-12 pb-32 relative z-10">
        {/* Futuristic Header (Reference Screenshot 2 Style - AARUUSH GALLERY typography) */}
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center relative py-16">
          <motion.div
            style={{ scale: titleScale, opacity: titleOpacity, y: titleY }}
            className="flex flex-col items-center justify-center pointer-events-none"
          >
            <span
              style={{ fontFamily: "Orbitron, sans-serif" }}
              className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-orange-400/90 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-lg shadow-orange-500/10"
            >
              MEMORIES & MOMENTS
            </span>

            <h1
              style={{ fontFamily: "Orbitron, sans-serif" }}
              className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl leading-none"
            >
              LIFE OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">HARISH</span>
            </h1>

            <h2
              style={{ fontFamily: "Audiowide, sans-serif" }}
              className="text-3xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[0.25em] text-neutral-300/90 mt-2"
            >
              GALLERY
            </h2>

            <div className="mt-8 flex items-center gap-2 text-neutral-500 text-xs sm:text-sm animate-bounce">
              <span>Scroll down to reveal photos</span>
              <span>↓</span>
            </div>
          </motion.div>
        </div>

        {/* PPT-Style Slo-Mo Staggered Photo Reveal Grid (NO Subheadings/Tags) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
          {photosList.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotate: (index % 2 === 0 ? -1.5 : 1.5) }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: (index % 4) * 0.12,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              whileHover={{ scale: 1.04, y: -6, zIndex: 20 }}
              onClick={() => setActivePhoto(photo)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 hover:border-orange-500/50 shadow-2xl cursor-pointer transition-all duration-300"
            >
              <img
                src={photo.src}
                alt={`Harish Photo ${photo.id}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="px-3 py-1 text-xs font-semibold text-white bg-orange-600/80 backdrop-blur-md rounded-full shadow-md">
                  View Full Image 🔍
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Fullscreen Photo Lightbox (Screenshot 4 & 5 Style) */}
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
                  Photo {activePhoto.id} of {photosList.length}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const currentIndex = photosList.findIndex((p) => p.id === activePhoto.id);
                      const prevIndex = (currentIndex - 1 + photosList.length) % photosList.length;
                      setActivePhoto(photosList[prevIndex]);
                    }}
                    className="px-5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = photosList.findIndex((p) => p.id === activePhoto.id);
                      const nextIndex = (currentIndex + 1) % photosList.length;
                      setActivePhoto(photosList[nextIndex]);
                    }}
                    className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl transition-all shadow-lg shadow-orange-500/20"
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
