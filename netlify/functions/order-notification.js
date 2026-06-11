import axios from 'axios'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function handler(event) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }

  // OPTIONS so'rovi uchun
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  // Faqat POST so'rovlarni qabul qilish
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { order } = JSON.parse(event.body)
    
    let itemsList = order.items.map((item, index) => 
      `${index + 1}. ${item.name} - ${item.quantity} x ${item.priceValue.toLocaleString()} so'm`
    ).join('\n')
    
    const message = `🛒 <b>Yangi buyurtma!</b>

<b>Buyurtma #:</b> ${order.id}
👤 <b>Mijoz:</b> ${order.userName}
📱 <b>Telefon:</b> ${order.userPhone}
📍 <b>Manzil:</b> ${order.address || 'Ko\'rsatilmagan'}

<b>Mahsulotlar:</b>
${itemsList}

💰 <b>Jami summa:</b> ${order.total.toLocaleString()} so'm
💳 <b>To'lov turi:</b> ${order.payment === 'naqd' ? 'Naqd' : 'Karta'}${order.note ? `
📝 <b>Izoh:</b> ${order.note}` : ''}

⏰ <i>${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</i>`
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    const response = await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Buyurtma Telegram botga yuborildi' 
      }),
    }
  } catch (error) {
    console.error('Xato:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
    }
  }
}
