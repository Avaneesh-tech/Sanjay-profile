import React from 'react';
import { useMousePosition } from '../hooks/useMousePosition';
import { useReducedMotion } from '../hooks/useReducedMotion';

const AmbientBackground = () => {
  const reduced = useReducedMotion();
  const { x, y } = useMousePosition(!reduced);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className={`ambient-grid ${reduced ? '' : 'ambient-grid-animate'}`} />
      <div className={`ambient-radial ${reduced ? '' : 'ambient-radial-animate'}`} />
      {!reduced && (
        <div
          className="ambient-spotlight"
          style={{
            '--mouse-x': `${x * 100}%`,
            '--mouse-y': `${y * 100}%`
          }}
        />
      )}
    </div>
  );
};

export default AmbientBackground;
