'use client';

import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';

interface MotionProviderProps extends PropsWithChildren {
  respectReducedMotion?: boolean;
}

const motionFeatures = domAnimation;

export const MotionProvider = ({
                                 children,
                                 respectReducedMotion = true
                               }: MotionProviderProps) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (!respectReducedMotion) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [respectReducedMotion]);

  const motionConfig = {
    transition: reducedMotion
      ? { duration: 0.01 }
      : {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    reducedMotion: reducedMotion ? 'always' : 'never' as const
  };

  return (
    <LazyMotion features={motionFeatures} strict>
      <MotionConfig {...motionConfig}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
};

export const useMotionConfig = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    reducedMotion,
    mounted,
    duration: reducedMotion ? 0.01 : 0.6,
    ease: reducedMotion ? 'linear' : [0.25, 0.46, 0.45, 0.94]
  };
};


export const motionVariants = {
  carousel: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  },

  accordion: {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 }
  },

  hover: {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  }
};

export default MotionProvider;