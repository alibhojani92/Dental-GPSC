export function mainKeyboard(isAdmin = false) {
  const keyboard = [
    [{ text: "📚 Start Reading", callback_data: "READ_START" }],
    [{ text: "⏸ Stop Reading", callback_data: "READ_STOP" }],
    [{ text: "📝 Daily Test", callback_data: "DAILY_TEST" }],
    [{ text: "🧠 MCQ Practice", callback_data: "MCQ_PRACTICE" }],
    [{ text: "📊 My Progress", callback_data: "MY_PROGRESS" }],
    [{ text: "📘 Subject List", callback_data: "SUBJECT_LIST" }],
  ];

  if (isAdmin) {
    keyboard.push([{ text: "👑 Admin Panel", callback_data: "ADMIN_PANEL" }]);
  }

  return {
    inline_keyboard: keyboard
  };
}
