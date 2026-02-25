import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { MarqueeBar } from "@/components/marquee-bar"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import { Stats } from "@/components/stats"
import { QuoteSection } from "@/components/quote-section"
import { Testimonials } from "@/components/testimonials"
import { Gallery } from "@/components/gallery"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBar />
      <About />
      <Services />
      <Stats />
      <QuoteSection />
      <Testimonials />
      <Gallery />
      <Footer />
    </main>
  )
}
