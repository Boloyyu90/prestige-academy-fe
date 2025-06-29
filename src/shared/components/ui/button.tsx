import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils/cn"

const buttonVariants = cva(
  // ✅ FIXED: Remove hardcoded transition, add semantic focus
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-soft",
        secondary: "bg-secondary text-white shadow-soft",
        success: "bg-success text-white",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background",
        ghost: "",
        link: "text-primary underline-offset-4",
        gradient: "bg-gradient-hero text-white shadow-colored",
        shimmer: "btn-shimmer bg-primary text-primary-foreground",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        xl: "h-14 px-10",
        icon: "h-10 w-10",
      },

      animation: {
        none: "",
        primary: "btn-hover-primary",              // Lift + primary glow
        secondary: "btn-hover-secondary",          // Lift + secondary glow
        ghost: "btn-hover-ghost hover:bg-accent hover:text-accent-foreground",
        outline: "btn-hover-outline hover:bg-accent hover:text-accent-foreground",
        lift: "hover-lift-sm",                     // Simple lift
        scale: "hover-scale-sm active:scale-95",   // Scale + press feedback
        glow: "hover-glow-primary",                // Primary glow only
        bounce: "hover:animate-bounce-subtle",
        float: "animate-float",
        underline: "hover:underline",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "primary",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    // ✅ NEW: Auto-select appropriate animation based on variant
    const resolvedAnimation = animation || (
      variant === 'default' ? 'primary' :
        variant === 'secondary' ? 'secondary' :
          variant === 'ghost' ? 'ghost' :
            variant === 'outline' ? 'outline' :
              variant === 'link' ? 'underline' :
                'lift'
    );

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation: resolvedAnimation }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

/* ============================================================================
   📋 Contoh implementasi:

   // ✅ Auto-semantic hover based on variant
   <Button variant="default">Primary Hover</Button>        // btn-hover-primary
   <Button variant="secondary">Secondary Hover</Button>    // btn-hover-secondary
   <Button variant="ghost">Ghost Hover</Button>            // btn-hover-ghost
   <Button variant="outline">Outline Hover</Button>        // btn-hover-outline

   // ✅ Override specific animation
   <Button variant="default" animation="scale">Scale Only</Button>
   <Button variant="default" animation="lift">Lift Only</Button>
   <Button animation="none">No Hover</Button>

   // ✅ Continuous animations
   <Button animation="float">Floating Button</Button>
   <Button animation="bounce">Bouncing Button</Button>

   // ✅ Link buttons
   <Button variant="link" asChild>
     <Link href="/somewhere">Link Button</Link>
   </Button>

   ============================================================================ */