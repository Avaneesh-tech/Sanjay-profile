import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, BarChart3, ShieldCheck, Users, Landmark, Cpu } from 'lucide-react';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const bentoIcons = {
  'strategic-leadership': Briefcase,
  'business-intelligence': BarChart3,
  'risk-claims': ShieldCheck,
  'customer-experience': Users,
  'government-projects': Landmark,
  'technology-analytics': Cpu
};

const CapabilityGrid = () => (
  <div className="grid grid-cols-1 gap-px border border-divider bg-divider md:grid-cols-2 lg:grid-cols-3">
    {profile.capabilityBento.map((card, index) => {
      const Icon = bentoIcons[card.id];
      return (
        <motion.article
          key={card.id}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: motionDuration.normal, delay: index * 0.06, ease: easeOut }}
          whileHover={{ y: -3 }}
          className={`motion-card-hover group bg-panel p-6 md:p-7 ${card.id === 'strategic-leadership' ? 'lg:col-span-2' : ''} ${card.id === 'technology-analytics' ? 'lg:col-span-3' : ''}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 4, scale: 1.05 }}
              transition={{ duration: 0.25 }}
              className="flex h-10 w-10 items-center justify-center border border-divider bg-background text-accent transition group-hover:border-accent/30 group-hover:bg-accent/5"
            >
              <Icon size={18} />
            </motion.span>
            <h4 className="text-base font-semibold text-primary md:text-lg">{card.title}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {card.items.map((item) => (
              <span key={item} className="editorial-badge">
                {item}
              </span>
            ))}
          </div>
        </motion.article>
      );
    })}
  </div>
);

const CapabilityMatrix = () => {
  const [activeNode, setActiveNode] = useState(null);
  const { center, nodes, connections } = profile.capabilityMatrix;

  const nodePositions = useMemo(
    () =>
      nodes.reduce((acc, node) => {
        const rad = (node.angle * Math.PI) / 180;
        const orbit = 34;
        acc[node.id] = {
          x: 50 + orbit * Math.cos(rad),
          y: 50 + orbit * Math.sin(rad)
        };
        return acc;
      }, {}),
    [nodes]
  );

  const allPositions = { [center.id]: { x: 50, y: 50 }, ...nodePositions };

  const isLineActive = (from, to) => {
    if (!activeNode) return false;
    return from === activeNode || to === activeNode;
  };

  const isNodeActive = (id) => {
    if (!activeNode) return false;
    if (id === activeNode) return true;
    return connections.some(
      ([a, b]) => (a === activeNode && b === id) || (b === activeNode && a === id)
    );
  };

  const getLinePath = (from, to) => {
    const start = allPositions[from];
    const end = allPositions[to];
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  };

  const isFromCenter = (from) => from === center.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: motionDuration.normal, ease: easeOut }}
      className="editorial-panel mt-14 p-6 md:p-8"
    >
      <h4 className="text-lg font-semibold text-primary">Enterprise Capability Map</h4>
      <p className="mt-2 max-w-2xl text-sm text-secondary">
        Interconnected domains that reinforce strategic leadership across the career.
      </p>

      <div className="relative mx-auto mt-8 aspect-square max-w-lg">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {connections.map(([from, to], index) => {
            const active = isLineActive(from, to);
            return (
              <motion.path
                key={`${from}-${to}`}
                d={getLinePath(from, to)}
                fill="none"
                stroke={active ? 'rgba(29, 78, 216, 0.65)' : 'rgba(226, 232, 240, 1)'}
                strokeWidth={active ? 0.35 : 0.2}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: motionDuration.slow,
                  delay: isFromCenter(from) ? 0.1 + index * 0.03 : 0.35 + index * 0.02,
                  ease: easeOut
                }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0">
          {[center, ...nodes].map((node, index) => {
            const pos = allPositions[node.id];
            const isCenterNode = node.id === center.id;
            const active = isNodeActive(node.id);
            const selected = activeNode === node.id;

            return (
              <button
                key={node.id}
                type="button"
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                onFocus={() => setActiveNode(node.id)}
                onBlur={() => setActiveNode(null)}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                aria-label={node.label}
              >
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  animate={
                    selected
                      ? { scale: 1.04 }
                      : active
                        ? { scale: 1.02 }
                        : { scale: 1 }
                  }
                  transition={{
                    duration: motionDuration.normal,
                    delay: index * 0.04,
                    ease: easeOut
                  }}
                  className={`block border px-2.5 py-1.5 text-center text-[0.62rem] font-medium transition-colors md:text-[0.7rem] ${
                    isCenterNode
                      ? 'min-w-[7rem] border-accent/30 bg-accent/5 text-accent md:min-w-[8.5rem]'
                      : 'min-w-[5rem] border-divider bg-panel text-secondary md:min-w-[6rem]'
                  } ${active || selected ? 'border-accent bg-accent/5 text-accent' : ''}`}
                >
                  {node.label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
        {nodes.map((node) => (
          <button
            key={`mobile-${node.id}`}
            type="button"
            onClick={() => setActiveNode((prev) => (prev === node.id ? null : node.id))}
            className={`border px-2 py-2 text-xs font-medium transition ${
              activeNode === node.id
                ? 'border-accent bg-accent/5 text-accent'
                : 'border-divider bg-background text-secondary'
            }`}
          >
            {node.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

const AnimatedBadge = ({ item, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: motionDuration.fast, delay: index * 0.03, ease: easeOut }}
    whileHover={{ backgroundColor: 'rgba(29, 78, 216, 0.06)', borderColor: 'rgba(29, 78, 216, 0.3)' }}
    className="editorial-badge"
  >
    {item}
  </motion.span>
);

const DomainSplit = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewportOnce}
    transition={{ duration: motionDuration.normal, ease: easeOut }}
    className="mt-14 grid gap-8 lg:grid-cols-2"
  >
    <div className="editorial-panel motion-card-hover p-6 md:p-8">
      <h4 className="text-base font-semibold text-primary md:text-lg">Business Expertise</h4>
      <p className="mt-1 text-sm text-secondary">Strategic domains and leadership competencies.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.domainSplit.business.map((item, index) => (
          <AnimatedBadge key={item} item={item} index={index} />
        ))}
      </div>
    </div>

    <div className="editorial-panel motion-card-hover p-6 md:p-8">
      <h4 className="text-base font-semibold text-primary md:text-lg">Technologies & Platforms</h4>
      <p className="mt-1 text-sm text-secondary">Systems and tools applied across the career.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.domainSplit.technologies.map((item, index) => (
          <AnimatedBadge key={item} item={item} index={index} />
        ))}
      </div>
    </div>
  </motion.div>
);

const ExpertiseImpactMatrix = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={viewportOnce}
    transition={{ duration: motionDuration.normal, ease: easeOut }}
    className="editorial-panel mt-14 overflow-hidden"
  >
    <div className="border-b border-divider px-6 py-5 md:px-8">
      <h4 className="text-base font-semibold text-primary md:text-lg">Expertise × Business Impact</h4>
      <p className="mt-1 text-sm text-secondary">Measurable outcomes — not self-assessed proficiency ratings.</p>
    </div>

    <div className="hidden md:block">
      <div className="grid grid-cols-[minmax(10rem,1fr)_2fr] border-b border-divider bg-background px-6 py-3 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-secondary md:px-8">
        <span>Expertise</span>
        <span>Business Impact</span>
      </div>
      {profile.expertiseImpact.map((row, index) => (
        <motion.div
          key={row.expertise}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.normal, delay: index * 0.04, ease: easeOut }}
          className="impact-table-row grid grid-cols-[minmax(10rem,1fr)_2fr] border-b border-divider px-6 py-4 transition md:px-8"
        >
          <span className="pr-4 font-semibold text-primary">{row.expertise}</span>
          <p className="text-sm leading-relaxed text-secondary">{row.impact}</p>
        </motion.div>
      ))}
    </div>

    <div className="space-y-0 md:hidden">
      {profile.expertiseImpact.map((row, index) => (
        <motion.div
          key={row.expertise}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.normal, delay: index * 0.04, ease: easeOut }}
          className="border-b border-divider px-5 py-4 last:border-0"
        >
          <p className="font-semibold text-primary">{row.expertise}</p>
          <p className="mt-1 text-sm leading-relaxed text-secondary">{row.impact}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Expertise = () => (
  <section id="expertise" className="section-container">
    <SectionHeader
      number="03"
      title="Core Capabilities"
      subtitle="Enterprise capability domains spanning strategy, intelligence, risk, customer experience, government programs and technology."
    />

    <CapabilityGrid />
    <CapabilityMatrix />
    <DomainSplit />
    <ExpertiseImpactMatrix />
  </section>
);

export default Expertise;
