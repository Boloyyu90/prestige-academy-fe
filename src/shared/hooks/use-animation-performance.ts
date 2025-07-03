// src/shared/hooks/use-animation-performance.ts
'use client';

import { useEffect, useState, useCallback } from 'react';

interface AnimationPerformanceData {
  fps: number;
  isPerformant: boolean;
  animationCount: number;
  memoryUsage?: number;
  shouldReduceAnimations: boolean;
}

export const useAnimationPerformance = () => {
  const [performanceData, setPerformanceData] = useState<AnimationPerformanceData>({
    fps: 60,
    isPerformant: true,
    animationCount: 0,
    shouldReduceAnimations: false
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  // ✅ FPS Monitoring
  const startFPSMonitoring = useCallback(() => {
    if (isMonitoring) return;

    setIsMonitoring(true);
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        const isPerformant = fps >= 55;
        const shouldReduceAnimations = fps < 45;

        setPerformanceData(prev => ({
          ...prev,
          fps,
          isPerformant,
          shouldReduceAnimations
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(measureFPS);
    };

    animationFrameId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
      setIsMonitoring(false);
    };
  }, [isMonitoring]);

  // ✅ Memory Usage Monitoring (if available)
  const checkMemoryUsage = useCallback(() => {
    // @ts-ignore - performance.memory is not in TypeScript types but exists
    if (performance.memory) {
      // @ts-ignore
      const memoryUsage = performance.memory.usedJSHeapSize / 1024 / 1024; // MB
      setPerformanceData(prev => ({
        ...prev,
        memoryUsage,
        shouldReduceAnimations: prev.shouldReduceAnimations || memoryUsage > 100 // Reduce if >100MB
      }));
    }
  }, []);

  // ✅ Animation Count Tracking
  const trackAnimationStart = useCallback(() => {
    setPerformanceData(prev => ({
      ...prev,
      animationCount: prev.animationCount + 1
    }));
  }, []);

  const trackAnimationEnd = useCallback(() => {
    setPerformanceData(prev => ({
      ...prev,
      animationCount: Math.max(0, prev.animationCount - 1)
    }));
  }, []);

  // ✅ Core Web Vitals Integration
  const measureCLS = useCallback(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // @ts-ignore
          if (entry.hadRecentInput) return; // Ignore user-initiated shifts

          // @ts-ignore
          const clsValue = entry.value;
          if (clsValue > 0.1) { // Poor CLS
            setPerformanceData(prev => ({
              ...prev,
              shouldReduceAnimations: true
            }));
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      return () => observer.disconnect();
    }
  }, []);

  // ✅ Automatic Performance Monitoring
  useEffect(() => {
    const cleanup = startFPSMonitoring();
    const clsCleanup = measureCLS();

    const memoryInterval = setInterval(checkMemoryUsage, 5000); // Check every 5s

    return () => {
      cleanup?.();
      clsCleanup?.();
      clearInterval(memoryInterval);
    };
  }, [startFPSMonitoring, measureCLS, checkMemoryUsage]);

  // ✅ Performance Recommendations
  const getPerformanceRecommendations = useCallback(() => {
    const recommendations: string[] = [];

    if (performanceData.fps < 45) {
      recommendations.push('Consider reducing animation complexity');
    }

    if (performanceData.animationCount > 10) {
      recommendations.push('Too many concurrent animations');
    }

    if (performanceData.memoryUsage && performanceData.memoryUsage > 100) {
      recommendations.push('High memory usage detected');
    }

    return recommendations;
  }, [performanceData]);

  return {
    ...performanceData,
    trackAnimationStart,
    trackAnimationEnd,
    getPerformanceRecommendations,
    isMonitoring
  };
};

// ✅ HOC untuk automatic performance tracking
export const withPerformanceTracking = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return function PerformanceTrackedComponent(props: P) {
    const { trackAnimationStart, trackAnimationEnd } = useAnimationPerformance();

    useEffect(() => {
      trackAnimationStart();
      return trackAnimationEnd;
    }, [trackAnimationStart, trackAnimationEnd]);

    return <Component {...props} />;
  };
};

// ✅ Performance Context untuk global state
import { createContext, useContext } from 'react';

const PerformanceContext = createContext<ReturnType<typeof useAnimationPerformance> | null>(null);

export const PerformanceProvider = ({ children }: { children: React.ReactNode }) => {
  const performanceData = useAnimationPerformance();

  return (
    <PerformanceContext.Provider value={performanceData}>
      {children}
      </PerformanceContext.Provider>
  );
};

export const usePerformanceContext = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformanceContext must be used within PerformanceProvider');
  }
  return context;
};

export default useAnimationPerformance;