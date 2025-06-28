'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const MotionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
};