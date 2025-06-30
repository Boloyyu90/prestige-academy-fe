'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// ✅ OPTIMIZED: Simple, performant intersection observer
export const useIntersectionObserver = ({
                                          threshold = 0.1,
                                          rootMargin = '0px',
                                          triggerOnce = true,
                                        }: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);

          // ✅ PERFORMANCE: Unobserve immediately after trigger
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isIntersecting };
};

// ✅ SPECIALIZED: Hook for staggered list animations
export const useStaggeredIntersection = (itemCount: number) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const getItemAnimation = (index: number) => ({
    className: isIntersecting ? 'animate-fadeInUp' : 'opacity-0',
    style: {
      animationDelay: isIntersecting ? `${index * 150}ms` : '0ms',
    },
  });

  return { ref, isIntersecting, getItemAnimation };
};