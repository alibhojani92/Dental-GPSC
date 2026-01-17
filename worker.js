/**
 * ROOT ENTRY – Cloudflare Worker
 * ONLY ENTRY FILE
 * NO BUSINESS LOGIC
 * NO FEATURE LOGIC
 */

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
    } catch (err) {
      return new Response("Invalid JSON", { status: 400 });
    }

    // MESSAGE COMMANDS
    if (update.message) {
      await handleCommand(update, env);
      return new Response("OK", { status: 200 });
    }

    // CALLBACK QUERIES (INLINE KEYBOARD)
    if (update.callback_query) {
      await handleCallback(update, env);
      return new Response("OK", { status: 200 });
    }

    return new Response("OK", { status: 200 });
  },
};
