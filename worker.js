/**
 * GPSC DENTAL MASTER BOT – WORKER ENTRY
 * FIXED ENTRY ROUTER
 * Compatible with existing 27-file architecture
 */

import { handleCommand } from "./src/router/command.router.js";
import { handleCallback } from "./src/router/callback.router.js";
import { sendMessage } from "./src/utils/telegram.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("GPSC Dental Bot Running ✅", { status: 200 });
    }

    let update;
    try {
      update = await request.json();
    } catch (e) {
      return new Response("Invalid JSON", { status: 400 });
    }

    try {
      /* ===============================
         COMMAND HANDLING (/start /read etc)
      ================================ */
      if (update.message) {
        const text = update.message.text || "";
        const chatId = update.message.chat.id;

        // Route all commands
        if (text.startsWith("/")) {
          await handleCommand(update, env);
          return Response.json({ ok: true });
        }

        // Ignore random messages (ANTI-SPAM LOCK)
        return Response.json({ ok: true });
      }

      /* ===============================
         INLINE KEYBOARD CALLBACK HANDLING
      ================================ */
      if (update.callback_query) {
        await handleCallback(update, env);
        return Response.json({ ok: true });
      }

      return Response.json({ ok: true });

    } catch (err) {
      console.error("BOT ERROR:", err);

      // Fail-safe admin notification (optional)
      try {
        if (env.ADMIN_ID) {
          await sendMessage(env.ADMIN_ID, "⚠️ Bot Error:\n" + err.message, env);
        }
      } catch (_) {}

      return Response.json({ ok: false });
    }
  }
};
