import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - consistent with design system
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:flex-shrink-0",
  {
    variants: {
      variant: {
        // Primary button - brand colors with WCAG AA compliance
        default: [
          "text-white shadow-sm",
          "bg-[#2F89FC] hover:bg-[#1F6ED4]",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:bg-[#94C7FF] disabled:text-white",
        ],
        // Secondary/outline button
        outline: [
          "border border-gray-300 bg-white shadow-sm",
          "text-gray-700 hover:bg-gray-50 hover:border-gray-400",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:border-gray-200 disabled:text-gray-400 disabled:bg-gray-50",
        ],
        // Ghost button - minimal style
        ghost: [
          "text-gray-700 hover:bg-gray-100",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:text-gray-400",
        ],
        // Link style button
        link: [
          "text-[#2F89FC] underline-offset-4 hover:underline hover:text-[#1F6ED4]",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:text-gray-400 disabled:no-underline",
        ],
        // Destructive/danger button
        destructive: [
          "bg-red-600 text-white shadow-sm hover:bg-red-700",
          "focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
          "disabled:bg-red-300",
        ],
      },
      size: {
        // Small button - 36px height
        sm: [
          "h-9 px-3 text-sm rounded-lg",
          "[&_svg]:h-4 [&_svg]:w-4",
        ],
        // Default button - 44px height (WCAG minimum)
        default: [
          "h-11 px-6 text-base rounded-lg",
          "[&_svg]:h-5 [&_svg]:w-5",
        ],
        // Large button - 56px height
        lg: [
          "h-14 px-8 text-lg rounded-xl",
          "[&_svg]:h-6 [&_svg]:w-6",
        ],
        // Icon button - square
        icon: [
          "h-11 w-11 rounded-lg",
          "[&_svg]:h-5 [&_svg]:w-5",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
