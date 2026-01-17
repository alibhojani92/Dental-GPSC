import { sendMessage } from "../telegram.js";
import { masterKeyboard } from "../ui/master.keyboard.js";

export async function handleStart(update, env) {
  const chatId = update.message.chat.id;

  return sendMessage(
    env.BOT_TOKEN,
    chatId,
    "🌺 Welcome to GPSC Dental Bot 🌺",
    {
      reply_markup: masterKeyboard()
    }
  );
}
