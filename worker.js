import { handleCommand } from "./src/routers/command.router";
import { handleCallback } from "./src/routers/callback.router";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Bot is running ✅");
    }

    const update = await request.json();

    // Inline button pressed
    if (update.callback_query) {
      return handleCallback(update, env);
    }

    // Normal message / command
    if (update.message) {
      return handleCommand(update, env);
    }

    return new Response("OK");
  }
};
