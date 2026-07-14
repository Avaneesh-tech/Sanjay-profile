import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

const KpiCounter = ({ value, className = 'kpi-value' }) => {
  const { ref, display } = useCountUp(value, 650);

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
};

export default KpiCounter;
