import React from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const Education = () => {
  return (
    <section id="education" className="section-band section-container">
      <SectionHeader
        number="06"
        title="Academic Credentials"
        subtitle="Formal education and professional computer knowledge supporting enterprise analytics and leadership."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: motionDuration.normal, ease: easeOut }}
        className="editorial-panel overflow-hidden"
      >
        <div className="report-row-header px-6 md:px-8">
          <span>Degree</span>
          <span>Institution</span>
          <span>Location</span>
          <span>Type</span>
        </div>

        {profile.education.map((edu, index) => (
          <motion.div
            key={`${edu.degree}-${edu.institution}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionDuration.normal, delay: index * 0.05, ease: easeOut }}
            className="report-row impact-table-row px-6 md:px-8"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary md:hidden">Degree</p>
              <p className="font-semibold text-primary">{edu.degree}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary md:hidden">Institution</p>
              <p className="text-sm text-secondary">{edu.institution}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary md:hidden">Location</p>
              <p className="text-sm text-secondary">{edu.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary md:hidden">Type</p>
              <p className="text-sm text-secondary">{edu.type}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 space-y-6">
        {profile.computerKnowledge.map((item, index) => (
          <motion.div
            key={item.course}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: motionDuration.normal, delay: index * 0.05, ease: easeOut }}
            whileHover={{ y: -3 }}
            className="editorial-panel motion-card-hover p-6 md:p-8"
          >
            <h4 className="font-semibold text-primary">{item.course}</h4>
            <p className="mt-1 text-sm text-secondary">{item.institute}</p>
            <p className="mt-4 border-t border-divider pt-4 text-sm leading-relaxed text-secondary">
              {item.knowledge}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
