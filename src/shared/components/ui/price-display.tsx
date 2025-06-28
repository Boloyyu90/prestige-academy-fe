import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { m, AnimatePresence } from 'framer-motion'
import { cn } from "@/shared/lib/utils/cn"
import { Text } from "@/shared/core/typography"

const priceDisplayVariants = cva(
  "font-bold tabular-nums gpu-accelerated transition-all duration-fast ease-smooth",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        muted: "text-muted-foreground",
      },
      size: {
        sm: "text-lg",
        default: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
      },
      animation: {
        none: "",
        scale: "hover:scale-105",
        pulse: "animate-pulse-soft",
        bounce: "hover:animate-bounce-subtle",
        countUp: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "scale",
    },
  }
)

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceDisplayVariants> {
  price: number
  currency?: string
  locale?: string
  showDecimals?: boolean
  originalPrice?: number
  animateChange?: boolean
}

const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  ({
     className,
     variant,
     size,
     animation,
     price,
     currency: currencySymbol = "Rp",
     locale = "id-ID",
     showDecimals = false,
     originalPrice,
     animateChange = true,
     ...props
   }, ref) => {
    const [displayPrice, setDisplayPrice] = React.useState(price)
    const [isChanging, setIsChanging] = React.useState(false)

    const formatPrice = (amount: number) => {
      if (amount === 0) return "GRATIS"

      const options: Intl.NumberFormatOptions = {
        style: 'decimal',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
      }

      return new Intl.NumberFormat(locale, options).format(amount)
    }

    // ✅ SELARAS: Animate price changes dengan semantic timing
    React.useEffect(() => {
      if (animateChange && price !== displayPrice) {
        setIsChanging(true)
        const timer = setTimeout(() => {
          setDisplayPrice(price)
          setIsChanging(false)
        }, 150) // Using semantic fast duration

        return () => clearTimeout(timer)
      } else {
        setDisplayPrice(price)
      }
    }, [price, displayPrice, animateChange])

    return (
      <div
        ref={ref}
        className="flex items-baseline gap-2"
        {...props}
      >
        {/* Currency Symbol */}
        {price > 0 && (
          <Text size="sm" variant="muted" className="font-medium">
            {currencySymbol}
          </Text>
        )}

        {/* Main Price with Animation */}
        <AnimatePresence mode="wait">
          <m.span
            key={displayPrice}
            className={cn(
              priceDisplayVariants({ variant, size, animation }),
              className,
              isChanging && "opacity-75"
            )}
            initial={animation === "countUp" ? { opacity: 0, y: 10 } : { opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={animation === "countUp" ? { opacity: 0, y: -10 } : { opacity: 1 }}
            transition={{
              duration: 0.35, // semantic fast duration
              ease: [0.25, 0.46, 0.45, 0.94] // semantic smooth easing
            }}
          >
            {formatPrice(displayPrice)}
          </m.span>
        </AnimatePresence>

        {/* Original Price (Strikethrough) */}
        {originalPrice && originalPrice > price && (
          <m.span
            className={cn(
              priceDisplayVariants({ variant: "muted", size: "sm" }),
              "line-through"
            )}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {currencySymbol && `${currencySymbol} `}{formatPrice(originalPrice)}
          </m.span>
        )}
      </div>
    )
  }
)
PriceDisplay.displayName = "PriceDisplay"

export { PriceDisplay, priceDisplayVariants }