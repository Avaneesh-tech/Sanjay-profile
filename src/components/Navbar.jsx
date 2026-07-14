import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { easeOut, motionDuration } from '../utils/motion';

const navLinks = [
  { num: '01', name: 'Executive Summary', href: '#home', id: 'home' },
  { num: '02', name: 'Leadership Journey', href: '#experience', id: 'experience' },
  { num: '03', name: 'Core Capabilities', href: '#expertise', id: 'expertise' },
  { num: '04', name: 'Business Impact', href: '#business-impact', id: 'business-impact' },
  { num: '05', name: 'Awards', href: '#achievements', id: 'achievements' },
  { num: '06', name: 'Credentials', href: '#education', id: 'education' },
  { num: '07', name: 'Contact', href: '#contact', id: 'contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const navRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: motionDuration.normal, delay: 0.15, ease: easeOut }}
      className={`fixed z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-divider bg-panel/90 py-2.5 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-background/70 py-5 backdrop-blur-sm'
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${scrolled ? 'text-[0.95rem]' : ''}`}>
        <a href="#home" className="font-display text-sm font-semibold tracking-tight text-primary">
          EXECUTIVE REPORT
        </a>

        <div className="relative hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                ref={(el) => {
                  navRefs.current[link.id] = el;
                }}
                href={link.href}
                className={`relative rounded px-3 py-2 text-xs font-medium transition-colors duration-200 hover:text-accent ${
                  isActive ? 'text-accent' : 'text-secondary'
                }`}
              >
                <span className="mr-1.5 font-mono text-[0.65rem] text-slate-400">{link.num}</span>
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <button
          type="button"
          className="border border-divider p-2 text-primary lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: motionDuration.fast, ease: easeOut }}
            className="overflow-hidden border-t border-divider bg-panel/95 backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`border-b border-divider px-2 py-3 text-sm font-medium text-secondary last:border-0 ${
                    activeId === link.id ? 'text-accent' : ''
                  }`}
                >
                  <span className="mr-2 font-mono text-xs text-slate-400">{link.num}</span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
