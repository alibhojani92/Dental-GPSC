import { routeCommand } from "./router/command.router.js";
import { routeCallback } from "./router/callback.router.js";
import { routeMessage } from "./handlers/message.handler.js";

export async function handleTelegramUpdate(update, env) {
  // Callback query
  if (update.callback_query) {
    return routeCallback(update.callback_query, env);
  }

  // Message
  if (update.message) {
    // Command
    if (update.message.text?.startsWith("/")) {
      return routeCommand(update.message, env);
    }

    // Normal message
    return routeMessage(update.message, env);
  }

  return new Response("OK");
}
