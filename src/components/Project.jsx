import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 gap-4 hover:bg-white/[0.02] px-4 rounded-xl transition-colors group"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-amber-200 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 line-clamp-2 max-w-3xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 text-xs text-amber-100/70">
            {tags.map((tag) => (
              <span key={tag.id} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 rounded-lg transition-all shadow-sm hover:shadow-blue-500/20"
          >
            Explore Repo
            <img src="assets/arrow-up.svg" className="w-3.5 h-3.5" alt="arrow" />
          </a>
          <button
            onClick={() => setIsHidden(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
          >
            Details
            <img src="assets/arrow-right.svg" className="w-3.5 h-3.5" alt="arrow right" />
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-800 to-transparent h-[1px] w-full my-2" />
      {isHidden && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          tags={tags}
          href={href}
          closeModal={() => setIsHidden(false)}
        />
      )}
    </>
  );
};

export default Project;
