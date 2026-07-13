import React from "react";
import { motion } from "motion/react";
import { honorsAndEducationList, certifications } from "../constants";

const PapersHonors = () => {
  return (
    <section className="c-space section-spacing" id="papers-honors">
      <div className="flex flex-col gap-4">
        <h2 className="text-heading">Papers, Honors & Education</h2>
        <p className="subtext max-w-3xl">
          An overview of academic credentials, published paper presentations, technical certifications, and miscellaneous honors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-12 lg:grid-cols-2">
        {/* Education & Certifications Card */}
        <motion.div
          className="p-8 border border-white/10 bg-gradient-to-b from-storm to-indigo rounded-2xl flex flex-col justify-between"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="p-2 rounded-lg bg-royal/20 text-lavender font-bold text-sm">
                EDU
              </span>
              <h3 className="text-2xl font-bold text-white">Education</h3>
            </div>
            
            <div className="border-l border-white/10 pl-4 py-2 space-y-4">
              <div>
                <h4 className="text-lg font-bold text-neutral-200">SRM Institute of Science and Technology</h4>
                <p className="text-sm text-sand mt-0.5">B.Tech Computer Science Engineering</p>
                <p className="text-xs text-neutral-500 mt-0.5">Specialization in Big Data Analytics | Sep 2023 - Present</p>
                <div className="mt-2 inline-block px-3 py-1 text-xs font-bold rounded bg-midnight border border-white/10 text-white">
                  CGPA: 8.96
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-bold text-neutral-200 mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded-md bg-mint/20 text-mint text-xs font-semibold">CERT</span>
                Professional Certifications
              </h4>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-xs rounded-lg bg-midnight border border-white/5 text-neutral-300 hover:border-lavender/30 transition-colors"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Honors & Accomplishments Card */}
        <motion.div
          className="p-8 border border-white/10 bg-gradient-to-b from-storm to-indigo rounded-2xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="p-2 rounded-lg bg-coral/20 text-coral font-bold text-sm">
              HON
            </span>
            <h3 className="text-2xl font-bold text-white">Honors & Roles</h3>
          </div>

          <div className="relative border-l border-white/10 pl-6 space-y-6">
            {honorsAndEducationList.map((honor, index) => (
              <div key={index} className="relative group">
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-neutral-800 border-2 border-neutral-700 group-hover:bg-coral group-hover:border-coral transition-colors duration-300" />
                
                <span className="text-xs font-semibold text-sand block">
                  {honor.year}
                </span>
                <h4 className="text-base font-bold text-neutral-200 group-hover:text-white transition-colors duration-200 mt-1">
                  {honor.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {honor.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PapersHonors;
