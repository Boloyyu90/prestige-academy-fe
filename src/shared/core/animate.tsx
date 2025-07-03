'use client';

import React from 'react';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { useMotionConfig } from '@/shared/providers/motion-provider';
import { cn } from '@/shared/lib/utils/cn';

type AnimationType = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
type AnimationSpeed = 'fast' | 'normal' | 'slow';

interface AnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  speed?: AnimationSpeed;
  delay?: AnimationSpeed | number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  as?: keyof JSX.IntrinsicElements;
  critical?: boolean;
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
                          critical = false,
                          ...props
                        }: AnimateProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const { reducedMotion, mounted } = useMotionConfig();
  const Component = as as any;

  const shouldAnimate = critical ? true : isIntersecting;

  const finalShouldAnimate = reducedMotion ? true : shouldAnimate;

  const delayValue = typeof delay === 'number' ? `${delay}ms` : undefined;
  const delayClass = typeof delay === 'string' ? `animation-delay-${delay}` : '';

  return (
    <Component
      ref={critical ? undefined : ref}
      className={cn(
        finalShouldAnimate ? `animate-${animation}` : 'opacity-0',
        `animation-duration-${speed}`,
        delayClass,
        'gpu-accelerated',
        reducedMotion && 'animate-none opacity-100',
        className
      )}
      style={{
        animationDelay: delayValue,
        ...(critical && { opacity: 1 }),
        ...(!mounted && critical && { opacity: 1 })
      }}
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

export const HeroAnimate = ({ children, ...props }: Omit<AnimateProps, 'critical'>) => (
  <Animate critical={true} animation="fadeInUp" speed="normal" {...props}>
    {children}
  </Animate>
);

export const ContentAnimate = ({ children, ...props }: AnimateProps) => (
  <Animate critical={false} {...props}>
    {children}
  </Animate>
);

export const StaggerContainer = ({
                                   children,
                                   className,
                                   staggerDelay = 150,
                                   animation = 'fadeInUp',
                                   speed = 'normal',
                                   ...props
                                 }: AnimateProps & { staggerDelay?: number }) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { reducedMotion } = useMotionConfig();

  return (
    <div ref={ref} className={className} {...props}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            isIntersecting ? `animate-${animation}` : 'opacity-0',
            `animation-duration-${speed}`,
            'gpu-accelerated',
            reducedMotion && 'animate-none opacity-100'
          )}
          style={{
            animationDelay: isIntersecting && !reducedMotion ? `${index * staggerDelay}ms` : '0ms'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default {
  Animate,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
  ScaleIn,
  HeroAnimate,
  ContentAnimate,
  StaggerContainer
};