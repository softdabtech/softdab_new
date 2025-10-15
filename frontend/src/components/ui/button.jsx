import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - consistent with design system
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:flex-shrink-0",
  {
    variants: {
      variant: {
        // Primary button - brand colors
        default: [
          "text-white",
          "bg-[#2F89FC]",
          "hover:scale-[1.02] hover:underline hover:text-white underline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:bg-[#94C7FF] disabled:text-white disabled:no-underline disabled:transform-none",
        ],
        // Secondary/outline button
        outline: [
          "border border-[#2F89FC] bg-white",
          "text-[#2F89FC]",
          "hover:scale-[1.02] hover:underline underline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:border-gray-200 disabled:text-gray-400 disabled:no-underline disabled:transform-none",
        ],
        // Ghost button - minimal style
        ghost: [
          "text-gray-700",
          "hover:scale-[1.02] hover:underline underline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:text-gray-400 disabled:no-underline disabled:transform-none",
        ],
        // Link style button
        link: [
          "text-[#2F89FC]",
          "hover:scale-[1.02] hover:underline underline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-[#2F89FC] focus-visible:ring-offset-2",
          "disabled:text-gray-400 disabled:no-underline disabled:transform-none",
        ],
        // Destructive/danger button
        destructive: [
          "bg-red-600 text-white",
          "hover:scale-[1.02] hover:underline underline-offset-2",
          "focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2",
          "disabled:bg-red-300 disabled:no-underline disabled:transform-none",
        ],
      },
      size: {
        // Small button - 32px height
        sm: [
          "h-8 px-3 text-sm rounded-lg",
          "[&_svg]:h-4 [&_svg]:w-4",
        ],
        // Default button - 40px height
        default: [
          "h-10 px-5 text-base rounded-lg",
          "[&_svg]:h-5 [&_svg]:w-5",
        ],
        // Large button - 48px height
        lg: [
          "h-12 px-6 text-lg rounded-lg",
          "[&_svg]:h-5 [&_svg]:w-5",
        ],
        // Icon button - square
        icon: [
          "h-10 w-10 rounded-lg",
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
