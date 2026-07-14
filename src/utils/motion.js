export const easeOut = [0.22, 1, 0.36, 1];
export const easeSmooth = [0.4, 0, 0.2, 1];

export const motionDuration = {
  fast: 0.25,
  normal: 0.45,
  slow: 0.65,
  page: 0.7
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 }
};

export const staggerContainer = (delay = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: 0.05 }
  }
});

export const viewportOnce = { once: true, margin: '-60px' };

export const transition = (duration = motionDuration.normal, delay = 0) => ({
  duration,
  delay,
  ease: easeOut
});
