"use client"

import { motion, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

export function CountUp({ value, duration = 1 }: { value: number; duration?: number }) {
  const spring = useSpring(0, { duration: duration * 1000 })
  const display = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <motion.span>{display}</motion.span>
}
