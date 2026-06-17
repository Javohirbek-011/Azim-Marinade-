import { useState } from 'react'
import { IoCart, IoClose, IoAdd, IoRemove, IoTrash, IoArrowBack, IoCheckmarkCircle } from 'react-icons/io5'
import { FiMapPin, FiCreditCard, FiMessageSquare } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { formatPrice } from '../utils/format'

export default function CartDrawer() {
  const {
    cart,
    cartTotal,
    cartCount,
    cartOpen,
    cartStep,
    setCartStep,
    closeCart,
    removeFromCart,
    updateQuantity,
    user,
    openAuth,
    placeOrder,
  } = useApp()

  const [lastOrderId, setLastOrderId] = useState(null)

  if (!cartOpen) return null

  const handleClose = () => {
    setLastOrderId(null)
    closeCart()
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      closeCart()
      openAuth('register')
      return
    }

    const fd = new FormData(e.target)
    const order = placeOrder({
      address: fd.get('address'),
      note: fd.get('note'),
      payment: fd.get('payment'),
    })

    if (order) {
      setLastOrderId(order.id)
      setCartStep('success')
      e.target.reset()
    }
  }

  const titles = {
    cart: `Savat (${cartCount})`,
    checkout: 'Buyurtma berish',
    success: 'Buyurtma qabul qilindi',
  }

  return (
    <>
      <div className="drawer-overlay" onClick={handleClose} aria-hidden="true" />
      <aside className="cart-drawer" aria-label="Savat va buyurtma">
        <div className="cart-drawer__header">
          {cartStep !== 'cart' && cartStep !== 'success' && (
            <button type="button" className="cart-drawer__back" onClick={() => setCartStep('cart')} aria-label="Orqaga">
              <IoArrowBack />
            </button>
          )}
          <h2>
            {cartStep === 'cart' && <IoCart aria-hidden="true" />}
            {titles[cartStep]}
          </h2>
          <button type="button" onClick={handleClose} aria-label="Yopish">
            <IoClose />
          </button>
        </div>

        {/* ——— SAVAT ——— */}
        {cartStep === 'cart' && (
          <>
            {cart.length === 0 ? (
              <div className="cart-drawer__empty">
                <IoCart aria-hidden="true" />
                <p>Savat bo&apos;sh</p>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => {
                    handleClose()
                    document.getElementById('mahsulotlar')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Mahsulotlarni ko&apos;rish
                </button>
              </div>
            ) : (
              <>
                <ul className="cart-drawer__list">
                  {cart.map((item) => (
                    <li key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item__info">
                        <strong>{item.name}</strong>
                        <span>{item.weight || '1 kg'}</span>
                        <span className="cart-item__price">{formatPrice(item.priceValue * item.quantity)}</span>
                      </div>
                      <div className="cart-item__actions">
                        <div className="qty-control">
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Kamaytirish">
                            <IoRemove />
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Ko'paytirish">
                            <IoAdd />
                          </button>
                        </div>
                        <button type="button" className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="O'chirish">
                          <IoTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="cart-drawer__footer">
                  <div className="cart-drawer__total">
                    <span>Jami:</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>
                  <p className="cart-drawer__delivery">Yetkazib berish: Rishton tumani bo&apos;ylab bepul</p>
                  {!user && (
                    <p className="cart-drawer__hint">Buyurtma berish uchun ro&apos;yxatdan o&apos;ting</p>
                  )}
                  <button
                    type="button"
                    className="btn btn--primary btn--full"
                    onClick={() => {
                      if (!user) {
                        closeCart()
                        openAuth('register')
                      } else {
                        setCartStep('checkout')
                      }
                    }}
                  >
                    {user ? 'Buyurtma berish' : "Ro'yxatdan o'tish"}
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* ——— CHECKOUT ——— */}
        {cartStep === 'checkout' && cart.length > 0 && (
          <form className="cart-drawer__checkout" onSubmit={handleCheckoutSubmit}>
            <div className="cart-drawer__checkout-body">
              <p className="cart-drawer__user">
                Salom, <strong>{user?.name}</strong> ({user?.phone})
              </p>

              <div className="cart-drawer__mini-summary">
                {cart.map((item) => (
                  <div key={item.id} className="cart-drawer__mini-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.priceValue * item.quantity)}</span>
                  </div>
                ))}
                <div className="cart-drawer__mini-total">
                  <span>Jami:</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
              </div>

              <label className="form-field">
                <FiMapPin aria-hidden="true" />
                <input
                  type="text"
                  name="address"
                  placeholder="Yetkazib berish manzili"
                  defaultValue={user?.address || ''}
                  required
                />
              </label>

              <label className="form-field form-field--textarea">
                <FiMessageSquare aria-hidden="true" />
                <textarea name="note" placeholder="Qo'shimcha izoh (ixtiyoriy)" rows={2} />
              </label>

              <fieldset className="checkout__payment checkout__payment--compact">
                <legend><FiCreditCard aria-hidden="true" /> To&apos;lov usuli</legend>
                <label className="radio-field">
                  <input type="radio" name="payment" value="naqd" defaultChecked />
                  <span>Naqd pul</span>
                </label>
                <label className="radio-field">
                  <input type="radio" name="payment" value="karta" />
                  <span>Bank kartasi</span>
                </label>
                <label className="radio-field">
                  <input type="radio" name="payment" value="click" />
                  <span>Click / Payme</span>
                </label>
              </fieldset>
            </div>

            <div className="cart-drawer__footer">
              <button type="submit" className="btn btn--primary btn--full btn--lg">
                Tasdiqlash — {formatPrice(cartTotal)}
              </button>
            </div>
          </form>
        )}

        {/* ——— MUVAFFAQIYAT ——— */}
        {cartStep === 'success' && (
          <div className="cart-drawer__success">
            <IoCheckmarkCircle aria-hidden="true" />
            <h3>Rahmat!</h3>
            <p>Buyurtmangiz muvaffaqiyatli qabul qilindi.</p>
            {lastOrderId && (
              <p className="cart-drawer__order-id">
                Buyurtma raqami: <strong>{lastOrderId}</strong>
              </p>
            )}
            <p className="cart-drawer__success-note">Tez orada siz bilan bog&apos;lanamiz.</p>
            <button type="button" className="btn btn--primary btn--full" onClick={handleClose}>
              Yopish
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
