import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Clock, TrendingUp, Zap } from 'lucide-react';
import { profile } from '../data/profile';

const icons = [Zap, TrendingUp, Compass, Clock];

const About = () => {
  return (
    <section id="about" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-eyebrow mb-4">About Me</h2>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-card p-8 md:p-10">
            <p className="text-lg leading-relaxed text-gray-300 md:text-xl">
              {profile.about}
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {profile.aboutPoints.map((point, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="rounded-xl border border-white/10 bg-white/[0.045] p-4"
                  >
                    <Icon className="mb-3 h-5 w-5 text-cyan-200" />
                    <p className="text-sm leading-relaxed text-gray-300">{point}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="glass-card p-8 md:p-10">
            <h3 className="mb-2 text-xl font-bold text-white">Experience Mix</h3>
            <p className="mb-8 text-sm leading-relaxed text-gray-400">A visual snapshot of the profile across analytics, risk and sales.</p>
            <div className="space-y-6">
              {profile.focusAreas.map((area, index) => (
                <motion.div
                  key={area.label}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-gray-200">{area.label}</span>
                    <span className="font-bold text-cyan-100">{area.value}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${area.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.12, ease: 'easeOut' }}
                      className={`h-full rounded-full bg-gradient-to-r ${area.color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 h-1 w-28 rounded-full animated-underline" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
