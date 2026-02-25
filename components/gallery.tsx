"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { X } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const images = [
  { src: "/images/gallery-1.jpg", alt: "Custom wooden front door installation" },
  { src: "/images/service-kitchen.jpg", alt: "Modern kitchen with custom cabinetry" },
  { src: "/images/gallery-2.jpg", alt: "Custom entertainment center" },
  { src: "/images/gallery-3.jpg", alt: "Custom wooden staircase" },
  { src: "/images/service-closet.jpg", alt: "Built-in bedroom closet" },
  { src: "/images/gallery-4.jpg", alt: "Outdoor wooden deck" },
]

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".gallery-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightbox])

  return (
    <>
      <section ref={sectionRef} id="gallery" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-accent uppercase">
              Portfolio
            </span>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
              View Our Work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Browse through our portfolio of completed projects and see the
              quality we deliver.
            </p>
          </div>

          <div className="gallery-grid mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setLightbox(i)}
                className={`gallery-item group relative overflow-hidden rounded-2xl ${
                  i === 0 ? "sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    i === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-all duration-500 group-hover:bg-foreground/30">
                    <span className="translate-y-4 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      View
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightbox].src}
              alt={images[lightbox].alt}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  )
}
