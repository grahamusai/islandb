"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    title: "Wardrobes",
    desc: "Beautifully crafted built-in wardrobes with sliding or hinged doors, tailored to your bedroom aesthetic.",
    img: "/images/product-wardrobes.jpg",
    tag: "Bedroom",
  },
  {
    title: "Walk-in Closets",
    desc: "Spacious, organized walk-in closet systems with custom shelving, drawers, and premium finishes.",
    img: "/images/product-walkin-closet.jpg",
    tag: "Storage",
  },
  {
    title: "Wooden Shelves",
    desc: "Floating and freestanding shelves in a variety of wood species to complement any living space.",
    img: "/images/product-shelves.jpg",
    tag: "Living",
  },
  {
    title: "Kitchen Cabinets",
    desc: "Premium kitchen cabinetry with soft-close mechanisms, handleless options, and durable finishes.",
    img: "/images/product-kitchen-cabinets.jpg",
    tag: "Kitchen",
  },
  {
    title: "TV Stands & Wall Units",
    desc: "Sleek entertainment units with integrated cable management and hidden storage solutions.",
    img: "/images/product-tv-unit.jpg",
    tag: "Living",
  },
  {
    title: "Interior Wooden Doors",
    desc: "Handcrafted interior doors with beautiful grain patterns and quality hardware fittings.",
    img: "/images/product-doors.jpg",
    tag: "Doors",
  },
  {
    title: "Quality Wood Supply",
    desc: "Source and supply of premium hardwood lumber including oak, walnut, cherry, and exotic species.",
    img: "/images/product-wood-supply.jpg",
    tag: "Materials",
  },
  {
    title: "Custom Kitchen Units & Boards",
    desc: "Bespoke kitchen islands, countertop boards, and modular units built to your exact specifications.",
    img: "/images/product-kitchen-units.jpg",
    tag: "Kitchen",
  },
  {
    title: "Custom Wood Design & Finishing",
    desc: "Expert design consultation, staining, lacquering, and hand-finishing for a flawless result every time.",
    img: "/images/product-wood-design.jpg",
    tag: "Finishing",
  },
]

const allTags = ["All", ...Array.from(new Set(products.map((p) => p.tag)))]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeTag, setActiveTag] = useState("All")

  const filtered =
    activeTag === "All"
      ? products
      : products.filter((p) => p.tag === activeTag)

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate cards when filter changes
  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll(".service-card")
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    )
  }, [activeTag])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-accent uppercase">
            Our Products
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            Dedicated Experts In Woodworking Excellence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tailoring solutions to individual preferences with unmatched skill
            and attention to detail.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeTag === tag
                  ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                  : "bg-card text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-sm"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((product) => (
            <div
              key={product.title}
              className="service-card group relative overflow-hidden rounded-2xl bg-card transition-all duration-500 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-all duration-500 group-hover:bg-foreground/20" />
                {/* Tag badge */}
                <div className="absolute top-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                  {product.tag}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {product.title}
                  </h3>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {product.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
