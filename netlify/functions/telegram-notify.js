exports.handler = async (event) => {
  // CORS headers qo'shamiz
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // OPTIONS request uchun
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { type, ...fields } = data;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    console.log('🔍 Environment check:', {
      hasBotToken: !!BOT_TOKEN,
      hasChatId: !!CHAT_ID,
      type: type
    });

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ Telegram sozlamalari topilmadi');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Telegram sozlamalari (env variables) topilmadi',
          hasBotToken: !!BOT_TOKEN,
          hasChatId: !!CHAT_ID
        })
      };
    }

    let message = '';

    if (type === 'register') {
      message =
        `🆕 *Yangi ro'yxatdan o'tish*\n\n` +
        `👤 Ism: ${fields.name || '-'}\n` +
        `📧 Email: ${fields.email || '-'}\n` +
        `📞 Telefon: ${fields.phone || '-'}\n` +
        `📍 Manzil: ${fields.address || '-'}\n` +
        `🕒 Vaqt: ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;
    } else if (type === 'order') {
      const itemsList = fields.items
        ? fields.items.map(item => `  • ${item.name} × ${item.quantity} = ${item.priceValue * item.quantity} so'm`).join('\n')
        : '-';
      
      message =
        `🛒 *Yangi buyurtma*\n\n` +
        `🆔 Buyurtma: ${fields.orderId || '-'}\n` +
        `👤 Mijoz: ${fields.userName || '-'}\n` +
        `📞 Telefon: ${fields.userPhone || '-'}\n` +
        `📍 Manzil: ${fields.address || '-'}\n\n` +
        `📦 Mahsulotlar:\n${itemsList}\n\n` +
        `💰 Jami: ${fields.total || '-'} so'm\n` +
        `💳 To'lov: ${fields.payment || 'naqd'}\n` +
        `📝 Izoh: ${fields.note || 'yo\'q'}\n` +
        `🕒 Vaqt: ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}`;
    } else {
      message = `ℹ️ Yangi hodisa:\n${JSON.stringify(fields, null, 2)}`;
    }

    console.log('📤 Telegram xabar yuborilmoqda...', { chatId: CHAT_ID });

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const tgData = await tgResponse.json();

    if (!tgResponse.ok) {
      console.error('❌ Telegram API xatosi:', tgData);
      return {
        statusCode: 502,
        headers,
        body: JSON.stringify({ 
          error: 'Telegramga yuborilmadi', 
          detail: tgData 
        })
      };
    }

    console.log('✅ Telegram xabar muvaffaqiyatli yuborildi');

    return { 
      statusCode: 200, 
      headers,
      body: JSON.stringify({ success: true, telegram: tgData })
    };
  } catch (err) {
    console.error('❌ Server xatosi:', err);
    return { 
      statusCode: 500, 
      headers,
      body: JSON.stringify({ error: err.message, stack: err.stack })
    };
  }
};
