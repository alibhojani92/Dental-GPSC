export function masterKeyboard(isAdmin = false) {
  const keyboard = [
    [{ text: "📚 Start Reading", callback_data: "START_READING" }],
    [{ text: "⏸ Stop Reading", callback_data: "STOP_READING" }],
    [{ text: "📝 Daily Test", callback_data: "DAILY_TEST" }],
    [{ text: "🧠 MCQ Practice", callback_data: "MCQ_PRACTICE" }],
    [{ text: "📊 My Progress", callback_data: "PROGRESS" }],
  ];

  if (isAdmin) {
    keyboard.push([{ text: "👑 Admin Panel", callback_data: "ADMIN_PANEL" }]);
  }

  return {
    inline_keyboard: keyboard,
  };
}
