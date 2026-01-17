import { handleCommand } from "./src/router/command.router.js";
import { handleCallback } from "./src/router/callback.router.js";

/**
 * GPSC Dental Master Bot – Worker Entry
 * Features: 170+ (LOCKED)
 * Architecture: 27 files (ACTIVE)
 * Storage: KV + D1
 */

export default {
  async fetch(request, env) {
    try {
      // Health check
      if (request.method !== "POST") {
        return new Response(
          "🌺 Dr. Arzoo Fatema 🌺\nGPSC Dental Bot is LIVE ✅",
          { status: 200 }
        );
      }

      const update = await request.json();

      // Telegram message (text / command)
      if (update.message) {
        await handleCommand(update, env);
      }

      // Inline keyboard callback
      if (update.callback_query) {
        await handleCallback(update, env);
      }

      return new Response("OK", { status: 200 });

    } catch (err) {
      console.error("Worker Error:", err);
      return new Response("Internal Error", { status: 500 });
    }
  }
};
