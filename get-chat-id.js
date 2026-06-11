// Bu skript sizning Telegram chat ID ni olish uchun
// Ishlatish: node get-chat-id.js

import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE'

async function getChatId() {
  try {
    console.log('🔍 Botingizga yuborilgan xabarlarni tekshiryapman...\n')
    
    const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`)
    
    if (response.data.ok && response.data.result.length > 0) {
      console.log('✅ Xabarlar topildi!\n')
      
      const updates = response.data.result
      const chats = new Set()
      
      updates.forEach(update => {
        if (update.message?.chat) {
          const chat = update.message.chat
          chats.add(JSON.stringify({
            id: chat.id,
            type: chat.type,
            firstName: chat.first_name,
            username: chat.username
          }, null, 2))
        }
      })
      
      if (chats.size > 0) {
        console.log('📱 Topilgan chatlar:\n')
        chats.forEach(chat => {
          console.log(chat)
          console.log('---')
        })
        
        const firstChat = JSON.parse([...chats][0])
        console.log(`\n💡 .env fayliga qo'shing:`)
        console.log(`TELEGRAM_CHAT_ID=${firstChat.id}`)
      } else {
        console.log('❌ Hech qanday chat topilmadi.')
        console.log('\n📝 Quyidagi qadamlarni bajaring:')
        console.log('1. Telegram botingizni oching: https://t.me/YOUR_BOT_USERNAME')
        console.log('2. Botga /start yoki istalgan xabar yuboring')
        console.log('3. Yana bir marta bu skriptni ishga tushiring: node get-chat-id.js')
      }
    } else {
      console.log('❌ Botingizga hali hech qanday xabar yuborilmagan.\n')
      console.log('📝 Quyidagi qadamlarni bajaring:')
      console.log('1. Botingizni @BotFather orqali yarating (agar yaratmagan bo\'lsangiz)')
      console.log('2. Bot username orqali Telegram\'da botni toping')
      console.log('3. Botga /start yoki istalgan xabar yuboring')
      console.log('4. Yana bir marta bu skriptni ishga tushiring: node get-chat-id.js')
    }
    
  } catch (error) {
    console.error('❌ Xatolik yuz berdi:', error.response?.data || error.message)
    
    if (error.response?.data?.description?.includes('Not Found')) {
      console.log('\n⚠️  Bot token noto\'g\'ri yoki bot topilmadi.')
      console.log('Bot tokenni tekshiring: .env faylidagi TELEGRAM_BOT_TOKEN')
    }
  }
}

// Test xabar yuborish funksiyasi
async function sendTestMessage(chatId) {
  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    
    const response = await axios.post(url, {
      chat_id: chatId,
      text: '🎉 Test xabar! Azim Marinade bot ishlayapti!',
      parse_mode: 'HTML'
    })
    
    if (response.data.ok) {
      console.log('\n✅ Test xabar muvaffaqiyatli yuborildi!')
    }
  } catch (error) {
    console.error('❌ Test xabar yuborishda xatolik:', error.response?.data || error.message)
  }
}

// Asosiy funksiya
async function main() {
  await getChatId()
  
  // Agar chat ID argument sifatida berilgan bo'lsa, test xabar yuborish
  const chatId = process.argv[2]
  if (chatId) {
    console.log(`\n📤 Chat ID ${chatId} ga test xabar yuborilmoqda...`)
    await sendTestMessage(chatId)
  }
}

main()
