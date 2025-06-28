'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { m, HTMLMotionProps } from 'framer-motion';
import { cn } from "@/shared/lib/utils/cn";

const cardVariants = cva(
  "rounded-5xl border bg-card text-card-foreground shadow-soft gpu-accelerated transition-all duration-fast ease-smooth",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        outline: "border-2 border-primary/20",
        ghost: "border-transparent shadow-none bg-transparent",
        filled: "border-transparent bg-muted/50",
        gradient: "border-0 bg-gradient-to-br from-primary/5 to-secondary/5",
        glass: "bg-background/50 backdrop-blur-xl border border-border/50",
        elevated: "shadow-medium hover:shadow-large border-border/50",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      animation: {
        none: "",
        hover: "hover:shadow-medium hover:-translate-y-1",
        scale: "hover:scale-105",
        lift: "hover:shadow-large hover:-translate-y-2",
        glow: "hover:shadow-colored",
        interactive: "", // Will be handled by motion props
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
      animation: "hover",
      interactive: "none",
    },
  }
);

interface CardProps
  extends Omit<HTMLMotionProps<"div">, 'variants'>,
    VariantProps<typeof cardVariants> {
  motionProps?: {
    whileHover?: any;
    whileTap?: any;
    initial?: any;
    animate?: any;
    exit?: any;
  };
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, animation, interactive, motionProps, children, ...props }, ref) => {

    // ✅ SELARAS: Semantic motion props with CSS variables timing
    const defaultMotionProps = {
      whileHover: interactive !== 'none' ? {
        scale: animation === 'scale' ? 1.02 : 1.0,
        y: animation === 'hover' || animation === 'lift' ? -4 : 0,
        transition: {
          duration: 0.35, // semantic fast duration
          ease: [0.25, 0.46, 0.45, 0.94] // semantic smooth easing
        }
      } : undefined,

      whileTap: interactive === 'clickable' ? {
        scale: 0.98,
        transition: {
          duration: 0.15, // semantic instant duration
          ease: [0.4, 0, 0.2, 1] // semantic sharp easing
        }
      } : undefined,

      ...motionProps
    };

    return (
      <m.div
        ref={ref}
        className={cn(cardVariants({ variant, size, animation, interactive }), className)}
        {...defaultMotionProps}
        {...props}
      >
        {children}
      </m.div>
    );
  }
);
Card.displayName = "Card";

// ✅ SELARAS: Sub-components dengan consistent timing
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