"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(
        badgeRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          headingRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          btnRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          imageRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 opacity-0">
        <Image
          src="/images/hero-woodworker.jpg"
          alt="Professional woodworker crafting in a workshop"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-32 text-center lg:px-8">
        <div
          ref={badgeRef}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          Innovative Designs, Lasting Solutions
        </div>

        <h1
          ref={headingRef}
          className="max-w-4xl font-serif text-5xl font-bold leading-tight tracking-tight text-primary-foreground md:text-7xl lg:text-8xl text-balance"
        >
          Elevate your space with{" "}
          <span className="text-accent italic">superior</span> craft.
        </h1>

        <p
          ref={subRef}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl"
        >
          Explore the pinnacle of woodworking excellence, delivering durability,
          style and unmatched quality in every project.
        </p>

        <div ref={btnRef} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            Explore Services
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-8 py-3.5 text-base font-semibold text-primary-foreground backdrop-blur-sm transition-all duration-300 hover:bg-primary-foreground/20"
          >
            Learn More
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-primary-foreground/60" />
        </div>
      </div>
    </section>
  )
}
