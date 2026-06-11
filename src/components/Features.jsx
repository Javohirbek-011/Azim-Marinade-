import { GiMeat, GiSaucepan } from 'react-icons/gi'
import { MdLocalShipping, MdVerified } from 'react-icons/md'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: GiMeat,
    title: "Yangi Go'sht",
    text: "Har kuni yangi, sifatli go'sht mahsulotlari yetkazib beriladi",
  },
  {
    icon: GiSaucepan,
    title: 'Maxsus Marinad',
    text: "O'ziga xos marinadlar bilan ajoyib ta'm va sifat",
  },
  {
    icon: MdLocalShipping,
    title: 'Tez Yetkazib Berish',
    text: "Farg'ona viloyati bo'ylab tez va ishonchli yetkazib berish",
  },
  {
    icon: MdVerified,
    title: 'Sifat Kafolati',
    text: 'Halol, toza va yuqori sifat bizning ustuvor vazifamiz',
  },
]

function FeatureCard({ icon: Icon, title, text, delay }) {
  const ref = useScrollReveal()
  return (
    <article className="feature-card scroll-reveal" ref={ref} style={{ transitionDelay: `${delay}ms` }}>
      <div className="feature-card__icon">
        <Icon aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

export default function Features() {
  const sectionRef = useScrollReveal()

  return (
    <section id="xizmatlar" className="features section">
      <div className="container">
        <div className="section-header scroll-reveal" ref={sectionRef}>
          <span className="section-label">XIZMATLARIMIZ</span>
          <h2>Nima Uchun Biz?</h2>
        </div>
        <div className="features__grid">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}
