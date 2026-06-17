import { useCounter } from '../hooks/useCounter'
import { useScrollReveal } from '../hooks/useScrollReveal'

function StatItem({ value, label }) {
  const { ref, display } = useCounter(value)

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-item__value">{display}</span>
      <span className="stat-item__label">{label}</span>
    </div>
  )
}

export default function Stats() {
  const ref = useScrollReveal()

  return (
    <section className="stats section">
      <div className="container">
        <h2 className="stats__title scroll-reveal" ref={ref}>Nega Bizni Tanladilar?</h2>
        <div className="stats__grid">
          <StatItem value="500+" label="Mamnun mijozlar" />
          <StatItem value="19+" label="Mahsulot turlari" />
          <StatItem value="100%" label="Halol va sifatli" />
        </div>
      </div>
    </section>
  )
}
