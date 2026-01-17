import { sendMessage } from "../utils/telegram.js";
import { getMainKeyboard } from "../keyboards/master.keyboard.js";

export async function handleCallback(update, env) {
  const cb = update.callback_query;
  const chatId = cb.message.chat.id;
  const data = cb.data;

  if (data === "START_READING") {
    await sendMessage(
      env,
      chatId,
`📚 Reading STARTED ✅
🕒 Start Time recorded
🎯 Daily Target: 8 Hours

🔥 Keep going Doctor 💪🦷`
    );
  }

  if (data === "STOP_READING") {
    await sendMessage(
      env,
      chatId,
`⏸ Reading STOPPED ✅

📊 Progress saved
🌟 Consistency beats intensity!`
    );
  }

  return new Response("OK");
}
