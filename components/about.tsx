"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
  "Superior quality in every detail",
  "Tailoring solutions to individual preferences",
  "Experienced professionals at your service",
  "Ensuring complete satisfaction with every project",
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Stagger feature items
      gsap.fromTo(
        ".about-feature",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about-features",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="overflow-hidden py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        {/* Image */}
        <div ref={imageRef} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/about-kitchen.jpg"
              alt="Modern kitchen with custom wooden cabinets"
              fill
              className="object-cover"
            />
          </div>
          {/* Floating stat card */}
          <div className="absolute -right-4 -bottom-4 rounded-xl border border-border bg-card p-5 shadow-xl lg:-right-8 lg:-bottom-8">
            <p className="font-serif text-4xl font-bold text-accent">15+</p>
            <p className="text-sm text-muted-foreground">Years of Excellence</p>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col justify-center">
          <span className="mb-3 text-sm font-semibold tracking-widest text-accent uppercase">
            About us
          </span>
          <h2 className="font-serif text-3xl font-bold leading-tight text-foreground md:text-5xl text-balance">
            Transform Your Space with Exceptional Solutions
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Crafting exceptional spaces with quality, style, and precision in
            every personalized home project. Unveiling elegance and durability
            that redefines your living and working environments.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            At Island Boards & Doors, we blend artistry with functionality to
            create outstanding woodwork and construction solutions. Our passion
            drives every project&apos;s success.
          </p>

          <div className="about-features mt-8 flex flex-col gap-3">
            {features.map((f) => (
              <div key={f} className="about-feature flex items-center gap-3">
                <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-foreground">{f}</span>
              </div>
            ))}
          </div>

          <a
            href="#quote"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" })
            }}
            className="mt-8 w-fit rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:opacity-90 hover:shadow-lg"
          >
            Get A Quote
          </a>
        </div>
      </div>
    </section>
  )
}
