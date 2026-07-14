import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export function parseNumericValue(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] || '' };
}

export function useCountUp(value, duration = 600) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const parsed = parseNumericValue(value);
  const [display, setDisplay] = useState(() => (parsed ? '0' : value));

  useEffect(() => {
    if (!inView) return;
    if (!parsed || reduced) {
      setDisplay(value);
      return;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(`${Math.round(parsed.target * eased)}${parsed.suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, parsed, reduced]);

  return { ref, display };
}
