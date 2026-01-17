/**
 * =====================================================
 * GPSC DENTAL MASTER BOT – ENTRY WIRING ONLY
 * Cloudflare Workers
 *
 * IMPORTANT:
 * - This file ONLY connects existing logic
 * - NO feature code is changed
 * - All 27 files remain exactly as they are
 * =====================================================
 */

import { handleCommand } from "./src/routers/command.router.js";
import { handleCallback } from "./src/routers/callback.router.js";

/**
 * Cloudflare Worker entry
 */
export default {
  async fetch(request, env, ctx) {
    // Health check (browser open)
    if (request.method === "GET") {
      return new Response("GPSC Dental Bot is LIVE ✅", { status: 200 });
    }

    // Telegram always sends POST updates
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    let update;
    try {
      update = await request.json();
    } catch (e) {
      return new Response("Invalid JSON", { status: 400 });
    }

    try {
      // =============================
      // MESSAGE HANDLING
      // =============================
      if (update.message) {
        await handleCommand(update, env);
        return new Response("OK", { status: 200 });
      }

      // =============================
      // CALLBACK (INLINE KEYBOARD)
      // =============================
      if (update.callback_query) {
        await handleCallback(update, env);
        return new Response("OK", { status: 200 });
      }

      // Unknown update type
      return new Response("IGNORED", { status: 200 });

    } catch (err) {
      console.error("Worker Error:", err);
      return new Response("Internal Error", { status: 500 });
    }
  },
};
