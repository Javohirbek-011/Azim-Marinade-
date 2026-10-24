# Azim Marinade - Go'sht Marinad Mahsulotlari

AZIM Marinade Go'sht Markazi — marinadlangan go'sht mahsulotlari uchun responsive veb-sayt.

## Xususiyatlar

- ✅ Ro'yxatdan o'tish va tizimga kirish
- ✅ Mahsulotlar katalogi
- ✅ Savat va buyurtma berish
- ✅ Responsive dizayn
- ✅ Modern UI/UX

## O'rnatish

### 1. Loyihani klonlash
```bash
git clone https://github.com/Javohirbek-011/Azim-Marinade-.git
cd azim-marinade
```

### 2. Paketlarni o'rnatish
```bash
npm install
```

## Ishga tushirish

### Development rejimida

```bash
npx netlify-cli login
npx netlify-cli link
npm run dev
```

`netlify link` vaqtida `azim-marinade` saytini tanlang. Lokal sayt `http://localhost:8888` manzilida ochiladi va Netlify Functions production muhitidagi sozlamalar bilan ishlaydi. Shu sababli lokal ro'yxatdan o'tish yoki buyurtma ham haqiqiy Telegram xabari yuboradi.

### Production

Build qilish:
```bash
npm run build
```

Preview:
```bash
npm run preview
```

### Netlify ga deploy qilish

1. GitHub repository yarating va push qiling
2. Netlify hisobingizga kiring
3. "Import from Git" orqali repository'ni import qiling
4. Site configuration > Environment variables bo'limida `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` qiymatlarini kiriting
5. Deploy qiling. Environment variable'larni o'zgartirgandan keyin yangi deploy boshlang

## Texnologiyalar

- **Frontend:** React 19, Vite
- **Styling:** CSS3
- **Icons:** React Icons
- **Deployment:** Netlify

## Litsenziya

MIT
