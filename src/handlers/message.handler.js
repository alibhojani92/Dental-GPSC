import { handleStart } from "./start.handler.js";
import { handleReadingCommand } from "./reading.handler.js";
export async function sendComingSoon(chatId, env) {
  await env.TELEGRAM.sendMessage(chatId, {
    text: "🚧 This feature is coming soon. Stay tuned 💡",
  });
}

export async function sendUnknownCommand(chatId, env) {
  await env.TELEGRAM.sendMessage(chatId, {
    text: "❓ Unknown command. Please use the menu buttons below 👇",
  });
}

export async function routeMessage(update, env) {
  if (!update.message) return;

  const text = update.message.text || "";

  if (text === "/start") {
    return handleStart(update, env);
  }

  if (text.startsWith("/reading")) {
    return handleReadingCommand(update, env);
  }

  return;
}
