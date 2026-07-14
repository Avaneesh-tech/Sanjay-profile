import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, FileCheck, Globe2, Landmark, LayoutDashboard, LineChart, Satellite, ShieldCheck } from 'lucide-react';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const icons = [ShieldCheck, LayoutDashboard, Globe2, LineChart, FileCheck, Landmark, Satellite, BarChart3];

const ImpactCard = ({ item, index }) => {
  const Icon = icons[index % icons.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: motionDuration.normal, delay: index * 0.05, ease: easeOut }}
      className="group"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="editorial-panel motion-card-hover overflow-hidden"
      >
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:gap-8 md:p-8">
          <div className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: motionDuration.normal, delay: index * 0.05 + 0.05, ease: easeOut }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="mb-3 flex h-10 w-10 items-center justify-center border border-divider bg-background text-accent transition group-hover:border-accent/30"
            >
              <Icon size={18} />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: motionDuration.normal, delay: index * 0.05 + 0.1, ease: easeOut }}
              className="font-mono text-xs font-medium text-accent"
            >
              {String(index + 1).padStart(2, '0')}
            </motion.span>
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionDuration.normal, delay: index * 0.05 + 0.14, ease: easeOut }}
              className="mt-1 text-base font-semibold text-primary md:text-lg"
            >
              {item.title}
            </motion.h4>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: motionDuration.normal, delay: index * 0.05 + 0.18, ease: easeOut }}
            className="text-sm leading-relaxed text-secondary md:border-l md:border-divider md:pl-8 md:text-[0.9375rem]"
          >
            {item.description}
          </motion.p>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.slow, delay: index * 0.05 + 0.22, ease: easeOut }}
          className="impact-accent-line origin-left"
        />
      </motion.div>

      {index < profile.businessImpact.length - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.fast, delay: 0.1 }}
          className="flex justify-center py-3 text-slate-400"
          aria-hidden="true"
        >
          ↓
        </motion.div>
      )}
    </motion.article>
  );
};

const BusinessImpact = () => {
  return (
    <section id="business-impact" className="section-band section-container">
      <SectionHeader
        number="04"
        title="Business Impact"
        subtitle="Measurable career outcomes across enterprise dashboards, Pan-India operations, government programs and process transformation."
      />

      <div className="space-y-0">
        {profile.businessImpact.map((item, index) => (
          <ImpactCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

export default BusinessImpact;
