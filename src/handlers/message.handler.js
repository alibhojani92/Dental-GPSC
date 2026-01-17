import { handleStart } from "./start.handler.js";
import { handleReadingCommand } from "./reading.handler.js";

/**
 * Central message router
 * HARD RULES APPLIED:
 * - No spam replies
 * - No random chat replies
 * - Unknown text → coming soon
 */
export async function routeMessage(update, env) {
  const message = update.message;
  if (!message || !message.text) return;

  const text = message.text.trim();
  const chatId = message.chat.id;

  // ✅ START
  if (text === "/start") {
    return handleStart(update, env);
  }

  // ✅ READING FLOW
  if (
    text === "/read" ||
    text === "/stop" ||
    text.startsWith("/reading")
  ) {
    return handleReadingCommand(update, env);
  }

  // 🔒 LOCKED DEFAULT RESPONSE (NO SPAM)
  await env.TELEGRAM.sendMessage(chatId, {
    text:
      "⏳ This feature is coming soon.\n" +
      "Please use the menu buttons below 👇",
  });
      }
