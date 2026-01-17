import { mainKeyboard } from "../ui/master.keyboard";

const TELEGRAM_API = "https://api.telegram.org/bot";

async function sendMessage(env, chatId, text, keyboard) {
  await fetch(`${TELEGRAM_API}${env.BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: keyboard
    })
  });
}

export async function handleCommand(update, env) {
  const msg = update.message;
  const chatId = msg.chat.id;
  const text = msg.text || "";

  const isAdmin = chatId === Number(env.ADMIN_ID);

  // /start command
  if (text.startsWith("/start")) {
    const welcome = 
`🌺 Dr. Arzoo Fatema 🌺

Welcome Doctor ❤️🦷  
Prepare confidently for  
🎯 GPSC Dental Class-2 Exam

👇 Use buttons below to continue`;

    await sendMessage(
      env,
      chatId,
      welcome,
      mainKeyboard(isAdmin)
    );

    return new Response("OK");
  }

  // Unknown text → show menu again
  await sendMessage(
    env,
    chatId,
    "ℹ️ Please use the buttons below 👇",
    mainKeyboard(isAdmin)
  );

  return new Response("OK");
}
