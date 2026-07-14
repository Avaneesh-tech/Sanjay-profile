import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone } from 'lucide-react';
import { profile } from '../data/profile';
import SectionHeader from './SectionHeader';
import { easeOut, motionDuration, viewportOnce } from '../utils/motion';

const LinkedinIcon = ({ size = 18, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const contactItems = [
  {
    href: `tel:${profile.contact.phone.replace(/[^0-9+]/g, '')}`,
    icon: Phone,
    label: 'Phone',
    value: profile.contact.phone
  },
  {
    href: `mailto:${profile.contact.email}`,
    icon: Mail,
    label: 'Email',
    value: profile.contact.email
  },
  {
    href: profile.contact.linkedin,
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/sanjay-sawant',
    external: true
  },
  {
    href: profile.contact.resume,
    icon: Download,
    label: 'Resume',
    value: 'Download Executive Resume'
  }
];

const ContactRow = ({ href, icon: Icon, label, value, external, index }) => (
  <motion.a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: motionDuration.normal, delay: 0.15 + index * 0.08, ease: easeOut }}
    whileHover={{ y: -2 }}
    className="group flex items-center gap-4 border-b border-divider py-4 transition last:border-0"
  >
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: motionDuration.normal, delay: 0.2 + index * 0.08, ease: easeOut }}
      whileHover={{ rotate: 4 }}
      className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-divider text-secondary transition group-hover:border-accent group-hover:text-accent"
    >
      <Icon size={16} />
    </motion.span>
    <span className="min-w-0">
      <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-secondary">
        {label}
      </span>
      <span className="relative block truncate text-sm font-medium text-primary transition group-hover:text-accent">
        {value}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition group-hover:scale-x-100"
          style={{ transitionDuration: '0.3s' }}
        />
      </span>
    </span>
  </motion.a>
);

const Contact = () => {
  return (
    <section id="contact" className="section-container pb-16">
      <SectionHeader
        number="07"
        title="Contact"
        subtitle="For leadership opportunities, strategic consulting and enterprise collaborations."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: motionDuration.slow, ease: easeOut }}
        whileHover={{ y: -4 }}
        className="business-card-contact motion-card-hover"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: motionDuration.normal, delay: 0.08, ease: easeOut }}
          className="border-b border-divider pb-6"
        >
          <h3 className="text-xl font-semibold text-primary">{profile.name}</h3>
          <p className="mt-1 text-sm text-secondary">{profile.title}</p>
        </motion.div>

        <div className="mt-2">
          {contactItems.map((item, index) => (
            <ContactRow key={item.label} {...item} index={index} />
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: motionDuration.normal, delay: 0.2, ease: easeOut }}
        className="mt-12 text-center text-xs text-secondary"
      >
        &copy; {new Date().getFullYear()} {profile.name}. Executive Intelligence Report. All rights reserved.
      </motion.p>
    </section>
  );
};

export default Contact;
