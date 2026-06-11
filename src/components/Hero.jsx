import { useEffect, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Hero() {
  const revealRef = useScrollReveal()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.35)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="bosh-sahifa" className="hero">
      <div className="hero__bg" style={{ transform: `translateY(${offset}px)` }} />
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
