"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: "Custom Home Office",
    desc: "Bespoke desks, shelving and storage built to elevate your productivity and style.",
    img: "/images/service-office.jpg",
  },
  {
    title: "Modern Kitchens",
    desc: "Precision-crafted cabinetry and countertops that transform your kitchen into a masterpiece.",
    img: "/images/service-kitchen.jpg",
  },
  {
    title: "Built-in Bedroom Closets",
    desc: "Maximize space with custom wardrobes designed around your lifestyle and wardrobe needs.",
    img: "/images/service-closet.jpg",
  },
  {
    title: "Vanities",
    desc: "Elegant bathroom vanities that combine practicality with refined craftsmanship.",
    img: "/images/service-vanity.jpg",
  },
  {
    title: "Granite Top Installations",
    desc: "Professional installation of premium granite surfaces for kitchens and bathrooms.",
    img: "/images/service-granite.jpg",
  },
  {
    title: "Turnkey Projects",
    desc: "Complete renovation solutions from concept to completion, hassle-free.",
    img: "/images/service-turnkey.jpg",
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".service-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-grid",
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
      id="services"
      className="bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-accent uppercase">
            Our Services
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            Dedicated Experts In Woodworking Excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tailoring solutions to individual preferences with unmatched skill
            and attention to detail.
          </p>
        </div>

        <div className="services-grid mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group relative overflow-hidden rounded-2xl bg-card transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-all duration-500 group-hover:bg-foreground/20" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
