import { FaInstagram, FaTelegramPlane, FaFacebookF } from 'react-icons/fa'
import Logo from './Logo'

const quickLinks = [
  { href: '#bosh-sahifa', label: 'Bosh sahifa' },
  { href: '#mahsulotlar', label: 'Mahsulotlar' },
  { href: '#galereya', label: 'Galereya' },
  { href: '#aloqa', label: 'Aloqa' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size="sm" />
          <p>
            Yuqori sifatli marinadlangan go&apos;sht mahsulotlari.
            Farg&apos;ona viloyati bo&apos;ylab ishonchli yetkazib berish.
          </p>
        </div>

        <nav className="footer__links" aria-label="Tezkor havolalar">
          <h3>Tezkor havolalar</h3>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__social">
          <h3>Ijtimoiy tarmoqlar</h3>
          <div className="footer__social-icons">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; 2025 AZIM Marinade Go&apos;sht Markazi. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  )
}
