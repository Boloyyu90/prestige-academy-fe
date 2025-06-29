import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils/cn"

const badgeVariants = cva(
  // ✅ FIXED: Remove hardcoded duration-300, remove transition-all
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // ✅ PRIMARY BRAND VARIANT
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",

        // ✅ SECONDARY BRAND VARIANT
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",

        // ✅ OUTLINE VARIANT
        outline: "border-2 border-border text-foreground bg-transparent hover:bg-muted",

        // ✅ PRIMARY SUBTLE
        "primary-subtle": "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",

        // ✅ SECONDARY SUBTLE
        "secondary-subtle": "border border-secondary/20 bg-secondary/10 text-secondary hover:bg-secondary/20",

        // ✅ STATUS VARIANTS
        success: "border-transparent bg-success text-white hover:bg-success/90",
        warning: "border-transparent bg-warning text-white hover:bg-warning/90",
        error: "border-transparent bg-error text-white hover:bg-error/90",
        info: "border-transparent bg-info text-white hover:bg-info/90",

        // ✅ SPECIAL VARIANTS
        gradient: "border-transparent bg-gradient-hero text-white hover:opacity-90",
        glass: "glass border-white/30 text-foreground backdrop-blur-sm",
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2.5 py-0.5 text-xs",
        default: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
        xl: "px-5 py-2 text-lg",
      },
      // ✅ ENHANCED: Semantic animation variants
      animation: {
        none: "",
        scale: "badge-hover-scale",           // ✅ NEW: Semantic scale hover
        glow: "badge-hover-glow",             // ✅ NEW: Semantic glow hover
        lift: "hover-lift-sm",                // ✅ NEW: Semantic lift hover
        pulse: "animate-pulse-soft",          // ✅ KEPT: Continuous animation
        bounce: "animate-bounce-subtle",      // ✅ KEPT: Continuous animation
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "scale",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  interactive?: boolean; // ✅ NEW: Option to disable hover effects
}

function Badge({ className, variant, size, animation, interactive = true, ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size, animation: interactive ? animation : "none" }),
        className
      )}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

/* ============================================================================
   📋 Contoh Implementasi:

   // ✅ Default - semantic scale hover
   <Badge>Default</Badge>

   // ✅ With glow effect for primary variant
   <Badge variant="default" animation="glow">Important</Badge>

   // ✅ Subtle lift hover
   <Badge variant="outline" animation="lift">Outline</Badge>

   // ✅ No hover effects
   <Badge animation="none">Static</Badge>
   <Badge interactive={false}>Static Alternative</Badge>

   // ✅ Continuous animations
   <Badge animation="pulse">Pulsing</Badge>
   <Badge animation="bounce">Bouncing</Badge>

   ============================================================================ */