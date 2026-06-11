# Netlify ga Deploy qilish bo'yicha yo'riqnoma

## 1. Netlify hisobingizga kiring
- [Netlify](https://netlify.com) saytiga kiring
- GitHub hisobingiz bilan ulanish yoki yangi hisob yarating

## 2. Yangi sayt qo'shing
- "Add new site" > "Import an existing project" tugmasini bosing
- GitHub repository'ingizni tanlang

## 3. Build sozlamalarini o'rnating

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## 4. Environment Variables sozlang

Netlify panelidagi **Site settings > Build & deploy > Environment variables** bo'limiga quyidagilarni qo'shing:

```
TELEGRAM_BOT_TOKEN=8719242479:AAHqiKO_ZayHvc46CJOuzIoWW3tPI-oaOqE
TELEGRAM_CHAT_ID=8282676952
NODE_VERSION=20
```

## 5. Deploy qiling
- "Deploy site" tugmasini bosing
- Deploy jarayoni 2-3 daqiqa davom etadi

## 6. Domen sozlash (ixtiyoriy)
- Site settings > Domain management bo'limidan
- Custom domain qo'shishingiz mumkin

---

## Local Development

Local da ishlatish uchun ikki terminalni ishga tushiring:

**Terminal 1 - Backend server:**
```bash
npm run server
```

**Terminal 2 - Frontend dev server:**
```bash
npm run dev
```

Backend serveri `http://localhost:3001` da ishga tushadi
Frontend `http://localhost:5173` da ochiladi

---

## Muammolarni hal qilish

### Agar Telegram xabarlari kelmasa:

1. **Environment variables tekshiring:**
   - Netlify panelidagi Environment Variables to'g'ri o'rnatilganligini tekshiring
   - Deploy qilishdan oldin o'zgartirsangiz, qaytadan deploy qiling

2. **Bot token va Chat ID tekshiring:**
   ```bash
   npm run get-chat-id
   ```

3. **Netlify Functions log'larini tekshiring:**
   - Netlify panelidagi Functions > Logs bo'limida xatoliklarni ko'ring

4. **Browser console'ni tekshiring:**
   - F12 ni bosing > Console > xatoliklarni tekshiring

### CORS xatolari

Agar "CORS error" ko'rsatsa:
- Netlify functions to'g'ri sozlanganligini tekshiring
- `netlify.toml` faylidagi redirects to'g'ri ekanligini ko'ring

---

## Test qilish

### Local test:
```bash
# Server ishga tushirish
npm run server

# Test script ishlatish
npm run test-telegram
```

### Production test:
Deploy qilgandan keyin saytdan ro'yxatdan o'ting va Telegram botga xabar kelishini tekshiring.
