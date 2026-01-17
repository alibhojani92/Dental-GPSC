import { handleCommand } from "./src/routers/command.router.js";
import { handleCallback } from "./src/routers/callback.router.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("GPSC Dental Bot Running ✅", { status: 200 });
    }

    const update = await request.json();

    // Inline keyboard clicks
    if (update.callback_query) {
      return handleCallback(update, env);
    }

    // Text / command messages
    if (update.message) {
      return handleCommand(update, env);
    }

    return new Response("OK");
  },
};
