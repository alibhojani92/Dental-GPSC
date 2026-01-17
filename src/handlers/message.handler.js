const TELEGRAM_API = "https://api.telegram.org/bot";

async function send(chatId, text, keyboard, env) {
  return fetch(`${TELEGRAM_API}${env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: keyboard
    })
  });
}

/* ✅ WELCOME */
export async function sendWelcome(chatId, env) {
  return send(
    chatId,
    "🌺 Dr. Arzoo Fatema 🌺\n\nWelcome Doctor ❤️🦷\nPrepare confidently for GPSC Dental Class-2",
    {
      inline_keyboard: [
        [{ text: "📚 Start Reading", callback_data: "read_start" }],
        [{ text: "📝 Daily Test", callback_data: "daily_test" }],
        [{ text: "🧠 MCQ Practice", callback_data: "mcq" }],
        [{ text: "📊 My Progress", callback_data: "progress" }],
        [{ text: "📚 Subject List", callback_data: "subjects" }]
      ]
    },
    env
  );
}

/* ✅ COMING SOON (FIXED EXPORT) */
export async function sendComingSoon(chatId, env) {
  return send(
    chatId,
    "🚧 Feature Coming Soon\n\nThis feature is under development.\nStay focused Doctor 💪🦷",
    {},
    env
  );
}

/* ✅ FALLBACK */
export async function sendSimpleText(chatId, env) {
  return send(
    chatId,
    "ℹ️ Please use the menu buttons below 👇",
    {
      inline_keyboard: [
        [{ text: "📚 Open Menu", callback_data: "menu" }]
      ]
    },
    env
  );
}
