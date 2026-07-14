import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const AwardCertificate = ({ award, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewportOnce}
    transition={{ duration: motionDuration.normal, delay: index * 0.05, ease: easeOut }}
    className="relative"
  >
    <motion.span
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 + 0.1, ease: easeOut }}
      className="absolute -left-[2.125rem] top-5 h-2.5 w-2.5 border-2 border-panel bg-gold md:-left-[2.375rem]"
      aria-hidden="true"
    />

    <motion.div
      whileHover={{ scale: 1.01, y: -3 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="certificate-card certificate-shine certificate-shine-once motion-card-hover"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-base font-semibold text-primary">{award.title}</h4>
        <span className="font-mono text-sm font-medium text-gold">{award.year}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-secondary">{award.detail}</p>
    </motion.div>
  </motion.article>
);

const Achievements = () => {
  return (
    <section id="achievements" className="section-container">
      <SectionHeader
        number="05"
        title="Awards & Recognition"
        subtitle="Professional honors, certifications and growth programs spanning two decades of enterprise leadership."
      />

      <div className="relative border-l border-gold/40 pl-8 md:pl-10">
        <div className="space-y-6">
          {profile.achievements.awardTimeline.map((award, index) => (
            <AwardCertificate key={`${award.year}-${award.title}`} award={award} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: motionDuration.normal, ease: easeOut }}
          className="editorial-panel motion-card-hover p-6 md:p-8"
        >
          <h4 className="text-base font-semibold text-primary">Certifications & Training</h4>
          <ul className="mt-5 space-y-3">
            {profile.achievements.certifications.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: motionDuration.fast, delay: index * 0.03, ease: easeOut }}
                className="border-b border-divider pb-3 text-sm leading-relaxed text-secondary last:border-0 last:pb-0"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: motionDuration.normal, delay: 0.06, ease: easeOut }}
          className="editorial-panel motion-card-hover p-6 md:p-8"
        >
          <h4 className="text-base font-semibold text-primary">Growth Programs</h4>
          <ul className="mt-5 space-y-3">
            {profile.achievements.growth.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: motionDuration.fast, delay: index * 0.03, ease: easeOut }}
                className="border-b border-divider pb-3 text-sm leading-relaxed text-secondary last:border-0 last:pb-0"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
