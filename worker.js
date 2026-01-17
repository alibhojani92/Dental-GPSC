// worker.js (ROOT ENTRY)

import { handleCommand } from "./src/router/command.router.js";
import { handleCallback } from "./src/router/callback.router.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("GPSC Dental Bot Running ✅", { status: 200 });
    }

    const update = await request.json();

    try {
      // Callback query (inline keyboard clicks)
      if (update.callback_query) {
        await handleCallback(update, env);
        return new Response("OK");
      }

      // Normal message / command
      if (update.message) {
        await handleCommand(update, env);
        return new Response("OK");
      }

      return new Response("IGNORED", { status: 200 });
    } catch (err) {
      console.error("Worker Error:", err);
      return new Response("ERROR", { status: 500 });
    }
  },
};
