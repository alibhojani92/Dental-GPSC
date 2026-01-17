import { handleCommand } from "./src/router/command.router.js";
import { handleCallback } from "./src/router/callback.router.js";

export default {
  async fetch(request, env) {
    try {
      if (request.method !== "POST") {
        return new Response("OK");
      }

      const update = await request.json();

      // Inline keyboard callbacks
      if (update.callback_query) {
        await handleCallback(update, env);
        return new Response("OK");
      }

      // Normal messages & commands
      if (update.message) {
        await handleCommand(update, env);
        return new Response("OK");
      }

      return new Response("OK");
    } catch (err) {
      console.error("Worker error:", err);
      return new Response("OK");
    }
  },
};
