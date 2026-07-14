import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const Philosophy = () => {
  const reduced = useReducedMotion();
  const sentences = profile.philosophy.split('. ').filter(Boolean);

  return (
    <section className="section-container py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: motionDuration.normal, ease: easeOut }}
        className={`callout-box quote-sweep relative mx-auto max-w-3xl text-center ${reduced ? '' : 'quote-sweep-animate'}`}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.12, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.slow, ease: easeOut }}
          className="pointer-events-none absolute left-6 top-4 font-display text-7xl leading-none text-accent md:left-10 md:text-8xl"
          aria-hidden="true"
        >
          &ldquo;
        </motion.span>

        <div className="relative space-y-3 px-2 md:px-6">
          {sentences.map((sentence, index) => (
            <motion.p
              key={sentence}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionDuration.normal, delay: index * 0.12, ease: easeOut }}
              className="text-lg italic leading-relaxed text-secondary md:text-xl"
            >
              {sentence}{index < sentences.length - 1 ? '.' : '.'}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.normal, delay: 0.35, ease: easeOut }}
          className="relative mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
        >
          — {profile.name}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Philosophy;
