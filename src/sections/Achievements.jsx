import React from "react";
import { motion } from "motion/react";
import { achievementsList } from "../constants";

const Achievements = () => {
  return (
    <section className="c-space section-spacing" id="achievements">
      <div className="flex flex-col gap-4">
        <h2 className="text-heading">Achievements & Awards</h2>
        <p className="subtext max-w-3xl">
          A showcase of hackathon victories, leadership initiatives, and significant honors earned through engineering and collaborative projects.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3">
        {achievementsList.map((ach, index) => (
          <motion.div
            key={index}
            className="flex flex-col justify-between p-6 overflow-hidden border border-white/10 bg-gradient-to-b from-storm to-indigo rounded-2xl hover:border-lavender/30 transition-all duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-radial from-lavender/30 to-royal/30 text-lavender border border-lavender/20 capitalize">
                  {ach.type}
                </span>
                <span className="text-sm font-semibold text-sand">
                  {ach.role}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-white group-hover:text-lavender transition-colors duration-200">
                {ach.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                {ach.description}
              </p>
            </div>
            
            <div className="flex items-center gap-1 mt-6 text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
              <span>View details</span>
              <img src="assets/arrow-right.svg" className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" alt="arrow" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
