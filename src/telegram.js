import { routeCommand } from "./src/router/command.router.js";
import { routeCallback } from "./src/router/callback.router.js";
import { routeMessage } from "./src/handlers/message.handler.js";

export async function handleTelegramUpdate(update, env) {
  if (update.message?.text?.startsWith("/")) {
    return routeCommand(update, env);
  }

  if (update.callback_query) {
    return routeCallback(update, env);
  }

  if (update.message) {
    return routeMessage(update, env);
  }

  return new Response("OK");
}
