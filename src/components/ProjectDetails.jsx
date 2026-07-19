import { motion } from "motion/react";
const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  tags,
  href,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full overflow-y-auto backdrop-blur-md bg-black/60">
      <motion.div
        className="relative w-full max-w-2xl border shadow-2xl rounded-2xl bg-gradient-to-br from-neutral-900 via-midnight to-navy border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-full top-4 right-4 bg-black/50 hover:bg-neutral-800 text-white transition-colors"
          aria-label="Close modal"
        >
          <img src="assets/close.svg" className="w-5 h-5" alt="close" />
        </button>
        <div className="relative w-full h-64 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-neutral-300">{description}</p>
          <div className="space-y-2 mb-6">
            {subDescription.map((subDesc, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-neutral-400">
                <span className="text-sand mt-0.5">•</span>
                <span>{subDesc}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              {tags.map((tag) => (
                <div key={tag.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  <img
                    src={tag.path}
                    alt={tag.name}
                    className="w-4 h-4 object-contain"
                  />
                  <span className="text-xs text-neutral-300">{tag.name}</span>
                </div>
              ))}
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-medium text-sm text-white transition-all bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-lg hover:shadow-blue-500/25"
            >
              Explore Repository
              <img src="assets/arrow-up.svg" className="w-4 h-4" alt="external link" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
