// Telegram botga ma'lumot yuborish
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function sendRegistrationToTelegram(userData) {
  try {
    const response = await fetch(`${API_URL}/api/register-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Telegramga yuborishda xato:', error)
    // Xatolik bo\'lsa ham ro\'yxatdan o\'tishni to\'xtatmaymiz
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
      body: JSON.stringify({ order: orderData }),
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Buyurtmani Telegramga yuborishda xato:', error)
    return { success: false, error: error.message }
  }
}
