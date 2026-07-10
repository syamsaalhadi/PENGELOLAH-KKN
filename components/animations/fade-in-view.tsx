"use client"

import { motion, useInView } from "framer-motion"
import { useRef, ReactNode } from "react"

export function FadeInView({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode
  delay?: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
