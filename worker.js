import { handleCommand } from "./src/router/command.router";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Bot is running ✅");
    }

    const update = await request.json();
    return handleCommand(update, env);
  }
};
