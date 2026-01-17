import { handleCommand } from "./src/routers/command.router.js";
import { handleCallback } from "./src/routers/callback.router.js";
import { sendMessage } from "./src/utils/telegram.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("OK", { status: 200 });
    }

    let update;
    try {
      update = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    try {
      // Telegram callback query (inline keyboard)
      if (update.callback_query) {
        await handleCallback(update, env);
        return new Response("OK");
      }

      // Telegram message (text commands, buttons via /start etc)
      if (update.message) {
        await handleCommand(update, env);
        return new Response("OK");
      }

      return new Response("Ignored update", { status: 200 });
    } catch (err) {
      console.error("Worker error:", err);

      // optional safe fallback
      if (update?.message?.chat?.id) {
        await sendMessage(
          env,
          update.message.chat.id,
          "⚠️ Temporary issue. Please try again."
        );
      }

      return new Response("Error handled", { status: 200 });
    }
  },
};
