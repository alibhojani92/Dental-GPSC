import { handleCommand } from "./src/routers/command.router.js";
import { handleCallback } from "./src/routers/callback.router.js";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("GPSC Bot Alive ✅");
    }

    const update = await request.json();

    // Callback query (inline keyboard)
    if (update.callback_query) {
      return await handleCallback(update, env);
    }

    // Normal message or command
    if (update.message) {
      return await handleCommand(update, env);
    }

    return new Response("Ignored", { status: 200 });
  },
};
