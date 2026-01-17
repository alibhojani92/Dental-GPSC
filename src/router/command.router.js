import {
  sendWelcome,
  sendComingSoon,
  sendSimpleText
} from "../handlers/message.handler";

export async function handleCommand(update, env) {
  const message = update.message;
  const callback = update.callback_query;

  if (message) {
    const chatId = message.chat.id;
    const text = message.text?.toLowerCase() || "";

    if (text === "/start") {
      return sendWelcome(chatId, env);
    }

    if (
      text.includes("read") ||
      text.includes("test") ||
      text.includes("mcq")
    ) {
      return sendComingSoon(chatId, env);
    }

    return sendSimpleText(chatId, env);
  }

  if (callback) {
    const chatId = callback.message.chat.id;
    return sendComingSoon(chatId, env);
  }

  return new Response("OK");
}
