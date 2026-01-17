import { routeMessage } from "../handlers/message.handler.js";

/**
 * Telegram command router
 * - Only routing
 * - No logic
 * - No Telegram API calls
 */
export async function handleCommand(update, env) {
  if (!update || !update.message) return;
  await routeMessage(update, env);
}
