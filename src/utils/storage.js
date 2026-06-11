const KEYS = {
  users: 'azim_users',
  session: 'azim_session',
  cart: 'azim_cart',
  orders: 'azim_orders',
}

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.users)) || []
  } catch {
    return []
  }
}

export function saveUsers(users) {
  localStorage.setItem(KEYS.users, JSON.stringify(users))
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.session))
  } catch {
    return null
  }
}

export function saveSession(user) {
  if (user) localStorage.setItem(KEYS.session, JSON.stringify(user))
  else localStorage.removeItem(KEYS.session)
}

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.cart)) || []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  localStorage.setItem(KEYS.cart, JSON.stringify(cart))
}

export function getOrders() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.orders)) || []
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  localStorage.setItem(KEYS.orders, JSON.stringify(orders))
}
