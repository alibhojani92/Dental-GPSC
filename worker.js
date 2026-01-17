/**
 * Cloudflare Worker – Telegram Webhook Entry
 * SAFE MODE: never throws, always returns 200
 */

import { handleCommand } from "./router/command.router.js";
import { handleCallback } from "./router/callback.router.js";

export default {
  async fetch(request, env, ctx) {
    try {
      if (request.method !== "POST") {
        return new Response("OK", { status: 200 });
      }

      const update = await request.json();

      // Message (commands / text)
      if (update.message) {
        await handleCommand(update, env);
      }

      // Inline keyboard callback
      if (update.callback_query) {
        await handleCallback(update, env);
      }

      // Always respond 200 to Telegram
      return new Response("OK", { status: 200 });
    } catch (err) {
      // 🔒 CRITICAL: never let Telegram see an error
      console.error("Worker error:", err);
      return new Response("OK", { status: 200 });
    }
  }
};
