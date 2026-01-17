import { sendMessage } from "../telegram.js";

export async function handleReadingCommand(update, env) {
  const chatId = update.message.chat.id;
  return sendMessage(env.BOT_TOKEN, chatId, "📘 Reading started");
}

export async function handleReadingCallback(update, env) {
  const chatId = update.callback_query.message.chat.id;
  return sendMessage(env.BOT_TOKEN, chatId, "📘 Reading callback handled");
}
