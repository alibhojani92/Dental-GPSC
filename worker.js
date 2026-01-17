import { handleCommand } from "./src/router/command.router.js";
import { handleCallback } from "./src/router/callback.router.js";

export default {
  async fetch(req, env) {
    if (req.method !== "POST") {
      return new Response("Bot running ✅");
    }

    const update = await req.json();

    if (update.message) {
      await handleCommand(update, env);
    }

    if (update.callback_query) {
      await handleCallback(update, env);
    }

    return new Response("ok");
  },
};
