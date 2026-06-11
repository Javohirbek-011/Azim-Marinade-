import { useEffect, useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { IoCart } from 'react-icons/io5'
import { FiUser, FiLogOut } from 'react-icons/fi'
import Logo from './Logo'
import { navLinks } from '../data/products'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, cartCount, openCart, openAuth, logout } = useApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <div className="navbar__brand">
          <Logo onClick={closeMenu} />
        </div>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`} aria-label="Asosiy navigatsiya">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-actions">
            {user ? (
              <button type="button" className="btn btn--outline-dark btn--full" onClick={() => { logout(); closeMenu() }}>
                <FiLogOut /> Chiqish
              </button>
            ) : (
              <button type="button" className="btn btn--outline-dark btn--full" onClick={() => { openAuth('register'); closeMenu() }}>
                Ro&apos;yxatdan o&apos;tish
              </button>
            )}
          </div>
        </nav>

        <div className="navbar__actions">
          <button type="button" className="navbar__icon-btn" onClick={openCart} aria-label="Savat">
            <IoCart />
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </button>

          {user ? (
            <div className="navbar__user">
              <FiUser aria-hidden="true" />
              <span>{user.name.split(' ')[0]}</span>
              <button type="button" onClick={logout} aria-label="Chiqish" className="navbar__logout">
                <FiLogOut />
              </button>
            </div>
          ) : (
            <button type="button" className="btn btn--outline-dark btn--sm navbar__login" onClick={() => openAuth('login')}>
              Kirish
            </button>
          )}
        </div>

        <div className="navbar__mobile-bar">
          <button type="button" className="navbar__icon-btn navbar__icon-btn--mobile" onClick={openCart} aria-label="Savat">
            <IoCart />
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </button>
          <button
            type="button"
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>
      {menuOpen && <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />}
    </header>
  )
}
