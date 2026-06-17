exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const { type, ...fields } = data;

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Telegram sozlamalari (env variables) topilmadi' })
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

    const tgResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (!tgResponse.ok) {
      const errText = await tgResponse.text();
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'Telegramga yuborilmadi', detail: errText })
      };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
