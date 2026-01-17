import { sendMessage } from "../utils/telegram.js";

export async function handleCallback(update, env) {
  const query = update.callback_query;
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === "START_READING") {
    return sendMessage(
      env,
      chatId,
      "📚 Reading STARTED ✅\n🕒 Time tracking ON\n🎯 Daily Target: 8 Hours\n🔥 Keep going Doctor 💪🦷"
    );
  }

  if (data === "STOP_READING") {
    return sendMessage(
      env,
      chatId,
      "⏸ Reading STOPPED ✅\n\n📊 Progress saved\n🌟 Consistency beats intensity!"
    );
  }

  if (data === "DAILY_TEST") {
    return sendMessage(env, chatId, "📝 Daily Test will start soon ⏳");
  }

  if (data === "MCQ_PRACTICE") {
    return sendMessage(env, chatId, "🧠 MCQ Practice mode coming soon");
  }

  if (data === "PROGRESS") {
    return sendMessage(env, chatId, "📊 Progress dashboard loading...");
  }

  return new Response("OK");
}
