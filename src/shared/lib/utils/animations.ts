// ✅ PRAGMATIC: Essential animation utilities only
import { cn } from '@/shared/lib/utils/cn';

// ✅ SIMPLIFIED: Core animation classes
export const animationClasses = {
  entrance: {
    fadeInUp: 'animate-fadeInUp',
    fadeInLeft: 'animate-fadeInLeft',
    fadeInRight: 'animate-fadeInRight',
    scaleIn: 'animate-scaleIn',
  },

  speed: {
    fast: 'animation-duration-fast',
    normal: 'animation-duration-normal',
    slow: 'animation-duration-slow',
  },

  delay: {
    fast: 'animation-delay-fast',
    normal: 'animation-delay-normal',
    slow: 'animation-delay-slow',
  },

  interactive: {
    default: 'interactive',
    card: 'card-hover',
    button: 'btn-hover',
  }
} as const;

// ✅ HELPER: Quick animation class builder
export const createAnimationClass = (
  animation: keyof typeof animationClasses.entrance,
  speed: keyof typeof animationClasses.speed = 'normal',
  delay: keyof typeof animationClasses.delay = 'fast'
) => {
  return cn(
    animationClasses.entrance[animation],
    animationClasses.speed[speed],
    animationClasses.delay[delay],
    'gpu-accelerated'
  );
};

// ✅ SIMPLE: Stagger delay calculator
export const getStaggerDelay = (index: number, delayMs: number = 150) => ({
  style: { animationDelay: `${index * delayMs}ms` }
});

// ✅ ESSENTIAL: Performance monitoring hook
export const useAnimationPerformance = () => {
  // Simple frame rate monitor
  const [fps, setFps] = React.useState(60);

  React.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFps);
    };

    requestAnimationFrame(measureFps);
  }, []);

  return { fps, isPerformant: fps >= 55 };
};

// ✅ EXPORT: Clean interface
export default {
  animationClasses,
  createAnimationClass,
  getStaggerDelay,
  useAnimationPerformance
};