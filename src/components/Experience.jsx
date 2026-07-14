import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const getCompanyInitials = (company) =>
  company
    .split(/[\s(]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

const CaseStep = ({ label, content, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-20px' }}
    transition={{ duration: motionDuration.normal, delay, ease: easeOut }}
    className="px-6 py-5 md:px-8"
  >
    <p className="case-step-label">{label}</p>
    <p className="mt-2 text-sm leading-relaxed text-secondary md:text-[0.9375rem]">{content}</p>
  </motion.div>
);

const BusinessCase = ({ job, index, isActive }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-35% 0px -35% 0px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      animate={{
        opacity: inView ? 1 : 0.72,
        scale: inView ? 1 : 0.985
      }}
      transition={{ duration: motionDuration.normal, delay: index * 0.05, ease: easeOut }}
      className="relative pl-8 md:pl-10"
    >
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.05 + 0.1, ease: easeOut }}
        className={`absolute left-0 top-6 h-2.5 w-2.5 -translate-x-[5px] border-2 border-panel ${inView || isActive ? 'bg-accent' : 'bg-divider'}`}
        aria-hidden="true"
      />

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className={`editorial-panel motion-card-hover ${inView ? 'border-accent/30 shadow-md' : ''}`}
      >
        <header className="border-b border-divider px-6 py-5 md:px-8">
          <div className="flex flex-wrap items-start gap-4">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-divider bg-background text-xs font-bold text-accent"
            >
              {getCompanyInitials(job.company)}
            </motion.div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-primary md:text-xl">{job.company}</h3>
                <span className="font-mono text-xs text-secondary">{job.duration}</span>
              </div>
              <p className="mt-1 text-sm text-secondary">{job.role}</p>
            </div>
          </div>
        </header>

        <CaseStep label="Business Challenge" content={job.businessCase.challenge} delay={0.05} />
        <div className="case-arrow border-y border-divider bg-background">↓</div>
        <CaseStep label="Strategic Approach" content={job.businessCase.approach} delay={0.08} />
        <div className="case-arrow border-b border-divider bg-background">↓</div>
        <CaseStep label="Leadership Role" content={job.businessCase.role} delay={0.1} />
        <div className="case-arrow border-b border-divider bg-background">↓</div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.normal, delay: 0.12, ease: easeOut }}
          className="border-t border-divider bg-background px-6 py-5 md:px-8"
        >
          <p className="case-step-label text-success">Business Outcome</p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-primary md:text-[0.9375rem]">
            {job.businessCase.outcome}
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};

const Experience = () => {
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.25']
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const cards = timelineRef.current?.querySelectorAll('[data-timeline-card]');
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.4 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="section-band section-container">
      <SectionHeader
        number="02"
        title="Leadership Journey"
        subtitle="Building enterprise-scale analytics, operations, and risk management systems across six organizations."
      />

      <div ref={timelineRef} className="relative border-l border-divider pl-0">
        <div className="absolute left-0 top-0 h-full w-px bg-divider" aria-hidden="true" />
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {profile.experience.map((job, index) => (
            <div key={`${job.company}-${job.duration}`} data-timeline-card data-index={index}>
              <BusinessCase job={job} index={index} isActive={activeIndex === index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
