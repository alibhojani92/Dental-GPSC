import { sendMessage } from "../utils/telegram.js";
import { masterKeyboard } from "../ui/master.keyboard.js";

export async function handleCommand(update, env) {
  const msg = update.message;
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // START
  if (text === "/start") {
    return sendMessage(
      env,
      chatId,
      "🌺 <b>Dr. Arzoo Fatema</b> 🌺\n\nWelcome Doctor ❤️🦷\nPrepare for <b>GPSC Dental Class-2</b>\n\n👇 Choose an option:",
      masterKeyboard(msg.from.id === Number(env.ADMIN_ID))
    );
  }

  // Unknown command safety
  if (text.startsWith("/")) {
    return sendMessage(
      env,
      chatId,
      "⚠️ Feature coming soon.\nPlease use buttons below 👇",
      masterKeyboard(msg.from.id === Number(env.ADMIN_ID))
    );
  }

  return new Response("OK");
}
