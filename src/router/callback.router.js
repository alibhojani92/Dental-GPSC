const TELEGRAM_API = "https://api.telegram.org/bot";

async function answer(env, chatId, text) {
  await fetch(`${TELEGRAM_API}${env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  });
}

export async function handleCallback(update, env) {
  const cb = update.callback_query;
  const chatId = cb.message.chat.id;
  const action = cb.data;

  switch (action) {

    case "READ_START":
      await answer(
        env,
        chatId,
`📚 Reading STARTED ✅
🎯 Target: 8 Hours
🔥 Keep going Doctor 💪🦷`
      );
      break;

    case "READ_STOP":
      await answer(
        env,
        chatId,
`⏸ Reading STOPPED ✅
📊 Session saved successfully`
      );
      break;

    case "DAILY_TEST":
      await answer(env, chatId, "📝 Daily Test will start soon ⏳");
      break;

    case "MCQ_PRACTICE":
      await answer(env, chatId, "🧠 MCQ Practice mode activated");
      break;

    case "MY_PROGRESS":
      await answer(env, chatId, "📊 Your progress report will appear here");
      break;

    case "SUBJECT_LIST":
      await answer(env, chatId, "📘 Dental Pulse 18 subjects loaded");
      break;

    case "ADMIN_PANEL":
      await answer(env, chatId, "👑 Admin Panel opened");
      break;

    default:
      await answer(env, chatId, "⚠️ Feature coming soon");
  }

  return new Response("OK");
}
