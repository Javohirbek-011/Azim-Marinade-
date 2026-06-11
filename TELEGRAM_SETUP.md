# Telegram Bot Sozlash Ko'rsatmasi

## 1-qadam: Botni sozlash

### Telegram Chat ID ni olish

1. **Botingizga xabar yuboring**
   - Telegram'da botingizni oching (bot token: `8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE`)
   - Bot username orqali qidiring yoki botni yaratgan paytdagi havoladan foydalaning
   - Botga `/start` yoki istalgan xabar yuboring

2. **Chat ID ni oling**
   ```bash
   npm run get-chat-id
   ```
   
   Bu komanda sizning chat ID ingizni ko'rsatadi. Masalan:
   ```json
   {
     "id": 123456789,
     "type": "private",
     "firstName": "Your Name",
     "username": "your_username"
   }
   ```

3. **.env faylini yangilang**
   - `.env` faylini oching
   - `TELEGRAM_CHAT_ID=` qatoriga yuqoridagi `id` ni qo'shing
   
   Masalan:
   ```env
   TELEGRAM_BOT_TOKEN=8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE
   TELEGRAM_CHAT_ID=123456789
   PORT=3001
   ```

## 2-qadam: Serverni ishga tushirish

### Development rejimi

**Terminal 1** - Frontend:
```bash
npm run dev
```

**Terminal 2** - Backend (Telegram bot):
```bash
npm run server
```

## 3-qadam: Testlash

1. Brauzerda `http://localhost:5173` ochiladi
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Ma'lumotlaringizni kiriting:
   - Ism familiya
   - Telefon raqam
   - Parol
   - Manzil (ixtiyoriy)
4. Ro'yxatdan o'ting

✅ Telegram botingizga yangi foydalanuvchi haqida xabar keladi!

## Nimalar botga yuboriladi?

### Ro'yxatdan o'tish
```
🆕 Yangi foydalanuvchi ro'yxatdan o'tdi!

👤 Ism: Javohir Abdurahmonov
📱 Telefon: +998901234567
🔑 Parol: test1234
📍 Manzil: Toshkent, Chilonzor

⏰ 11.06.2026, 15:30:45
```

### Buyurtma
```
🛒 Yangi buyurtma!

Buyurtma #: AZM-1718123445789
👤 Mijoz: Javohir Abdurahmonov
📱 Telefon: +998901234567
📍 Manzil: Toshkent, Chilonzor

Mahsulotlar:
1. Mol go'shti - 2 x 45,000 so'm
2. Tovuq marinad - 1 x 35,000 so'm

💰 Jami summa: 125,000 so'm
💳 To'lov turi: Naqd

⏰ 11.06.2026, 15:35:20
```

## Muammolarni hal qilish

### Bot xabar yubormayapti?

1. **Bot token to'g'riligini tekshiring**
   ```bash
   # .env faylida:
   TELEGRAM_BOT_TOKEN=8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE
   ```

2. **Chat ID to'g'riligini tekshiring**
   - Botga yana `/start` yuboring
   - `npm run get-chat-id` ni qayta ishga tushiring

3. **Server ishga tushganligini tekshiring**
   ```bash
   # Terminal 2 da:
   npm run server
   
   # Kutilayotgan natija:
   ✅ Server 3001 portda ishga tushdi
   📱 Telegram bot token: ✅ Mavjud
   ```

4. **Test xabar yuboring**
   ```bash
   node get-chat-id.js YOUR_CHAT_ID
   ```

### CORS xatoligi?

Frontend va backend bir vaqtda ishga tushganligiga ishonch hosil qiling:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Production'ga deploy qilish

### Netlify (Frontend)
1. `npm run build` - build qilish
2. `dist` papkasini Netlify'ga yuklash
3. Environment variables sozlash:
   - `VITE_API_URL` = sizning backend URL'ingiz

### Backend (Render/Railway/Heroku)
1. `.env` faylidagi o'zgaruvchilarni platformaga qo'shing
2. Start command: `npm run start`
3. Port: `3001` yoki platformaning beradigan porti

## Yordam

Agar muammo bo'lsa:
1. Server loglarini tekshiring (Terminal 2)
2. Browser console'ni tekshiring (F12)
3. `.env` faylidagi ma'lumotlarni qayta tekshiring

🎉 Muvaffaqiyatli sozlang!
