import { routeMessage } from "./handlers/message.handler.js";

export async function sendMessage(token, chatId, text, extra = {}) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      ...extra
    })
  });
}

export async function handleUpdate(update, env) {
  return routeMessage(update, env);
}
