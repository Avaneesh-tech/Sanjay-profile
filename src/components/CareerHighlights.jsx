import React from 'react';
import { motion } from 'framer-motion';
import { Award, BarChart3, Briefcase, Building2, Landmark, MapPin } from 'lucide-react';
import { profile } from '../data/profile';

const icons = [Briefcase, Building2, Award, MapPin, Landmark, BarChart3];

const CareerHighlights = () => {
  return (
    <section id="career-highlights" className="section-container max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.28 }}
        className="mb-10"
      >
        <h2 className="section-eyebrow mb-3">Career Snapshot</h2>
        <h3 className="gradient-heading text-3xl font-extrabold md:text-4xl">Career Highlights</h3>
        <p className="mt-4 max-w-3xl text-gray-400">
          Key metrics that define two decades of leadership across insurance, analytics and operations.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {profile.careerHighlights.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.28, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-card group p-5 text-center md:p-6"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-200/15 transition group-hover:bg-cyan-300/16">
                <Icon size={18} />
              </div>
              <div className="gradient-heading mb-1.5 text-2xl font-extrabold md:text-3xl">{item.value}</div>
              <div className="text-[0.68rem] font-bold uppercase leading-snug tracking-[0.12em] text-gray-400 md:text-xs">
                {item.label}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default CareerHighlights;
