import { FiMapPin, FiPhone, FiClock } from 'react-icons/fi'
import { FaTelegramPlane } from 'react-icons/fa'
import { useScrollReveal } from '../hooks/useScrollReveal'

const infoCards = [
  {
    icon: FiMapPin,
    title: 'Manzil',
    text: "O'zbekiston, Farg'ona viloyati, Rishton tumani, Bo'jay qishlog'i",
  },
  {
    icon: FiPhone,
    title: 'Telefon',
    text: '+998 50 728 69 65',
    href: 'tel:+998507286965',
  },
  {
    icon: FaTelegramPlane,
    title: 'Telegram',
    text: '@DufaOps_Agent',
    href: 'https://t.me/DufaOps_Agent',
  },
  {
    icon: FiClock,
    title: 'Ish vaqti',
    text: 'Dushanba - Yakshanba: 08:00 - 22:00',
  },
]

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="aloqa" className="contact section">
      <div className="container contact__inner scroll-reveal" ref={ref}>
        <div className="contact__info">
          <span className="section-label">ALOQA</span>
          <h2>Biz Bilan Bog&apos;laning</h2>
          <div className="contact__cards">
            {infoCards.map(({ icon: Icon, title, text, href }) => (
              <div key={title} className="contact__card">
                <Icon className="contact__card-icon" aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                      {text}
                    </a>
                  ) : (
                    <p>{text}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="contact__map">
          <iframe
            title="Rishton tumani xaritasi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12180.5!2d71.2847!3d40.3561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb4b8b8b8b8b8b%3A0x0!2sRishton%20District%2C%20Fergana%20Region!5e0!3m2!1sen!2suz!4v1700000000000!5m2!1sen!2suz"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
