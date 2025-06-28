'use client';

import { m, Variants, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/utils/cn';

type AnimationType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'rotateIn'
  | 'bounceIn';

type AnimationSpeed = 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow';

interface AnimateProps extends Omit<HTMLMotionProps<"div">, 'variants' | 'initial' | 'animate'> {
  children: React.ReactNode;
  animation?: AnimationType;
  speed?: AnimationSpeed;
  delay?: AnimationSpeed;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerDelay?: AnimationSpeed;
  as?: keyof HTMLElementTagNameMap;
}

// ✅ KEEP YOUR EXCELLENT TIMING SYSTEM - Ini sudah perfect!
const getAnimationDuration = (speed: AnimationSpeed): number => {
  const durations = {
    'instant': 0.15,
    'fast': 0.35,
    'normal': 0.6,
    'slow': 0.8,
    'very-slow': 1.2
  };
  return durations[speed];
};

// ✅ KEEP YOUR EXCELLENT EASING - Ini juga sudah natural!
const easingFunctions = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55],
  sharp: [0.4, 0, 0.2, 1],
  gentle: [0.25, 0.1, 0.25, 1],
} as const;

// ✅ KEEP YOUR EXCELLENT ANIMATIONS - Jangan diubah!
const animations: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInDown: {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInLeft: {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideInRight: {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -45, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  }
};

// ✅ KEEP YOUR EXCELLENT COMPONENT LOGIC - Cuma ganti motion -> m
export const Animate = ({
                          children,
                          animation = 'fadeInUp',
                          speed = 'normal',
                          delay = 'instant',
                          className,
                          threshold = 0.1,
                          triggerOnce = true,
                          stagger = false,
                          staggerDelay = 'fast',
                          as = 'div',
                          ...props
                        }: AnimateProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const variants = animations[animation];
  const duration = getAnimationDuration(speed);
  const delayValue = getAnimationDuration(delay);
  const staggerDelayValue = getAnimationDuration(staggerDelay);

  const transition = {
    duration,
    delay: stagger ? delayValue + staggerDelayValue : delayValue,
    ease: animation === 'bounceIn' ? easingFunctions.bounce :
      animation.includes('scale') ? easingFunctions.gentle :
        easingFunctions.smooth
  };

  // ✅ CHANGED: motion -> m (untuk LazyMotion optimization)
  const MotionComponent = m[as] as any;

  return (
    <MotionComponent
      ref={ref}
      className={cn('gpu-accelerated', className)}
      variants={variants}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      transition={transition}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

// ✅ KEEP ALL YOUR EXCELLENT PRESET COMPONENTS
export const FadeIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeIn" speed="normal" {...props} />;

export const FadeInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInUp" speed="normal" {...props} />;

export const FadeInLeft = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInLeft" speed="fast" {...props} />;

export const FadeInRight = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInRight" speed="fast" {...props} />;

export const ScaleIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="scaleIn" speed="slow" {...props} />;

export const SlideInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="slideInUp" speed="normal" {...props} />;

// ✅ KEEP YOUR EXCELLENT STAGGER CONTAINER
export const StaggerContainer = ({
                                   children,
                                   staggerDelay = 'fast',
                                   ...props
                                 }: Omit<AnimateProps, 'stagger'>) => (
  <Animate stagger staggerDelay={staggerDelay} {...props}>
    {children}
  </Animate>
);

// ✅ KEEP YOUR EXCELLENT HOOK
export const useAnimationDurations = () => ({
  instant: getAnimationDuration('instant'),
  fast: getAnimationDuration('fast'),
  normal: getAnimationDuration('normal'),
  slow: getAnimationDuration('slow'),
  'very-slow': getAnimationDuration('very-slow'),
});
