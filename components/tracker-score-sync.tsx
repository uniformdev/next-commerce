'use client';

import { useUniformContext } from '@uniformdev/canvas-next-rsc/component';
import { useEffect } from 'react';

const TrackerScoreSync = () => {
  const { context } = useUniformContext();
  useEffect(() => {
    const fetchTraits = async () => {
      const response = await fetch('/api/traits');
      const { traits } = await response.json();
      await context?.update({
        quirks: {
          ...traits
        }
      });
    };
    fetchTraits();
  }, [context]);
  return null;
};

export default TrackerScoreSync;
