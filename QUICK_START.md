# 🚀 Tezkor Boshlash

## Muammoning sababi

**Avval:** Frontend to'g'ridan-to'g'ri Telegram API ga xabar yuborar edi. Bu sizning kompyuteringizdan ishlaganda ishladi, lekin boshqa telefonlardan **CORS (Cross-Origin Resource Sharing)** xatosi tufayli ishlamadi.

**Endi:** Server orqali xabarlar yuboriladi:
- **Development:** Local Express server (`http://localhost:3001`)
- **Production:** Netlify Serverless Functions

---

## Local da ishlatish (Development)

### 1. Dependencies o'rnatish
```bash
npm install
```

### 2. .env faylini sozlash
`.env` faylingizda quyidagilar bo'lishi kerak:
```env
TELEGRAM_BOT_TOKEN=8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE
TELEGRAM_CHAT_ID=8282676952
VITE_API_URL=http://localhost:3001
```

### 3. Ikki terminal oching

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 4. Test qiling
- Brauzeringizda `http://localhost:5173` ni oching
- Ro'yxatdan o'ting
- Telegram botingizda xabar kelishini tekshiring ✅

---

## Production ga deploy qilish (Netlify)

### 1. GitHub ga push qiling
```bash
git add .
git commit -m "Fixed Telegram integration with serverless functions"
git push
```

### 2. Netlify ga import qiling
1. [Netlify](https://app.netlify.com) ga kiring
2. "Add new site" > "Import an existing project"
3. GitHub repository'ni tanlang

### 3. Build sozlamalarini kiriting
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Functions directory:** `netlify/functions`

### 4. Environment Variables qo'shing
**Site settings > Build & deploy > Environment variables:**
```
TELEGRAM_BOT_TOKEN = 8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE
TELEGRAM_CHAT_ID = 8282676952
NODE_VERSION = 20
```

### 5. Deploy qiling
"Deploy site" tugmasini bosing va kutib turing!

---

## Nima o'zgardi?

### ❌ Avval (ishlamagan):
```javascript
// Frontend to'g'ridan-to'g'ri Telegram API ga so'rov yuboradi
const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
  // ... CORS xatosi ❌
})
```

### ✅ Endi (ishlaydi):
```javascript
// Frontend server orqali so'rov yuboradi
const response = await fetch(`${API_URL}/api/register-notification`, {
  // Server Telegram API bilan bog'lanadi ✅
})
```

---

## Muammolarni hal qilish

### Xabarlar kelmayapti?
1. **Environment variables tekshiring**
2. **Backend server ishga tushganligini tekshiring**
3. **Browser console da xatoliklarni ko'ring (F12)**

### Batafsil yo'riqnoma:
- [TEST_LOCALLY.md](./TEST_LOCALLY.md) - Local test qilish
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deploy

---

## Yordam kerakmi?

Qo'shimcha ma'lumot uchun:
- 📖 [README.md](./README.md)
- 🚀 [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🧪 [TEST_LOCALLY.md](./TEST_LOCALLY.md)
