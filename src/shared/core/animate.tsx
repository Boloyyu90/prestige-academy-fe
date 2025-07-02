'use client';

import React from 'react';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { cn } from '@/shared/lib/utils/cn';

type AnimationType =
  | 'fadeInUp'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn';

type AnimationSpeed = 'fast' | 'normal' | 'slow';

interface AnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  speed?: AnimationSpeed;
  delay?: AnimationSpeed;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export const Animate = ({
                          children,
                          animation = 'fadeInUp',
                          speed = 'normal',
                          delay = 'fast',
                          className,
                          threshold = 0.1,
                          triggerOnce = true,
                          as = 'div',
                          ...props
                        }: AnimateProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const Component = as as any;

  return (
    <Component
      ref={ref}
      className={cn(
        isIntersecting ? `animate-${animation}` : 'opacity-0',
        `animation-duration-${speed}`,
        `animation-delay-${delay}`,
        'gpu-accelerated',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export const FadeInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInUp" {...props} />;

export const FadeInLeft = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInLeft" speed="fast" {...props} />;

export const FadeInRight = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInRight" speed="fast" {...props} />;

export const ScaleIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="scaleIn" speed="slow" {...props} />;

export const StaggerContainer = ({ children, className, ...props }: AnimateProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child, index) => (
        <div
          className={cn(
            isIntersecting ? 'animate-fadeInUp' : 'opacity-0',
            'animation-duration-normal'
          )}
          style={{
            animationDelay: isIntersecting ? `${index * 150}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};