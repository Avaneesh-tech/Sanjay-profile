import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import KpiCounter from './KpiCounter';

const Highlights = () => {
  return (
    <section className="soft-band border-y border-white/10 py-12">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">
          {profile.highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              whileHover={{ y: -6 }}
              className="rounded-xl border border-white/10 bg-white/[0.035] p-5 shadow-lg shadow-black/10 backdrop-blur-sm"
            >
              <KpiCounter
                value={item.value}
                className="gradient-heading mb-2 text-2xl font-extrabold md:text-3xl"
              />
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-100/75">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
