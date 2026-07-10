"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { forwardRef, ComponentProps } from "react"

type AnimatedCardProps = ComponentProps<typeof Card>

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ 
          y: -8, 
          boxShadow: "0 20px 40px rgba(124, 58, 237, 0.15)" 
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Card ref={ref} className={className} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  }
)
AnimatedCard.displayName = "AnimatedCard"
