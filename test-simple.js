// Oddiy Telegram test
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

console.log('🧪 Telegram bot test')
console.log('📱 Bot Token:', BOT_TOKEN ? '✅ Bor' : '❌ Yo\'q')
console.log('💬 Chat ID:', CHAT_ID ? '✅ Bor' : '❌ Yo\'q')
console.log('')

async function testTelegram() {
  try {
    const message = `🧪 TEST XABAR\n\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    console.log('📤 Xabar yuborilmoqda...')
    
    const response = await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
    
    if (response.data.ok) {
      console.log('✅ XABAR YUBORILDI!')
      console.log('📱 Telegram botingizni tekshiring!')
    } else {
      console.log('❌ Xato:', response.data)
    }
  } catch (error) {
    console.log('❌ XATOLIK:', error.response?.data || error.message)
  }
}

testTelegram()
