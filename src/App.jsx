import React from 'react';
import { motion } from 'framer-motion';
import AmbientBackground from './components/AmbientBackground';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Expertise from './components/Expertise';
import BusinessImpact from './components/BusinessImpact';
import Philosophy from './components/Philosophy';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import { motionDuration } from './utils/motion';

function App() {
  return (
    <motion.div
      className="report-shell min-h-screen text-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: motionDuration.page, ease: [0.22, 1, 0.36, 1] }}
    >
      <AmbientBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Expertise />
        <BusinessImpact />
        <Philosophy />
        <Achievements />
        <Education />
        <Contact />
      </main>
    </motion.div>
  );
}

export default App;
