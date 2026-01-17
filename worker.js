import { handleUpdate } from "./src/telegram.js";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("GPSC Bot Active ✅", { status: 200 });
    }

    const update = await request.json();

    try {
      await handleUpdate(update, env);
    } catch (err) {
      console.error("Telegram Update Error:", err);
    }

    return new Response("OK", { status: 200 });
  }
};
