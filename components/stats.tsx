"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "250+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Expert Craftspeople" },
]

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-primary py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-item flex flex-col items-center text-center"
          >
            <span className="font-serif text-4xl font-bold text-accent md:text-5xl">
              {stat.value}
            </span>
            <span className="mt-2 text-sm text-primary-foreground/70">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
