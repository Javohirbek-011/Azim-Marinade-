import { IoClose } from 'react-icons/io5'
import { FiUser, FiPhone, FiLock, FiMapPin, FiMail } from 'react-icons/fi'
import { useApp } from '../context/AppContext'

export default function AuthModal() {
  const { authModal, closeAuth, openAuth, login, register, addNotification } = useApp()

  if (!authModal.open) return null

  const switchTab = (newTab) => openAuth(newTab)

  const handleLogin = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    login(fd.get('phone'), fd.get('password'))
  }

  const handleRegister = (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    if (fd.get('password') !== fd.get('confirm')) {
      addNotification("Parollar mos kelmadi!", 'error')
      return
    }
    register({
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      password: fd.get('password'),
      address: fd.get('address'),
    })
  }

  const activeTab = authModal.tab

  return (
    <div className="modal-overlay" onClick={closeAuth}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button type="button" className="modal__close" onClick={closeAuth} aria-label="Yopish">
          <IoClose />
        </button>

        <div className="auth-modal__tabs">
          <button
            type="button"
            className={`auth-modal__tab ${activeTab === 'login' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => switchTab('login')}
          >
            Kirish
          </button>
          <button
            type="button"
            className={`auth-modal__tab ${activeTab === 'register' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => switchTab('register')}
          >
            Ro&apos;yxatdan o&apos;tish
          </button>
        </div>

        {activeTab === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h2>Tizimga kirish</h2>
            <p className="auth-form__sub">Buyurtma berish uchun hisobingizga kiring</p>

            <label className="form-field">
              <FiPhone aria-hidden="true" />
              <input type="tel" name="phone" placeholder="+998 90 123 45 67" required />
            </label>

            <label className="form-field">
              <FiLock aria-hidden="true" />
              <input type="password" name="password" placeholder="Parol" required minLength={4} />
            </label>

            <button type="submit" className="btn btn--primary btn--full">Kirish</button>

            <p className="auth-form__switch">
              Hisobingiz yo&apos;qmi?{' '}
              <button type="button" onClick={() => switchTab('register')}>Ro&apos;yxatdan o&apos;ting</button>
            </p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <h2>Ro&apos;yxatdan o&apos;tish</h2>
            <p className="auth-form__sub">Yangi hisob yarating va buyurtma bering</p>

            <label className="form-field">
              <FiUser aria-hidden="true" />
              <input type="text" name="name" placeholder="Ism familiya" required />
            </label>

            <label className="form-field">
              <FiMail aria-hidden="true" />
              <input type="email" name="email" placeholder="Email (ixtiyoriy)" />
            </label>

            <label className="form-field">
              <FiPhone aria-hidden="true" />
              <input type="tel" name="phone" placeholder="+998 90 123 45 67" required />
            </label>

            <label className="form-field">
              <FiMapPin aria-hidden="true" />
              <input type="text" name="address" placeholder="Manzil (ixtiyoriy)" />
            </label>

            <label className="form-field">
              <FiLock aria-hidden="true" />
              <input type="password" name="password" placeholder="Parol" required minLength={4} />
            </label>

            <label className="form-field">
              <FiLock aria-hidden="true" />
              <input type="password" name="confirm" placeholder="Parolni tasdiqlang" required minLength={4} />
            </label>

            <button type="submit" className="btn btn--primary btn--full">Ro&apos;yxatdan o&apos;tish</button>

            <p className="auth-form__switch">
              Hisobingiz bormi?{' '}
              <button type="button" onClick={() => switchTab('login')}>Kirish</button>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
