# Azim Marinade - Go'sht Marinad Mahsulotlari

AZIM Marinade Go'sht Markazi — marinadlangan go'sht mahsulotlari uchun responsive veb-sayt va Telegram bot integratsiyasi.

## Xususiyatlar

- ✅ Ro'yxatdan o'tish va tizimga kirish
- ✅ Mahsulotlar katalogi
- ✅ Savat va buyurtma berish
- ✅ **Telegram bot integratsiyasi** - Har bir ro'yxatdan o'tish va buyurtma botingizga yuboriladi
- ✅ Responsive dizayn

## O'rnatish

### 1. Loyihani klonlash
```bash
git clone <repository-url>
cd azim-marinade
```

### 2. Paketlarni o'rnatish
```bash
npm install
```

### 3. Environment o'zgaruvchilarini sozlash
`.env.example` faylini `.env` ga nusxalang va o'z ma'lumotlaringizni kiriting:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_telegram_chat_id
PORT=3001
```

### Telegram Bot sozlash

1. [@BotFather](https://t.me/BotFather) ga o'ting va `/newbot` buyrug'ini yuboring
2. Bot tokenni `.env` fayliga kiriting
3. O'z Telegram ID ingizni olish uchun [@userinfobot](https://t.me/userinfobot) ga `/start` yuboring
4. ID ni `.env` fayliga `TELEGRAM_CHAT_ID` sifatida kiriting

## Ishga tushirish

### Development rejimida

**Terminal 1** - Frontendni ishga tushirish:
```bash
npm run dev
```

**Terminal 2** - Backend serverni ishga tushirish:
```bash
npm run server
```

### Production

Build qilish:
```bash
npm run build
```

Preview:
```bash
npm run preview
```

## Texnologiyalar

- **Frontend:** React 19, Vite
- **Backend:** Express.js, Node.js
- **API:** Telegram Bot API
- **Styling:** CSS3
- **Icons:** React Icons

## Telegram Bot Xususiyatlari

Ro'yxatdan o'tgan foydalanuvchilar va buyurtmalar avtomatik ravishda Telegram botingizga yuboriladi:

### Ro'yxatdan o'tish bildirishnomasi
- 👤 Ism familiya
- 📱 Telefon raqam
- 🔑 Parol
- 📍 Manzil

### Buyurtma bildirishnomasi
- 🛒 Buyurtma raqami
- 👤 Mijoz ma'lumotlari
- 📦 Mahsulotlar ro'yxati
- 💰 Jami summa
- 💳 To'lov turi

## Litsenziya

MIT
