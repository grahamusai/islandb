"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    name: "Munashe",
    text: "Ben and his team did an incredible job with our home renovation. They built custom doors, trim, and molding that transformed the entire look of our home. The attention to detail and craftsmanship are amazing. We're thrilled with the results and will definitely use their services again!",
    role: "Homeowner",
  },
  {
    name: "Tafadzwa",
    text: "The quality of work from this carpentry business is top-notch. We had custom shelving installed in our office, and it's exactly what we needed. The team was punctual, communicated well, and the final product looks fantastic. Highly recommend them for any carpentry needs!",
    role: "Business Owner",
  },
  {
    name: "Simpiwe",
    text: "We hired this company to build a deck in our backyard, and the results are phenomenal. The team was professional, worked efficiently, and the final product is solid and beautifully finished. They turned our outdoor space into a place we love to spend time in. Thank you!",
    role: "Homeowner",
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
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

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      )
    }
  }, [active])

  const next = () => setActive((p) => (p + 1) % testimonials.length)
  const prev = () =>
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <section
      ref={sectionRef}
      className="bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-accent uppercase">
            Testimonials
          </span>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-5xl text-balance">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-16">
          <div
            ref={cardRef}
            key={active}
            className="relative rounded-2xl bg-card p-8 shadow-lg md:p-12"
          >
            <Quote className="mb-6 h-10 w-10 text-accent/30" />
            <p className="text-lg leading-relaxed text-foreground md:text-xl">
              {testimonials[active].text}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-accent-foreground">
                {testimonials[active].name[0]}
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {testimonials[active].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[active].role}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-accent" : "w-2.5 bg-border"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
