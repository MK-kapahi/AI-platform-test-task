import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean
  "aria-required"?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedby,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    ...props 
  }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        whileFocusWithin={{
          scale: 1.01,
          transition: { duration: 0.15, ease: "easeOut" }
        }}
      >
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={ariaInvalid}
          aria-required={ariaRequired}
          {...props}
        />
      </motion.div>
    )
  }
)
Input.displayName = "Input"

export { Input }
