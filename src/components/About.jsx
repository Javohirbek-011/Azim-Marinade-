import { useScrollReveal } from '../hooks/useScrollReveal'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="biz-haqimizda" className="about section section--gray">
      <div className="container about__inner scroll-reveal" ref={ref}>
        <div className="about__text">
          <span className="section-label">BIZ HAQIMIZDA</span>
          <h2>AZIM Marinade Go&apos;sht Markazi</h2>
          
          <p>
            Maxsus retseptlar asosida tayyorlangan marinadlarimiz go&apos;shtga noyob ta&apos;m
            beradi. Oilaviy dasturxonlar, to&apos;ylar va restoranlar uchun ishonchli hamkoringiz.
          </p>
        </div>
        <div className="about__visual">
          <img src="/images/about-meat.jpg" alt="AZIM Marinade - yuqori sifatli marinadlangan go'sht mahsulotlari" className="about__image" loading="lazy" />
          <div className="about__badge">
            <span className="about__badge-num">100%</span>
            <span className="about__badge-text">Halol mahsulot</span>
          </div>
        </div>
      </div>
    </section>
  )
}
