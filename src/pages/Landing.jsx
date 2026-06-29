import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import ProductOverview from '../sections/ProductOverview'
import Features from '../sections/Features'
import Testimonials from '../sections/Testimonials'
import Pricing from '../sections/Pricing'
import FAQ from '../sections/FAQ'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Landing() {
  const location = useLocation()

  // Handle hash scrolling when navigating from another page
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ProductOverview />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
