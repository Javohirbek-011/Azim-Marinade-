import { useScrollReveal } from '../hooks/useScrollReveal'
import { useApp } from '../context/AppContext'

export default function OrderCTA() {
  const ref = useScrollReveal()
  const { openCheckout, openAuth } = useApp()

  return (
    <section id="buyurtma" className="order-cta section">
      <div className="container order-cta__inner scroll-reveal" ref={ref}>
        <h2>Buyurtma Berishga Tayyormisiz?</h2>
        <p>Hoziroq bog&apos;laning va mazali marinadlangan go&apos;sht buyurtma qiling!</p>
        <div className="order-cta__actions">
          <button type="button" className="btn btn--white btn--lg" onClick={openCheckout}>
            Hoziroq Buyurtma Qilish
          </button>
          <button type="button" className="btn btn--outline-white btn--lg" onClick={() => openAuth('register')}>
            Ro&apos;yxatdan o&apos;tish
          </button>
        </div>
      </div>
    </section>
  )
}
