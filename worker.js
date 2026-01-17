/**
 * ROOT ENTRY – worker.js
 * ======================
 * SINGLE ENTRY POINT
 * USES EXISTING 27-FILE STRUCTURE
 * NO FEATURE LOSS
 */

import { TELEGRAM } from "./src/telegram.js";
import { handleCommand } from "./src/router/command.router.js";
import { handleCallback } from "./src/router/callback.router.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("OK", { status: 200 });
    }

    let update;
    try {
      update = await request.json();
    } catch (e) {
      return new Response("Invalid JSON", { status: 400 });
    }

    // Attach env to telegram client
    env.TELEGRAM = TELEGRAM(env);

    try {
      // CALLBACK QUERY (INLINE KEYBOARD)
      if (update.callback_query) {
        await handleCallback(update, env);
        return new Response("OK");
      }

      // MESSAGE / COMMAND
      if (update.message) {
        await handleCommand(update, env);
        return new Response("OK");
      }

      return new Response("IGNORED", { status: 200 });
    } catch (err) {
      console.error("Worker error:", err);
      return new Response("ERROR", { status: 500 });
    }
  }
};
