import React from 'react';
import { motion } from 'framer-motion';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const SectionHeader = ({ number, title, subtitle }) => (
  <header className="section-header border-b-0 pb-0">
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: motionDuration.normal, ease: easeOut }}
      className="chapter-number"
    >
      {number}
    </motion.p>

    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: motionDuration.normal, delay: 0.08, ease: easeOut }}
      className="section-title mt-3"
    >
      {title}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: motionDuration.normal, delay: 0.16, ease: easeOut }}
        className="section-subtitle"
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: motionDuration.slow, delay: 0.22, ease: easeOut }}
      className="mt-8 h-px w-full origin-left bg-divider"
    />
  </header>
);

export default SectionHeader;
