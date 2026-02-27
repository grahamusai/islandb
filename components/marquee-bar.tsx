"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const items = [
  "Wardrobes",
  "Walk-in Closets",
  "Wooden Shelves",
  "Kitchen Cabinets",
  "TV Stands & Wall Units",
  "Interior Wooden Doors",
  "Quality Wood Supply",
  "Custom Kitchen Units",
  "Wood Design & Finishing",
]

export function MarqueeBar() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const width = track.scrollWidth / 2

    gsap.to(track, {
      x: -width,
      duration: 30,
      ease: "none",
      repeat: -1,
    })
  }, [])

  return (
    <div className="overflow-hidden bg-accent py-3">
      <div ref={trackRef} className="flex w-max items-center gap-8">
        {[...items, ...items].map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="whitespace-nowrap text-sm font-semibold tracking-wider text-accent-foreground uppercase">
              {item}
            </span>
            <span className="text-accent-foreground/40" aria-hidden="true">
              &#x2022;
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
