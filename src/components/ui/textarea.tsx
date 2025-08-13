import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  "aria-label"?: string
  "aria-describedby"?: string
  "aria-invalid"?: boolean
  "aria-required"?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className,
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
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea"

export { Textarea }
