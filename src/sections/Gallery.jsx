import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { photosList } from "../constants/photos";

const Gallery = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhoto, setActivePhoto] = useState(null);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  // Scroll Animations for "LIFE OF HARISH" Header Reveal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Header Title Scales & Fades Away on Scroll
  const headerScale = useTransform(scrollYProgress, [0.1, 0.45], [1, 2.2]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.25, 0.55], [0.2, 1]);
  const gridY = useTransform(scrollYProgress, [0.2, 0.6], ["80px", "0px"]);

  const categories = ["All", "Hackathons", "IIT Madras", "Projects", "Leadership", "Honors", "Sports"];

  const filteredPhotos = selectedCategory === "All"
    ? photosList
    : photosList.filter(p => p.category === selectedCategory);

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden text-white"
      id="gallery"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sticky Hero Header: "LIFE OF HARISH" (Scales up & Fades away on scroll) */}
      <div className="sticky top-28 z-20 pointer-events-none flex flex-col items-center justify-center py-12 text-center">
        <motion.div
          style={{ scale: headerScale, opacity: headerOpacity }}
          className="will-change-transform"
        >
          <span className="px-4 py-1.5 text-xs sm:text-sm font-semibold uppercase tracking-widest text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full inline-block mb-4">
            Personal Gallery & Memories
          </span>
          <h2 className="text-5xl sm:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent uppercase drop-shadow-2xl">
            Life of Harish
          </h2>
          <p className="text-neutral-400 mt-2 text-sm sm:text-base max-w-lg mx-auto">
            Scroll down to reveal moments, hackathon victories, campus memories & leadership highlights
          </p>
        </motion.div>
      </div>

      {/* Category Filter Pills */}
      <div className="relative z-30 flex flex-wrap items-center justify-center gap-2 mb-10 mt-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/10"
            }`}
          >
            {cat} {cat === "All" ? `(${photosList.length})` : ""}
          </button>
        ))}
      </div>

      {/* Interactive Photo Mosaic Grid */}
      <motion.div
        style={{ opacity: gridOpacity, y: gridY }}
        className="relative z-30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {filteredPhotos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index % 10) * 0.04 }}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            onMouseEnter={() => setHoveredPhoto(photo)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => setActivePhoto(photo)}
            className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 cursor-pointer shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
          >
            <img
              src={photo.src}
              alt={photo.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider">
                {photo.category}
              </span>
              <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                {photo.title}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Fullscreen Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-white transition-colors"
              >
                <img src="/assets/close.svg" className="w-5 h-5" alt="close" />
              </button>

              <div className="relative max-h-[75vh] w-full bg-black flex items-center justify-center">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-6 bg-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
                <div>
                  <span className="px-2.5 py-0.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full inline-block mb-1">
                    {activePhoto.category}
                  </span>
                  <h3 className="text-xl font-bold text-white">{activePhoto.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const currentIndex = photosList.findIndex(p => p.id === activePhoto.id);
                      const prevIndex = (currentIndex - 1 + photosList.length) % photosList.length;
                      setActivePhoto(photosList[prevIndex]);
                    }}
                    className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => {
                      const currentIndex = photosList.findIndex(p => p.id === activePhoto.id);
                      const nextIndex = (currentIndex + 1) % photosList.length;
                      setActivePhoto(photosList[nextIndex]);
                    }}
                    className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Gallery;
