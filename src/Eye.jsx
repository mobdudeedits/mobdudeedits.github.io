import { createContext, useContext, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'

const MouseXContext = createContext(null)

export function MouseTracker({ children }) {
  const mouseX = useMotionValue(0.5)

  useEffect(() => {
    const handler = (e) => mouseX.set(e.clientX / window.innerWidth)
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [mouseX])

  return <MouseXContext.Provider value={mouseX}>{children}</MouseXContext.Provider>
}

/**
 * A pill with a pupil that tracks the cursor left/right — the "eye" motif,
 * stands in for a round letter (the "O" in ABOUT/PROJECTS/CONTACT) or as a
 * standalone accent.
 */
export function Eye({ className = '', travel = 12 }) {
  const mouseX = useContext(MouseXContext)
  const rawX = useTransform(mouseX, [0, 1], [-travel, travel])
  const x = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.4 })

  return (
    <span className={`eye ${className}`}>
      <motion.span className="eye-pupil" style={{ x }} />
    </span>
  )
}
