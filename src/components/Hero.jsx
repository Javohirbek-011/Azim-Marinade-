import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const heroImages = [
  '/images/hero-bg.png',
  'https://images.unsplash.com/photo-1558030006-450675393462?w=1920&q=80', // Grilled meat
  'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1920&q=80', // BBQ steaks
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1920&q=80'  // Raw meat cuts
]

export default function Hero() {
  const revealRef = useScrollReveal()
  const [offset, setOffset] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="bosh-sahifa" className="hero">
      <div className="hero__slider">
        {heroImages.map((img, idx) => (
          <div 
            key={idx}
            className={`hero__bg ${idx === currentSlide ? 'hero__bg--active' : ''}`}
            style={{ 
              backgroundImage: `url(${img})`,
              transform: `translateY(${offset}px)`
            }} 
          />
        ))}
      </div>
      <div className="hero__overlay" />
      <div className="container hero__content scroll-reveal" ref={revealRef}>
        <p className="hero__tag animate-fade">Halol va sifatli go&apos;sht markazi</p>
        <h1 className="hero__title">
          <span className="hero__title-red animate-slide">AZIM MARINADE</span>
          <span className="hero__title-white animate-slide-delay">GO&apos;SHT MARKAZI</span>
        </h1>
        <p className="hero__subtitle">
          Yuqori sifatli, yangi va mazali marinadlangan go&apos;sht mahsulotlari.
          Sizning dasturxoningiz uchun eng yaxshi tanlov!
        </p>
        <div className="hero__actions">
          <a href="#mahsulotlar" className="btn btn--primary btn--lg">Mahsulotlarimiz</a>
          <a href="#aloqa" className="btn btn--outline-white btn--lg">Bog&apos;lanish</a>
        </div>
      </div>
    </section>
  )
}
