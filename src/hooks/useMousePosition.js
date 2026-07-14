import { useEffect, useState } from 'react';

export function useMousePosition(enabled = true) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event) => {
      setPosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [enabled]);

  return position;
}
