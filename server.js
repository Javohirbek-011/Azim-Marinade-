import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE'

// Telegram botga xabar yuborish funksiyasi
async function sendToTelegram(message) {
  try {
    // Bot tokenidan chat ID ni olish (admin ID)
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    // Xabarni format qilish
    const formattedMessage = `🆕 <b>Yangi foydalanuvchi ro'yxatdan o'tdi!</b>\n\n${message}`
    
    const response = await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID || '8719242479', // Sizning Telegram ID
      text: formattedMessage,
      parse_mode: 'HTML'
    })
    
    return response.data
  } catch (error) {
    console.error('Telegramga xabar yuborishda xato:', error.response?.data || error.message)
    throw error
  }
}

// Ro'yxatdan o'tish ma'lumotlarini qabul qilish
app.post('/api/register-notification', async (req, res) => {
  try {
    const { name, phone, password, address } = req.body
    
    const message = `👤 <b>Ism:</b> ${name}\n📱 <b>Telefon:</b> ${phone}\n🔑 <b>Parol:</b> ${password}${address ? `\n📍 <b>Manzil:</b> ${address}` : ''}\n\n⏰ <i>${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</i>`
    
    await sendToTelegram(message)
    
    res.json({ success: true, message: 'Telegram botga yuborildi' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Buyurtma ma'lumotlarini qabul qilish
app.post('/api/order-notification', async (req, res) => {
  try {
    const { order } = req.body
    
    let itemsList = order.items.map((item, index) => 
      `${index + 1}. ${item.name} - ${item.quantity} x ${item.priceValue.toLocaleString()} so'm`
    ).join('\n')
    
    const message = `🛒 <b>Yangi buyurtma!</b>\n\n<b>Buyurtma #:</b> ${order.id}\n👤 <b>Mijoz:</b> ${order.userName}\n📱 <b>Telefon:</b> ${order.userPhone}\n📍 <b>Manzil:</b> ${order.address || 'Ko\'rsatilmagan'}\n\n<b>Mahsulotlar:</b>\n${itemsList}\n\n💰 <b>Jami summa:</b> ${order.total.toLocaleString()} so'm\n💳 <b>To'lov turi:</b> ${order.payment === 'naqd' ? 'Naqd' : 'Karta'}\n${order.note ? `📝 <b>Izoh:</b> ${order.note}\n` : ''}\n⏰ <i>${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}</i>`
    
    await sendToTelegram(message)
    
    res.json({ success: true, message: 'Buyurtma Telegram botga yuborildi' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portda ishga tushdi`)
  console.log(`📱 Telegram bot token: ${BOT_TOKEN ? '✅ Mavjud' : '❌ Topilmadi'}`)
})
