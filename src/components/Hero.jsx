import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { profile } from '../data/profile';
import heroImage from '../assets/hero.jpg';
import KpiCounter from './KpiCounter';
import { useMousePosition } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { easeOut, motionDuration, staggerContainer } from '../utils/motion';

const Hero = () => {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition(!reduced);
  const portraitX = reduced ? 0 : (x - 0.5) * 8;
  const portraitY = reduced ? 0 : (y - 0.5) * 6;

  const quoteLines = profile.philosophy.split('. ').filter(Boolean);

  return (
    <section id="home" className="section-container pt-28 md:pt-32">
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: motionDuration.normal, ease: easeOut }}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Confidential Executive Briefing
        </motion.p>

        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
            transition={{ duration: motionDuration.slow, ease: easeOut }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div
              className={`hero-gradient absolute -inset-6 -z-10 rounded-sm ${reduced ? '' : 'hero-gradient-animate'}`}
              aria-hidden="true"
            />
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              className="editorial-panel hero-portrait-glow overflow-hidden"
            >
              <img
                src={heroImage}
                alt={profile.name}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </motion.div>
          </motion.div>

          <div>
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: motionDuration.slow, ease: easeOut }}
              className="text-4xl font-semibold leading-tight text-primary md:text-5xl lg:text-[3.25rem]"
            >
              {profile.name}
            </motion.h1>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: motionDuration.normal, delay: 0.05, ease: easeOut }}
              className="mt-3 text-lg font-medium text-accent md:text-xl"
            >
              {profile.title}
            </motion.p>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: motionDuration.normal, delay: 0.1, ease: easeOut }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-secondary md:text-[1.05rem]"
            >
              {profile.executiveSummary}
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: motionDuration.normal, delay: 0.15, ease: easeOut }}
              className={`callout-box quote-sweep relative mt-8 ${reduced ? '' : 'quote-sweep-animate'}`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: motionDuration.slow, delay: 0.4 }}
                className="pointer-events-none absolute -left-1 top-2 font-display text-6xl leading-none text-accent"
                aria-hidden="true"
              >
                &ldquo;
              </motion.span>
              <div className="relative space-y-2">
                {quoteLines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: motionDuration.normal, delay: 0.35 + index * 0.12, ease: easeOut }}
                    className="text-sm italic leading-relaxed text-secondary md:text-base"
                  >
                    {line}{index < quoteLines.length - 1 ? '.' : ''}
                  </motion.p>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionDuration.normal, delay: 0.55, ease: easeOut }}
                className="relative mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary"
              >
                — {profile.name}
              </motion.p>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: motionDuration.normal, delay: 0.2, ease: easeOut }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <motion.a
                href={profile.contact.resume}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="motion-card-hover inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 text-sm font-semibold text-white"
              >
                <Download size={16} />
                Executive Resume
              </motion.a>
              <motion.a
                href="#experience"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="motion-card-hover inline-flex items-center gap-2 border border-divider bg-panel px-5 py-2.5 text-sm font-semibold text-primary"
              >
                View Leadership Journey
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: motionDuration.normal, delay: 0.25, ease: easeOut }}
          className="mt-14 grid grid-cols-2 gap-px border border-divider bg-divider md:grid-cols-4"
        >
          {profile.careerHighlights.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: motionDuration.normal, delay: 0.4 + index * 0.08, ease: easeOut }}
              whileHover={{ y: -3 }}
              className="kpi-card motion-card-hover bg-panel"
            >
              <KpiCounter value={item.value} />
              <div className="kpi-label">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
