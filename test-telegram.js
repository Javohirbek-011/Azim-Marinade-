// Telegram bot integratsiyasini test qilish
import axios from 'axios'

const API_URL = 'http://localhost:3001'

async function testRegistration() {
  console.log('📝 Ro\'yxatdan o\'tish testini boshlaymiz...\n')
  
  try {
    const response = await axios.post(`${API_URL}/api/register-notification`, {
      name: 'Test Foydalanuvchi',
      phone: '+998 90 123 45 67',
      password: 'test12345',
      address: 'Toshkent, Chilonzor tumani'
    })
    
    if (response.data.success) {
      console.log('✅ Ro\'yxatdan o\'tish xabari muvaffaqiyatli yuborildi!')
      console.log('📱 Telegram botingizni tekshiring!')
    }
  } catch (error) {
    console.error('❌ Xatolik:', error.response?.data || error.message)
  }
}

async function testOrder() {
  console.log('\n🛒 Buyurtma testini boshlaymiz...\n')
  
  try {
    const response = await axios.post(`${API_URL}/api/order-notification`, {
      order: {
        id: 'AZM-' + Date.now(),
        userName: 'Test Mijoz',
        userPhone: '+998 90 987 65 43',
        items: [
          { id: 1, name: 'Mol go\'shti marinad', quantity: 2, priceValue: 45000 },
          { id: 2, name: 'Tovuq marinad', quantity: 1, priceValue: 35000 }
        ],
        total: 125000,
        address: 'Toshkent, Yunusobod tumani',
        note: 'Tezroq yetkazib bering',
        payment: 'naqd'
      }
    })
    
    if (response.data.success) {
      console.log('✅ Buyurtma xabari muvaffaqiyatli yuborildi!')
      console.log('📱 Telegram botingizni tekshiring!')
    }
  } catch (error) {
    console.error('❌ Xatolik:', error.response?.data || error.message)
  }
}

async function main() {
  console.log('🚀 Telegram bot integratsiyasi testi\n')
  console.log('Server: ' + API_URL)
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
  
  await testRegistration()
  await new Promise(resolve => setTimeout(resolve, 2000)) // 2 soniya kutish
  await testOrder()
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ Test tugadi! Telegram botingizni tekshiring.')
}

main()
