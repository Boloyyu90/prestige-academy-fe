import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-white hover:bg-secondary/90",
        outline: "border-2 border-border text-foreground bg-transparent hover:bg-muted",
        "primary-subtle": "border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20",
        success: "border-transparent bg-success text-white hover:bg-success/90",
        error: "border-transparent bg-error text-white hover:bg-error/90",
      },
      size: {
        sm: "px-2.5 py-0.5 text-xs",
        default: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
      animation: {
        none: "",
        scale: "hover:scale-105",
        glow: "hover:shadow-colored",
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
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, animation, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, animation }), className)} {...props} />
  )
}

export { Badge, badgeVariants }