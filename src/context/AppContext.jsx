import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { formatPrice } from '../utils/format'
import {
  getCart,
  getOrders,
  getSession,
  getUsers,
  saveCart,
  saveOrders,
  saveSession,
  saveUsers,
} from '../utils/storage'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [notifications, setNotifications] = useState([])
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' })
  const [cartOpen, setCartOpen] = useState(false)
  const [cartStep, setCartStep] = useState('cart')

  useEffect(() => {
    setUser(getSession())
    setCart(getCart())
  }, [])

  const closeCart = useCallback(() => {
    setCartOpen(false)
    setCartStep('cart')
  }, [])

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 4500)
  }, [])

  const openAuth = useCallback((tab = 'login') => {
    setAuthModal({ open: true, tab })
  }, [])

  const closeAuth = useCallback(() => {
    setAuthModal({ open: false, tab: 'login' })
  }, [])

  const register = useCallback((data) => {
    const users = getUsers()
    const exists = users.find((u) => u.phone === data.phone)
    if (exists) {
      addNotification("Bu telefon raqam allaqachon ro'yxatdan o'tgan!", 'error')
      return false
    }

    const newUser = {
      id: Date.now(),
      name: data.name.trim(),
      phone: data.phone.trim(),
      password: data.password,
      address: data.address?.trim() || '',
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    saveUsers(users)

    const session = { id: newUser.id, name: newUser.name, phone: newUser.phone, address: newUser.address }
    saveSession(session)
    setUser(session)
    closeAuth()
    addNotification(`Xush kelibsiz, ${newUser.name}! Ro'yxatdan muvaffaqiyatli o'tdingiz.`, 'success')
    return true
  }, [addNotification, closeAuth])

  const login = useCallback((phone, password) => {
    const users = getUsers()
    const found = users.find((u) => u.phone === phone.trim() && u.password === password)

    if (!found) {
      addNotification("Telefon yoki parol noto'g'ri!", 'error')
      return false
    }

    const session = { id: found.id, name: found.name, phone: found.phone, address: found.address }
    saveSession(session)
    setUser(session)
    closeAuth()
    addNotification(`Salom, ${found.name}! Tizimga muvaffaqiyatli kirdingiz.`, 'success')
    return true
  }, [addNotification, closeAuth])

  const logout = useCallback(() => {
    saveSession(null)
    setUser(null)
    addNotification("Tizimdan chiqdingiz.", 'info')
  }, [addNotification])

  const persistCart = useCallback((items) => {
    setCart(items)
    saveCart(items)
  }, [])

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      let updated
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        updated = [...prev, { ...product, quantity: 1 }]
      }
      saveCart(updated)
      return updated
    })
    addNotification(`${product.name} savatga qo'shildi!`, 'success')
  }, [addNotification])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id)
      saveCart(updated)
      return updated
    })
    addNotification("Mahsulot savatdan olib tashlandi.", 'info')
  }, [addNotification])

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
      saveCart(updated)
      return updated
    })
  }, [])

  const clearCart = useCallback(() => {
    persistCart([])
  }, [persistCart])

  const cartTotal = cart.reduce((sum, item) => sum + item.priceValue * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const placeOrder = useCallback((deliveryInfo) => {
    if (!user) {
      addNotification("Buyurtma berish uchun avval ro'yxatdan o'ting!", 'error')
      openAuth('register')
      return false
    }
    if (cart.length === 0) {
      addNotification("Savatingiz bo'sh! Avval mahsulot qo'shing.", 'error')
      return false
    }

    const order = {
      id: `AZM-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        priceValue: item.priceValue,
        quantity: item.quantity,
      })),
      total: cartTotal,
      address: deliveryInfo.address || user.address,
      note: deliveryInfo.note || '',
      payment: deliveryInfo.payment || 'naqd',
      status: 'yangi',
      createdAt: new Date().toISOString(),
    }

    const orders = getOrders()
    orders.unshift(order)
    saveOrders(orders)
    clearCart()

    addNotification(
      `Buyurtmangiz qabul qilindi! Buyurtma raqami: ${order.id}. Jami: ${formatPrice(order.total)}`,
      'success'
    )
    return order
  }, [user, cart, cartTotal, addNotification, openAuth, clearCart])

  const openCheckout = useCallback(() => {
    if (cart.length === 0) {
      addNotification("Savat bo'sh! Mahsulotlar bo'limidan tanlang.", 'info')
      document.getElementById('mahsulotlar')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setCartStep('checkout')
    setCartOpen(true)
  }, [cart.length, addNotification])

  const openCart = useCallback(() => {
    setCartStep('cart')
    setCartOpen(true)
  }, [])

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        cartTotal,
        cartCount,
        notifications,
        authModal,
        cartOpen,
        cartStep,
        setCartStep,
        register,
        login,
        logout,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        addNotification,
        openAuth,
        closeAuth,
        setCartOpen,
        closeCart,
        openCheckout,
        openCart,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
