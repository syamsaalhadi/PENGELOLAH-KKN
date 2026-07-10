"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AnimatedProgress({ value }: { value: number }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 100)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  )
}
