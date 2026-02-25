"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Phone, Mail } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-col",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} id="contact" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="footer-col lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <span className="font-serif text-lg font-bold text-accent-foreground">
                  IB
                </span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold leading-tight">
                  Island Boards
                </span>
                <span className="block text-xs tracking-widest text-primary-foreground/60 uppercase">
                  & Doors
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Elevating spaces with superior woodworking and construction
              solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="mb-4 text-sm font-semibold tracking-widest uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {["Home", "About", "Services", "Gallery", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-sm text-primary-foreground/70 transition-colors duration-300 hover:text-accent"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="mb-4 text-sm font-semibold tracking-widest uppercase">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                "Custom Home Office",
                "Modern Kitchens",
                "Built-in Closets",
                "Vanities",
                "Granite Tops",
                "Turnkey Projects",
              ].map((s) => (
                <li key={s}>
                  <span className="text-sm text-primary-foreground/70">
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3 className="mb-4 text-sm font-semibold tracking-widest uppercase">
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  Lot 52 Cinderella Road , Lochinvar , Southerton
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  +263 774 447 504
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm text-primary-foreground/70">
                  info@islandboards.co.zw
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/10 pt-8">
          <p className="text-center text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Island Boards & Doors. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
