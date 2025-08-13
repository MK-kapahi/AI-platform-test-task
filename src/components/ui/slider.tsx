"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    "aria-label"?: string
    "aria-describedby"?: string
    "aria-valuetext"?: string
  }
>(({ 
  className, 
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
  "aria-valuetext": ariaValuetext,
  ...props 
}, ref) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-valuetext={ariaValuetext}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((props.value?.[0] || 0) / (props.max || 100)) * 100}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb asChild>
        <motion.div
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          whileFocus={{ 
            scale: 1.05,
            transition: { duration: 0.15, ease: "easeOut" }
          }}
          whileTap={{ 
            scale: 0.95,
            transition: { duration: 0.1, ease: "easeIn" }
          }}
        />
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  </motion.div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
