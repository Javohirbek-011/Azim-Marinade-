// Telegram xabarlarini server orqali yuborish (CORS muammosini hal qilish uchun)
// Production: Netlify functions, Development: Local server
const API_URL = import.meta.env.VITE_API_URL || ''

export async function sendRegistrationToTelegram(userData) {
  try {
    const response = await fetch(`${API_URL}/api/register-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    })
    
    const data = await response.json()
    
    if (data.success) {
      return { success: true }
    } else {
      console.error('Telegram xabar yuborishda xato:', data)
      return { success: false, error: data.error }
    }
  } catch (error) {
    console.error('Telegramga yuborishda xato:', error)
    return { success: false, error: error.message }
  }
}

export async function sendOrderToTelegram(orderData) {
  try {
    const response = await fetch(`${API_URL}/api/order-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order: orderData })
    })
    
    const data = await response.json()
    
    if (data.success) {
      return { success: true }
    } else {
      console.error('Buyurtma yuborishda xato:', data)
      return { success: false, error: data.error }
    }
  } catch (error) {
    console.error('Buyurtmani Telegramga yuborishda xato:', error)
    return { success: false, error: error.message }
  }
}

