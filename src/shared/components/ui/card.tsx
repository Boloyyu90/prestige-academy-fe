'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { m, HTMLMotionProps } from 'framer-motion';
import { cn } from "@/shared/lib/utils/cn";

const cardVariants = cva(
  // ✅ FIXED: Remove hardcoded duration-300, remove transition-all
  "rounded-5xl border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        outline: "border-2 border-primary/20",
        ghost: "border-transparent shadow-none bg-transparent",
        filled: "border-transparent bg-muted/50",
        gradient: "border-0 bg-gradient-to-br from-primary/5 to-secondary/5",
        glass: "bg-background/50 backdrop-blur-xl border border-border/50",
        elevated: "shadow-lg border-border/50",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      // ✅ ENHANCED: Choose between CSS or Motion hover system
      animation: {
        none: "",
        // ✅ CSS-based hovers (recommended for performance)
        minimal: "card-hover-minimal",         // Small lift
        standard: "card-hover-standard",       // Medium lift
        lift: "hover-lift-lg",                 // Large lift
        scale: "hover-scale-sm",               // Scale only
        glow: "hover-glow-primary",            // Glow effect
        // ✅ Motion-based hovers (for complex animations)
        motion: "",                            // Handled by Framer Motion
      },
      interactive: {
        none: "",
        clickable: "cursor-pointer",
        hoverable: "cursor-pointer",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "standard",
      interactive: "none",
    },
  }
);

interface CardProps
  extends Omit<HTMLMotionProps<"div">, 'variants'>,
    VariantProps<typeof cardVariants> {
  // ✅ NEW: Simplified motion props for motion-based animations only
  motionHover?: {
    scale?: number;
    y?: number;
    rotateY?: number;
    transition?: any;
  };
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, animation, interactive, motionHover, children, ...props }, ref) => {

    // ✅ STRATEGY: Only use Framer Motion for animation="motion"
    const useMotionHover = animation === "motion" && motionHover;

    const defaultMotionProps = useMotionHover ? {
      whileHover: {
        scale: motionHover?.scale || 1.02,
        y: motionHover?.y || -4,
        rotateY: motionHover?.rotateY || 0,
        ...motionHover
      },
      whileTap: interactive === 'clickable' ? { scale: 0.98 } : undefined,
      transition: motionHover?.transition || {
        type: "spring",
        stiffness: 300,
        damping: 30
      },
    } : {};

    // ✅ FIXED: Add active press feedback for CSS animations
    const pressClass = interactive === 'clickable' && animation !== 'motion'
      ? 'active:scale-95 transition-transform duration-150'
      : '';

    return (
      <m.div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, animation, interactive }),
          pressClass,
          className
        )}
        {...defaultMotionProps}
        {...props}
      >
        {children}
      </m.div>
    );
  }
);
Card.displayName = "Card";

// ✅ OPTIMIZED: Sub-components with consistent patterns
const CardHeader = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <m.div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, HTMLMotionProps<"h3">>(
  ({ className, ...props }, ref) => (
    <m.h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, HTMLMotionProps<"p">>(
  ({ className, ...props }, ref) => (
    <m.p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <m.div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <m.div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };

/* ============================================================================
   📋 Contoh Implmentasi:

   // ✅ CSS-based hovers (recommended - better performance)
   <Card animation="minimal">Subtle hover</Card>
   <Card animation="standard">Standard hover</Card>
   <Card animation="lift">Large lift hover</Card>
   <Card animation="scale">Scale hover</Card>
   <Card animation="glow">Glow hover</Card>

   // ✅ No hover effects
   <Card animation="none">Static card</Card>

   // ✅ Interactive variants
   <Card interactive="clickable" animation="standard">Clickable Card</Card>
   <Card interactive="hoverable" animation="minimal">Hoverable Card</Card>

   // ✅ Motion-based hovers (for complex animations)
   <Card
     animation="motion"
     motionHover={{
       scale: 1.05,
       y: -8,
       rotateY: 5,
       transition: { type: "spring", stiffness: 400 }
     }}
   >
     Complex Motion Card
   </Card>

   // ✅ Combined with content
   <Card animation="standard" interactive="clickable">
     <CardHeader>
       <CardTitle>Card Title</CardTitle>
       <CardDescription>Card description</CardDescription>
     </CardHeader>
     <CardContent>
       Card content goes here
     </CardContent>
   </Card>

   ============================================================================ */