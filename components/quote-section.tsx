"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section ref={sectionRef} id="quote" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={formRef}
          className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center md:px-16 md:py-24"
        >
          {/* Decorative shapes */}
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent/10" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/5" />

          <div className="relative z-10">
            <span className="mb-3 inline-block text-sm font-semibold tracking-widest text-accent uppercase">
              Get Started
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary-foreground md:text-5xl text-balance">
              Get Your Custom Quote Today
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-primary-foreground/70">
              Receive a personalized estimate tailored to your specific project
              requirements and design preferences.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-6 py-3.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 backdrop-blur-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
              >
                <Send className="h-4 w-4" />
                {submitted ? "Sent!" : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
