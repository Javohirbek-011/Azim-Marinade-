// To'g'ridan-to'g'ri Telegram API testlash
const BOT_TOKEN = '8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE'
const CHAT_ID = '8282676952'

async function sendTestMessage() {
  console.log('📱 To\'g\'ridan-to\'g\'ri Telegram API test...\n')
  
  try {
    const message = `🎉 <b>TEST XABAR</b>

✅ Frontend'dan to'g'ridan-to'g'ri Telegram API orqali yuborildi!
🚀 Endi istalgan joydan ro'yxatdan o'tish ishlaydi!

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
      console.log('✅ Xabar muvaffaqiyatli yuborildi!')
      console.log('📱 Telegram botingizni tekshiring!')
    } else {
      console.error('❌ Xatolik:', data)
    }
  } catch (error) {
    console.error('❌ Xato:', error.message)
  }
}

sendTestMessage()
