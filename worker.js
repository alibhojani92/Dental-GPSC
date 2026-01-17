import { handleTelegramUpdate } from "./src/telegram.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("GPSC Bot is running 🚀", { status: 200 });
    }

    try {
      const update = await request.json();
      return await handleTelegramUpdate(update, env);
    } catch (err) {
      console.error("Worker error:", err);
      return new Response("Internal Error", { status: 500 });
    }
  },
};
