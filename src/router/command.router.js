import { sendMessage } from "../utils/telegram.js";
import { getMainKeyboard } from "../keyboards/master.keyboard.js";

export async function handleCommand(update, env) {
  const msg = update.message;
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // /start OR Start button
  if (text === "/start" || text === "📚 Start Reading") {
    await sendMessage(env, chatId,
`🌺 Dr. Arzoo Fatema 🌺

Welcome Doctor ❤️🦷
This bot will help you prepare for
🎯 GPSC Dental Class-2 Exam

👇 Use buttons below`,
      getMainKeyboard()
    );
    return new Response("OK");
  }

  // Fallback (no spam)
  await sendMessage(
    env,
    chatId,
    "⚠️ Feature coming soon.\nPlease use buttons below 👇",
    getMainKeyboard()
  );

  return new Response("OK");
}
