# Local da test qilish

## 1. Local Development Server

Lokal da ishlatish uchun **2 ta terminal** oching:

### Terminal 1 - Backend Server
```bash
npm run server
```
Bu `http://localhost:3001` da backend API serverini ishga tushiradi.

### Terminal 2 - Frontend Dev Server
```bash
npm run dev
```
Bu `http://localhost:5173` da frontend dev serverini ishga tushiradi.

## 2. Telegram integratsiyasini test qilish

### Test script orqali:
```bash
npm run test-telegram
```

### Saytdan test qilish:
1. Brauzerni oching: `http://localhost:5173`
2. "Ro'yxatdan o'tish" tugmasini bosing
3. Ma'lumotlarni kiriting va ro'yxatdan o'ting
4. Telegram botingizda xabar kelishini tekshiring

## 3. Netlify Functions local test qilish (ixtiyoriy)

Netlify CLI o'rnatish:
```bash
npm install -g netlify-cli
```

Netlify Dev serverini ishga tushirish:
```bash
netlify dev
```

Bu sizning Netlify serverless functionlaringizni local da test qilish imkonini beradi.

---

## Muammolarni hal qilish

### 1. Telegram xabar kelmayapti
- `.env` faylida `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` to'g'ri ekanligini tekshiring
- Backend server ishga tushganligini tekshiring (Terminal 1)
- Browser console da (F12) xatoliklarni tekshiring

### 2. "Cannot connect to server" xatosi
- Backend server (`npm run server`) ishga tushganligini tekshiring
- `.env` faylidagi `VITE_API_URL` to'g'ri ekanligi: `http://localhost:3001`

### 3. CORS xatosi
- Backend server ishga tushgan bo'lishi kerak
- `.env` faylidagi API URL to'g'ri bo'lishi kerak

### 4. Port band bo'lsa
`server.js` faylidagi PORTni o'zgartiring yoki `.env` faylida:
```env
PORT=3002
VITE_API_URL=http://localhost:3002
```

---

## Production da test qilish

1. Netlify ga deploy qiling
2. Netlify panelidagi Environment Variables sozlang:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
3. Saytingizni oching va ro'yxatdan o'ting
4. Telegram botingizda xabar kelishini tekshiring

Agar xabar kelmasa, Netlify panelidagi **Functions > Logs** bo'limida xatoliklarni ko'ring.
