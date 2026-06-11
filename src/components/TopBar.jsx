import { FiPhone, FiMapPin } from 'react-icons/fi'
import { FaInstagram, FaTelegramPlane, FaFacebookF } from 'react-icons/fa'
import { useApp } from '../context/AppContext'

export default function TopBar() {
  const { openCheckout } = useApp()

  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <a href="tel:+998507286965" className="topbar__item">
            <FiPhone aria-hidden="true" />
            <span>+998 50 728 69 65</span>
          </a>
          <span className="topbar__item topbar__item--location">
            <FiMapPin aria-hidden="true" />
            <span>O&apos;zbekiston, Farg&apos;ona viloyati, Rishton tumani, Bo&apos;jay qishlog&apos;i</span>
          </span>
        </div>
        <div className="topbar__right">
          <div className="topbar__socials">
            <a href="#" aria-label="Instagram" className="topbar__social"><FaInstagram /></a>
            <a href="#" aria-label="Telegram" className="topbar__social"><FaTelegramPlane /></a>
            <a href="#" aria-label="Facebook" className="topbar__social"><FaFacebookF /></a>
          </div>
          <button type="button" className="btn btn--sm btn--primary" onClick={openCheckout}>
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  )
}
